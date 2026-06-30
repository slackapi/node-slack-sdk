import { expectAssignable, expectError } from 'tsd';
import type { AppContextChangedEvent, GenericMessageEvent, SlackEvent } from '../../src/index';

// a channel_id context entity
const channelContextChangedEvent: AppContextChangedEvent = {
  type: 'app_context_changed',
  channel: 'D0BCDALLUF8',
  user: 'U06MCF88LQY',
  context: {
    entities: [
      {
        type: 'slack#/types/channel_id',
        value: 'C07U19RTY90',
        team_id: 'T06M2FAFCF3',
        score: 75,
        enterprise_id: 'E06LPMFSSTU',
      },
    ],
  },
  event_ts: '1782779068.665087',
};
expectAssignable<SlackEvent>(channelContextChangedEvent);

// canvas_id and list_id entities share the string `value` shape
expectAssignable<AppContextChangedEvent>({
  type: 'app_context_changed',
  channel: 'D0BCDALLUF8',
  user: 'U06MCF88LQY',
  context: {
    entities: [
      { type: 'slack#/types/canvas_id', value: 'F0BCK49CC2G' },
      { type: 'slack#/types/list_id', value: 'F0AE0M8HDGE' },
    ],
  },
  event_ts: '1782779070.692614',
});

// a message_context entity carries an object `value` with message_ts and channel_id
expectAssignable<AppContextChangedEvent>({
  type: 'app_context_changed',
  channel: 'D0BCDALLUF8',
  user: 'U06MCF88LQY',
  context: {
    entities: [
      {
        type: 'slack#/types/message_context',
        value: { message_ts: '1780935307.411989', channel_id: 'C07U19RTY90' },
        team_id: 'T06M2FAFCF3',
        score: 75,
        enterprise_id: 'E06LPMFSSTU',
      },
    ],
  },
  event_ts: '1782779875.276072',
});

// `entities` is optional — the context can be empty
expectAssignable<AppContextChangedEvent>({
  type: 'app_context_changed',
  channel: 'D0BCDALLUF8',
  user: 'U06MCF88LQY',
  context: {},
  event_ts: '1782779875.276072',
});

// a message_context entity requires channel_id alongside message_ts
expectError<AppContextChangedEvent>({
  type: 'app_context_changed',
  channel: 'D0BCDALLUF8',
  user: 'U06MCF88LQY',
  context: {
    entities: [{ type: 'slack#/types/message_context', value: { message_ts: '1780935307.411989' } }],
  },
  event_ts: '1782779875.276072',
});

// the context is delivered inline on messages via the `app_context` field
const messageWithAppContext: GenericMessageEvent = {
  type: 'message',
  subtype: undefined,
  channel_type: 'im',
  channel: 'D0BCDALLUF8',
  user: 'U06MCF88LQY',
  ts: '1782781779.324109',
  event_ts: '1782781779.324109',
  text: 'hi',
  app_context: {
    entities: [
      {
        type: 'slack#/types/channel_id',
        value: 'C07U19RTY90',
        team_id: 'T06M2FAFCF3',
        score: 75,
        enterprise_id: 'E06LPMFSSTU',
      },
    ],
  },
};
expectAssignable<GenericMessageEvent>(messageWithAppContext);
