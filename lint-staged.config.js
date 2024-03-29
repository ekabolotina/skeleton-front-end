function getFilesListAsString(files, escapeSquareBrackets = false) {
    return files
        .reduce((paths, path) => {
            if (escapeSquareBrackets) {
                path = path.replace('[', '\\[').replace(']', '\\]');
            }

            return paths.concat(path);
        }, [])
        .join(' ');
}

module.exports = {
    '*.{js,jsx,ts,tsx}': (files) => {
        const fileNamesEscaped = getFilesListAsString(files, true);
        const fileNames = getFilesListAsString(files, false);

        return [
            `yarn run lint-js ${fileNames} --fix`,
            `yarn run lint-styles ${fileNamesEscaped} --fix`,
            `yarn run format ${fileNamesEscaped} --write`,
        ];
    },
    '*.json': (files) => {
        const fileNamesEscaped = getFilesListAsString(files);

        return [`yarn run format ${fileNamesEscaped} --write`];
    },
};
