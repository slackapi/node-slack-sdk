const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_BOT_TOKEN;
const client = new WebClient(token);
const user = process.env.SLACK_USER_ID;
const parameters = { limit: 1 };
if (user !== undefined) {
  parameters.user = user;
}

(async () => {
  // https://api.slack.com/methods/reactions.list
  for await (const page of client.paginate('reactions.list', parameters)) {
    console.log(JSON.stringify(page, null, 2));
  }
})();