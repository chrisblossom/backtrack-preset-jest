'use strict';

module.exports = {
	presets: ['@backtrack/preset'],
	config: {
		eslint: {
			overrides: [
				{
					files: ['lib/files/wallaby.js'],
					rules: {
						'import/extensions': 'off',
					},
				},
			],
		},
	},
};
