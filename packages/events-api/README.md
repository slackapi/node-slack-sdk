# Slack Events API

<!-- TODO: per-job badge https://github.com/bjfish/travis-matrix-badges/issues/4 -->
[![Build Status](https://travis-ci.org/slackapi/node-slack-sdk.svg?branch=master)](https://travis-ci.org/slackapi/node-slack-sdk)
<!-- TODO: per-flag badge https://docs.codecov.io/docs/flags#section-flag-badges-and-graphs -->
[![codecov](https://codecov.io/gh/slackapi/node-slack-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/slackapi/node-slack-sdk)
<!-- TODO: npm versions with scoped packages: https://github.com/rvagg/nodei.co/issues/24 -->

The `@slack/events-api` package helps your app respond to events from Slack's [Events API](https://api.slack.com/events-api)
such as new messages, emoji reactions, files, and much more. This package will help you start with convenient and secure
defaults.

## Installation

```shell
$ npm install @slack/events-api
```

<!-- START: Remove before copying into the docs directory -->

## Usage

These examples show how to get started using the most common features. You'll find even more extensive
[documentation on the package's website](https://slack.dev/node-slack-sdk/events-api).

<!-- END: Remove before copying into the docs directory -->

Before building an app, you'll need to [create a Slack app](https://api.slack.com/apps/new) and install it to your
development workspace. You'll also **need a public URL** where the app can begin receiving events. Finally, you'll need
to find the **request signing secret** given to you by Slack under the "Basic Information" of your app configuration.

It may be helpful to read the tutorials on [getting started](https://slack.dev/node-slack-sdk/getting-started) and
[getting a public URL that can be used for development](https://slack.dev/node-slack-sdk/tutorials/local-development).
After you have a URL for development, see the section on [verifying a request URL for development](#verify-tool) so you
can save it as the Request URL in your app configuration. Now you can begin adding event subscriptions, just be sure to
install the app in your development workspace again each time you add new scopes (typically whenever you add new event
subscriptions).

---

### Initialize the event adapter

The package exports a `createEventAdapter()` function, which returns an instance of the `SlackEventAdapter` class. The function
requires one parameter, the **request signing secret**, which it uses to enforce that all events are coming from Slack
to keep your app secure.

```javascript
const { createEventAdapter } = require('@slack/events-api');

// Read the signing secret from the environment variables
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;

// Initialize
const slackEvents = createEventAdapter(slackSigningSecret);
```

---

### Start a server

The event adapter transforms incoming HTTP requests into verified and parsed events.
That means, in order for it to emit events for your app, it needs an HTTP server. The adapter can receive requests from
an existing server, or as a convenience, it can create and start the server for you.

In the following example, the event adapter starts an HTTP server using the `.start()` method. Starting the
server requires a `port` for it to listen on. This method returns a `Promise` which resolves for an instance of an
[HTTP server](https://nodejs.org/api/http.html#http_class_http_server) once it's ready to emit events. By default,
the built-in server will be listening for events on the path `/slack/events`, so make sure your Request URL ends with
this path.

```javascript
const { createEventAdapter } = require('@slack/events-api');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);

// Read the port from the environment variables, fallback to 3000 default.
const port = process.env.PORT || 3000;

(async () => {
  // Start the built-in server
  const server = await slackEvents.start(port);

  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`);
})();
```

**Note**: To gracefully stop the server, there's also the `.stop()` method, which returns a `Promise` that resolves
when the server is no longer listening.

<details>
<summary markdown="span">
<strong><i>Using an existing HTTP server</i></strong>
</summary>

The event adapter can receive requests from an existing Node HTTP server. You still need to specify a port, but this
time its only given to the server. Starting a server in this manner means it is listening to requests on all paths; as
long as the Request URL is routed to this port, the adapter will receive the requests.

```javascript
const { createServer } = require('http');
const { createEventAdapter } = require('@slack/events-api');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);

// Read the port from the environment variables, fallback to 3000 default.
const port = process.env.PORT || 3000;

// Initialize a server using the event adapter's request listener
const server = createServer(slackEvents.requestListener());

server.listen(port, () => {
  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`);
});
```

</details>

<details>
<summary markdown="span">
<strong><i>Using an Express app</i></strong>
</summary>

The event adapter can receive requests from an [Express](http://expressjs.com/) application. Instead of plugging the
adapter's request listener into a server, it's plugged into the Express `app`. With Express, `app.use()` can be used to
set which path you'd like the adapter to receive requests from. **You should be careful about one detail: if your
Express app is using the `body-parser` middleware, then the adapter can only work if it comes _before_ the body parser
in the middleware stack.** If you accidentally allow the body to be parsed before the adapter receives it, the adapter
will emit an error, and respond to requests with a status code of `500`.

```javascript
const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { createEventAdapter } = require('@slack/events-api');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const port = process.env.PORT || 3000;
const slackEvents = createEventAdapter(slackSigningSecret);

// Create an express application
const app = express();

// Plug the adapter in as a middleware
app.use('/my/path', slackEvents.requestListener());

// Example: If you're using a body parser, always put it after the event adapter in the middleware stack
app.use(bodyParser());

// Initialize a server for the express app - you can skip this and the rest if you prefer to use app.listen()
const server = createServer(app);
server.listen(port, () => {
  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`);
});
```
</details>

---

### Listen for an event

Apps register functions, called listeners, to be triggered when an event of a specific type is received by the
adapter. If you've used Node's [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter) pattern
before, then you're already familiar with how this works, since the adapter is an `EventEmitter`.

The `event` argument passed to the listener is an object. It's contents corresponds to the [type of
event](https://api.slack.com/events) its registered for.

```javascript
const { createEventAdapter } = require('@slack/events-api');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);
const port = process.env.PORT || 3000;

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

(async () => {
  const server = await slackEvents.start(port);
  console.log(`Listening for events on ${server.address().port}`);
})();
```

---

### Handle errors

If an error is thrown inside a listener, it must be handled, otherwise it will crash your program. The adapter allows
you to define an error handler for errors thrown inside any listener, using the `.on('error', handlernFn)` method.
It's a good idea to, at the least, log these errors so you're aware of what happened.

```javascript
const { createEventAdapter } = require('@slack/events-api');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);
const port = process.env.PORT || 3000;

slackEvents.on('message', (event) => {
  // Oops! This throws a TypeError.
  event.notAMethod();
});

// All errors in listeners are caught here. If this weren't caught, the program would terminate.
slackEvents.on('error', (error) => {
  console.log(error.name); // TypeError
});

(async () => {
  const server = await slackEvents.start(port);
  console.log(`Listening for events on ${server.address().port}`);
})();
```

---

### Debugging

If you're having difficulty understanding why a certain request received a certain response, you can try debugging your
program. A common cause is a request signature verification failing, sometimes because the wrong secret was used. The
following example shows how you might figure this out using debugging.

Start your program with the `DEBUG` environment variable set to `@slack/events-api:*`. This should only be used for
development/debugging purposes, and should not be turned on in production. This tells the adapter to write messages
about what its doing to the console. The easiest way to set this environment variable is to prepend it to the `node`
command when you start the program.

```shell
$ DEBUG=@slack/events-api:* node app.js
```

`app.js`:

```javascript
const { createEventAdapter } = require('@slack/events-api');
const port = process.env.PORT || 3000;

// Oops! Wrong signing secret
const slackEvents = createEventAdapter('not a real signing secret');

slackEvents.on('message', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

(async () => {
  const server = await slackEvents.start(port);
  console.log(`Listening for events on ${server.address().port}`);
})();
```

When the adapter receives a request, it will now output something like the following to the console:

```
@slack/events-api:adapter adapter instantiated - options: { includeBody: false, includeHeaders: false, waitForResponse: false }
@slack/events-api:adapter server created - path: /slack/events
@slack/events-api:adapter server started - port: 3000
@slack/events-api:http-handler request received - method: POST, path: /slack/events
@slack/events-api:http-handler request signature is not valid
@slack/events-api:http-handler handling error - message: Slack request signing verification failed, code: SLACKHTTPHANDLER_REQUEST_SIGNATURE_VERIFICATION_FAILURE
@slack/events-api:http-handler sending response - error: Slack request signing verification failed, responseOptions: {}
```

This output tells the whole story of why the adapter responded to the request the way it did. Towards the end you can
see that the signature verification failed.

If you believe the adapter is behaving incorrectly, before filing a bug please gather the output from debugging and
include it in your bug report.

---

### Verify tool

Once you have a URL where you'd like to receive requests from the Events API, you must save it as a Request URL in your
Slack app configuration. But in order to save it, your app needs to respond to a challenge request, so that Slack knows
its your app that owns this URL. _How can you do that if you haven't built the app yet?_ For development, there is a
command line tool built into this package that you can use to respond to the challenge.

Once the package is installed in your app, a command line program will be available in your `node_modules` directory.

```shell
$ ./node_modules/.bin/slack-verify --secret <signing_secret> [--path=/slack/events] [--port=3000]
```

Run the command with your own signing secret (provided by Slack in the "Basic Information"), and optionally a path and a
port. A web server will be listening for requests containing a challenge and respond to them the way Slack expects. Now
input input and save the Request URL. Once its saved, you can stop the server with `Ctrl-C` and start working on your
app.

**Note:** If you're using a tunneling tool like [ngrok](https://ngrok.com), the Request URL you save in Slack would be
the tunnel URL, such as `https://abcdef.ngrok.io`, appended with the path. In other words, it should look like
`https://abcdef.ngrok.io/slack/events`. Also make sure that when ngrok was started, it's set to use the port that the
tool is listening on. In other words, start ngrok with a command like `ngrok http 3000`.

---

### More

The [documentation website](https://slack.dev/node-slack-sdk/events-api) has information about these additional features of
the `SlackEventAdapter`:

*  Receiving event envelope and header data
*  Custom responses

---

## Examples

*  [Greet And React](../../examples/greet-and-react) - A ready to run sample app that listens for messages and emoji
   reactions, and responds to them. It is built on top of the [Express](https://expressjs.com) web framework. It also
   implements [OAuth](https://api.slack.com/docs/oauth) to demonstrate how an app can handle installation to additional
   workspaces and be structured to handle events from multiple workspaces.

---

## Requirements

This package supports Node v8 LTS and higher. It's highly recommended to use [the latest LTS version of
node](https://github.com/nodejs/Release#release-schedule), and the documentation is written using syntax and features
from that version.

## Getting Help

If you get stuck, we're here to help. The following are the best ways to get assistance working through your issue:

  * [Issue Tracker](http://github.com/slackapi/node-slack-sdk/issues) for questions, feature requests, bug reports and
    general discussion related to these packages. Try searching before you create a new issue.
  * [Email us](mailto:developers@slack.com) in Slack developer support: `developers@slack.com`
  * [Bot Developers Hangout](https://community.botkit.ai/): a Slack community for developers
    building all types of bots. You can find the maintainers and users of these packages in **#sdk-node-slack-sdk**.
