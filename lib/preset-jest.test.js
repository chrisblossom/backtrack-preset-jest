'use strict';

const transformConfig = require('@backtrack/core/dist/options-file/transform-config')
    .transformConfig;

test('preset returns expected config - defaults', () => {
    const backtrackConfig = {
        presets: ['../'],
    };

    const result = transformConfig(backtrackConfig, __dirname);

    expect(result).toMatchSnapshot();
});

test('preset returns expected config - windows = false', () => {
    const backtrackConfig = {
        presets: [['../', { windows: false }]],
    };

    const result = transformConfig(backtrackConfig, __dirname);

    expect(result).toMatchSnapshot();
});

test('preset returns expected config - isApp = true', () => {
    const backtrackConfig = {
        presets: [['../', { isApp: true }]],
    };

    const result = transformConfig(backtrackConfig, __dirname);

    expect(result).toMatchSnapshot();
});

test('preset returns expected config - isApp = true, windows false', () => {
    const backtrackConfig = {
        presets: [['../', { isApp: true, windows: false }]],
    };

    const result = transformConfig(backtrackConfig, __dirname);

    expect(result).toMatchSnapshot();
});
