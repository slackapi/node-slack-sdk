import { expectError, expectAssignable } from 'tsd';
import { WebClient } from '../../..';

const web = new WebClient('TOKEN');

// chat.delete
// -- sad path
expectError(web.chat.delete()); // lacking argument
expectError(web.chat.delete({})); // empty argument
expectError(web.chat.delete({
  channel: 'C1234', // missing ts
}));
expectError(web.chat.delete({
  ts: '1234.56', // missing channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.chat.delete>>([{
  channel: 'C1234',
  ts: '1234.56',
}]);

// chat.deleteScheduledMessage
// -- sad path
expectError(web.chat.deleteScheduledMessage()); // lacking argument
expectError(web.chat.deleteScheduledMessage({})); // empty argument
expectError(web.chat.deleteScheduledMessage({
  channel: 'C1234', // missing scheduled_message_id
}));
expectError(web.chat.deleteScheduledMessage({
  scheduled_message_id: 'Q1234', // missing channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.chat.deleteScheduledMessage>>([{
  channel: 'C1234',
  scheduled_message_id: 'Q1234',
}]);
