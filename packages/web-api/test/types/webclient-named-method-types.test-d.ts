import { expectType, expectError } from 'tsd';
import { WebClient, WebAPICallResult } from '../../';
import { ChatPostMessageResponse } from '../../src/response/ChatPostMessageResponse';
import { ChatScheduleMessageResponse } from '../../src/response/ChatScheduleMessageResponse';
import { ChatPostEphemeralResponse } from '../../src/response/ChatPostEphemeralResponse';
import { ChatUpdateResponse } from '../../src/response/ChatUpdateResponse';

const web = new WebClient('TOKEN');

const chatPostMesssageResult: ChatPostMessageResponse = { ok: true };
const result: WebAPICallResult = chatPostMesssageResult;
expectType<WebAPICallResult>(result);

// calling a method directly with arbitrary arguments should work
expectType<Promise<ChatPostMessageResponse>>(web.chat.postMessage({
  channel: 'CHANNEL',
  text: 'TEXT',
  key: 'VALUE',
}));
expectType<Promise<ChatPostMessageResponse>>(web.chat.postMessage({
  channel: 'CHANNEL',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          'text',
      },
    },
  ],
  key: 'VALUE',
}));

// calling a method directly with under-specified arguments should not work
expectError(web.chat.postMessage({
  text: 'TEXT',
}));

// assigning an object with a specific type that includes arbitrary arguments should not work
// TODO: can typescript even reliably do that? ^
// expectError(web.chat.postMessage({
//   text: 'TEXT',
//   channel: 'CHANNEL',
//   key: 'VALUE',
// }));

expectType<Promise<ChatPostMessageResponse>>(web.chat.postMessage({
  channel: 'C111',
  blocks: [],
  // no text should be accepted
}));
expectType<Promise<ChatUpdateResponse>>(web.chat.update({
  channel: 'C111',
  ts: '111.222',
  blocks: [],
  // no text should be accepted
}));

expectType<Promise<ChatScheduleMessageResponse>>(web.chat.scheduleMessage({
  channel: 'C111',
  post_at: '11111',
  blocks: [],
  // no text should be accepted
}));
expectType<Promise<ChatScheduleMessageResponse>>(web.chat.scheduleMessage({
  channel: 'C111',
  post_at: '1621497568',
  text: 'Hi there!',
  blocks: [],
}));
expectType<Promise<ChatScheduleMessageResponse>>(web.chat.scheduleMessage({
  channel: 'C111',
  post_at: 1621497568,
  text: 'Hi there!',
  blocks: [],
}));
expectType<Promise<ChatPostEphemeralResponse>>(web.chat.postEphemeral({
  channel: 'C111',
  user: 'U111',
  blocks: [],
  // no text should be accepted
}));
expectType<Promise<ChatPostEphemeralResponse>>(web.chat.postEphemeral({
  channel: 'C111',
  user: 'U111',
  text: 'Hi there!',
  blocks: [],
}));
