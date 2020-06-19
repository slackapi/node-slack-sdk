/// <reference lib="esnext.asynciterable" />

// tslint:disable:no-unused-expression
import { WebClient } from '@slack/web-api';

const web = new WebClient();

/* Testing the return type of WebClient#paginate() */

// $ExpectType AsyncIterable<WebAPICallResult>
web.paginate('conversations.list');

// $ExpectType AsyncIterable<WebAPICallResult>
web.paginate('conversations.list', {});

// $ExpectType Promise<void>
web.paginate('conversations.list', {}, () => false);

// $ExpectError
web.paginate('conversations.list', {}, () => 7);

// $ExpectType Promise<number>
web.paginate('conversations.list', {}, () => false, () => 5);

// When there's no shouldStop predicate given but there is a reducer, the behavior is undefined.
// (However in the current implementation, the return value is `AsyncIteratable<WebAPICallResult>`.)
// $ExpectError
web.paginate('conversations.list', {}, undefined, () => 5);

// Ensure that it works in a for-await-of loop.
async () => {
  for await (const page of web.paginate('conversations.list')) {
    // $ExpectType WebAPICallResult
    page;
  }

  // (async functions expect a return statement, or at least that's what the error told me when I didn't have one.)
  return;
};

/* Testing the arguments of the shouldStop param */

web.paginate('conversations.list', {}, (page) => {
  // $ExpectType WebAPICallResult
  page;
  return false;
});

/* Testing the arguments of the reduce param */

// Dummy type to make sure the generic param is bound properly
interface Dummy { t: 'dummy'; }
const d: Dummy = { t: 'dummy' };

// Ideally, we would get all the same expected types even when accumulator was not explicitly typed (only the return
// value of reduce having a known type).
// $ExpectType Promise<Dummy>
web.paginate('conversations.list', {}, () => false, (accumulator: Dummy | undefined, page, pageNumber) => {
  // $ExpectType Dummy | undefined
  accumulator;
  // $ExpectType WebAPICallResult
  page;
  // $ExpectType number
  pageNumber;

  return d;
});
