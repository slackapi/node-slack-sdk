import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// calls.add
// -- sad path
expectError(web.calls.add()); // lacking argument
expectError(web.calls.add({})); // empty argument
expectError(web.calls.add({
  external_unique_id: '1234.566', // missing join_url
}));
expectError(web.calls.add({
  join_url: '1234.566', // missing external_unique_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.calls.add>>([{
  external_unique_id: '1234.566',
  join_url: '1234.566',
}]);

// calls.end
// -- sad path
expectError(web.calls.end()); // lacking argument
expectError(web.calls.end({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.calls.end>>([{
  id: 'R1234',
}]);

// calls.info
// -- sad path
expectError(web.calls.info()); // lacking argument
expectError(web.calls.info({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.calls.info>>([{
  id: 'R1234',
}]);

// calls.update
// -- sad path
expectError(web.calls.update()); // lacking argument
expectError(web.calls.update({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.calls.update>>([{
  id: 'R1234',
}]);

// calls.participants.add
// -- sad path
expectError(web.calls.participants.add()); // lacking argument
expectError(web.calls.participants.add({})); // empty argument
expectError(web.calls.participants.add({
  id: 'R1234', // missing users
}));
expectError(web.calls.participants.add({
  users: [], // missing id
}));
// -- happy path
expectAssignable<Parameters<typeof web.calls.participants.add>>([{
  id: 'R1234',
  users: [],
}]);

// calls.participants.remove
// -- sad path
expectError(web.calls.participants.remove()); // lacking argument
expectError(web.calls.participants.remove({})); // empty argument
expectError(web.calls.participants.remove({
  id: 'R1234', // missing users
}));
expectError(web.calls.participants.remove({
  users: [], // missing id
}));
// -- happy path
expectAssignable<Parameters<typeof web.calls.participants.remove>>([{
  id: 'R1234',
  users: [],
}]);
