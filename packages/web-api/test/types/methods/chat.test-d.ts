import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

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

// chat.getPermalink
// -- sad path
expectError(web.chat.getPermalink()); // lacking argument
expectError(web.chat.getPermalink({})); // empty argument
expectError(web.chat.getPermalink({
  channel: 'C1234', // missing message_ts
}));
expectError(web.chat.getPermalink({
  message_ts: '1234.56', // missing channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.chat.getPermalink>>([{
  channel: 'C1234',
  message_ts: '1234.56',
}]);

// chat.meMessage
// -- sad path
expectError(web.chat.meMessage()); // lacking argument
expectError(web.chat.meMessage({})); // empty argument
expectError(web.chat.meMessage({
  channel: 'C1234', // missing text
}));
expectError(web.chat.meMessage({
  text: '1234.56', // missing channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.chat.meMessage>>([{
  channel: 'C1234',
  text: '1234.56',
}]);

// chat.postEphemeral
// -- sad path
expectError(web.chat.postEphemeral()); // lacking argument
expectError(web.chat.postEphemeral({})); // empty argument
expectError(web.chat.postEphemeral({
  channel: 'C1234', // missing text/attachments/blocks and user
}));
expectError(web.chat.postEphemeral({
  channel: 'C1234', // missing text/attachments/blocks
  user: 'U1234',
}));
expectError(web.chat.postEphemeral({
  channel: 'C1234', // missing user
  text: 'U1234',
}));
expectError(web.chat.postEphemeral({
  user: 'U1234', // missing channel
  text: 'U1234',
}));
expectError(web.chat.postEphemeral({
  channel: 'C1234', // missing user
  blocks: [],
}));
expectError(web.chat.postEphemeral({
  user: 'U1234', // missing channel
  blocks: [],
}));
expectError(web.chat.postEphemeral({
  channel: 'C1234', // missing user
  attachments: [],
}));
expectError(web.chat.postEphemeral({
  user: 'U1234', // missing channel
  attachments: [],
}));
expectError(web.chat.postEphemeral({
  channel: 'C123',
  user: 'U1234',
  attachments: [],
  icon_url: 'someurl.png',
  icon_emoji: 'smile', // cannot use both icon_url and icon_emoji
}));
expectError(web.chat.postEphemeral({
  channel: 'C123',
  user: 'U1234',
  attachments: [],
  icon_url: 'someurl.png',
  as_user: true, // cannot set both as_user=true and icon_url
}));
expectError(web.chat.postEphemeral({
  channel: 'C123',
  user: 'U1234',
  attachments: [],
  icon_emoji: 'smile',
  as_user: true, // cannot set both as_user=true and icon_emoji
}));
// -- happy path
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  text: '1234.56',
}]);
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  blocks: [],
}]);
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  blocks: [],
  text: 'fallback',
}]);
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  attachments: [],
}]);
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  attachments: [],
  text: 'fallback',
}]);
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  attachments: [],
  as_user: true, // can pass as_user=true if no icon or username fields set
}]);
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  attachments: [],
  icon_emoji: 'smile', // icon can be set on its own...
}]);
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  attachments: [],
  icon_emoji: 'smile',
  as_user: false, // ... or with as_user=false
}]);
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  attachments: [],
  icon_url: 'someurl.png', // icon can be set on its own...
}]);
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  attachments: [],
  icon_emoji: 'someurl.png',
  as_user: false, // ... or with as_user=false
}]);

