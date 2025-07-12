# Slack Incoming Webhooks

[![codecov](https://codecov.io/gh/slackapi/node-slack-sdk/graph/badge.svg?token=OcQREPvC7r&flag=webhook)](https://codecov.io/gh/slackapi/node-slack-sdk)

The `@slack/webhook` package contains a helper for making requests to Slack's [Incoming
Webhooks](https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks). Use it in your app to send a notification to a channel.

## Requirements
This package supports Node v18 and higher. It's highly recommended to use [the latest LTS version of
node](https://github.com/nodejs/Release#release-schedule), and the documentation is written using syntax and features
from that version.

## Installation

```shell
$ npm install @slack/webhook
```

<!-- START: Remove before copying into the docs directory -->

## Usage

<!-- END: Remove before copying into the docs directory -->

### Initialize the webhook

The package exports an `IncomingWebhook` class. You'll need to initialize it with the URL you received from Slack.
To create a webhook URL, follow the instructions in the [Getting started with Incoming Webhooks](https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks)
guide.

```javascript
const { IncomingWebhook } = require('@slack/webhook');

// Read a url from the environment variables
const url = process.env.SLACK_WEBHOOK_URL;

// Initialize
const webhook = new IncomingWebhook(url);
```

<details>
<summary markdown="span">
<strong><i>Setting default arguments</i></strong>
</summary>

The webhook can be initialized with default arguments that are reused each time a notification is sent. Use the second
parameter to the constructor to set the default arguments.

```javascript
const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.SLACK_WEBHOOK_URL;

// Initialize with defaults
const webhook = new IncomingWebhook(url, {
  icon_emoji: ':bowtie:',
});
```

</details>

---

### Send a notification

Something interesting just happened in your app, so it's time to send the notification! Just call the
`.send(options)` method on the webhook. The `options` parameter is an object that should describe the contents of
the message. The method returns a `Promise` that resolves once the notification is sent.

```javascript
const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.SLACK_WEBHOOK_URL;

const webhook = new IncomingWebhook(url);

// Send the notification
(async () => {
  await webhook.send({
    text: 'I\'ve got news for you...',
  });
})();
```

---

### Proxy requests with a custom agent

The webhook allows you to customize the HTTP
[`Agent`](https://nodejs.org/docs/latest/api/http.html#http_class_http_agent) used to create the connection to Slack.
Using this option is the best way to make all requests from your app go through a proxy, which is a common requirement in
many corporate settings.

In order to create an `Agent` from some proxy information (such as a host, port, username, and password), you can use
one of many npm packages. We recommend [`https-proxy-agent`](https://www.npmjs.com/package/https-proxy-agent). Start
by installing this package and saving it to your `package.json`.

```shell
$ npm install https-proxy-agent
```

Import the `HttpsProxyAgent` class, and create an instance that can be used as the `agent` option of the
`IncomingWebhook`.

```javascript
const { IncomingWebhook } = require('@slack/webhook');
const { HttpsProxyAgent } = require('https-proxy-agent');
const url = process.env.SLACK_WEBHOOK_URL;

// One of the ways you can configure HttpsProxyAgent is using a simple string.
// See: https://github.com/TooTallNate/node-https-proxy-agent for more options
const proxy = new HttpsProxyAgent(process.env.http_proxy || 'http://168.63.76.32:3128');

// Initialize with the proxy agent option
const webhook = new IncomingWebhook(token, { agent: proxy });

// Sending this webhook will now go through the proxy
(async () => {
  await webhook.send({
    text: 'I\'ve got news for you...',
  });
})();
```
