const { SocketModeClient, LogLevel } = require('./dist');
const client = new SocketModeClient({ appToken: process.env.SLACK_APP_TOKEN, logLevel: LogLevel.DEBUG });

client.on('message', async (evt) => {
  await evt.ack();
  console.log('*MESSAGE EVENT*', evt);
});
(async () => {
  await client.start();
})();
