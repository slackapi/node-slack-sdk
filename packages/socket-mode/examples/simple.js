const { SocketModeClient, LogLevel } = require("@slack/socket-mode");
const { WebClient } = require("@slack/web-api");

const socketModeClient = new SocketModeClient({
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.DEBUG,
  pingPongLoggingEnabled: true,
  serverPingTimeout: 60000,
  clientPingTimeout: 5000,
});
const webClient = new WebClient(process.env.SLACK_BOT_TOKEN, {
  logLevel: LogLevel.DEBUG,
});

socketModeClient.on("slack_event", async ({ ack, body }) => {
  console.log(body);
  await ack();
});

(async () => {
  // Connect to Slack
  await socketModeClient.start();
})();
