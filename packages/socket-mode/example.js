const { SocketModeClient, LogLevel } = require('.');
const { WebClient } = require('@slack/web-api');


// const clientOptions = {
//   slackApiUrl: 'https://dev.slack.com/api/',
// }

const socketModeClient = new SocketModeClient({
  logLevel: LogLevel.DEBUG, 
  token: process.env.APP_TOKEN,  
  // clientOptions
})
const botToken = process.env.BOT_TOKEN;

const webclient = new WebClient(botToken, clientOptions);

socketModeClient.on('app_home_opened', async ({event, body, ack}) => {
  try {
    await ack();
    await webclient.views.publish({
      token: botToken,
      user_id: event.user,
      view: { 
        "type":"home",
        "blocks":[
          {
            "type": "section",
            "block_id": "section678",
            "text": {
              "type": "mrkdwn",
              "text": "APP HOME LOADED!! WOOT"
            },
          }
        ]
      }
    });
  } catch (error) {
    console.log('An error occurred', error);
  }
});

(async () => {
  await socketModeClient.start();
})();
