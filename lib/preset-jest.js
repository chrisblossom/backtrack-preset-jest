'use strict';

const getNodeVersions = require('./utils/get-node-versions');

const nodeVersions = getNodeVersions();

module.exports = ({ options }) => {
    const { windows = true, isApp = false } = options;

    const preset = {
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
            /**
             * use maxWorkers 2 because CircleCI returns incorrect number of CPUs for jest.
             * https://discuss.circleci.com/t/memory-problems-with-jest-and-workers/10297
             */
            'jest --passWithNoTests --ci --no-cache --coverage --maxWorkers 2',
            {
                name: 'codecov',
                task: 'codecov',
            },
        ],

        'git-pre-push': ['backtrack test'],

        config: {
            husky: {
                hooks: {
                    'pre-push': 'npm run git-pre-push',
                },
            },
        },

        files: [
            { src: 'files/wallaby.js', dest: 'wallaby.config.js' },
            {
                src: `files/circleci-${nodeVersions}.yml`,
                dest: '.circleci/config.yml',
            },
        ],
    };

    if (windows === true) {
        preset.files.push({
            src: 'files/jest-library.js',
            dest: 'jest.config.js',
        });

        preset.files.push({
            src: `files/appveyor-${nodeVersions}.yml`,
            dest: 'appveyor.yml',
        });
    } else {
        preset.files.push({ src: 'files/jest-app.js', dest: 'jest.config.js' });
    }

    if (isApp === false) {
        preset.prepublishOnly = ['backtrack test'];
    }

    return preset;
};
