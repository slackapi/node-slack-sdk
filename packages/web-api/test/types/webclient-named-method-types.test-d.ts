import { expectType, expectError } from 'tsd';
import { WebClient, WebAPICallResult } from '../../';

const web = new WebClient('TOKEN');

// calling a method directly with arbitrary arguments should work
expectType<Promise<WebAPICallResult>>(web.chat.postMessage({
  channel: 'CHANNEL',
  text: 'TEXT',
  key: 'VALUE',
}));

// calling a method directly with under-specified arguments should not work
expectError(web.chat.postMessage({
  channel: 'CHANNEL',
}));

// assigning an object with a specific type that includes arbitrary arguments should not work
// TODO: can typescript even reliably do that? ^
// expectError(web.chat.postMessage({
//   text: 'TEXT',
//   channel: 'CHANNEL',
//   key: 'VALUE',
// }));
