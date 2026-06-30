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

// the agent DM context is delivered inline on messages via the `app_context` field
const messageWithAppContext: GenericMessageEvent = {
  type: 'message',
  subtype: undefined,
  channel_type: 'im',
  channel: 'D0123456789',
  user: 'U0123456789',
  ts: '1234567890.123456',
  event_ts: '1234567890.123456',
  text: 'hi',
  app_context: {
    entities: [
      {
        type: 'slack#/types/channel_id',
        value: 'C0123456789',
        team_id: 'T0123456789',
        score: 75,
        enterprise_id: 'E0123456789',
      },
    ],
  },
};
expectAssignable<GenericMessageEvent>(messageWithAppContext);
