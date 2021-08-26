const { SocketModeClient } = require('@slack/socket-mode');
const appToken = process.env.SLACK_SDK_TEST_SOCKET_MODE_APP_TOKEN;
const socketModeClient = new SocketModeClient({ appToken, logLevel: 'debug' });

// events_api's event.type
socketModeClient.on('app_mention', async (args) => {
  console.log(args);
  await args.ack();
});
// interactivity: block_actions etc.
socketModeClient.on('interactive', async (args) => {
  console.log(args);
  await args.ack();
});
// slash command invocations
socketModeClient.on('slash_commands', async (args) => {
  console.log(args);
  await args.ack();
});
// events sent to bolt-js
socketModeClient.on('slack_event', async (args) => {
  console.log(args);
  await args.ack();
});

(async () => {
  await socketModeClient.start();
})();
