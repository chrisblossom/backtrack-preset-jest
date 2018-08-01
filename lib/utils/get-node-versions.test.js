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

        expect(result).toEqual('6+');
        expect(consoleSpy).toHaveBeenCalledTimes(0);
    });

    test('handles no node', () => {
        jest.doMock('read-pkg', () => ({
            sync: () => ({ engines: { npm: '>=3.10.10' } }),
        }));

        const result = getNodeVersions();

        expect(result).toEqual('6+');
        expect(consoleSpy).toHaveBeenCalledTimes(0);
    });

    test('handle unsupported node', () => {
        jest.doMock('read-pkg', () => ({
            sync: () => ({ engines: { node: '>=4.10.10' } }),
        }));

        const result = getNodeVersions();

        expect(result).toEqual('6+');
        expect(consoleSpy).toHaveBeenCalledTimes(1);
    });

    test('node 6 only', () => {
        jest.doMock('read-pkg', () => ({
            sync: () => ({
                engines: {
                    node: '6.9.0',
                },
            }),
        }));

        const result = getNodeVersions();

        expect(result).toEqual('6');
        expect(consoleSpy).toHaveBeenCalledTimes(0);
    });

    test('node 6 and greater', () => {
        jest.doMock('read-pkg', () => ({
            sync: () => ({
                engines: {
                    node: '>=6.9.0',
                },
            }),
        }));

        const result = getNodeVersions();

        expect(result).toEqual('6+');
        expect(consoleSpy).toHaveBeenCalledTimes(0);
    });

    test('node 8 only', () => {
        jest.doMock('read-pkg', () => ({
            sync: () => ({
                engines: {
                    node: '=8',
                },
            }),
        }));

        const result = getNodeVersions();

        expect(result).toEqual('8');
        expect(consoleSpy).toHaveBeenCalledTimes(0);
    });

    test('node 8 and greater', () => {
        jest.doMock('read-pkg', () => ({
            sync: () => ({
                engines: {
                    node: '>=8.9.0',
                },
            }),
        }));

        const result = getNodeVersions();

        expect(result).toEqual('8+');
        expect(consoleSpy).toHaveBeenCalledTimes(0);
    });

    test('node 10 only', () => {
        jest.doMock('read-pkg', () => ({
            sync: () => ({
                engines: {
                    node: '10',
                },
            }),
        }));

        const result = getNodeVersions();

        expect(result).toEqual('10');
        expect(consoleSpy).toHaveBeenCalledTimes(0);
    });

    test('node 10 and greater', () => {
        jest.doMock('read-pkg', () => ({
            sync: () => ({
                engines: {
                    node: '>=10.9.0',
                },
            }),
        }));

        const result = getNodeVersions();

        expect(result).toEqual('10');
        expect(consoleSpy).toHaveBeenCalledTimes(0);
    });
});