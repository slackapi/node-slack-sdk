/// <reference lib="esnext.asynciterable" />

import { expectType, expectError } from 'tsd';
import { WebClient, WebAPICallResult } from '../../';

const web = new WebClient();

/* Testing the return type of WebClient#paginate() */

expectType<AsyncIterable<WebAPICallResult>>(web.paginate('conversations.list'));

expectType<AsyncIterable<WebAPICallResult>>(web.paginate('conversations.list', {}));

expectType<Promise<void>>(web.paginate('conversations.list', {}, () => false));

expectError(web.paginate('conversations.list', {}, () => 7));

expectType<Promise<number>>(web.paginate('conversations.list', {}, () => false, () => 5));

// When there's no shouldStop predicate given but there is a reducer, the behavior is undefined.
// (However in the current implementation, the return value is `AsyncIteratable<WebAPICallResult>`.)
expectError(web.paginate('conversations.list', {}, undefined, () => 5));

// Ensure that it works in a for-await-of loop.
async () => {
  for await (const page of web.paginate('conversations.list')) {
    expectType<WebAPICallResult>(page);
  }
};

/* Testing the arguments of the shouldStop param */

web.paginate('conversations.list', {}, (page) => {
  expectType<WebAPICallResult>(page);
  return false;
});

/* Testing the arguments of the reduce param */

// Dummy type to make sure the generic param is bound properly
interface Dummy { t: 'dummy'; }
const d: Dummy = { t: 'dummy' };

// Ideally, we would get all the same expected types even when accumulator was not explicitly typed (only the return
// value of reduce having a known type).
expectType<Promise<Dummy>>(web.paginate(
  'conversations.list',
  {},
  () => false,
  (accumulator, page, pageNumber) => {
    expectType<Dummy | undefined>(accumulator);
    expectType<WebAPICallResult>(page);
    expectType<number>(pageNumber);

    return d;
  }
));
