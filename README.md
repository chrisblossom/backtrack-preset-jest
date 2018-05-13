# @backtrack/preset-jest

[![npm](https://img.shields.io/npm/v/@backtrack/preset-jest.svg?label=npm%20version)](https://www.npmjs.com/package/@backtrack/preset-jest)

## About

[`backtrack`](https://github.com/chrisblossom/backtrack) preset that adds [Jest](https://facebook.github.io/jest/) to your project.

## Features

*   Configure [Jest](https://facebook.github.io/jest/)
*   Add [jest-serializer-path](https://github.com/tribou/jest-serializer-path/)
*   Add [jest-snapshot-serializer-function-name](https://github.com/suchipi/jest-snapshot-serializer-function-name)
*   Add [Wallaby.js](https://wallabyjs.com/) config

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
