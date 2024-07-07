import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

const dialog = {
  title: 'Test',
  callback_id: 'test',
  elements: [],
};

// dialog.open
// -- sad path
expectError(web.dialog.open()); // lacking argument
expectError(web.dialog.open({})); // empty argument
expectError(web.dialog.open({
  trigger_id: '1234.566', // missing `dialog`
}));
expectError(web.dialog.open({
  dialog, // missing `trigger_id`
}));
// -- happy path
expectAssignable<Parameters<typeof web.dialog.open>>([{
  trigger_id: '1234.56',
  dialog,
}]);
