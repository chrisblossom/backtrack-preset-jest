/**
 * This file is managed by backtrack
 *
 * source: @backtrack/preset-jest
 * namespace: wallaby
 *
 * DO NOT MODIFY
 */

'use strict';

const Backtrack = require('@backtrack/core');

const { configManager } = new Backtrack();

const ignore = [
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/build/**',
    '!**/coverage/**',
    '!**/.git/**',
    '!**/.idea/**',
    '!**/.vscode/**',
    '!**/.cache/**',
    '!**/.DS_Store/**',
    '!**/flow-typed/**',
];

module.exports = (wallabyInitial) => {
    /**
     * Needed for monorepo
     */
    process.env.NODE_PATH = require('path').join(
        wallabyInitial.localProjectDir,
        '../../node_modules'
    );

    const wallabyConfig = configManager({
        namespace: 'wallaby',
        config: {
            files: [
                ...ignore,
                { pattern: '*', instrument: false },
                { pattern: '.*', instrument: false },
                { pattern: '**/__sandbox__/**/*', instrument: false },
                { pattern: '**/__sandbox__/**/.*', instrument: false },
                '**/*.+(js|jsx|ts|tsx)',
                '!**/*.test.+(js|ts)',
                { pattern: '**/.*', instrument: false },
                { pattern: '**/*', instrument: false },
            ],

            tests: [...ignore, '!**/__sandbox__/**', '**/*.test.+(js|ts)'],

            compilers: {
                'src/**/*.+(js|jsx)': wallabyInitial.compilers.babel(),
                '**/*.+(ts|tsx)': wallabyInitial.compilers.babel(),
            },

            hints: {
                ignoreCoverage: /ignore coverage/,
            },

            env: {
                type: 'node',
                runner: 'node',
            },

            testFramework: 'jest',

            setup: (wallabySetup) => {
                /**
                 * link node_modules inside wallaby's temp dir
                 *
                 * https://github.com/wallabyjs/public/issues/1663#issuecomment-389717074
                 */
                const fs = require('fs');
                const path = require('path');
                const realModules = path.join(
                    wallabySetup.localProjectDir,
                    'node_modules'
                );
                const linkedModules = path.join(
                    wallabySetup.projectCacheDir,
                    'node_modules'
                );

                try {
                    fs.symlinkSync(realModules, linkedModules, 'dir');
                } catch (error) {
                    if (error.code !== 'EEXIST') {
                        throw error;
                    }
                }

                /**
                 * Set to project local path so backtrack can correctly resolve modules
                 * https://github.com/wallabyjs/public/issues/1552#issuecomment-372002860
                 */
                process.chdir(wallabySetup.localProjectDir);

                try {
                    require('@babel/polyfill');
                    // eslint-disable-next-line no-empty
                } catch (error) {}
                process.env.NODE_ENV = 'test';
                const jestConfig = require('./jest.config');
                wallabySetup.testFramework.configure(jestConfig);

                /**
                 * https://github.com/wallabyjs/public/issues/1268#issuecomment-323237993
                 *
                 * reset to expected wallaby process.cwd
                 */
                process.chdir(wallabySetup.projectCacheDir);

                try {
                    /**
                     * Run custom wallaby setup script
                     */
                    require('./wallaby.setup.js')(wallabySetup);
                    // eslint-disable-next-line no-empty
                } catch (error) {}
            },
        },
    });

    return wallabyConfig;
};