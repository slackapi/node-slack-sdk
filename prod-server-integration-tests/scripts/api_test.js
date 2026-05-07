import 'dotenv/config';
import { WebClient } from '@slack/web-api';

const client = new WebClient();
const response = await client.api.test({ foo: 'bar' });
console.log(JSON.stringify(response, null, 2));
