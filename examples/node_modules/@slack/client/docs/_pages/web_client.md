---
layout: page
title: Web API client
permalink: /web_api
redirect_from: /basic_usage
order: 2
headings:
    - title: Posting a message
    - title: Adding attachments to a message
    - title: Uploading a file
    - title: Getting a list of channels
    - title: Using a callback instead of a Promise
    - title: Changing the retry configuration
    - title: Changing the request concurrency
    - title: Rate limit handling
    - title: Customizing the logger
    - title: Custom agent for proxy support
    - title: OAuth token exchange
---

This package includes a web client that makes it simple to use the
[Slack Web API methods](https://api.slack.com/methods). Here are some of the goodies you get right
out of the box:

* Request queuing and rate-limit management
* Request body serialization and response body parsing
* Keeps track of your token
* Custom agents for proxy support
* File upload handling
* Convenience Web API method aliases
* Error handling
* Logging
* Configurability

Here are some of the common recipies for using the `WebClient` class.

---

### Posting a message

Your app will interact with the Web API through the `WebClient` object, which a top level export
from this package. At a minimum, you need to instantiate it with a token. The example below shows
how to post a message into a channel, DM, MPDM, or group. This will require either the
`chat:user:write` or `chat:bot:write` scopes.

```javascript
const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'C1232456';

// See: https://api.slack.com/methods/chat.postMessage
web.chat.postMessage({ channel: conversationId, text: 'Hello there' })
  .then((res) => {
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);
```

---

### Adding attachments to a message

The `chat.postMessage` method takes an optional `attachments` argument. Arguments for Web API methods are all specified
in a single object literal, so just add additional keys for any optional argument.

```javascript
web.chat.postMessage({
  channel: conversationId,
  text: 'Hello there',
  attachments: [
    {
      "fallback": "Required plain-text summary of the attachment.",
      "color": "#36a64f",
      "author_name": "Bobby Tables",
      "author_link": "http://flickr.com/bobby/",
      "author_icon": "http://flickr.com/icons/bobby.jpg",
      "title": "Slack API Documentation",
      "title_link": "https://api.slack.com/",
      "text": "Optional text that appears within the attachment",
      "fields": [
        {
          "title": "Priority",
          "value": "High",
          "short": false
        }
      ],
      "image_url": "http://my-website.com/path/to/image.jpg",
      "thumb_url": "http://example.com/path/to/thumb.png",
      "footer": "Slack API",
      "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
      "ts": 123456789
    }
  ]
})
  .then((res) => {
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);
```

**NOTE**: See the [Message Builder](https://api.slack.com/docs/messages/builder) for a playground
where you can prototype your message's look.

---

### Uploading a file

The `files.upload` method can be used to upload a file, cool! This will require `files:write:user`
scope.

```javascript
const fs = require('fs');
const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// Slack needs a file name for the upload
// This file is located in the current directory (`process.pwd()`)
const filename = 'test_file.csv';

// See: https://api.slack.com/methods/chat.postMessage
web.files.upload({
  filename,
  // You can use a ReadableStream or a Buffer for the file option
  file: fs.createReadStream(`./${fileName}`),
  // Or you can use the content property (but not both)
  // content: 'plain string content that will be editable in Slack'
})
  .then((res) => {
    // `res` contains information about the uploaded file
    console.log('File uploaded: ', res.file.id);
  })
  .catch(console.error);
```

---

### Getting a list of channels

The `channels.list` method can be used to get a list of all the public channels (and private
channels from the user who authorized) when using a user token with scope `channels:read`. Or, it
would return the public channels and all private channels a bot user is a member of when using a bot token.

```javascript
const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// See: https://api.slack.com/methods/channels.list
web.channels.list()
  .then((res) => {
    // `res` contains information about the channels
    res.channels.forEach(c => console.log(c.name));
  })
  .catch(console.error);
});
```

---

### Using a callback instead of a Promise

Every web API method can also be called with a callback function that takes `cb(error, response)`.
If you prefer callbacks over promises, here is the example above translated for callbacks:

```javascript
web.channels.list((err, res) => {
  if (err) {
    return console.error(err);
  }

  // `res` contains information about the channels
  res.channels.forEach(c => console.log(c.name));
});

```

---

### Changing the retry configuration

The `WebClient` will retry any request that fails for a recoverable error. The policy is
configurable, but the default is retrying forever with an exponential backoff, capped at thirty
minutes but with some randomization. You can use the `retryConfig` option to customize that policy.
The value is an `options` object as described in the following library:
<https://github.com/tim-kos/node-retry>.

```javascript
const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token, {
  retryConfig: {
    // This would turn the retrying feature off
    retries: 0,
  },
});
```

---

### Changing the request concurrency

The `WebClient` maintains a queue of requests to make sure a limited number of requests are in
flight at a time. It also helps with rate limit management. The default concurrency is set to three
but you can configure this with the `maxRequestConcurrency` option.

```javascript
const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token, {
  // Allow up to 10 requests to be in-flight at a time
  maxRequestConcurrency: 10,
});
```

---

### Rate limit handling

When your application has exceeded the [rate limit](https://api.slack.com/docs/rate-limits#web) for a certain method,
the `WebClient` object will emit a `rate_limited` event. Observing this event can be useful for scheduling work to be
done in the future.

```javascript
const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
web.on('rate_limited', retryAfter => console.log(`Delay future requests by at least ${retryAfter} seconds`));
```

---

### Customizing the logger

The `WebClient` also logs interesting events as it operates. By default, the log level is set to
`info` and it should not log anything as long as nothing goes wrong.

You can adjust the log level by setting the `logLevel` option to any of the values found in the `LogLevel` top-level
export.

You can also capture the logs without writing them to stdout by setting the `logger` option. It should be set to a
function that takes `fn(level: string, message: string)`.

```javascript
const fs = require('fs');
const { WebClient, LogLevel } = require('@slack/client');

// open a file to write logs
// TODO: make sure to call `logStream.end()` when the app is shutting down
const logStream = fs.createWriteStream('/tmp/app.log');

const token = process.env.SLACK_TOKEN;
logStream.on('open', () => {
  const web = new WebClient(token, {
    // increased logging, great for debugging
    logLevel: LogLevel.DEBUG,
    logger: (level, message) => {
      // write to disk
      logStream.write(`[${level}]: ${message}`);
    }
  });
});
```

---

### Custom agent for proxy support

In order to pass outgoing requests through an HTTP proxy, you'll first need to install an additional package in your
application:

```
$ npm install --save https-proxy-agent
```

Next, use the `agent` option to configure with your proxy settings.

```javascript
const HttpsProxyAgent = require('https-proxy-agent');
const { WebClient } = require('@slack/client');

// in this example, we read the token from an environment variable. its best practice to keep sensitive data outside
// your source code.
const token = process.env.SLACK_TOKEN;

// its common to read the proxy URL from an environment variable, since it also may be sensitive.
// NOTE: for a more complex proxy configuration, see the https-proxy-agent documentation:
// https://github.com/TooTallNate/node-https-proxy-agent#api
const proxyUrl = process.env.http_proxy || 'http://12.34.56.78:9999';

// To use Slack's Web API:
const web = new WebClient(token, { agent: new HttpsProxyAgent(proxyUrl) });
```

---

### OAuth token exchange

There's one method that doesn't require a `token`, and that's because it generates the `token` for
you: `oauth.access`. You'll be using this method at the end of the OAuth flow for a distributed
Slack app. To do this, just initialize without a token.

Or, if you are using the Passport authentication framework, this step is handled for you using the
[`@aoberoi/passport-slack` Strategy](https://github.com/aoberoi/passport-slack).

```javascript
const { WebClient } = require('@slack/client');

const client = new WebClient();
const clientId = process.env.SLACK_CLIENT_ID;
const clientSecret = process.env.SLACK_CLIENT_SECRET;

// Not shown: did some OAuth to recieve `code` grant
client.oauth.access({
  client_id: clientId,
  client_secret: clientSecret,
  code
})
  .then((res) => {
    // Good idea to save the access token to your database
    console.log(res.access_token);
  })
  .catch(console.error);
```