// chat.postMessage
// -- sad path
expectError(web.chat.postMessage()); // lacking argument
expectError(web.chat.postMessage({})); // empty argument
expectError(web.chat.postMessage({
  channel: 'C1234', // missing text/attachments/blocks
}));
expectError(web.chat.postMessage({
  text: 'U1234', // missing channel
}));
expectError(web.chat.postMessage({
  blocks: [], // missing channel
}));
expectError(web.chat.postMessage({
  attachments: [], // missing channel
}));
expectError(web.chat.postMessage({
  channel: 'C123',
  attachments: [],
  icon_url: 'someurl.png',
  icon_emoji: 'smile', // cannot use both icon_url and icon_emoji
}));
expectError(web.chat.postMessage({
  channel: 'C123',
  attachments: [],
  icon_url: 'someurl.png',
  as_user: true, // cannot set both as_user=true and icon_url
}));
expectError(web.chat.postMessage({
  channel: 'C123',
  attachments: [],
  icon_emoji: 'smile',
  as_user: true, // cannot set both as_user=true and icon_emoji
}));
expectError(web.chat.postMessage({
  channel: 'C123',
  attachments: [],
  reply_broadcast: true, // cannot reply_broadcast=true without setting thread_ts
}));
// -- happy path
expectAssignable<Parameters<typeof web.chat.postMessage>>([{
  channel: 'C1234',
  text: '1234.56',
}]);
expectAssignable<Parameters<typeof web.chat.postMessage>>([{
  channel: 'C1234',
  blocks: [],
}]);
expectAssignable<Parameters<typeof web.chat.postMessage>>([{
  channel: 'C1234',
  blocks: [],
  text: 'fallback',
}]);
expectAssignable<Parameters<typeof web.chat.postMessage>>([{
  channel: 'C1234',
  attachments: [],
}]);
expectAssignable<Parameters<typeof web.chat.postMessage>>([{
  channel: 'C1234',
  attachments: [],
  text: 'fallback',
}]);
expectAssignable<Parameters<typeof web.chat.postMessage>>([{
  channel: 'C1234',
  attachments: [],
  as_user: true, // can pass as_user=true if no icon or username fields set
}]);
expectAssignable<Parameters<typeof web.chat.postMessage>>([{
  channel: 'C1234',
  attachments: [],
  icon_emoji: 'smile', // icon can be set on its own...
}]);
expectAssignable<Parameters<typeof web.chat.postMessage>>([{
  channel: 'C1234',
  attachments: [],
  icon_emoji: 'smile',
  as_user: false, // ... or with as_user=false
}]);
expectAssignable<Parameters<typeof web.chat.postMessage>>([{
  channel: 'C1234',
  attachments: [],
  icon_url: 'someurl.png', // icon can be set on its own...
}]);
expectAssignable<Parameters<typeof web.chat.postMessage>>([{
  channel: 'C1234',
  attachments: [],
  icon_emoji: 'someurl.png',
  as_user: false, // ... or with as_user=false
}]);
expectAssignable<Parameters<typeof web.chat.postMessage>>([{
  channel: 'C1234',
  text: 'hello',
  thread_ts: '1234.56', // can send a threaded message
}]);
expectAssignable<Parameters<typeof web.chat.postMessage>>([{
  channel: 'C1234',
  text: 'hello',
  thread_ts: '1234.56',
  reply_broadcast: true, // can send a threaded message and broadcast it, too
}]);

// chat.scheduleMessage
// -- sad path
expectError(web.chat.scheduleMessage()); // lacking argument
expectError(web.chat.scheduleMessage({})); // empty argument
expectError(web.chat.scheduleMessage({
  channel: 'C1234', // missing text/attachments/blocks and post_at
}));
expectError(web.chat.scheduleMessage({
  channel: 'C1234', // missing text/attachments/blocks
  post_at: 'U1234',
}));
expectError(web.chat.scheduleMessage({
  channel: 'C1234', // missing post_at
  text: 'U1234',
}));
expectError(web.chat.scheduleMessage({
  post_at: 'U1234', // missing channel
  text: 'U1234',
}));
expectError(web.chat.scheduleMessage({
  channel: 'C1234', // missing post_at
  blocks: [],
}));
expectError(web.chat.scheduleMessage({
  post_at: 'U1234', // missing channel
  blocks: [],
}));
expectError(web.chat.scheduleMessage({
  channel: 'C1234', // missing post_at
  attachments: [],
}));
expectError(web.chat.scheduleMessage({
  post_at: 'U1234', // missing channel
  attachments: [],
}));
expectError(web.chat.scheduleMessage({
  post_at: 17000000000,
  channel: 'C123',
  attachments: [],
  reply_broadcast: true, // cannot reply_broadcast=true without setting thread_ts
}));
// -- happy path
expectAssignable<Parameters<typeof web.chat.scheduleMessage>>([{
  channel: 'C1234',
  post_at: 'U1234',
  text: '1234.56',
}]);
expectAssignable<Parameters<typeof web.chat.scheduleMessage>>([{
  channel: 'C1234',
  post_at: 'U1234',
  blocks: [],
}]);
expectAssignable<Parameters<typeof web.chat.scheduleMessage>>([{
  channel: 'C1234',
  post_at: 'U1234',
  blocks: [],
  text: 'fallback',
}]);
expectAssignable<Parameters<typeof web.chat.scheduleMessage>>([{
  channel: 'C1234',
  post_at: 'U1234',
  attachments: [],
}]);
expectAssignable<Parameters<typeof web.chat.scheduleMessage>>([{
  channel: 'C1234',
  post_at: 'U1234',
  attachments: [],
  text: 'fallback',
}]);
expectAssignable<Parameters<typeof web.chat.scheduleMessage>>([{
  channel: 'C1234',
  text: 'hello',
  post_at: 180000000,
  thread_ts: '1234.56', // can send a threaded message
}]);
expectAssignable<Parameters<typeof web.chat.scheduleMessage>>([{
  channel: 'C1234',
  text: 'hello',
  thread_ts: '1234.56',
  post_at: 19000000,
  reply_broadcast: true, // can send a threaded message and broadcast it, too
}]);

