const { SocketModeClient, LogLevel } = require('@slack/socket-mode');
const { WebClient } = require('@slack/web-api');

const logLevel = LogLevel.INFO;
const socketModeClient = new SocketModeClient({
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel,
  // pingPongLoggingEnabled: true,
  // serverPingTimeout: 30000,
  // clientPingTimeout: 5000,
});
const webClient = new WebClient(process.env.SLACK_BOT_TOKEN, {
  logLevel,
});

socketModeClient.on('slack_event', async ({ ack, body }) => {
  try {
    console.log(body);
    // setTimeout(() => { ack(); }, 2000);
    await ack();
  } catch (e) {
    console.error(e);
  }
});

(async () => {
  // Connect to Slack
  await socketModeClient.start();
})();
