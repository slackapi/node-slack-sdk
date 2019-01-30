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
    - title: Using refresh tokens
    - title: Manually handling token rotation
    - title: Calling methods on behalf of users
    - title: Using a callback instead of a Promise
    - title: Changing the retry configuration
    - title: Changing the request concurrency
    - title: Rate limit handling
    - title: Pagination
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
how to post a message into a channel, DM, MPDM, or group. This will require the `chat:write` scope (either the `chat:user:write` or `chat:bot:write` for user-token apps).

```javascript
const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, xoxb)
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

// An access token (from your Slack app or custom integration - xoxp, xoxb, or the deprecated xoxa)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// Slack needs a file name for the upload
// This file is located in the current directory (`process.pwd()`)
const filename = 'test_file.csv';

// See: https://api.slack.com/methods/files.upload
web.files.upload({
  filename,
  // You can use a ReadableStream or a Buffer for the file option
  file: fs.createReadStream(`./${fileName}`),
  // Or you can use the content property (but not both)
  // content: 'plain string content that will be editable in Slack'
  // Specify channel(s) to upload the file to. Optional, unless also specifying a thread_ts value.
  // channels: 'C123456'
})
  .then((res) => {
    // `res` contains information about the uploaded file
    console.log('File uploaded: ', res.file.id);
  })
  .catch(console.error);
```

---

