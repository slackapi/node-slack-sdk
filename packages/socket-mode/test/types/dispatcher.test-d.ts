import { expectAssignable, expectNotAssignable } from 'tsd';
import { Agent, ProxyAgent } from 'undici';
import type { SocketModeDispatcher } from '../../';

// undici Agent satisfies SocketModeDispatcher
expectAssignable<SocketModeDispatcher>(new Agent());

// undici ProxyAgent satisfies SocketModeDispatcher
expectAssignable<SocketModeDispatcher>(new ProxyAgent('http://proxy:3128'));

// A custom object with dispatch() satisfies SocketModeDispatcher
const customDispatcher = {
  // biome-ignore lint/suspicious/noExplicitAny: testing structural compatibility with arbitrary dispatch implementations
  dispatch(_options: any, _handler: any): boolean {
    return true;
  },
};
expectAssignable<SocketModeDispatcher>(customDispatcher);

// An empty object does NOT satisfy SocketModeDispatcher
expectNotAssignable<SocketModeDispatcher>({});

// A string does NOT satisfy SocketModeDispatcher
expectNotAssignable<SocketModeDispatcher>('not-a-dispatcher');
