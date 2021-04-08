const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_BOT_TOKEN;
const client = new WebClient(token);
(async () => {
  const response = await client.auth.test();
  console.log(JSON.stringify(response, null, 2));
})();