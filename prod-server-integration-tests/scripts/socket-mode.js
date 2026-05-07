import 'dotenv/config';
import { SocketModeClient } from '@slack/socket-mode';

const appToken = process.env.SLACK_SDK_TEST_SOCKET_MODE_APP_TOKEN;
const socketModeClient = new SocketModeClient({ appToken, logLevel: 'debug' });

socketModeClient.on('app_mention', async (args) => {
  console.log(args);
  await args.ack();
});

socketModeClient.on('interactive', async (args) => {
  console.log(args);
  await args.ack();
});

socketModeClient.on('slash_commands', async (args) => {
  console.log(args);
  await args.ack();
});

socketModeClient.on('slack_event', async (args) => {
  console.log(args);
  await args.ack();
});

await socketModeClient.start();
