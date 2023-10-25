'use strict';

const getNodeVersions = () => require('./get-node-versions')();

let consoleSpy;

beforeEach(() => {
	consoleSpy = jest
		.spyOn(console, 'warn')
		.mockImplementation(() => undefined);
});

describe('getNodeVersions', () => {
	test('handles no engines', () => {
		jest.doMock('read-pkg', () => ({
			sync: () => ({}),
		}));

		const result = getNodeVersions();

		expect(result).toEqual('18+');
		expect(consoleSpy).toHaveBeenCalledTimes(0);
	});

	test('handles no node', () => {
		jest.doMock('read-pkg', () => ({
			sync: () => ({ engines: { npm: '>=3.10.10' } }),
		}));

		const result = getNodeVersions();

		expect(result).toEqual('18+');
		expect(consoleSpy).toHaveBeenCalledTimes(0);
	});

	test('handle unsupported node', () => {
		jest.doMock('read-pkg', () => ({
			sync: () => ({ engines: { node: '>=6.10.10' } }),
		}));

		const result = getNodeVersions();

		expect(result).toEqual('18+');
		expect(consoleSpy).toHaveBeenCalledTimes(1);
	});

	test('node 18 only', () => {
		jest.doMock('read-pkg', () => ({
			sync: () => ({
				engines: {
					node: '18',
				},
			}),
		}));

		const result = getNodeVersions();

		expect(result).toEqual('18');
		expect(consoleSpy).toHaveBeenCalledTimes(0);
	});

	test('node 18 and greater', () => {
		jest.doMock('read-pkg', () => ({
			sync: () => ({
				engines: {
					node: '>=18.12.0',
				},
			}),
		}));

		const result = getNodeVersions();

		expect(result).toEqual('18+');
		expect(consoleSpy).toHaveBeenCalledTimes(0);
	});

	test('node 20 only', () => {
		jest.doMock('read-pkg', () => ({
			sync: () => ({
				engines: {
					node: '20',
				},
			}),
		}));

		const result = getNodeVersions();

		expect(result).toEqual('20');
		expect(consoleSpy).toHaveBeenCalledTimes(0);
	});

	test('node 20 and greater', () => {
		jest.doMock('read-pkg', () => ({
			sync: () => ({
				engines: {
					node: '>=20.0.0',
				},
			}),
		}));

		const result = getNodeVersions();

		expect(result).toEqual('20');
		expect(consoleSpy).toHaveBeenCalledTimes(0);
	});
});
