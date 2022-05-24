'use strict';

const semver = require('semver');
const readPkg = require('read-pkg');
const log = require('@backtrack/core/dist/utils/log').default;

const supported = [
	//
	'14.0.0',
	'16.0.0',
	'18.0.0',
];

let nodeVersions = '';

function getNodeVersions() {
	// basic caching
	if (nodeVersions !== '') {
		return nodeVersions;
	}

	const pkg = readPkg.sync({ normalize: false });
	const engines = pkg.engines || {};

	const node = engines.node || '>=14.0.0';

	const majorOnly = node
		.split('.')
		.map((v, index) => {
			if (index === 0) {
				return v;
			}

			return 0;
		})
		.join('.');

	const matchedSupported = supported
		.filter((version) => {
			const satisfiesSemver = semver.satisfies(version, majorOnly);

			return satisfiesSemver;
		})
		.map((version) => {
			return semver.major(version).toString();
		});

	const hasUnsupported = semver.satisfies('6.0.0', majorOnly);
	if (hasUnsupported === true) {
		log.warn(
			`@backtrack/preset-jest - unsupported node range ${node} set inside package.json's engines field. Supported node versions: ${supported.join(
				', ',
			)}`,
		);
	}

	if (matchedSupported.length === 1) {
		nodeVersions = matchedSupported[0];

		return nodeVersions;
	}

	nodeVersions = `${matchedSupported[0]}+`;

	return nodeVersions;
}

module.exports = getNodeVersions;
