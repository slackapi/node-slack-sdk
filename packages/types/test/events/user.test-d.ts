import { expectAssignable, expectError } from 'tsd';
import type { SlackEvent, UserConnectionStatusRequestedEvent } from '../../src/index';

const statusRequested: UserConnectionStatusRequestedEvent = {
  type: 'user_connection_status_requested',
  user: 'U0123456789',
};
expectAssignable<SlackEvent>(statusRequested);

expectError<UserConnectionStatusRequestedEvent>({
  type: 'user_connection_status_requested',
});
