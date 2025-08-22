const { SocketModeClient, LogLevel } = require('@slack/socket-mode');
const HttpsProxyAgent = require('https-proxy-agent');
const clientOptions = { agent: new HttpsProxyAgent('http://localhost:9001') };

const socketModeClient = new SocketModeClient({
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.DEBUG,
  clientOptions,
});

// const { WebClient } = require('@slack/web-api');
// const webClient = new WebClient(process.env.SLACK_BOT_TOKEN, {
//   logLevel: LogLevel.DEBUG,
//   clientOptions,
// });

socketModeClient.on('slack_event', async ({ ack, body }) => {
  console.log(body);
  await ack();
});

(async () => {
  await socketModeClient.start();
})();
