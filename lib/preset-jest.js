'use strict';

module.exports = {
    test: 'jest',
    'test.ci':
        'jest --coverage && cat ./coverage/lcov.info | ./node_modules/.bin/coveralls',
    'test.watch': 'jest --watch',
    'test.update': 'jest --updateSnapshot',

    files: [
        {
            src: 'files/jest.js',
            dest: 'jest.config.js',
        },
        {
            src: 'files/wallaby.js',
            dest: 'wallaby.config.js',
        },

        /**
         * CI stuff
         */
        {
            src: 'files/circleci-v2.yml',
            dest: '.circleci/config.yml',
        },
        {
            src: 'files/appveyor.yml',
            dest: 'appveyor.yml',
        },
    ],
};
