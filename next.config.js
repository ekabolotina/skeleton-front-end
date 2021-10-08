const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withNextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack(config) {
        const originalEntry = config.entry;

        config.entry = async () => {
            const entries = await originalEntry();

            if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js')) {
                entries['main.js'].unshift('./polyfills.js');
            }

            return entries;
        };

        config.module.rules = config.module.rules.map((rule) => {
            const { use } = rule;

            if (!use || use.loader !== 'next-babel-loader') {
                return rule;
            }

            const originalExcludeFunc = rule.exclude;
            rule.exclude = (path) => {
                if (/(swiper|dom7|slack)\/\.*/.test(path)) {
                    return false;
                }

                return originalExcludeFunc(path);
            };

            return rule;
        });

        return config;
    },
};

dotenvLoad();

module.exports = withPlugins([withNextEnv(), [optimizedImages]], nextConfig);
