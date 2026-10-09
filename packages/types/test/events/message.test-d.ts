import { expectAssignable } from 'tsd';
import type {
  GenericMessageEvent,
  MessageDeletedEvent,
  MessageEvent,
  ThreadBroadcastMessageEvent,
} from '../../src/index';

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
        enterprise_id: 'E0123456789',
      },
    ],
  },
};
expectAssignable<GenericMessageEvent>(messageWithAppContext);

// thread broadcasts with attached files include file-related fields (https://github.com/slackapi/node-slack-sdk/issues/2762)
const threadBroadcastWithFiles: ThreadBroadcastMessageEvent = {
  type: 'message',
  subtype: 'thread_broadcast',
  channel_type: 'channel',
  channel: 'C1234',
  event_ts: '1234.57',
  user: 'U1234',
  ts: '1234.57',
  thread_ts: '1234.56',
  text: '',
  client_msg_id: 'abc-123',
  parent_user_id: 'U1234',
  display_as_bot: false,
  upload: false,
  files: [
    {
      id: 'F1234',
      created: 1234,
      name: 'image.png',
      title: 'image.png',
      mimetype: 'image/png',
      filetype: 'png',
      pretty_type: 'PNG',
      user: 'U1234',
      editable: false,
      size: 1234,
      mode: 'hosted',
      is_external: false,
      external_type: '',
      is_public: true,
      public_url_shared: false,
      display_as_bot: false,
      username: '',
      url_private: 'https://files.slack.com/files-pri/T1234-F1234/image.png',
      url_private_download: 'https://files.slack.com/files-pri/T1234-F1234/download/image.png',
      permalink: 'https://example.slack.com/files/U1234/F1234/image.png',
      permalink_public: 'https://slack-files.com/T1234-F1234-abc',
      channels: null,
      groups: null,
    },
  ],
  root: {
    ...anyMessageEvent,
    thread_ts: '1234.56',
    reply_count: 1,
    reply_users_count: 1,
    latest_reply: '1234.57',
    reply_users: ['U1234'],
  },
};
expectAssignable<MessageEvent>(threadBroadcastWithFiles);
