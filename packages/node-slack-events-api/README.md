# Slack Events API adapter for Node and Express

[![Build Status](https://travis-ci.org/slackapi/node-slack-events-api.svg?branch=master)](https://travis-ci.org/slackapi/node-slack-events-api)
[![codecov](https://codecov.io/gh/slackapi/node-slack-events-api/branch/master/graph/badge.svg)](https://codecov.io/gh/slackapi/node-slack-events-api)

This adapter enhances and simplifies Slack's Events API by incorporating useful best practices,
patterns, and opportunities to abstract out common tasks.

We wrote a blog that [explains how](https://medium.com/@SlackAPI/enhancing-slacks-events-api-7535827829ab)
the Events API can help you, why we built these tools, and how you can use them to build
production-ready Slack apps.

## Installation

```
$ npm install --save @slack/events-api
```

## Configuration

Before you can use the [Events API](https://api.slack.com/events-api) you must
[create a Slack App](https://api.slack.com/apps/new), and turn on
[Event Subscriptions](https://api.slack.com/events-api#subscriptions).

In order to complete the subscription, you will need a **Request URL** that can already respond to a
verification request. This module, combined with the use of a development proxy, can make this
easier for you.

0.  Force the generation of a Verification Token: If you just created your Slack App, the Basic
Information section of your configuration will not yet have a Verification Token under App
Credentials. By visiting the Event Subscriptions section and putting a dummy URL into Request
URL, you will get a verification failure, but also there will now be a **Verification Token**
available in the Basic Information section.

1.  Start the verification tool:
`./node_modules/.bin/slack-verify --token <token> [--path=/slack/events] [--port=3000]`. You will
need to substitute your own Verification Token for `<token>`. You may also want to choose your own
`path` and/or `port`.

2.  Start your development proxy. We recommend using [ngrok](https://ngrok.com/) for its stability,
but using a custom subdomain will require a paid plan. Otherwise,
[localtunnel](https://localtunnel.github.io/www/) is an alternative that gives you custom subdomains
for free.

  > With ngrok: `ngrok http -subdomain=<projectname> 3000`

  > With localtunnel: `lt --port 3000 --subdomain <projectname>`

3.  Input your Request URL into the Slack App configuration settings, in the Event Subscriptions
section. This URL depends on how you used the previous two commands. For example, using the
default path and the subdomain name "mybot":

  > With ngrok: `https://mybot.ngrok.io/slack/events`

  > With localtunnel: `https://mybot.localtunnel.me/slack/events`

4.  Once the verification is complete, you can terminate the two processes (verification tool and
development server). You can proceed to selecting the event types your App needs.

**NOTE:** This method of responding to the verification request should only be used
**in development**. After you deploy your application to production, you should come back and modify
your Request URL appropriately.

## Usage

The easiest way to start using the Events API is by using the built-in HTTP server.

```javascript
// Initialize using verification token from environment variables
const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;
const slackEvents = createSlackEventAdapter(process.env.SLACK_VERIFICATION_TOKEN);
const port = process.env.PORT || 3000;

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start a basic HTTP server
slackEvents.start(port).then(() => {
  console.log(`server listening on port ${port}`);
});
```

**NOTE**: To use the example above, you need to add a Team Event such as `message.im` in the Event
Subscriptions section of your Slack App configuration settings.

### Using with Express

For usage within an existing Express application, you can route requests to the adapter's express
middleware by calling the `expressMiddleware()` method;

```javascript
const http = require('http');

// Initialize using verification token from environment variables
const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;
const slackEvents = createSlackEventAdapter(process.env.SLACK_VERIFICATION_TOKEN);
const port = process.env.PORT || 3000;

// Initialize an Express application
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// You must use a body parser for JSON before mounting the adapter
app.use(bodyParser.json());

// Mount the event handler on a route
// NOTE: you must mount to a path that matches the Request URL that was configured earlier
app.use('/slack/events', slackEvents.expressMiddleware());

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event)=> {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start the express application
http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`);
});
```

**NOTE**: To use the example above, you need to add a Team Event such as `message.im` in the Event
Subscriptions section of your Slack App configuration settings.

## Documentation

To learn more, see the [reference documentation](docs/reference.md).

## Support

Need help? Join the [Bot Developer Hangout](http://dev4slack.xoxco.com/) team and talk to us in
[#slack-api](https://dev4slack.slack.com/messages/slack-api/).

You can also [create an Issue](https://github.com/slackapi/node-slack-events-api/issues/new)
right here on GitHub.
