'use strict';

module.exports = {
    packageJson: {
        scripts: {
            // use npm script for improved keyboard input mode
            'test.watch': 'jest --watch',
            'test.update': 'jest --updateSnapshot',
        },
    },
    test: 'jest --passWithNoTests',

    /**
     * Add pretest to allow for linting etc before tests are ran
     * Used in CI config files
     */
    'test.ci-pretest': [function noop() {}],
    'test.ci': [
        'jest --passWithNoTests --coverage',
        {
            name: 'codecov',
            task: 'codecov',
        },
    ],

    prepush: ['backtrack test'],
    prepublishOnly: ['backtrack test'],

    files: [
        { src: 'files/jest.js', dest: 'jest.config.js' },
        { src: 'files/wallaby.js', dest: 'wallaby.config.js' },
        { src: 'files/circleci-v2.yml', dest: '.circleci/config.yml' },
        { src: 'files/appveyor.yml', dest: 'appveyor.yml' },
    ],
};
