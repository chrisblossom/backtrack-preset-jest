#!/usr/bin/env node

'use strict';

const execSync = require('child_process').execSync;
const semver = require('semver');
const os = require('os');

if (os.platform() === 'win32') {
    return;
}

/**
 * Parallel builds do not work with coveralls and open source repositories.
 *
 * See https://github.com/lemurheavy/coveralls-public/issues/1093
 */
const semverMajor = semver(process.version).major;
if (semverMajor !== 8) {
    return;
}

const command = `cat ./coverage/lcov.info | coveralls`;
try {
    execSync(command, {
        stdio: 'inherit',
    });
} catch (error) {
    process.exit(1);
}
