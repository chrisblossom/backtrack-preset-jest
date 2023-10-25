'use strict';

const transformConfig =
	require('@backtrack/core/dist/options-file/transform-config').transformConfig;

function testAllVersions(backtrackConfig) {
	test('node 18', () => {
		jest.doMock('read-pkg', () => ({
			sync: () => ({ engines: { node: '18.0.0' } }),
		}));
		const result = transformConfig(backtrackConfig, __dirname);
		expect(result).toMatchSnapshot();
	});

	test('node 18+', () => {
		jest.doMock('read-pkg', () => ({
			sync: () => ({ engines: { node: '>=18.0.0' } }),
		}));
		const result = transformConfig(backtrackConfig, __dirname);
		expect(result).toMatchSnapshot();
	});

	test('node 20', () => {
		jest.doMock('read-pkg', () => ({
			sync: () => ({ engines: { node: '20.0.0' } }),
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
		presets: [
			[
				'../',
				{ node: true },
			],
		],
	};

	testAllVersions(backtrackConfig);
});

describe('windows: false', () => {
	const backtrackConfig = {
		presets: [
			[
				'../',
				{ windows: false },
			],
		],
	};

	testAllVersions(backtrackConfig);
});

describe('isApp: true', () => {
	const backtrackConfig = {
		presets: [
			[
				'../',
				{ isApp: true },
			],
		],
	};

	testAllVersions(backtrackConfig);
});

describe('isApp: true, windows: true', () => {
	const backtrackConfig = {
		presets: [
			[
				'../',
				{ isApp: true, windows: true },
			],
		],
	};

	testAllVersions(backtrackConfig);
});
