'use strict';

const transformConfig = require('@backtrack/core/dist/options-file/transform-config')
    .transformConfig;

function testAllVersions(backtrackConfig) {
    test('node 6', () => {
        jest.doMock('read-pkg', () => ({
            sync: () => ({ engines: { node: '6.0.0' } }),
        }));
        const result = transformConfig(backtrackConfig, __dirname);
        expect(result).toMatchSnapshot();
    });

    test('node 6+', () => {
        jest.doMock('read-pkg', () => ({
            sync: () => ({ engines: { node: '>=6.0.0' } }),
        }));
        const result = transformConfig(backtrackConfig, __dirname);
        expect(result).toMatchSnapshot();
    });

    test('node 8', () => {
        jest.doMock('read-pkg', () => ({
            sync: () => ({ engines: { node: '8.0.0' } }),
        }));
        const result = transformConfig(backtrackConfig, __dirname);
        expect(result).toMatchSnapshot();
    });

    test('node 8+', () => {
        jest.doMock('read-pkg', () => ({
            sync: () => ({ engines: { node: '>=8.0.0' } }),
        }));
        const result = transformConfig(backtrackConfig, __dirname);
        expect(result).toMatchSnapshot();
    });

    test('node 10', () => {
        jest.doMock('read-pkg', () => ({
            sync: () => ({ engines: { node: '10.0.0' } }),
        }));
        const result = transformConfig(backtrackConfig, __dirname);
        expect(result).toMatchSnapshot();
    });
}

describe('preset returns expected config - defaults', () => {
    const backtrackConfig = {
        presets: ['../'],
    };

    testAllVersions(backtrackConfig);
});

describe('preset returns expected config - windows = false', () => {
    const backtrackConfig = {
        presets: [['../', { windows: false }]],
    };

    testAllVersions(backtrackConfig);
});

describe('preset returns expected config - isApp = true', () => {
    const backtrackConfig = {
        presets: [['../', { isApp: true }]],
    };

    testAllVersions(backtrackConfig);
});

describe('preset returns expected config - isApp = true, windows false', () => {
    const backtrackConfig = {
        presets: [['../', { isApp: true, windows: false }]],
    };

    testAllVersions(backtrackConfig);
});
