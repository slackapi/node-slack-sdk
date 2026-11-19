const { SocketModeClient, LogLevel } = require('@slack/socket-mode');
const { ProxyAgent } = require('undici');

const dispatcher = new ProxyAgent('http://localhost:9001');

const socketModeClient = new SocketModeClient({
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.DEBUG,
  dispatcher,
});

// const { WebClient } = require('@slack/web-api');
// const webClient = new WebClient(process.env.SLACK_BOT_TOKEN, {
//   logLevel: LogLevel.DEBUG,
//   fetch: (url, options) => fetch(url, { ...options, dispatcher })
// });

socketModeClient.on('slack_event', async ({ ack, body }) => {
  console.log(body);
  await ack();
});

(async () => {
  await socketModeClient.start();
})();
