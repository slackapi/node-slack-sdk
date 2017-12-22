---
layout: page
title: Incoming webhooks
permalink: /incoming_webhook
order: 4
headings:
    - title: Posting a message with Incoming Webhooks
---

## Posting a message with Incoming Webhooks

[Incoming webhooks](https://api.slack.com/incoming-webhooks) are an easy way to send notifications
to a Slack channel with a minimum of setup. You'll need a webhook URL from a Slack app or a custom
integration to use the `IncomingWebhook` class.

```javascript
const { IncomingWebhook } = require('@slack/client');
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

// Send simple text to the webhook channel
webhook.send('Hello there', function(err, res) {
    if (err) {
        console.log('Error:', err);
    } else {
        console.log('Message sent: ', res);
    }
});
```
