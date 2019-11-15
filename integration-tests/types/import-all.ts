import { WebClient } from '@slack/web-api';
import { RTMClient } from '@slack/rtm-api';
import { IncomingWebhook } from '@slack/webhook';
import { createEventAdapter } from '@slack/events-api';
import { createMessageAdapter } from '@slack/interactive-messages';

new WebClient();
new RTMClient('xoxb-dummy-token');
new IncomingWebhook('https://example.com');
createEventAdapter('dummy-signing-secret');
createMessageAdapter('dummy-signing-secret');
