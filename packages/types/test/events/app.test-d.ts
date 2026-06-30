import { expectAssignable, expectError } from 'tsd';
import type { AppContextChangedEvent, GenericMessageEvent, SlackEvent } from '../../src/index';

// a channel_id context entity
const channelContextChangedEvent: AppContextChangedEvent = {
  type: 'app_context_changed',
  channel: 'D0123456789',
  user: 'U0123456789',
  context: {
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
  event_ts: '1234567890.123456',
};
expectAssignable<SlackEvent>(channelContextChangedEvent);

// canvas_id and list_id entities share the string `value` shape
expectAssignable<AppContextChangedEvent>({
  type: 'app_context_changed',
  channel: 'D0123456789',
  user: 'U0123456789',
  context: {
    entities: [
      { type: 'slack#/types/canvas_id', value: 'F0123456789' },
      { type: 'slack#/types/list_id', value: 'F0123456780' },
    ],
  },
  event_ts: '1234567890.123456',
});

// a message_context entity carries an object `value` with message_ts and channel_id
expectAssignable<AppContextChangedEvent>({
  type: 'app_context_changed',
  channel: 'D0123456789',
  user: 'U0123456789',
  context: {
    entities: [
      {
        type: 'slack#/types/message_context',
        value: { message_ts: '1234567890.123456', channel_id: 'C0123456789' },
        team_id: 'T0123456789',
        score: 75,
        enterprise_id: 'E0123456789',
      },
    ],
  },
  event_ts: '1234567890.123456',
});

// `entities` is optional — the context can be empty
expectAssignable<AppContextChangedEvent>({
  type: 'app_context_changed',
  channel: 'D0123456789',
  user: 'U0123456789',
  context: {},
  event_ts: '1234567890.123456',
});

// a message_context entity requires channel_id alongside message_ts
expectError<AppContextChangedEvent>({
  type: 'app_context_changed',
  channel: 'D0123456789',
  user: 'U0123456789',
  context: {
    entities: [{ type: 'slack#/types/message_context', value: { message_ts: '1234567890.123456' } }],
  },
  event_ts: '1234567890.123456',
});

// the context is delivered inline on messages via the `app_context` field
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