// chat.scheduledMessages.list
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.chat.scheduledMessages.list>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.chat.scheduledMessages.list>>([]); // no arg is fine

// chat.unfurl
// -- sad path
expectError(web.chat.unfurl()); // lacking argument
expectError(web.chat.unfurl({})); // empty argument
expectError(web.chat.unfurl({
  channel: 'C1234', // missing ts and unfurls
}));
expectError(web.chat.unfurl({
  channel: 'C1234', // missing unfurls
  ts: '1234.56',
}));
expectError(web.chat.unfurl({
  ts: '1234.56',
  unfurls: {},
}));
expectError(web.chat.unfurl({
  channel: 'C1234',
  unfurls: {},
}));
expectError(web.chat.unfurl({
  source: 'composer', // missing unfurl_id and unfurls
}));
expectError(web.chat.unfurl({
  source: 'composer', // missing unfurls
  unfurl_id: '1234',
}));
expectError(web.chat.unfurl({
  unfurl_id: '1234.56',
  unfurls: {},
}));
expectError(web.chat.unfurl({
  source: 'conversations_history',
  unfurls: {},
}));
// -- happy path
expectAssignable<Parameters<typeof web.chat.unfurl>>([{
  unfurls: {},
  source: 'conversations_history',
  unfurl_id: '12345',
}]);
expectAssignable<Parameters<typeof web.chat.unfurl>>([{
  unfurls: {},
  channel: 'C1234',
  ts: '1234.56',
}]);

// chat.update
// -- sad path
expectError(web.chat.update()); // lacking argument
expectError(web.chat.update({})); // empty argument
expectError(web.chat.update({
  channel: 'C1234', // missing text/attachments/blocks and ts
}));
expectError(web.chat.update({
  channel: 'C1234', // missing text/attachments/blocks
  ts: '1234.56',
}));
expectError(web.chat.update({
  text: 'U1234', // missing channel and ts
}));
expectError(web.chat.update({
  text: 'U1234', // missing channel
  ts: '1234.56',
}));
expectError(web.chat.update({
  text: 'U1234', // missing ts
  channel: 'C1234',
}));
expectError(web.chat.update({
  blocks: [], // missing channel and ts
}));
expectError(web.chat.update({
  blocks: [], // missing channel
  ts: '1234.56',
}));
expectError(web.chat.update({
  blocks: [], // missing ts
  channel: 'C1234',
}));
expectError(web.chat.update({
  attachments: [], // missing channel and ts
}));
expectError(web.chat.update({
  attachments: [], // missing channel
  ts: '1234.56',
}));
expectError(web.chat.update({
  attachments: [], // missing ts
  channel: 'C1234',
}));
// -- happy path
expectAssignable<Parameters<typeof web.chat.update>>([{
  channel: 'C1234',
  ts: '1234.56',
  text: '1234.56',
}]);
expectAssignable<Parameters<typeof web.chat.update>>([{
  channel: 'C1234',
  ts: '1234.56',
  blocks: [],
}]);
expectAssignable<Parameters<typeof web.chat.update>>([{
  channel: 'C1234',
  ts: '1234.56',
  blocks: [],
  text: 'fallback',
}]);
expectAssignable<Parameters<typeof web.chat.update>>([{
  channel: 'C1234',
  ts: '1234.56',
  attachments: [],
}]);
expectAssignable<Parameters<typeof web.chat.update>>([{
  channel: 'C1234',
  ts: '1234.56',
  attachments: [],
  text: 'fallback',
}]);
expectAssignable<Parameters<typeof web.chat.update>>([{
  channel: 'C1234',
  ts: '1234.56',
  text: 'hello',
  reply_broadcast: true, // can broadcast a threaded msg
}]);
