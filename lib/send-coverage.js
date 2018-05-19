#!/usr/bin/env node

'use strict';

const execSync = require('child_process').execSync;
const semver = require('semver');
const os = require('os');

if (os.platform() === 'win32') {
    // eslint-disable-next-line no-console
    console.log('Windows found. Skipping coveralls...');
    return;
}

/**
 * Parallel builds do not work with coveralls and open source repositories.
 *
 * See https://github.com/lemurheavy/coveralls-public/issues/1093
 */
const semverMajor = semver(process.version).major;
if (semverMajor !== 8 || os.platform() === 'win32') {
    // eslint-disable-next-line no-console
    console.log(`node ${semverMajor} found. Skipping coveralls...`);

    return;
}

// eslint-disable-next-line no-console
console.log('Sending results to coveralls...');
const command = `cat ./coverage/lcov.info | coveralls`;
try {
    execSync(command, {
        stdio: 'inherit',
    });
} catch (error) {
    process.exit(1);
}
