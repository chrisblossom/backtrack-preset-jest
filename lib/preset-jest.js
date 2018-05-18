'use strict';

const path = require('path');

module.exports = {
    packageJson: {
        scripts: {
            // use npm script for improved keyboard input mode
            'test.watch': 'jest --watch',
            'test.update': 'jest --updateSnapshot',
        },
    },
    test: 'jest --passWithNoTests',
    'test.ci': [
        'jest --passWithNoTests --coverage',
        path.resolve(__dirname, 'send-coverage.js'),
    ],

    prepush: ['backtrack test'],
    prepublishOnly: ['backtrack test'],

    files: [
        { src: 'files/jest.js', dest: 'jest.config.js' },
        { src: 'files/wallaby.js', dest: 'wallaby.config.js' },

        /**
         * CI stuff
         */
        { src: 'files/circleci-v2.yml', dest: '.circleci/config.yml' },
        { src: 'files/appveyor.yml', dest: 'appveyor.yml' },
    ],
};
