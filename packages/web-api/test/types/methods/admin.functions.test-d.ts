import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.functions.list
// -- sad path
expectError(web.admin.functions.list()); // lacking argument
expectError(web.admin.functions.list({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.functions.list>>([{
  app_ids: [],
}]);

// admin.functions.permissions.lookup
// -- sad path
expectError(web.admin.functions.permissions.lookup()); // lacking argument
expectError(web.admin.functions.permissions.lookup({})); // empty argument
expectError(web.admin.functions.permissions.lookup({
  function_ids: [], // must provide at least 1
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.functions.permissions.lookup>>([{
  function_ids: ['F1234'],
}]);

// admin.functions.permissions.set
// -- sad path
expectError(web.admin.functions.permissions.set()); // lacking argument
expectError(web.admin.functions.permissions.set({})); // empty argument
expectError(web.admin.functions.permissions.set({
  function_id: 'F1234', // missing visibility
}));
expectError(web.admin.functions.permissions.set({
  visibility: 'named_entities', // missing function_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.functions.permissions.set>>([{
  function_id: 'F1234',
  visibility: 'named_entities',
}]);
