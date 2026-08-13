import { expectAssignable } from 'tsd';
import type { FetchFunction } from '../../';

// globalThis.fetch satisfies FetchFunction
expectAssignable<FetchFunction>(globalThis.fetch);

// A custom wrapper function satisfies FetchFunction
const customFetch: FetchFunction = async (url, init) => {
  return globalThis.fetch(url, init);
};
expectAssignable<FetchFunction>(customFetch);

// A minimal mock satisfies FetchFunction
const mockFetch: FetchFunction = async () => ({
  ok: true,
  status: 200,
  statusText: 'OK',
  url: 'https://example.com',
  headers: {
    get: () => null,
    entries: () => [][Symbol.iterator](),
  },
  arrayBuffer: async () => new ArrayBuffer(0),
  json: async () => ({}),
  text: async () => '',
});
expectAssignable<FetchFunction>(mockFetch);
