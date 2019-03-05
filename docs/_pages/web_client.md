---
layout: page
title: Web API client
permalink: /web_api
redirect_from: /basic_usage
order: 2
headings:
    - title: Posting a message
    - title: Customizing a message layout
    - title: Uploading a file
    - title: Getting a list of channels
    - title: Changing the retry configuration
    - title: Changing the request concurrency
    - title: Rate limit handling
    - title: Pagination
    - title: Customizing the logger
    - title: Custom agent for proxy support
    - title: OAuth token exchange
    - title: Using legacy message attachments
    - title: Using a callback instead of a Promise (deprecated)

---

This package includes a web client that makes it simple to use the [Slack Web API
methods](https://api.slack.com/methods). Here are some of the goodies you get right out of the box:

* Request queuing and rate-limit management
* Request body serialization and response body parsing
* Keeps track of your token
* Custom agents for proxy support
* File upload handling
* Convenience Web API method aliases
* Error handling
* Logging
* Configurability

Here are some of the common recipes for using the `WebClient` class.

---

### Posting a message

Your app will interact with the Web API through the `WebClient` object, which a top level export from this package. You
instantiate it with a token. The example below shows how to post a message into a channel, DM, MPDM, or group. This will
require either the `bot`, `chat:user:write`, or `chat:bot:write` scope.

```javascript
const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'C1232456';

(async () => {
  // See: https://api.slack.com/methods/chat.postMessage
  const res = await web.chat.postMessage({ channel: conversationId, text: 'Hello there' });

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
})();
```

---

### Customizing a message layout

The `chat.postMessage` method takes an optional `blocks` argument that allows you to customize the layout of a message.
Blocks for Web API methods are all specified in a single object literal, so just add additional keys for any
optional argument.

[Learn more about customize message layouts on the API site](https://api.slack.com/messaging/composing/layouts).

```javascript
(async () => {
  const res = await web.chat.postMessage({
    channel: conversationId,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Danny Torrence left the following review for your property:"
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "<https://example.com|Overlook Hotel> \n :star: \n Doors had too many axe holes, guest in room " +
          "237 was far too rowdy, whole place felt stuck in the 1920s."
        },
          accessory: {
            type: "image",
            image_url: "https://images.pexels.com/photos/750319/pexels-photo-750319.jpeg",
            alt_text: "Haunted hotel image"
          }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*Average Rating*\n1.0"
          }
        ]
      }
    ]
  });

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
})();
```

**NOTE**: Use the [Block Kit Builder](https://api.slack.com/tools/block-kit-builder) for a playground
where you can prototype your message's look and feel.

---

### Uploading a file

The `files.upload` method can be used to upload a file, cool! This will require `bot` or `files:write:user` scope.

```javascript
const fs = require('fs');
const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, or xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// Slack needs a file name for the upload
// This file is located in the current directory (`process.pwd()`)
const filename = 'test_file.csv';

(async () => {
  // See: https://api.slack.com/methods/files.upload
  const res = await web.files.upload({
    filename,
    // You can use a ReadableStream or a Buffer for the file option
    file: fs.createReadStream(`./${fileName}`),
    // Or you can use the content property (but not both)
    // content: 'plain string content that will be editable in Slack'
    // Specify channel(s) to upload the file to. Optional, unless also specifying a thread_ts value.
    // channels: 'C123456'
  })

  // `res` contains information about the uploaded file
  console.log('File uploaded: ', res.file.id);
})();
```


---

### Getting a list of channels

The `conversations.list` method is part of the [Conversations API](https://api.slack.com/docs/conversations-api).
This method returns a list of all [channel-like conversations](https://api.slack.com/types/conversation) in a workspace.
The "channels" returned depend on what the calling token has access to and the directives placed in the `types`
parameter. See the [conversations.list](https://api.slack.com/methods/conversations.list) documentation for details.

```javascript
const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, or xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

(async () => {
  // See: https://api.slack.com/methods/conversations.list
  const res = await web.conversations.list({
    exclude_archived: true,
    types: 'public_channel',
    // Only get first 100 items
    limit: 100,
  });

  // `res.channels` is an array of channel info objects
  console.log(res.channels);
})();
```

**NOTE**: The example above can only get a specific number of items (by `limit` arguments). See the
[Pagination](#pagination) section for the detailed description as to how you can handle pagination in API methods so
that you can get full items even if you don't know how many items are there.

---

### Changing the retry configuration

The `WebClient` will retry any request that fails for a recoverable error. The policy is configurable, but the default
is to retry with an exponential back-off, capped at thirty minutes but with some randomization. You can use the
`retryConfig` option to customize that policy. The value is an `options` object as described in the following library:
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

The `WebClient` maintains a queue of requests to make sure a limited number of requests are in flight at a time. It also
helps with rate limit management. The default concurrency is set to three but you can configure this with the
`maxRequestConcurrency` option.

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

Typically, you shouldn't have to worry about rate limits. By default, the `WebClient` will automatically wait the
appropriate amount of time and retry the request. During that time, all new requests from the `WebClient` will be
paused, so it doesn't make your rate-limiting problem worse. Then, once a successful response is received, the returned
Promise is resolved with the result.

In addition, you can observe when your application has been rate-limited by attaching a handler to the `rate_limited`
event. In the following example, we're trying to call the `users.info` method for a long list of users, and continue
processing when all the responses have succeeded.

```javascript
const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
web.on('rate_limited', (retryAfter) => {
  console.log(`A request was rate limited and future requests will be paused for ${retryAfter} seconds`);
});

const userIds = []; // a potentially long list of user IDs

// If the list is large enough and responses are fast enough, this might trigger a rate-limit. But you will get each
// result without any additional code, since the rate-limited requests will be retried.
const allUsersInfoPromises = userIds.map(async (user) => {
  const res = await web.users.info({ user });
  // `res.user` contains the info for the user requested.
  return res.user;
});

// `allUsersInfoPromises` is an array of Promises, but we can use Promise.all() to wait for them to all complete.
Promise.all(allUsersInfoPromises)
  .then((allUsersInfo) => {
    // `allUsersInfo` is an array of user objects
    console.log(allUsersInfo);
  });
```

If you'd like to handle rate-limits in a specific way for your application, you can turn off the automatic retrying of
rate-limited API calls with the `rejectRateLimitedCalls` configuration option.

```javascript
const { WebClient, ErrorCode } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token, { rejectRateLimitedCalls: true });

const userIds = []; // a potentially long list of user IDs

userIds.map(async (user) => {
  try {
    const res = await web.users.info({ user });
  } catch (error) {
    if (error.code === ErrorCode.RateLimitedError) {
      // the request was rate-limited, you can deal with this error in your application however you wish
      console.log(
        `The users.info with ID ${user} failed due to rate limiting. ` +
        `The request can be retried in ${error.retryAfter} seconds.`
      );
    } else {
      // some other error occurred
      throw error;
    }
  }
});

// `allUsersInfoPromises` is an array of Promises, but we can use Promise.all() to wait for them to all complete.
Promise.all(allUsersInfoPromises)
  .then((allUsersInfo) => {
    // `allUsersInfo` is an array of user objects, but some items may be undefined (error handling above doesn't return
    // a value in rate-limiting situations)
    console.log(allUsersInfo);
  });
```

---

### Pagination

Some methods are meant to return large lists of things; whether it be users, channels, messages, or something else. In
order to efficiently get you the data you need, Slack will return parts of that entire list, or **pages**. Cursor-based
pagination describes using a couple options: `cursor` and `limit` to get exactly the page of data you desire. For
example, this is how your app would get the last 500 messages in a conversation.

```javascript
const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
const conversationId = 'C123456'; // some conversation ID

(async () => {
  const res = await web.conversations.history({ channel: conversationId, limit: 500 });
  console.log(`Requested 500 messages, received ${res.messages.length} in the response`);
})();
```

In the code above, the `res.messages` array will contain, at maximum, 500 messages. But what about all the previous
messages? That's what the `cursor` argument is used for 😎.

Inside `res` is a property called `response_metadata`, which might (or might not) have a `next_cursor` property. When
that `next_cursor` property exists, and is not an empty string, you know there's still more data in the list. If you
want to read more messages in that conversation's history, you would call the method again, but use the `next_cursor`
value as the `cursor` argument. **NOTE**: It should be rare that your app needs to read the entire history of a channel,
avoid that! With other methods, such as `conversations.list`, it would be more common to request the entire list of
conversations, so that's what we're illustrating below.

```javascript
const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, or xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

async function getAllChannels(options) {
  async function pageLoaded(accumulatedChannels, res) {
    // Merge the previous result with the results in the current page
    const mergedChannels = accumulatedChannels.concat(res.channels);

    // When a `next_cursor` exists, recursively call this function to get the next page.
    if (res.response_metadata && res.response_metadata.next_cursor && res.response_metadata.next_cursor !== '') {
      // Make a copy of options
      const pageOptions = { ...options };
      // Add the `cursor` argument
      pageOptions.cursor = res.response_metadata.next_cursor;

      return pageLoaded(mergedChannels, await web.conversations.list(pageOptions));
    }

    // Otherwise, we're done and can return the result
    return mergedChannels;
  }
  return pageLoaded([], await web.conversations.list(options));
}

(async () => {
  const allChannels = await getAllChannels({ exclude_archived: true, types: 'public_channel' });
  console.log(allChannels);
})();
```

Cursor-based pagination, if available for a method, is always preferred. In fact, when you call a cursor-paginated
method without a `cursor` or `limit`, the `WebClient` will **automatically paginate** the requests for you until the end
of the list. Then, each page of results are concatenated, and that list takes the place of the last page in the last
response. In other words, if you don't specify any pagination options then you get the whole list in the result as well
as the non-list properties of the last API call. It's always preferred to perform your own pagination by specifying the
`limit` and/or `cursor` since you can optimize to your own application's needs.

A few methods that returns lists do not support cursor-based pagination, but do support [other pagination
types](https://api.slack.com/docs/pagination#classic_pagination). These methods will not be automatically paginated for
you, so you should give extra care and use appropriate options to only request a page at a time. If you don't, you risk
failing with `Error`s which have a `code` property set to `errorCode.HTTPError`.

---

### Customizing the logger

The `WebClient` also logs interesting events as it operates. By default, the log level is set to `LogLevel.INFO` and it
should not log anything as long as nothing goes wrong.

You can adjust the log level by setting the `logLevel` option to any of the values found in the `LogLevel` top-level
export.

```javascript
const fs = require('fs');
const { WebClient, LogLevel } = require('@slack/client');

// increased logging, great for debugging
const web = new WebClient(token, { logLevel: LogLevel.DEBUG });
```

There are four logging levels: `LogLevel.DEBUG`, `LogLevel.INFO`, `LogLevel.WARN`, `LogLevel.ERROR`. Here they appear in
order of increasing severity, which means that using `LogLevel.ERROR` will output the least number of messages, and only
the most important.

You can also capture the logs without writing them to stdout by setting the `logger` option. The option should be set
to an object that has the following methods:

**Logger**

| Method       | Parameters        | Return type |
|--------------|-------------------|-------------|
| `setLevel()` | `level: LogLevel` | `void`      |
| `setName()`  | `name: string`    | `void`      |
| `debug()`    | `...msgs: any[]`  | `void`      |
| `info()`     | `...msgs: any[]`  | `void`      |
| `warn()`     | `...msgs: any[]`  | `void`      |
| `error()`    | `...msgs: any[]`  | `void`      |


**NOTE**: While the use of logging functions is deprecated, the `logger` option will still currently accept a function
whose method signature matches `fn(level: string, message: string)`.

```javascript
const fs = require('fs');
const { WebClient, LogLevel } = require('@slack/client');

// open a file to write logs
// TODO: make sure to call `logStream.end()` when the app is shutting down
const logStream = fs.createWriteStream('/tmp/app.log');

const token = process.env.SLACK_TOKEN;
logStream.on('open', () => {
  const web = new WebClient(token, {
    // write all messages to disk
    logger: {
      debug(...msgs) { logStream.write(JSON.stringify(msgs)); }
      info(...msgs) { logStream.write(JSON.stringify(msgs)); }
      warn(...msgs) { logStream.write(JSON.stringify(msgs)); }
      error(...msgs) { logStream.write(JSON.stringify(msgs)); }
      // these methods are noops because this custom logger will write everything to disk (all levels)
      setLevel(){},
      setName(){},
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

There's one method that doesn't require a `token`, and that's because it generates the `token` for you: `oauth.access`.
You'll be using this method at the end of the OAuth flow for a distributed Slack app. To do this, just initialize
without a token.

Or, if you are using the Passport authentication framework, this step is handled for you using the
[`@aoberoi/passport-slack` Strategy](https://github.com/aoberoi/passport-slack).

```javascript
const { WebClient } = require('@slack/client');

const client = new WebClient();
const clientId = process.env.SLACK_CLIENT_ID;
const clientSecret = process.env.SLACK_CLIENT_SECRET;

// Not shown: did some OAuth to receive `code` grant
(async () => {
  const res = client.oauth.access({
    client_id: clientId,
    client_secret: clientSecret,
    code
  });

  // Good idea to save the access token to your database
  console.log(res.access_token);
})();
```

---

### Using legacy message attachments

While we recommend using the more flexible top-level blocks to display message content, attachments are still supported
anywhere you construct a message (like `chat.postMessage`). Just use the `attachments` key like you're accustomed to:

```javascript
(async () => {
  const res = await web.chat.postMessage({
    channel: conversationId,
    text: 'Hello there',
    attachments: [
      {
        fallback: 'Required plain-text summary of the attachment.',
        color: '#36a64f',
        author_name: 'Bobby Tables',
        author_link: 'http://flickr.com/bobby/',
        author_icon: 'http://flickr.com/icons/bobby.jpg',
        title: 'Slack API Documentation',
        title_link: 'https://api.slack.com/',
        text: 'Optional text that appears within the attachment',
        fields: [
          {
            title: 'Priority',
            value: 'High',
            short: false
          }
        ],
        image_url: 'http://my-website.com/path/to/image.jpg',
        thumb_url: 'http://example.com/path/to/thumb.png',
        footer: 'Slack API',
        footer_icon: 'https://platform.slack-edge.com/img/default_application_icon.png',
        ts: 123456789
      }
    ]
  });

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
})();
```
---

### Using a callback instead of a Promise (deprecated)

Every web API method can also be called with a callback function that takes `cb(error, response)`. If you prefer
callbacks over promises, here is the example above translated for callbacks:

```javascript
web.channels.list({}, (err, res) => {
  if (err) {
    return console.error(err);
  }

  // `res` contains information about the channels
  res.channels.forEach(c => console.log(c.name));
});

```

Note that when calling a method with no required arguments, you **still need to provide an empty options object**.
