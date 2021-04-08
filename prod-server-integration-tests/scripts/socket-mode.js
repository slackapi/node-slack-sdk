const { SocketModeClient } = require('@slack/socket-mode');
const appToken = process.env.SLACK_SDK_TEST_SOCKET_MODE_APP_TOKEN;
const socketModeClient = new SocketModeClient({ appToken, logLevel: 'debug' });
(async () => {
  await socketModeClient.start();
})();
