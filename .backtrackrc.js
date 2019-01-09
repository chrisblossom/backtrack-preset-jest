'use strict';

module.exports = {
    presets: ['@backtrack/preset'],

    config: {
        eslint: {
            rules: {
                'filenames/match-exported': 'off',
            },
        },
    },
};
