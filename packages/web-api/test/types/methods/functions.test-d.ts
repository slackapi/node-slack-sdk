import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// functions.completeError
// -- sad path
expectError(web.functions.completeError()); // lacking argument
expectError(web.functions.completeError({})); // empty argument
expectError(web.functions.completeError({
  function_execution_id: 'Fx1234', // missing error
}));
expectError(web.functions.completeError({
  error: 'boomsies', // missing function_execution_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.functions.completeError>>([{
  function_execution_id: 'Fx1234',
  error: 'oh noes',
}]);

// functions.completeSuccess
// -- sad path
expectError(web.functions.completeSuccess()); // lacking argument
expectError(web.functions.completeSuccess({})); // empty argument
expectError(web.functions.completeSuccess({
  function_execution_id: 'Fx1234', // missing output
}));
expectError(web.functions.completeSuccess({
  outputs: {}, // missing function_execution_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.functions.completeSuccess>>([{
  function_execution_id: 'Fx1234',
  outputs: {},
}]);
