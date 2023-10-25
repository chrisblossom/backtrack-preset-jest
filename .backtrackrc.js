'use strict';

module.exports = {
	presets: ['@backtrack/preset'],

	packageJson: {
		module: 'commonjs',
		engines: {
			node: '>=18.12.0',
		},
	},

	files: [
		{ src: 'lib/files/jest.cjs', dest: 'jest.config.cjs' },
		{ src: 'lib/files/wallaby.cjs', dest: 'wallaby.config.cjs' },
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
