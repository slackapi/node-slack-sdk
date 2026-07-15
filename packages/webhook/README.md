# Slack Webhook

[![codecov](https://codecov.io/gh/slackapi/node-slack-sdk/graph/badge.svg?token=OcQREPvC7r&flag=webhook)](https://codecov.io/gh/slackapi/node-slack-sdk)

The `@slack/webhook` package contains a helper for making requests to Slack's [Incoming Webhooks](https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks) or [Workflow Builder](https://slack.com/features/workflow-automation). Use it in your app to send a notification to a channel or start a workflow.

## Requirements

This package supports Node v20 and higher. It's highly recommended to use [the latest LTS version of
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
import { IncomingWebhook } from '@slack/webhook';

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
import { IncomingWebhook } from '@slack/webhook';
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
import { IncomingWebhook } from '@slack/webhook';
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

### Trigger a Workflow Builder workflow

The package also exports a `WebhookTrigger` class for [Workflow Builder webhook triggers](https://slack.com/help/articles/360041352714-Build-a-workflow--Create-a-workflow-that-starts-outside-of-Slack) which accepts an optional, flattened, stringified JSON payload sent to start a workflow.

```javascript
import { WebhookTrigger } from '@slack/webhook';
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

### Retry failed requests

Both `IncomingWebhook` and `WebhookTrigger` can retry failed requests. Retries are **off by default**; pass a `retryConfig` to opt in. The package re-exports the same named policies as `@slack/web-api` on `retryPolicies`, or you can supply your own [`retry`](https://github.com/tim-kos/node-retry) options.

```javascript
import { IncomingWebhook, retryPolicies } from '@slack/webhook';
const url = process.env.SLACK_WEBHOOK_URL;

const webhook = new IncomingWebhook(url, {
  retryConfig: retryPolicies.fiveRetriesInFiveMinutes,
});
```

Only transient failures are retried: server errors (`5xx`) and network errors with no response. Client errors (`4xx`), including rate limits (`429`), fail immediately without a retry.

---

### Handle errors

When a request fails, the `Promise` returned by `.send()` rejects with an `Error`. Each kind of error is its own class, all extending the `SlackWebhookError` base class, so you can use an `instanceof` check to decide how to respond.

```javascript
import { IncomingWebhook, IncomingWebhookHTTPError, IncomingWebhookRequestError } from '@slack/webhook';
const url = process.env.SLACK_WEBHOOK_URL;

const webhook = new IncomingWebhook(url);

(async () => {
  try {
    await webhook.send({ text: 'I\'ve got news for you...' });
  } catch (error) {
    if (error instanceof IncomingWebhookHTTPError) {
      console.log(error.statusCode);    // e.g. 404
      console.log(error.statusMessage); // e.g. 'Not Found'
      console.log(error.body);          // the raw response body
    } else if (error instanceof IncomingWebhookRequestError) {
      console.log(error.cause);
    }
  }
})();
```

These aren't the only error classes this package can throw, but they all extend `SlackWebhookError`, so an `instanceof SlackWebhookError` check catches any of them.

---

### Proxy requests through a custom transport

By default, requests are sent with the global [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) implementation. Routing requests through a proxy is a common requirement in corporate settings. You have a few options.

The simplest is to let Node.js read your proxy environment variables. Call [`http.setGlobalProxyFromEnv()`](https://nodejs.org/docs/latest/api/http.html#httpsetglobalproxyfromenvproxyenv) once at startup and every request routes through `HTTP_PROXY`/`HTTPS_PROXY` automatically, with no extra packages:

```javascript
import http from 'node:http';
import { IncomingWebhook } from '@slack/webhook';

http.setGlobalProxyFromEnv();

// Requests now route through HTTP_PROXY/HTTPS_PROXY automatically
const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
```

Alternatively, run your app with the `NODE_USE_ENV_PROXY` environment variable and no code changes are needed:

```shell
$ NODE_USE_ENV_PROXY=1 HTTPS_PROXY=http://corporate.proxy:8080 node app.js
```

If you need per-webhook proxy configuration, pass a custom `fetch` implementation using an [undici](https://undici.nodejs.org/) dispatcher. Note that `undici` is not a dependency of `@slack/webhook`, so you'll need to install it yourself.

```javascript
import { IncomingWebhook } from '@slack/webhook';
import { fetch, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent('http://corporate.proxy:8080');

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL, {
  fetch: (url, init) => fetch(url, { ...init, dispatcher }),
});
```