### Using refresh tokens
> WARNING: This feature is only supported for the now-deprecated workspace app tokens (xoxa). Refresh
> tokens will be available in the future to classic Slack apps in a couple of months. You may find more
> details [on the related blog post.](https://medium.com/slack-developer-blog/an-update-on-workspace-apps-aabc9e42a98b).

If you're using workspace apps, refresh tokens can be used to obtain short-lived access tokens that power your Web API calls from the `WebClient` (this is *required* for distributed apps). This can increase the security of your app since, in the event of a token being exposed accidentally, it won't be able to be used against your app or users after a short time. To enable the `WebClient` to automatically refresh and swap your access tokens, you need to pass your app's refresh token, client ID, and client secret in the `WebClientOptions`.

At the time of refresh, the `WebClient` will emit a `token_refreshed` event that will contain the new access token (`access_token`), time to expiration (`expires_in`), an associated team ID (`team_id`), and an associated enterprise ID (`enterprise_id`). It's recommended to listen to this event and store the access token in a database so you have access to your active token.

```javascript
const { WebClient } = require('@slack/client');

const refreshToken = process.env.SLACK_REFRESH_TOKEN;
const teamId = process.env.SLACK_TEAM_ID;
const enterpriseId = process.env.SLACK_ENTERPRISE_ID;
const clientId = process.env.SLACK_CLIENT_ID;
const clientSecret = process.env.SLACK_CLIENT_SECRET;


// Intialize a data structure to store team access token info (typically stored in a database)
const slackAuthorizations = [];

// Set authorization info in data structure
function setAuthorization(authorization) {
  // Get existing authorization, if it exists
  const authIndex = getAuthorizationIndex(teamId, enterpriseId);
  // If an existing authorization doesn't exist, add to end of array
  if (authIndex === -1) {
    authIndex = slackAuthorizations.length;
  }

  // Set authorization in data structure
  slackAuthorizations[authIndex] = {
    accessToken: authorization.access_token,
    expiresIn: authorization.expires_in,
    teamId: authorization.teamId,
    enterpriseId: authorization.enterpriseId
  };
}

// Gets index of authorization in data structure
function getAuthorizationIndex(teamId, enterpriseId) {
  slackAuthorizations.findIndex(function(authorization) {
    return (authorization.team_id === teamId &&
      authorization.enterprise_id === enterpriseId);
  })
}

// Get authorization from data structure
function getAuthorizationToken(teamId, enterpriseId) {
  return new Promise((resolve, reject) => {
    const authIndex = getAuthorizationIndex(teamId, enterpriseId);
    if (authIndex > -1) {
      return slackAuthorizations[authIndex].accessToken;
    } else {
      return undefined;
    }
  });
}

// Initiate WebClient
getAuthorization(teamId, enterpriseId).then((res) => {
  // If authorization doesn't exist, res will be undefined and the WebClient will fetch token
  // Instantiate the WebClient
  const web = new WebClient(res, {
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken
  });

  // WebClient is up and running, so let's post a message!
  const conversationId = 'C123456';
  web.chat.postMessage({ channel: conversationId, text: 'Hello world!'});
});


/* When a token is refreshed, a token_refreshed event is triggered:
 * {
 *    "access_token": "xoxa-...",
 *    "expires_in": 86400,
 *    "team_id": "T12345",
 *    "enterprise_id": "E1234A12AB"
 * }
 */
web.on('token_refreshed', (event) => {
  // It's recommended you store your new access token in a database to access it later
  setAuthorization(event);

  console.log(`Access token expires in ${event.expires_in}`);
});
```


---

### Manually handling token rotation
> WARNING: This feature is only supported for the now-deprecated workspace app tokens (xoxa). Token
> rotation will be available in the future to classic Slack apps in a couple of months. You may find more
> details [on the related blog post.](https://medium.com/slack-developer-blog/an-update-on-workspace-apps-aabc9e42a98b).

Note: Before implementing it on your own, it's suggested you read through the [token rotation documentation](http://api.slack.com/docs/rotating-and-refreshing-credentials).

If you need more control over token refreshing, you don't need to pass in your refresh token, client ID, or client secret. However, you'll need to listen for `invalid_auth` errors and make calls to `oauth.access` to fetch new access tokens:

```javascript
const { WebClient } = require('@slack/client');

const accessToken = process.env.SLACK_TOKEN;
const refreshToken = process.env.SLACK_REFRESH_TOKEN;
const id = process.env.SLACK_CLIENT_ID;
const secret = process.env.SLACK_CLIENT_SECRET;

const web = new WebClient(accessToken);

function refreshToken() {
  // Custom logic to refresh a token, possibly purging other stale data from db
  return new Promise((resolve, reject) => {
    web.oauth.access({
      client_id: id,
      client_secret: secret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }).then((res) => {
      /* Response contains new access token and time until expiration
       * {
       *    "access_token": "xoxa-...",
       *    "expires_in": 86400,
       *    "team_id": "T12345",
       *    "enterprise_id": "E1234A12AB"
       * }
       */
      accessToken = res.access_token;
      // web.token allows you to update the access token for WebClient
      web.token = accessToken;
      // Probably purge stale data from db at this point

      resolve();
    }).catch((err) => {
      console.log(err);
      reject();
    });
  });
}

function sendMessage(msg) {
  return web.chat.postMessage(msg)
    .then(console.log)
    .catch((error) => {
      if (error.code === ErrorCode.PlatformError && error.data.error === 'invalid_auth') {
        // This error could have occured because of an expired access token -- refresh, and try again.
        return refreshToken()
          .then(() => sendMessage(msg));
      }
      throw error;
    })
}

sendMessage({ channel: conversationId, text: 'Hello world!' })
  .catch((error) => console.error(`failed to send message: ${error.message}`));

```

---

### Getting a list of channels

The `conversations.list` method can be used to get a list of all channels in a Slack team.
This [Conversations API](https://api.slack.com/docs/conversations-api) method returns a list of all [channel-like conversations](https://api.slack.com/types/conversation) in a workspace. The "channels" returned depend on what the calling token has access to and the directives placed in the `types` parameter. See the [conversations.list](https://api.slack.com/methods/conversations.list) documentation for details.

```javascript
const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, or xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

function getAllChannels() {
  // See: https://api.slack.com/methods/conversations.list#arguments
  const param = {
    exclude_archived: true,
    types: 'public_channel',
    // Only get first 100 items
    limit: 100
  };
  return web.conversations.list(param).then(results => { return results.channels });
}

getAllChannels()
  .then(console.log)  // prints out the list of channels
  .catch(console.error);
```

**NOTE**: The example above can only get a specific number of items (by `limit` arguments). See the [Pagination](#pagination) section for the detailed description as to how you can handle pagination in API methods so that you can get full items even if you don't know how many items are there.

---

### Calling methods on behalf of users

When using [user tokens](https://api.slack.com/docs/token-types#user), some methods allow your app
to perform the action _on behalf of a user_. To use one of these methods,
your app will provide the user's ID as an option named `on_behalf_of`.

```javascript
const { WebClient } = require('@slack/client');

// An access token (from your Slack app - xoxp)
const token = process.env.SLACK_TOKEN;

// A user ID - this may be found in events or requests such as slash commands, interactive messages, actions, or dialogs
const userId = 'U0123456';

const web = new WebClient(token);

// https://api.slack.com/methods/users.identity
web.users.identity({ on_behalf_of: userId })
  .then((res) => {
    // `res` contains information about the user. the specific structure depends on the scopes your app was allowed.
    console.log(res);
  })
  .catch(console.error);
```

---

### Using a callback instead of a Promise

Every web API method can also be called with a callback function that takes `cb(error, response)`.
If you prefer callbacks over promises, here is the example above translated for callbacks:

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

Typically, you shouldn't have to worry about rate limits. By default, the `WebClient` will automatically wait the
appropriate amount of time and retry the request. During that time, all new requests from the `WebClient` will be
paused, so it doesn't make your rate-limiting problem worse. Then, once a successful response is received, the returned
Promise is resolved with the result.

In addition, you can observe when your application has been rate-limited by attaching a handler to the `rate_limited`
event.

```javascript
const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
web.on('rate_limited', (retryAfter) => {
  console.log(`A request was rate limited and future requests will be paused for ${retryAfter} seconds`);
});

const userIds = []; // a potentially long list of user IDs
for (user of userIds) {
  // if this list is large enough and responses are fast enough, this might trigger a rate-limit
  // but you will get each result without any additional code, since the rate-limited requests will be retried
  web.users.info({ user }).then(console.log).catch(console.error);
}
```

If you'd like to handle rate-limits in a specific way for your application, you can turn off the automatic retrying of
rate-limited API calls with the `rejectRateLimitedCalls` configuration option.

```javascript
const { WebClient, ErrorCode } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token, { rejectRateLimitedCalls: true });

const userIds = []; // a potentially long list of user IDs
for (user of userIds) {
  web.users.info({ user }).then(console.log).catch((error) => {
    if (error.code === ErrorCodes.RateLimitedError) {
      // the request was rate-limited, you can deal with this error in your application however you wish
      console.log(
        `The users.info with ID ${user} failed due to rate limiting. ` +
        `The request can be retried in ${error.retryAfter} seconds.`
      );
    } else {
      // some other error occurred
      console.error(error.message);
    }
  });
}
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

web.conversations.history({ channel: conversationId, limit: 500 })
  .then((res) => {
    console.log(`Requested 500 messages, received ${res.messages.length} in the response`);
  })
  .catch(console.error);
```

In the code above, the `res.messages` array will contain, at maximum, 500 messages. But what about all the previous
messages? That's what the `cursor` argument is used for 😎.

Inside `res` is a property called `response_metadata`, which might (or might not) have a `next_cursor` property. When
that `next_cursor` property exists, and is not an empty string, you know there's still more data in the list. If you
want to read more messages in that channel's history, you would call the method again, but use that value as the
`cursor` argument. **NOTE**: It should be rare that your app needs to read the entire history of a channel, avoid that!
With other methods, such as `conversations.list`, it would be more common to request the entire list of channels, so that's what we're
illustrating below.

```javascript
const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, or xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

function getAllChannels() {
  // See: https://api.slack.com/methods/conversations.list#arguments
  const param = {
    exclude_archived: true,
    types: 'public_channel',
    // See: https://api.slack.com/methods/conversations.list#pagination
    // We recommend no more than 200 results at a time.
    limit: 200
  };
  let channels = [];
  function pageLoaded(res) {
    channels = channels.concat(res.channels);
    if (res.response_metadata && res.response_metadata.next_cursor && res.response_metadata.next_cursor !== '') {
      // Add a 'cursor' arguments if a 'next_cursor' exists
      param.cursor = res.response_metadata.next_cursor;
      return web.conversations.list(param).then(pageLoaded);
    }
    return channels;
  }
  return web.conversations.list(param).then(pageLoaded);
}

getAllChannels()
  .then(console.log)  // prints out the list of channels
  .catch(console.error);
```

Cursor-based pagination, if available for a method, is always preferred. In fact, when you call a cursor-paginated
method without a `cursor` or `limit`, the `WebClient` will **automatically paginate** the requests for you until the
end of the list. Then, each page of results are concatenated, and that list takes the place of the last page in the last
response. In other words, if you don't specify any pagination options then you get the whole list in the result as well
as the non-list properties of the last API call. It's always preferred to perform your own pagination by specifying the
`limit` and/or `cursor` since you can optimize to your own application's needs.

A few methods that returns lists do not support cursor-based pagination, but do support
[other pagination types](https://api.slack.com/docs/pagination#classic_pagination). These methods will not be
automatically paginated for you, so you should give extra care and use appropriate options to only request a page at a
time. If you don't, you risk failing with `Error`s which have a `code` property set to `errorCode.HTTPError`.

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

// Not shown: did some OAuth to receive `code` grant
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


