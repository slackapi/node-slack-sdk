import { expectAssignable } from 'tsd';
import type { GenericMessageEvent, MessageDeletedEvent, MessageEvent } from '../../src/index';

const anyMessageEvent: GenericMessageEvent = {
  type: 'message',
  subtype: undefined,
  channel_type: 'channel',
  channel: 'C1234',
  event_ts: '1234.56',
  user: 'U1234',
  ts: '1234.56',
};
// don't confuse `MessageEvent` with the built-in node Message event (https://github.com/slackapi/node-slack-sdk/issues/2020)
const messageDeletedEvent: MessageDeletedEvent = {
  type: 'message',
  subtype: 'message_deleted',
  event_ts: '1234.56',
  hidden: true,
  channel: 'C12345',
  channel_type: 'channel',
  ts: '1234.56',
  deleted_ts: '1234.56',
  previous_message: anyMessageEvent,
};
expectAssignable<MessageEvent>(messageDeletedEvent.previous_message);
