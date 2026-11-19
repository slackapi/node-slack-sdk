# Webhook

The `@slack/webhook` package contains a helper for making requests to Slack's [Incoming
Webhooks](/messaging/sending-messages-using-incoming-webhooks) or [Workflow Builder](https://slack.com/features/workflow-automation). Use it in your app to send a notification to a channel or start a workflow.

## Installation

```shell
$ npm install @slack/webhook
```

---

## Initialize the webhook

The package exports a `IncomingWebhook` class. You'll need to initialize it with the URL you received from Slack.

The URL can come from installation in your development workspace, which is shown in the app configuration pages.
Or, the URL could be in the response from [`oauth.v2.access`](/reference/methods/oauth.v2.access) when the app is
distributed and installed into another workspace.

```javascript
const { IncomingWebhook } = require('@slack/webhook');

// Read a url from the environment variables
const url = process.env.SLACK_WEBHOOK_URL;

// Initialize
const webhook = new IncomingWebhook(url);
```

<details>
<summary>
Setting default arguments
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

## Send a notification

Something interesting just happened in your app, so it's time to send the notification! Call the
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

## Trigger a Workflow Builder workflow

The package also exports a `WebhookTrigger` class for [Workflow Builder webhook triggers](https://slack.com/help/articles/360041352714-Build-a-workflow--Create-a-workflow-that-starts-outside-of-Slack) which accepts an optional, flattened, stringified JSON payload sent to start a workflow.

```javascript
const { WebhookTrigger } = require('@slack/webhook');
const url = process.env.SLACK_WEBHOOK_TRIGGER_URL;

const trigger = new WebhookTrigger(url);

(async () => {
  // Keys should match the variables your workflow expects
  await trigger.send({
    customer_name: 'Ada Lovelace',
    order_id: '1024',
  });
})();
```

---

## Retry failed requests

Both `IncomingWebhook` and `WebhookTrigger` classes can retry failed requests. Retries are **off by default**; pass a `retryConfig` to opt in. The package re-exports the same named policies as `@slack/web-api` on `retryPolicies`, or you can supply your own [`retry`](https://github.com/tim-kos/node-retry) options.

```javascript
const { IncomingWebhook, retryPolicies } = require('@slack/webhook');
const url = process.env.SLACK_WEBHOOK_URL;

const webhook = new IncomingWebhook(url, {
  retryConfig: retryPolicies.fiveRetriesInFiveMinutes,
});
```

Only transient failures are retried: server errors (`5xx`) and network errors with no response. Client errors (`4xx`), including rate limits (`429`), fail immediately without a retry.

---

## Proxy requests with a custom agent

The webhook allows you to customize the HTTP
[`Agent`](https://nodejs.org/docs/latest/api/http.html#http_class_http_agent) used to create the connection to Slack.
Using this option is the best way to make all requests from your app through a proxy, which is a common requirement in
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
const HttpsProxyAgent = require('https-proxy-agent');
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
