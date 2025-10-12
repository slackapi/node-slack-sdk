# Slack Incoming Webhooks

[![codecov](https://codecov.io/gh/slackapi/node-slack-sdk/graph/badge.svg?token=OcQREPvC7r&flag=webhook)](https://codecov.io/gh/slackapi/node-slack-sdk)

The `@slack/webhook` package contains a helper for sending message to Slack using [incoming webhooks](https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks). Use it in your app to send a notification to a channel.

## Requirements

This package supports Node v20 and higher. It's highly recommended to use [the latest LTS version of node](https://github.com/nodejs/Release#release-schedule), and the documentation is written using syntax and features from that version.

## Installation

```shell
$ npm install @slack/webhook
```

<!-- START: Remove before copying into the docs directory -->

## Usage

<!-- END: Remove before copying into the docs directory -->

### Initialize the webhook

The package exports an `IncomingWebhook` class. You'll need to initialize it with the URL you received from Slack. To create a webhook URL, follow the instructions in the [Getting started with incoming webhooks](https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks) guide.

```javascript
import { IncomingWebhook } from "@slack/webhook";

// Read a url from the environment variables
const url = process.env.SLACK_WEBHOOK_URL;

// Initialize
const webhook = new IncomingWebhook(url);
```

<details>
<summary markdown="span">
<strong><i>Setting default arguments</i></strong>
</summary>

The webhook can be initialized with default arguments that are reused each time a notification is sent. Use the second parameter to the constructor to set the default arguments.

```javascript
import { IncomingWebhook } from "@slack/webhook";

const url = process.env.SLACK_WEBHOOK_URL;

// Initialize with defaults
const webhook = new IncomingWebhook(url, {
  unfurl_media: false,
});
```

</details>

---

### Send a notification

Something interesting just happened in your app, so it's time to send the notification! Just call the `.send(options)` method on the webhook. The `options` parameter is an object that should describe the contents of the message. The method returns a `Promise` that resolves once the notification is sent.

```javascript
import { IncomingWebhook } from "@slack/webhook";

const url = process.env.SLACK_WEBHOOK_URL;

const webhook = new IncomingWebhook(url);

// Send the notification
(async () => {
  await webhook.send({
    text: "I've got news for you...",
  });
})();
```

---

### Send requests with a custom fetch adapter

The `@slack/webhook` package sends requests using [`globalThis.fetch`](https://nodejs.org/api/globals.html#fetch) by default, but you can customize that for various purposes such as for custom handling of retries or proxying requests, both of which are common requirements in corporate settings.

In order to use a custom fetch adapter, provide a function that's compatible with the `fetch` interface.

The following example uses the [`undici`](https://www.npmjs.com/package/undici) package to create a dispatcher for proxying requests with a limited timeout. Start by installing this package:

```shell
$ npm install unidici
```

Then import the `ProxyAgent` and `fetch` class from the `unidici` package to create a custom `fetch` implementation. This is passed to the `IncomingWebhook` constructor and used in requests:

```javascript
import { IncomingWebhook } from "@slack/webhook";
import { ProxyAgent, fetch as undiciFetch } from "undici";

const url = process.env.SLACK_WEBHOOK_URL;

/**
 * Configure your proxy agent here
 * @see {@link https://undici.nodejs.org/#/docs/api/ProxyAgent.md}
 */
const proxyAgent = new ProxyAgent({
  uri: new URL("http://localhost:8888"),
  proxyTls: {
    signal: AbortSignal.timeout(400),
  },
});

/**
 * Implement a custom fetch adapter
 * @type {typeof globalThis.fetch}
 * @see {@link https://undici.nodejs.org/#/docs/api/Fetch.md}
 */
const myFetch = async (url, opts) => {
  return await undiciFetch(url, {
    ...opts,
    dispatcher: proxyAgent,
  });
};

// Initialize with the custom fetch adapater and proxy
const webhook = new IncomingWebhook(url, {
  fetch: myFetch,
});

// Sending this webhook will now go through the proxy
(async () => {
  await webhook.send({
    text: "I've got news for you...",
  });
})();
```
