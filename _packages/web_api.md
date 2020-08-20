---
title: Web API
permalink: /web-api
redirect_from:
 - /basic_usage
 - /web_api
order: 1
anchor_links_header: Usage
---


The `@slack/web-api` package contains a simple, convenient, and configurable HTTP client for making requests to Slack's
[Web API](https://api.slack.com/web). Use it in your app to call any of the over 130
[methods](https://api.slack.com/methods), and let it handle formatting, queuing, retrying, pagination, and more.

## Installation

```shell
$ npm install @slack/web-api
```

---

### Initialize the client

The package exports a `WebClient` class. All you need to do is instantiate it, and you're ready to go. You'll typically
initialize it with a `token`, so that you don't have to provide the token each time you call a method. A token usually
begins with `xoxb` or `xoxp`. You get them from each workspace an app is installed onto. The app configuration pages
help you get your first token for your development workspace.

```javascript
const { WebClient } = require('@slack/web-api');

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;

// Initialize
const web = new WebClient(token);
```

<details>
<summary markdown="span">
<strong><i>Initializing without a token</i></strong>
</summary>

Alternatively, you can create a client without an token, and use it with multiple workspaces as long as you supply a
`token` when you call a method.

```javascript
const { WebClient } = require('@slack/web-api');

// Initialize a single instance for the whole app
const web = new WebClient();

// Find a token in storage (database) before making an API method call
(async () => {
  // Some fictitious database
  const token = await db.findTokenByTeam(teamId, enterpriseId)

  // Call the method
  const result = web.auth.test({ token });
})();
```
</details>

---

### Call a method

The client instance has a named method for each of the public methods in the Web API. The most popular one is
called `chat.postMessage`, and its used to send a message to a conversation. For every method, you pass arguments as
properties of an options object. This helps with the readablility of your code since every argument has a name. All
named methods return a `Promise` which resolves with the response data, or rejects with an error.

```javascript
// Given some known conversation ID (representing a public channel, private channel, DM or group DM)
const conversationId = '...';

(async () => {

  // Post a message to the channel, and await the result.
  // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
  const result = await web.chat.postMessage({
    text: 'Hello world!',
    channel: conversationId,
  });

  // The result contains an identifier for the message, `ts`.
  console.log(`Successfully send message ${result.ts} in conversation ${conversationId}`);
})();
```

**Hint**: If you're using an editor that supports TypeScript, even if you're not using TypeScript to write your code,
you'll get hints for all the arguments each method supports. This helps you save time by reducing the number of
times you need to pop out to a webpage to check the reference. There's more information about [using
TypeScript](https://slack.dev/node-slack-sdk/typescript) with this package in the documentation website.

**Note**: Use the [Block Kit Builder](https://api.slack.com/tools/block-kit-builder) for a playground
where you can prototype your message's look and feel.

<details>
<summary markdown="span">
<strong><i>Using a dynamic method name</i></strong>
</summary>

If you want to provide the method name as a string, so that you can decide which method to call dynamically, or to call
a method that might not be available in your version of the client, use the `WebClient.apiCall(methodName, [options])`
method. The API method call above can also be written as follows:

```javascript
const conversationId = '...';
(async () => {

  // Using apiCall() allows the app to call any method and to do it programmatically
  const response = await web.apiCall('chat.postMessage', {
    text: 'Hello world!',
    channel: conversationId,
  });
})();
```
</details>

---

### Handle errors

Errors can happen for many reasons: maybe the token doesn't have the proper [scopes](https://api.slack.com/scopes) to
call a method, maybe its been revoked by a user, or maybe you just used a bad argument. In these cases, the returned
`Promise` will reject with an `Error`. You should catch the error and use the information it contains to decide how your
app can proceed.

Each error contains a `code` property, which you can check against the `ErrorCode` export to understand the kind of
error you're dealing with. For example, when Slack responds to your app with an error, that is an
`ErrorCode.PlatformError`. These types of errors provide Slack's response body as the `data` property.

```javascript
// Import ErrorCode from the package
const { WebClient, ErrorCode } = require('@slack/web-api');

(async () => {

  try {
    // This method call should fail because we're giving it a bogus user ID to lookup.
    const response = await web.users.info({ user: '...' });
  } catch (error) {
    // Check the code property, and when its a PlatformError, log the whole response.
    if (error.code === ErrorCode.PlatformError) {
      console.log(error.data);
    } else {
      // Some other error, oh no!
      console.log('Well, that was unexpected.');
    }
  }
})();
```

<details>
<summary markdown="span">
<strong><i>More error types</i></strong>
</summary>

There are a few more types of errors that you might encounter, each with one of these `code`s:

* `ErrorCode.RequestError`: A request could not be sent. A common reason for this is that your network connection is
  not available, or `api.slack.com` could not be reached. This error has an `original` property with more details.

* `ErrorCode.RateLimitedError`: The Web API cannot fulfill the API method call because your app has made too many
  requests too quickly. This error has a `retryAfter` property with the number of seconds you should wait before trying
  again. See [the documentation on rate limit handling](https://slack.dev/node-slack-sdk/web-api/#rate-limits) to
  understand how the client will automatically deal with these problems for you.

* `ErrorCode.HTTPError`: The HTTP response contained an unfamiliar status code. The Web API only responds with `200`
  (yes, even for errors) or `429` (rate limiting). If you receive this error, its likely due to a problem with a proxy,
  a custom TLS configuration, or a custom API URL. This error has the `statusCode`, `statusMessage`, `headers`, and
  `body` properties containing more details.
</details>

---

### Pagination

[Many of the Web API's methods](https://api.slack.com/docs/pagination#methods_supporting_cursor-based_pagination) return
lists of objects, and are known to be **cursor-paginated**. The result of calling these methods will contain a part of
the list, or a page, and also provide you with information on how to continue to the next page on a subsequent API call.
Instead of calling many times manually, the `WebClient` can manage getting each page, allowing you to determine when to
stop, and help you process the results.

The process of retrieving multiple pages from Slack's API can be described as **asynchronous iteration**, which means
you're processing items in a collection, but getting each item is an asynchronous operation. Fortunately, JavaScript
has this concept built in, and in newer versions of the language there's syntax to make it even simpler:
[`for await...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of).

```javascript
(async () => {
  let result;

  // Async iteration is similar to a simple for loop.
  // Use only the first two parameters to get an async iterator.
  for await (const page of web.paginate('something.list', { name: 'value' })) {
    // You can inspect each page, find your result, and stop the loop with a `break` statement
    if (containsTheThing(page.something)) {
      result = page.something.thing;
      break;
    }
  }
});
```

The `for await...of` syntax is available in Node v10.0.0 and above. If you're using an older version of Node, see
functional iteration below.

<details>
<summary markdown="span">
<strong><i>Using functional iteration</i></strong>
</summary>

The `.paginate()` method can accept up to two additional parameters. The third parameter, `stopFn`, is a function that
is called once for each page of the result, and should return `true` when the app no longer needs to get another page.
The fourth parameter is `reducerFn`, which is a function that gets called once for each page of the result, but can
be used to aggregate a result. The value it returns is used to call it the next time as the `accumulator`. The first
time it gets called, the `accumulator` is undefined.

```javascript
(async () => {

  // The first two parameters are the method name and the options object.
  const done = await web.paginate('something.list', { name: 'value' },
    // The third is a function that receives each page and should return true when the next page isn't needed.
    (page) => { /* ... */ },
    // The fourth is a reducer function, similar to the callback parameter of Array.prototype.reduce().
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    // The accumulator is initialized to undefined.
    (accumulator, page, index) => { /* ... */ },
  );
});
```

The returned value is a `Promise`, but what it resolves to depends on whether or not you include the fourth (optional)
parameter. If you don't include it, the resolved value is always `undefined`. In this case, its used for control flow
purposes (resuming the rest of your program), and the function in the third parameter is used to capture a result. If
you do include the fourth parameter, then the resolved value is the value of the `accumulator`. This is a familiar
pattern for people that use _functional programming_.

</details>

---

### Opening modals
[Modals](https://api.slack.com/block-kit/surfaces/modals) can be created by calling the `views.open` method. The method requires you to pass a valid [view payload](https://api.slack.com/reference/block-kit/views) in addition to a `trigger_id`, which can be obtained when a user invokes your app using a slash command, clicking a button, or using [another interactive action](https://api.slack.com/reference/messaging/interactive-components).

```javascript
const { WebClient } = require('@slack/web-api');

// trigger_ids can be obtained when a user invokes your app.
// Find more information on triggers: https://api.slack.com/docs/triggers
const trigger = 'VALID_TRIGGER_ID';

(async () => {

  // Open a modal.
  // Find more arguments and details of the response: https://api.slack.com/methods/views.open
  const result = await web.views.open({
    trigger_id: trigger,
    view: {
      type: 'modal',
      callback_id: 'view_identifier',
      title: {
        type: 'plain_text',
        text: 'Modal title'
      },
      submit: {
        type: 'plain_text',
        text: 'Submit'
      },
      blocks: [
        {
          type: 'input',
          label: {
            type: 'plain_text',
            text: 'Input label'
          },
          element: {
            type: 'plain_text_input',
            action_id: 'value_indentifier'
          }
        }
      ]
    }
  });

  // The result contains an identifier for the root view, view.id
  console.log(`Successfully opened root view ${result.view.id}`);
})();
```

<details>
<summary markdown="span">
<strong><i>Dynamically updating a modal</i></strong>
</summary>

After the modal is opened, you can update it dynamically by calling `views.update` with the view ID returned in the `views.open` result.

```javascript
const { WebClient } = require('@slack/web-api');

// The view ID returned in a views.open call
const vid = 'YOUR_VIEW_ID';

(async () => {

  // Update a modal
  // Find more arguments and details of the response: https://api.slack.com/methods/views.update
  const result = await web.views.update({
    view_id: vid
    view: {
      type: 'modal',
      callback_id: 'view_identifier',
      title: {
        type: 'plain_text',
        text: 'Modal title'
      },
      blocks: [
        {
          type: 'section',
          text: {
            type: 'plain_text',
            text: 'An updated modal, indeed'
          }
        }
      ]
    }
  });
})();
```
</details>

---

### Logging

The `WebClient` will log interesting information to the console by default. You can use the `logLevel` to decide how
much information, or how interesting the information needs to be, in order for it to be output. There are a few possible
log levels, which you can find in the `LogLevel` export. By default, the value is set to `LogLevel.INFO`. While you're
in development, its sometimes helpful to set this to the most verbose: `LogLevel.DEBUG`.

```javascript
// Import LogLevel from the package
const { WebClient, LogLevel } = require('@slack/web-api');

// Log level is one of the options you can set in the constructor
const web = new WebClient(token, {
  logLevel: LogLevel.DEBUG,
});
```

All the log levels, in order of most to least information are: `DEBUG`, `INFO`, `WARN`, and `ERROR`.

<details>
<summary markdown="span">
<strong><i>Sending log output somewhere besides the console</i></strong>
</summary>

You can also choose to have logs sent to a custom logger using the `logger` option. A custom logger needs to implement
specific methods (known as the `Logger` interface):

| Method       | Parameters        | Return type |
|--------------|-------------------|-------------|
| `setLevel()` | `level: LogLevel` | `void`      |
| `setName()`  | `name: string`    | `void`      |
| `debug()`    | `...msgs: any[]`  | `void`      |
| `info()`     | `...msgs: any[]`  | `void`      |
| `warn()`     | `...msgs: any[]`  | `void`      |
| `error()`    | `...msgs: any[]`  | `void`      |

A very simple custom logger might ignore the name and level, and write all messages to a file.

```javascript
const { createWriteStream } = require('fs');
const logWritable = createWriteStream('/var/my_log_file'); // Not shown: close this stream

const web = new WebClient(token, {
  // Creating a logger as a literal object. It's more likely that you'd create a class.
  logger: {
    debug(...msgs): { logWritable.write('debug: ' + JSON.stringify(msgs)); },
    info(...msgs): { logWritable.write('info: ' + JSON.stringify(msgs)); },
    warn(...msgs): { logWritable.write('warn: ' + JSON.stringify(msgs)); },
    error(...msgs): { logWritable.write('error: ' + JSON.stringify(msgs)); },
    setLevel(): { },
    setName(): { },
  },
});
```
</details>

---

### Automatic retries

In production systems, you want your app to be resilient to short hiccups and temporary outages. Solving for this
problem usually involves building a queuing system that handles retrying failed tasks. The `WebClient` comes with this
queuing system out of the box, and its on by default! The client will retry a failed API method call up to 10 times,
spaced out over about 30 minutes. If the request doesn't succeed in that time, then the returned `Promise` will reject.
You can observe each of the retries in your logs by [setting the log level to DEBUG](#logging). Try running the
following code with your network disconnected, and then re-connect after you see a couple of log messages:

```javascript
const { WebClient, LogLevel } = require('@slack/web-api');

const web = new WebClient('bogus token');

(async () => {
  await web.auth.test();

  console.log('Done!');
})();
```

Shortly after re-connecting your network, you should see the `Done!` message. Did you notice the program doesn't use a
valid token? The client is doing something clever and helpful here. It knows the difference between an error such as not
being able to reach `api.slack.com` and an error in the response from Slack about an invalid token. The former is
something that can be resolved with a retry, so it was retried. The invalid token error means that the call isn't going
to succeed until your app does something differently, so it stops attempting retries.

You might not think 10 reties in 30 minutes is a good policy for your app. No problem, you can set the `retryConfig` to
one that works better for you. The `retryPolicies` export contains a few well known options, and you can always write
your own.

```javascript
const { WebClient, retryPolicies } = require('@slack/web-api');

const web = new WebClient(token, {
  retryConfig: retryPolicies.fiveRetriesInFiveMinutes,
});
```

Here are some other values that you might want to use for `retryConfig`:

| `retryConfig`                                  | Description                     |
|------------------------------------------------|---------------------------------|
| `retryPolicies.tenRetriesInAboutThirtyMinutes` | (default)                       |
| `retryPolicies.fiveRetriesInFiveMinutes`       | Five attempts in five minutes   |
| `retryPolicies.rapidRetryPolicy`               | Used to keep tests running fast |
| `{ retries: 0 }`                               | No retries ([other options](https://github.com/tim-kos/node-retry#retryoperationoptions)) |

**Note**: If an API call results in a rate limit being exceeded, you might still notice the client automatically
retrying the API call. If you'd like to opt out of that behavior, set the `rejectRateLimitedCalls` option to `true`.

---

### Upload a file

A couple methods, `files.upload` and `users.setPhoto`, allow you to upload a file over the API. In Node, there are a few
ways you might be dealing with files, or more generally, binary data. When you have the whole file in memory (like when
you've just generated or processed an image), then in Node you'd have a `Buffer` that contains that binary data. Or,
when you are reading the file from disk or a network (like when you have a path to file name), then you'd typically have
a `ReadableStream`. The client can handle both of these binary data types for you, and it looks like any other API call.

The following example shows how you can use [`files.upload`](https://api.slack.com/methods/files.upload) to upload a
file that is read from disk (as a `ReadableStream`).

```javascript
const { createReadStream } = require('fs');
const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

// A file name is required for the upload
const filename = 'test_file.csv';

(async () => {
  // Just use the `file` argument as the documentation suggests
  // See: https://api.slack.com/methods/files.upload
  const result = await web.files.upload({
    filename,
    // You can use a ReadableStream or a Buffer for the file option
    // This file is located in the current directory (`process.pwd()`), so the relative path resolves
    file: createReadStream(`./${fileName}`),
  })

  // `res` contains information about the uploaded file
  console.log('File uploaded: ', result.file.id);
})();
```

In the example above, you could also use a `Buffer` object as the value for the `file` property of the options object.

---

### Proxy requests with a custom agent

The client allows you to customize the HTTP
[`Agent`](https://nodejs.org/docs/latest/api/http.html#http_class_http_agent) used to create the connection to Slack.
Using this option is the best way to make all requests from your app through a proxy, which is a common requirement in
many corporate settings.

In order to create an `Agent` from some proxy information (such as a host, port, username, and password), you can use
one of many npm packages. We recommend [`https-proxy-agent`](https://www.npmjs.com/package/https-proxy-agent). Start
by installing this package and saving it to your `package.json`.

```shell
$ npm install https-proxy-agent
```

Import the `HttpsProxyAgent` class, and create an instance that can be used as the `agent` option of the `WebClient`.

```javascript
const { WebClient } = require('@slack/web-api');
const HttpsProxyAgent = require('https-proxy-agent');
const token = process.env.SLACK_TOKEN;

// One of the ways you can configure HttpsProxyAgent is using a simple string.
// See: https://github.com/TooTallNate/node-https-proxy-agent for more options
const proxy = new HttpsProxyAgent(process.env.http_proxy || 'http://168.63.76.32:3128');

const web = new WebClient(token, { agent: proxy });

// All API method calls will now go through the proxy
```

---

### Rate limits

When your app calls API methods too frequently, Slack will politely ask (by returning an error) the app to slow down,
and also let your app know how many seconds later it should try again. This is called **rate limiting** and the
`WebClient` handles it for your app with grace. The client will understand these rate limiting errors, wait the
appropriate amount of time, and then retry the request without any changes in your code. The `Promise` returned only
resolves when Slack has given your app a real response.

It's a good idea to know when you're bumping up against [these limits](https://api.slack.com/docs/rate-limits), so that
you might be able to change the behavior of your app to hit them less often. Your users would surely appreciate getting
things done without the delay. Each time a rate limit related error occurs, the `WebClient` instance emits an event:
`WebClientEvent.RATE_LIMITED`. We recommend that you use the event to inform users when something might take longer than
expected, or just log it for later.

```javascript
const { WebClient, WebClientEvent } = require('@slack/web-api');
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

web.on(WebClientEvent.RATE_LIMITED, (numSeconds) => {
  console.log(`A rate-limiting error occurred and the app is going to retry in ${numSeconds} seconds.`);
});
```

You might not want to the `WebClient` to handle rate limits in this way. Perhaps the operation was time sensitive, and
it won't be useful by the time Slack is ready for another request. Or, you have a more sophisticated approach. In these
cases, you can set the `rejectRateLimitedCalls` option on the client to `true`. Once you set this option, method calls
can fail with rate limiting related errors. These errors have a `code` property set to `ErrorCode.RateLimitedError`. See
[error handling](#handle-errors) for more details.

```javascript
const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_TOKEN;

// Setting the rejectRateLimitedCalls option to true turns off automatic retries
const web = new WebClient(token, { rejectRateLimitedCalls: true });
```

---

### Request concurrency

Each of the API method calls the client starts are happening **concurrently**, or at the same time. If your app tries
to perform a lot of method calls, let's say 100 of them, at the same time, each one of them would be competing for the
same network resources (such as bandwidth). By competing, they might negatively affect the performance of all the rest,
and therefore negatively affect the performance of your app. This is one of the reasons why the `WebClient` limits the
**concurrency** of requests by default to ten, which means it keeps track of how many requests are waiting, and only
starts an eleventh request when one of them completes. The exact number of requests the client allows at the same time
can be set using the `maxRequestConcurrency` option.

```javascript
const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_TOKEN;

// Limit the number of concurrent requests to 5
const web = new WebClient(token, { maxRequestConcurrency: 5 });
```

The lower you set the `maxRequestConcurrency`, the less parallelism you'll have in your app. Imagine setting the
concurrency to `1`. Each of the method calls would have to wait for the previous method call to complete before it can
even be started. This could slow down your app significantly. So its best not to set this number too low.

Another reason, besides competing for resources, that you might limit the request concurrency is to **minimize the
amount of state** in your app. Each request that hasn't completed is in some ways a piece of state that hasn't yet been
stored anywhere except the memory of your program. In the scenario where you had 100 method calls waiting, and your
program unexpectedly crashes, you've lost information about 100 different things going on in the app. But by limiting
the concurrency to a smaller number, you can minimize this risk. So its best not to set this number too high.

---

### Custom TLS configuration

Each connection to Slack starts with a handshake that allows your app to trust that it is actually Slack you are
connecting to. The system for establishing this trust is called TLS. In order for TLS to work, the host running your app
keeps a list of trusted **certificate authorities**, that it can use to verify a signature Slack produces. You don't
usually see this list, its usually a part of the operating system you're running on. In very special cases, like certain
testing techniques, you might want to send a request to another party that doesn't have a valid TLS signature that your
certificate authority would verify. In these cases, you can provide alternative TLS settings, in order to change how the
operating system might determine whether the signature is valid. You can use the `tls` option to describe the settings
you want (these settings are the most common and useful from the [standard Node
API](https://nodejs.org/dist/latest/docs/api/tls.html#tls_tls_createsecurecontext_options)).

```javascript
const { WebClient } = require('@slack/web-api');
const { readFileSync } = require('fs');
const token = process.env.SLACK_TOKEN;

// Load a custom certificate authority from a file in the current directory
const ca = readFileSync('./ca.crt');

// Initialize a client with the custom certificate authority
const web = new WebClient(token, { tls: { ca } });
```

| `tls` property  | Description  |
|-----------------|--------------|
| `ca`            | Optionally override the trusted CA certificates. Any `string` or `Buffer` can contain multiple PEM CAs concatenated together. |
| `key`           | Private keys in PEM format. PEM allows the option of private keys being encrypted. Encrypted keys will be decrypted with `passphrase`. |
| `cert`          | Cert chains in PEM format. One cert chain should be provided per private key. |
| `pfx`           | PFX or PKCS12 encoded private key and certificate chain. `pfx` is an alternative to providing `key` and `cert` individually. PFX is usually encrypted, if it is, `passphrase` will be used to decrypt it. |
| `passphrase`    | Shared passphrase used for a single private key and/or a PFX. |

---

### Custom API URL

The URLs for method calls to Slack's Web API always begin with `https://slack.com/api/`. In very special cases, such as
certain testing techniques, you might want to send these requests to a different URL. The `slackApiUrl` option allows
you to replace this prefix with another.

```javascript
const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_TOKEN;

const options = {};

// In a testing environment, configure the client to send requests to a mock server
if (process.env.NODE_ENV === 'test') {
  options.slackApiUrl = 'http://localhost:8888/api/';
}

// Initialize a client using the configuration
const web = new WebClient(token, options);
```

---

### Exchange an OAuth grant for a token

There's one method in the Slack Web API that doesn't requires a token, because its the method that gets a token! This
method is called [`oauth.v2.access`](https://api.slack.com/methods/oauth.v2.access). It's used as part of the [OAuth
2.0](https://api.slack.com/authentication/oauth-v2) process that users initiate when installing your app into a workspace. In the
last step of this process, your app has received an authorization grant called `code` which it needs to exchange for
an access token (`token`). You can use an instance of the `WebClient` that has no token to easily complete this
exchange.

```javascript
const { WebClient } = require('@slack/web-api');

// App credentials found in the Basic Information section of the app configuration
const clientId = process.env.SLACK_CLIENT_ID;
const clientSecret = process.env.SLACK_CLIENT_SECRET;

// Not shown: received an authorization grant called `code`.
(async () => {
  // Create a client instance just to make this single call, and use it for the exchange
  const result = await (new WebClient()).oauth.v2.access({
    client_id: clientId,
    client_secret: clientSecret,
    code
  });

  // It's now a good idea to save the access token to your database
  // Some fictitious database
  await db.createAppInstallation(result.team_id, result.enterprise_id, result.access_token, result.bot);
})();
```

**Note**: If you're looking for a more complete solution that handles more of the OAuth process for your app, take a
look at the [@aoberoi/passport-slack Passport Strategy](https://github.com/aoberoi/passport-slack).

