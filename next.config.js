const withPlugins = require('next-compose-plugins');
const withNextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
const { withSentryConfig } = require('@sentry/nextjs');

/**
 * @type {import('next').NextConfig}
 **/
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

        config.module.rules.push({
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
        });

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

/**
 * @type {import('@sentry/nextjs/dist/config/types').SentryWebpackPluginOptions}
 **/
const SentryWebpackPluginOptions = {
    include: '.next',
    ignore: ['node_modules'],
    urlPrefix: '~/_next',
    configFile: 'sentry.properties',
};

const nextConfigWithPlugins = withPlugins([withNextEnv()], nextConfig);

module.exports =
    process.env.NODE_ENV === 'production' && Boolean(process.env.NEXT_STATIC_SENTRY_DSN)
        ? withSentryConfig(nextConfigWithPlugins, SentryWebpackPluginOptions)
        : nextConfigWithPlugins;
