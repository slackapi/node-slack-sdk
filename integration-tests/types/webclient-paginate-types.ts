// tslint:disable:no-unused-expression
import { WebClient, WebAPICallResult } from '@slack/web-api';

const web = new WebClient();

/* Testing the return type of WebClient#paginate() */

/**
 * SO, for all intents and purpurposes, this thing below is just an AsyncIterator. That's what it's meant to be. "So why
 * not just put `AsyncIterator`," you ask. Good question. Let me tell you a tale:
 *
 * Back in the year 2019, all was happy and cheerful. These integration tests $ExpectedType AsyncIterator and this
 * rendundant interface was naught. Birds chirped with glee and children played in the fields. Nothing could possibly
 * go wrong.
 *
 * Then something went wrong. From every cardinal direction a storm approached, its winds ripping trees from their roots
 * and hatchlings from their mothers. Merciless, the strom tore apart the field and everything it supported.
 *
 * We never forget this storm. We keep its bittersweet memory in our hearts. We say its name only when it is needed:
 * `typescript@3.6.0-dev.20190703`.
 *
 * For, you see, this was not your average storm. No, this storm approached instead as something to be celebrated, with
 * its updated generator types and better iterator ergonomics. Alas, in heindsight this was but a mirage--a trojan
 * horse, even--masquerading the terror that followed.
 *
 * It struck right at the edge: the integration tests. For, you see, their foundation is dtslint, which (at the time of
 * the storm) tests against each minor release of TypeScript from 2.0 all the way to `typescript@next`. But, you see,
 * this storm brought about changes in that last version. It changed the type of `AsyncIterable`, adding two new type
 * arguments with defaults. Whilst usage remain unaffected, the same could not be said of our types integration tests--
 * for these tests were now failing.
 *
 * Our most trustworthy guard, Travis (CI), attempted to warn us of the dangerous storm, but by the time the message
 * reached us the damage was done: builds were failing, PRs were reported as failing, and builds in general were a sea
 * of red ✗ (read: sea of blood).
 *
 * This is why we've enacted this memorial: the __DangerouslyOutmodedAsyncIteratorSignatureWrapper. Its purpose is not
 * only to remember the sorrows of past maintiners, but to also appease the storm by wrapping `AsyncIterator` in a new
 * type that is fully equivalent, yet named different under `$ExpectType` (that is, the same across TypeScript
 * versions).
 */
interface __DangerouslyOutmodedAsyncIteratorSignatureWrapper<T> extends AsyncIterator<T> {
  // oh no
}

// $ExpectType __DangerouslyOutmodedAsyncIteratorSignatureWrapper<WebAPICallResult>
web.paginate('conversations.list') as __DangerouslyOutmodedAsyncIteratorSignatureWrapper<WebAPICallResult>;

// $ExpectType __DangerouslyOutmodedAsyncIteratorSignatureWrapper<WebAPICallResult>
web.paginate('conversations.list', {}) as __DangerouslyOutmodedAsyncIteratorSignatureWrapper<WebAPICallResult>;

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
