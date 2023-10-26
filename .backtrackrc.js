'use strict';

module.exports = {
	presets: ['@backtrack/preset'],

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
