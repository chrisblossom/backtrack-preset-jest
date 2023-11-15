'use strict';

// const getNodeVersions = require('./utils/get-node-versions');

// const nodeVersions = getNodeVersions();

module.exports = ({ options }) => {
	const { isApp = false } = options;

	/**
	 * By default, enable windows for libraries and disable for applications
	 */
	let windows = true;
	if (options.windows === false || options.windows === true) {
		windows = options.windows;
	} else if (isApp === true) {
		windows = false;
	}

	const preset = {
		presets: ['@backtrack/preset-git-hooks'],

		packageJson: {
			scripts: {
				// use npm script for improved keyboard input mode
				'test.watch': 'jest --watch --pass-with-no-tests',
				'test.update': 'jest --update-snapshot',
			},
		},
		test: 'jest --pass-with-no-tests',

		'check.all': ['backtrack test'],

		/**
		 * Add pretest to allow for linting etc before tests are ran
		 * Used in CI config files
		 */
		'test.ci-pretest': [function noop() {}],
		'test.ci': [
			/**
			 * use maxWorkers 2 because CircleCI returns incorrect number of CPUs for jest.
			 * https://discuss.circleci.com/t/memory-problems-with-jest-and-workers/10297
			 */
			'jest --ci --no-cache --coverage --max-workers 2',
			// {
			// 	name: 'codecov',
			// 	task: 'codecov',
			// },
		],

		'git-pre-push': ['backtrack test'],

		files: [
			// {
			// 	src: `files/circleci-${nodeVersions}.yml`,
			// 	dest: '.circleci/config.yml',
			// },
			{
				src: 'files/wallaby.cjs',
				dest: 'wallaby.config.cjs',
			},
			{
				src: 'files/jest.cjs',
				dest: 'jest.config.cjs',
			},
		],
	};

	if (windows === true) {
		// preset.files.push({
		// 	src: `files/appveyor-${nodeVersions}.yml`,
		// 	dest: 'appveyor.yml',
		// });
	}

	const prepublishOnly =
		options.prepublishOnly === true || options.prepublishOnly === false
			? options.prepublishOnly
			: isApp === false;

	if (prepublishOnly === true) {
		preset.prepublishOnly = ['backtrack test'];
	}

	return preset;
};
