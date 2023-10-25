'use strict';

module.exports = {
	presets: [
		'@backtrack/preset',
		'./lib/preset-jest',
	],

	packageJson: {
		module: 'commonjs',
		engines: {
			node: '>=18.12.0',
		},
	},

	files: [
		{
			skip: [
				'jest.config.js',
				'wallaby.config.js',
			],
		},
	],

	config: {
		eslint: {
			overrides: [
				{
					files: [
						'lib/files/jest.cjs',
						'lib/files/wallaby.cjs',
					],
					rules: {
						'import/extensions': 'off',
					},
				},
			],
		},
	},
};
