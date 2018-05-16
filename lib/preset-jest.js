'use strict';

module.exports = {
    test: 'jest --passWithNoTests',
    'test.ci':
        'jest --passWithNoTests --coverage && cat ./coverage/lcov.info | coveralls',
    'test.watch': 'jest --watch',
    'test.update': 'jest --updateSnapshot',

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
