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
    - title: Pagination
    - title: Getting a list of channels
    - title: Making arbitrary API calls
    - title: Customizing the logger
    - title: Custom agent for proxy support
    - title: OAuth token exchange
    - title: Changing the retry configuration
    - title: Changing the request concurrency
    - title: Rate limit handling
    - title: Using legacy message attachments

---

This package includes a web client that makes it simple to use the [Slack Web API
methods](https://api.slack.com/methods). Here are some of the goodies you get right out of the box:

* Convenience Web API method aliases with type hints for all arguments
* Simple pagination
* Correct request body serialization and response body parsing
* File upload handling
* Request queuing and rate-limit management
* Custom agents for proxy support
* Keeps track of your token
* Error handling
* Logging
* Configurability

Here are some of the common recipes for using the `WebClient` class.

---

### Posting a message

Your app will interact with the Web API through the `WebClient` object, which is a top level export from this package.
You typically instantiate it with a token. The example below shows how to post a message into a channel, DM, MPDM, or
group. This will require a token with either the `bot`, `chat:user:write`, or `chat:bot:write` scope.

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
messages? That's where `WebClient#paginate()` can really simplify your code. It allows you to iterate, or loop through,
each of the pages in one of two different ways.

The first way is using a
[`for-await-of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) loop.
You'll most likely choose this way when you're running in a modern JavaScript environment. On Node.js, that's v10.0.0 or
higher. Here's how we can iterate over many pages of messages, and stop when we find one that contains a magic phrase.

```javascript
const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
const conversationId = 'C123456'; // some conversation ID

const magicPhrase = 'never gonna give you up';

(async () => {
  let found = undefined;

  // The loop gives you one page at a time, until you break or there's no more pages left in the list
  for await (const page of web.paginate('conversations.history', { channel: conversationId })) {
    console.log(`Received a page with ${page.messages.length} messages.`);

    found = page.messages.find(m => m.text.toLowerCase().startsWith(magicPhrase));
    if (found) {
      // To stop iterating over pages, you can break at any time
      break;
    }
  }

  if (found) {
    // never gonna let you down...
  }
})();
```

The second way is to use the third and fourth arguments to `WebClient#paginate()`. You might also prefer this way if
you're into functional programming 〰️. The third argument is a function called `shouldStop()`, which will get called
with each page as its only argument, and is expected to return `true` when you want to stop iterating. Also, when you
pass in a `shouldStop()` function, the `WebClient#paginate()` method returns a `Promise`. A promise for what, exactly?
Well that depends on whether you pass in the fourth argument, another function called `reduce()`. If you don't pass in
a `reduce()` function, then the `Promise` will resolve when `shouldStop()` returns true or there are no more pages left,
but it won't resolve to any value. When you do pass in `reduce()`, it will get called with three values: `accumulator`,
`page`, and `index`. That's right, if you've seen
[`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
before, this should look very familiar. The `page` and `index` are just what they sound like. They are the result of
each request, and the number of which request it is (starting at 0), respectively. The `accumulator` is more
interesting. On the first iteration (meaning when `reduce()` is called for the first time with the first page),
`accumulator` will be `undefined`. But whatever your `reduce()` function returns from that call, will become the value
of `accumulator` on the next iteration. This gives you a chance to build, or accumulate, a single value through all the
pages that you see (remember: you can still use `shouldStop()` to determine when to stop). Once the iteration has
stopped, the last value returned from `reduce()` will be the resolution value of the `Promise` returned from
`WebClient#paginate()` 😮.

Does it sound a little complicated? Don't worry, this example will help make it clear. Let's do the same thing as the
example above, but this time use functional programming approach.

```javascript
const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
const conversationId = 'C123456'; // some conversation ID

const magicPhrase = 'never gonna give you up';

(async () => {
  let found = undefined;
  await web.paginate('conversations.history', { channel: conversationId },
    // shouldStop(page) - returns true when we're done
    (page) => {
      found = page.messages.find(m => m.text.toLowerCase().startsWith(magicPhrase));
      return found;
    },
  );

  if (found) {
    // never gonna let you down...
  }
})();
```

Easy! In the previous example, we were only looking for one message, so all we needed was `shouldStop()`. But let's
say you wanted to count the number of users who sent a message since the last user said the magic phrase. That's
something `reduce()` can make much easier.

```javascript
const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
const conversationId = 'C123456'; // some conversation ID

const magicPhrase = 'never gonna give you up';

(async () => {
  const userSet = await web.paginate('conversations.history', { channel: conversationId },
    // shouldStop(page) - returns true when we're done
    (page) => {
      found = page.messages.find(m => m.text.toLowerCase().startsWith(magicPhrase));
      return found;
    },
    // reduce(accumulator, page, index)
    (accumulator, page) => {
      // Initialize the accumulator for the first iteration
      if (accumulator === undefined) {
        accumulator = new Set();
      }
      // Add each user into the Set (set will deduplicate)
      page.messages.forEach(m => accumulator.add(m.user))
      return accumulator;
    }
  );

  console.log(`${userSet.size} users have sent a message since the last time the magic phrase was said.`)
})();
```

That should be everything you need to work with cursor pagination enabled methods. A few methods that returns lists do
not support cursor-based pagination, but do support [other pagination
types](https://api.slack.com/docs/pagination#classic_pagination). These methods will not work with
`WebClient#paginate()` and should give extra care to use appropriate options to only request a page at a time. If you
don't, you risk failing with `Error`s which have a `code` property set to `errorCode.HTTPError`.

---

### Getting a list of channels

The `conversations.list` method is part of the [Conversations API](https://api.slack.com/docs/conversations-api).
This method returns a list of all [channel-like conversations](https://api.slack.com/types/conversation) in a workspace.
The "channels" returned depend on what the calling token has access to and the directives placed in the `types`
parameter. See the [conversations.list](https://api.slack.com/methods/conversations.list) documentation for details.

Since `conversations.list` is cursor pagination enabled, its easy to get a complete list of visible channels.

```javascript
const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, or xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

(async () => {
  // See: https://api.slack.com/methods/conversations.list
  const channels = await web.paginate('conversations.list', {
    exclude_archived: true,
    types: 'public_channel',
  }, () => false, (acc, page) => {
    if (acc === undefined) {
      acc = []
    }
    acc.concat(page.channels);
    return acc;
  });

  // `channels` is an array of channel info objects
  console.log(channels);
})();
```

---

### Making arbitrary API calls

If you prefer not to used the named methods, or you have a string with the name of the Web API method you'd like to
call, then `WebClient#apiCall()` is for you. It takes a `method` string as its first argument, and the `options` as
the second argument.

```javascript
const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, or xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// There might be logic in my app to decide whether I want to use chat.postMessage or chat.postEphemeral
const methodName = 'chat.postEphemeral';
(async () => {
  const res = await web.apiCall(methodName, { user: 'U12345', text: 'It\'s Morphin\' Time!' });
})();
```

**NOTE**: You won't get the helpful type hints when using `WebClient#apiCall()` to make arbitrary API calls.

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
