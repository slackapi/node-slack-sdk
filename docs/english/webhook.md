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

## Proxy requests

The webhook sends requests with the [`fetch`](https://nodejs.org/docs/latest/api/globals.html#fetch) built into Node.js, which can route all requests from your app through a proxy. This is a common requirement in many corporate settings.

Set the [`NODE_USE_ENV_PROXY`](https://nodejs.org/docs/latest/api/cli.html#node_use_env_proxy1) environment variable to route requests through the proxy in your `HTTPS_PROXY`, `HTTP_PROXY`, and `NO_PROXY` environment variables. This requires Node.js v22.21.0, v24.0.0, or later.

```shell
$ NODE_USE_ENV_PROXY=1 HTTPS_PROXY=http://corporate.proxy:8080 node app.js
```

On Node.js v24.14.0 and later, you can instead call [`http.setGlobalProxyFromEnv()`](https://nodejs.org/docs/latest/api/http.html#httpsetglobalproxyfromenvproxyenv) once at startup.

To use a proxy with a single `IncomingWebhook` or with an earlier version of Node.js, pass a `fetch` option with an [undici](https://undici.nodejs.org/) `ProxyAgent` as the `dispatcher`. Install the undici major version that matches your version of Node.js from the [long-term support table](https://undici.nodejs.org/#long-term-support), such as `undici@7` for Node.js v24.

```shell
$ npm install undici@7
```

```javascript
import { IncomingWebhook } from '@slack/webhook';
import { ProxyAgent } from 'undici';

const url = process.env.SLACK_WEBHOOK_URL;
const dispatcher = new ProxyAgent('http://corporate.proxy:8080');

const webhook = new IncomingWebhook(url, {
  fetch: (input, init) => globalThis.fetch(input, { ...init, dispatcher }),
});

// Sending this webhook will now go through the proxy
await webhook.send({
  text: 'I\'ve got news for you...',
});
```
