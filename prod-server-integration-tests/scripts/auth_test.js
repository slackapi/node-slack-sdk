import 'dotenv/config';
import { WebClient } from '@slack/web-api';

const client = new WebClient(process.env.SLACK_SDK_TEST_BOT_TOKEN);
const response = await client.auth.test();
console.log(JSON.stringify(response, null, 2));
