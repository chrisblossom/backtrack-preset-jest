'use strict';

const transformConfig = require('@backtrack/core/dist/options-file/transform-config')
	.transformConfig;

function testAllVersions(backtrackConfig) {
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

	test('node 10+', () => {
		jest.doMock('read-pkg', () => ({
			sync: () => ({ engines: { node: '>=10.0.0' } }),
		}));
		const result = transformConfig(backtrackConfig, __dirname);
		expect(result).toMatchSnapshot();
	});

	test('node 12', () => {
		jest.doMock('read-pkg', () => ({
			sync: () => ({ engines: { node: '12.0.0' } }),
		}));
		const result = transformConfig(backtrackConfig, __dirname);
		expect(result).toMatchSnapshot();
	});

	test('node 12+', () => {
		jest.doMock('read-pkg', () => ({
			sync: () => ({ engines: { node: '>=12.0.0' } }),
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

describe('node: true', () => {
	const backtrackConfig = {
		presets: [['../', { node: true }]],
	};

	testAllVersions(backtrackConfig);
});

describe('windows: false', () => {
	const backtrackConfig = {
		presets: [['../', { windows: false }]],
	};

	testAllVersions(backtrackConfig);
});

describe('isApp: true', () => {
	const backtrackConfig = {
		presets: [['../', { isApp: true }]],
	};

	testAllVersions(backtrackConfig);
});

describe('isApp: true, windows: true', () => {
	const backtrackConfig = {
		presets: [['../', { isApp: true, windows: true }]],
	};

	testAllVersions(backtrackConfig);
});
