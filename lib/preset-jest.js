'use strict';

module.exports = {
    test: 'jest',
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
    ],
};
