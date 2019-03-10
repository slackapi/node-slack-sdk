import { WebClient, ChatPostMessageArguments } from '@slack/client';

const web = new WebClient('TOKEN');

// calling a method directly with arbitrary arguments should work
web.chat.postMessage({
  channel: 'CHANNEL',
  text: 'TEXT',
  key: 'VALUE',
});

// calling a method directly with underspecified arguments should not work
// $ExpectError
web.chat.postMessage({
  channel: 'CHANNEL',
});

// assigning an object with a specific type that includes arbitrary arguments should not work
const message: ChatPostMessageArguments = {
  text: 'TEXT',
  channel: 'CHANNEL',
  // $ExpectError
  key: 'VALUE',
};

// this is just here to avoid the following error:
// 'message' is declared but its value is never read.
console.log(message);
