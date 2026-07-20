import 'dotenv/config';
import { SocketModeClient } from '@slack/socket-mode';

const appToken = process.env.SLACK_SDK_TEST_SOCKET_MODE_APP_TOKEN;
const socketModeClient = new SocketModeClient({ appToken, logLevel: 'debug' });

// events_api event
socketModeClient.on('app_mention', async (args) => {
  console.log(args);
  await args.ack();
});

// block_actions, shortcuts, etc.
socketModeClient.on('interactive', async (args) => {
  console.log(args);
  await args.ack();
});

// slash command invocations
socketModeClient.on('slash_commands', async (args) => {
  console.log(args);
  await args.ack();
});

// all events (used by bolt-js)
socketModeClient.on('slack_event', async (args) => {
  console.log(args);
  await args.ack();
});

await socketModeClient.start();
