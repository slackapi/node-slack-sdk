import { expectAssignable, expectError, expectType } from 'tsd';
import type { SlackEvent, UserConnectionEvent, UserConnectionStatusRequestedEvent } from '../../src/index';

const connect: UserConnectionEvent = {
  type: 'user_connection',
  subtype: 'connect',
  user: 'U0123456789',
  trigger_id: '1293638028594.1249184885746.0d121a0e01d2e7a795ecc7a62880a406',
  event_ts: '1764264284.841251',
};
expectAssignable<SlackEvent>(connect);

const disconnect: UserConnectionEvent = {
  type: 'user_connection',
  subtype: 'disconnect',
  enterprise_id: 'E0123456789',
  user: 'U0123456789',
  event_ts: '1764264317.061589',
};
expectAssignable<SlackEvent>(disconnect);

expectError<UserConnectionEvent>({
  type: 'user_connection',
  subtype: 'connect',
  user: 'U0123456789',
  event_ts: '1764264284.841251',
});

declare const userConnection: UserConnectionEvent;
if (userConnection.subtype === 'connect') {
  expectType<string>(userConnection.trigger_id);
}

const statusRequested: UserConnectionStatusRequestedEvent = {
  type: 'user_connection_status_requested',
  user: 'U0123456789',
  event_ts: '1764264284.841251',
};
expectAssignable<SlackEvent>(statusRequested);

expectError<UserConnectionStatusRequestedEvent>({
  type: 'user_connection_status_requested',
});
