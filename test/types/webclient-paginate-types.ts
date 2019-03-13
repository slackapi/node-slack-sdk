// tslint:disable:no-unused-expression
import { WebClient } from '@slack/client';

const web = new WebClient();

/* Testing the return type of WebClient#paginate() */

// $ExpectType AsyncIterator<WebAPICallResult>
web.paginate('conversations.list');

// $ExpectType AsyncIterator<WebAPICallResult>
web.paginate('conversations.list', {});

// $ExpectType Promise<void>
web.paginate('conversations.list', {}, () => false);

// $ExpectError
web.paginate('conversations.list', {}, () => 7);

// $ExpectType Promise<number>
web.paginate('conversations.list', {}, () => false, () => 5);

// When there's no shouldStop predicate given but there is a reducer, the behavior is undefined.
// (However in the current implementation, the return value is AsyncIterator<WebAPICallResult>)
// $ExpectError
web.paginate('conversations.list', {}, undefined, () => 5);

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

// $ExpectType Promise<Dummy>
web.paginate('conversations.list', {}, () => false, (accumulator, page, pageNumber) => {
  // $ExpectType Dummy | undefined
  accumulator;
  // $ExpectType WebAPICallResult
  page;
  // $ExpectType number
  pageNumber;

  return d;
});
