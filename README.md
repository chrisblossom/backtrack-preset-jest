# @backtrack/preset-jest

[![npm](https://img.shields.io/npm/v/@backtrack/preset-jest.svg?label=npm%20version)](https://www.npmjs.com/package/@backtrack/preset-jest)
[![Linux Build Status](https://img.shields.io/circleci/project/github/chrisblossom/backtrack-preset-jest/master.svg?label=linux%20build)](https://circleci.com/gh/chrisblossom/backtrack-preset-jest/tree/master)
[![Windows Build Status](https://img.shields.io/appveyor/ci/chrisblossom/backtrack-preset-jest/master.svg?label=windows%20build)](https://ci.appveyor.com/project/chrisblossom/backtrack-preset-jest/branch/master)
[![Code Coverage](https://img.shields.io/codecov/c/github/chrisblossom/backtrack-preset-jest/master.svg)](https://codecov.io/gh/chrisblossom/backtrack-preset-jest/branch/master)

## About

[`backtrack`](https://github.com/chrisblossom/backtrack) preset that adds [Jest](https://facebook.github.io/jest/) to your project.

## Features

-   Configure [Jest](https://facebook.github.io/jest/)
-   [jest-serializer-path](https://github.com/tribou/jest-serializer-path/) to normalize paths inside snapshots
-   [jest-snapshot-serializer-function-name](https://github.com/suchipi/jest-snapshot-serializer-function-name) to add function names inside snapshots
-   [CircleCI](https://circleci.com/) Linux CI
-   [AppVeyor](https://www.appveyor.com/) Windows CI
-   [Wallaby.js](https://wallabyjs.com/) config
-   Add `pre-push` and `prepublishOnly` testing git hooks

## Installation

`npm install --save-dev @backtrack/preset-jest`

## Usage

```js
// backtrack.config.js

'use strict';

module.exports = {
	presets: ['@backtrack/jest'],
};
```

## Options

```js
// backtrack.config.js

'use strict';

module.exports = {
	presets: [
		[
			'@backtrack/jest',
			{
				/**
				 * Disable testing on Windows
				 *
				 * module default: true
				 * app default: false
				 */
				windows: false,

				/**
				 * Disable settings unnecessary in applications
				 *
				 * default: false
				 */
				isApp: true,

				/**
				 * prepublishOnly testing hook
				 *
				 * module default: true
				 * app default: false
				 */
				prepublishOnly: false,
			},
		],
	],
};
```
