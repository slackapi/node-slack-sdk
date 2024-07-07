import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// search.all
// -- sad path
expectError(web.search.all()); // lacking argument
expectError(web.search.all({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.search.all>>([{
  query: '1234', // must specify query
}]);

// search.files
// -- sad path
expectError(web.search.files()); // lacking argument
expectError(web.search.files({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.search.files>>([{
  query: '1234', // must specify query
}]);

// search.messages
// -- sad path
expectError(web.search.messages()); // lacking argument
expectError(web.search.messages({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.search.messages>>([{
  query: '1234', // must specify query
}]);
