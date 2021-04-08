const { WebClient } = require('@slack/web-api');
const client = new WebClient();
(async () => {
  const response = await client.api.test({ foo: "bar" });
  console.log(JSON.stringify(response, null, 2));
})();