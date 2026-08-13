import 'dotenv/config';
import { WebClient } from '@slack/web-api';

const client = new WebClient(process.env.SLACK_SDK_TEST_BOT_TOKEN);
const parameters = { limit: 1 };
if (process.env.SLACK_USER_ID !== undefined) {
  parameters.user = process.env.SLACK_USER_ID;
}

// https://docs.slack.dev/reference/methods/reactions.list
for await (const page of client.paginate('reactions.list', parameters)) {
  console.log(JSON.stringify(page, null, 2));
}
