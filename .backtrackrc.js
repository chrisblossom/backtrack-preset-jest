'use strict';

const paths = require('@backtrack/core/paths');

module.exports = {
    presets: ['@backtrack/style'],

    files: {
        skip: [paths.buildPath, paths.sourcePath],
    },

    config: {
        eslint: {
            overrides: [
                {
                    files: 'files/*.js',
                    parserOptions: {
                        sourceType: 'script',
                    },
                    rules: {
                        strict: ['error', 'safe'],
                        'import/no-unresolved': 'off',
                        'import/no-extraneous-dependencies': 'off',
                    },
                },
            ],
        },

        prettier: {
            overrides: [
                {
                    files: 'files/*.js',
                    options: {
                        trailingComma: 'es5',
                    },
                },
            ],
        },
    },
};
