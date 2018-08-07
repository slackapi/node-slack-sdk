# Slack Interactive Messages for Node

[![Build Status](https://travis-ci.org/slackapi/node-slack-interactive-messages.svg?branch=master)](https://travis-ci.org/slackapi/node-slack-interactive-messages)
[![codecov](https://codecov.io/gh/slackapi/node-slack-interactive-messages/branch/master/graph/badge.svg)](https://codecov.io/gh/slackapi/node-slack-interactive-messages)

Build your Slack Apps with rich and engaging user interactions using buttons, menus, and dialogs.
The package will help you start with sensible and secure defaults.

The adapter gives you a meaningful API to handle actions from all of Slack's interactive
message components ([buttons](https://api.slack.com/docs/message-buttons),
[menus](https://api.slack.com/docs/message-menus), and [dialogs](https://api.slack.com/dialogs)).
Use it as an independent HTTP server or plug it into an existing server as
[Express](http://expressjs.com/) middleware.

This package does **not** help you compose messages with buttons, menus and dialogs to trigger the
actions. We recommend using the [Message Builder](https://api.slack.com/docs/messages/builder) to
design interactive messages. You can send these messages to Slack using the Web API, Incoming
Webhooks, and other parts of the platform.

*  [Installation](#installation)
*  [Configuration](#configuration)
*  [Usage](#usage)
*  [Examples](#examples)
*  [Reference Documentation](#reference-documentation)
*  [Support](#support)

---

## Installation

```
$ npm install --save @slack/interactive-messages
```

## Configuration

Get started by [creating a Slack App](https://api.slack.com/apps/new) if you haven't already.
On the **Basic Information** page, in the section for **App Credentials**, note the
**Signing Secret**. You will need it to initialize the adapter.

> ⚠️ As of `v1.0.0`, the interactive message adapter no longer accepts legacy verification tokens. You must pass a signing secret [to verify requests from Slack](https://api.slack.com/docs/verifying-requests-from-slack).

Select the **Interactive Components** feature, and enable it. Input a **Request URL**. If your
app will use dynamic message menus, you also need to input a **Options Load URL**.

![Configuring a request URL](support/interactive-components.gif)

<details>
<summary><strong>What's a request URL? How can I get one for development?</strong></summary>

Slack will send requests to your app server each time a button is clicked, a menu item is selected,
a dialog is submitted, and more. In order to reach your server, you have to tell Slack where your
app is listening for those requests. This location is the request URL.

If you're just getting started with development, you may not have a publicly accessible URL for
your app. We recommend using a development proxy, such as [ngrok](https://ngrok.com/) or
[localtunnel](https://localtunnel.github.io/www/), to generate a URL that can forward requests to
your local machine. Once you've installed the development proxy of your choice, run it to begin
forwarding requests to a specific port (for example, 3000).

> ngrok: `ngrok http 3000`

> localtunnel: `lt --port 3000`

![Starting a development proxy](support/ngrok.gif)

The output should show you a newly generated URL that you can use (ngrok will actually show you two
and we recommend the one that begins with "https"). Let's call this the base URL (for example,
`https://e0e88971.ngrok.io`)

To create the request URL, we add the path where our app listens for message actions onto the end of
the base URL. If you are using the built-in HTTP server it is set to `/slack/actions`. In this
example the request URL would be `https://e0e88971.ngrok.io/slack/actions`. If you are using the
Express middlware, you can set whichever path you like, just remember to make the path you mount the
middleware into the application the same as the one you configure in Slack.
</details>

## Usage

### Starting a server

The adapter needs to be attached to an HTTP server. Either use the built-in HTTP server or attach
the adapter to an existing Express application as a middleware.

#### Built-in HTTP server

```javascript
// Import dependencies
const { createMessageAdapter } = require('@slack/interactive-messages');

// Create the adapter using the app's signing secret, read from environment variable
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);

// Select a port for the server to listen on.
// NOTE: When using ngrok or localtunnel locally, choose the same port it was started with.
const port = process.env.PORT || 3000;

// Start the built-in HTTP server
slackInteractions.start(port).then(() => {
  console.log(`server listening on port ${port}`);
});
```

#### Express application server

```javascript
// Import dependencies
const { createMessageAdapter } = require('@slack/interactive-messages');
const http = require('http');
const express = require('express');

// Create the adapter using the app's signing secret, read from environment variable
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);

// Initialize an Express application
// NOTE: You must use a body parser for the urlencoded format before attaching the adapter
const app = express();

// Attach the adapter to the Express application as a middleware
// NOTE: The path must match the Request URL and/or Options URL configured in Slack
app.use('/slack/actions', slackInteractions.expressMiddleware());

// Select a port for the server to listen on.
// NOTE: When using ngrok or localtunnel locally, choose the same port it was started with.
const port = process.env.PORT || 3000;

// Start the express application server
http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`);
});
```

> ⚠️ As of `v1.0.0`, the interactive message adapter parses raw request bodies while performing request signing verification. This means developers no longer need to use `body-parser` middleware to parse urlencoded requests.

**Pro-Tip**: You can combine this package and
[`@slack/events-api`](https://github.com/slackapi/node-slack-events-api) by attaching each to the
same Express application.

### Creating handlers

When a user interacts with one of the interactive components, this adapter will run a handler
function in response. Your app should create a handler for each type of interaction it expects.
There are two categories of interactions: **actions** and **options requests**. With either kind,
your app can describe which handler to run using one or many **constraints**.

#### Action matching

Use a string or RegExp as the first argument to the `.action()` method to use a `callback_id`
constraint for the handler.

```javascript
// Run handlerFunction for any interactions from messages with a callback_id of welcome_button
slackInteractions.action('welcome_button', handlerFunction);

// Run handlerFunction for any interactions from messages with a callback_id that match the RegExp
slackInteractions.action(/welcome_(\w+)/, handlerFunction);

// This function is discussed in "Responding to actions" below
function handlerFunction() {
}
```

Use an object to describe other constraints, even combine multiple constraints to create more
specific handlers. The full set of constraint options are described in the
[reference documentation](docs/reference.md#module_adapter--module.exports..SlackMessageAdapter+action).

```javascript
// Run handlerFunction for all button presses
slackInteractions.action({ type: 'button' }, handlerFunction)

// Run handlerFunction for the dialog submission with callback_id of 'welcome'
slackInteractions.action({ callbackId: 'welcome', type: 'dialog_submission' }, handlerFunction);

// Run handlerFunction for a message action with callback_id of 'save'
slackInteractions.action({ callbackId: 'save', type: 'message_action' }, handlerFunction);

// Run handlerFunction for all menu selections inside an unfurl attachment
slackInteractions.action({ unfurl: true, type: 'select' }, handlerFunction);

// This function is discussed in "Responding to actions" below
function handlerFunction() {
}
```

#### Responding to actions

Slack requires your app to respond to actions in a timely manner so that the user isn't blocked.
The adapter helps your app respond correctly and on time.

For most actions (button presses, menu selections, and message actions), a response is simply an
updated message to replace the one where the interaction occurred. Your app can return a message
(or a Promise for a message) from the handler. **We recommend that apps at least remove the
interactive elements from the message in the response** so that users don't get confused (for
example, click the same button twice). Find details about the format for a message in the docs for
[message](https://api.slack.com/docs/interactive-message-field-guide#message).

The handler will receive a `payload` which describes the interaction a user had with a message.
Find more details about the structure of `payload` in the docs for
[buttons](https://api.slack.com/docs/message-buttons#responding_to_message_actions) and
[menus](https://api.slack.com/docs/message-menus#request_url_response).

If your app defers some work asynchronously (like querying another API or using a database), you can
continue to update the message using the `respond()` function that is provided to your handler.

**Example button handler:**

```javascript
slackInteractions.action('welcome_agree_button', (payload, respond) => {
  // `payload` is an object that describes the interaction
  console.log(`The user ${payload.user.name} in team ${payload.team.domain} pressed a button`);

  // Your app does some work using information in the payload
  users.findBySlackId(payload.user.id)
    .then(user => user.acceptPolicyAndSave())
    .then(() => {
      // After the asynchronous work is done, call `respond()` with a message object to update the
      // message.
      const message = {
        text: 'Thank you for agreeing to the team\'s policy.',
      };
      respond(message);
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
      respond({
        text: 'An error occurred while recording your agreement. Please contact an admin.'
      });
    });

  // Before the work completes, return a message object that is the same as the original but with
  // the interactive elements removed.
  const reply = payload.original_message;
  delete reply.attachments[0].actions;
  return reply;
});
```

**NOTE:** If you don't return any value, the adapter will respond with an OK response on your app's
behalf, which results in the message staying the same. If you return a Promise, and it resolves
after the timeout (2.5 seconds), then the adapter will also respond with an OK response and later
call `respond()` with the eventual value. If you choose to use a Promise, remember to add a
`.catch()` to handle rejections.

Dialog submission action handlers respond slightly differently from button presses and menu
selections.

The handler will receive a `payload` which describes all the elements in the dialog. Find more
details about the structure of `payload` in the docs for
[dialogs](https://api.slack.com/dialogs#evaluating_submission_responses).

Unlike with buttons and menus, the response does not replace the message (a dialog is not a message)
but rather the response tells Slack whether the inputs are valid and the dialog can be closed on
the user's screen. Your app returns a list of errors (or a Promise for a list of errors) from the
handler. If there are no errors, your app should return nothing from the handler. Find more details
on the structure of the list of errors in the docs for
[input validation](https://api.slack.com/dialogs#input_validation).

The handler will also receive a `respond()` function, which can be used to send a message to the
conversation where the dialog was triggered. **We recommend that apps use `respond()` to notify the
user that the dialog submission was recieved** and use it again to communicate updates such as
success or failure.

**Example dialog submission handler:**

```javascript
slackInteractions.action('create_order_dialog', (payload, respond) => {
  // `payload` is an object that describes the interaction
  console.log(`The user ${payload.user.name} in team ${payload.team.domain} submitted a dialog`);

  // Check the values in `payload.submission` and report any possible errors
  const errors = validateOrderSubmission(payload.submission);
  if (errors) {
    return errors;
  } else {
    setTimeout(() => {
      // When there are no errors, after this function returns, send an acknowledgement to the user
      respond({
        text: `Thank you for completing an order, <@${payload.user.id}>. ` +
              'Your order number will appear here shortly.',
      });

      // Your app does some work using information in the submission
      orders.create(payload.submission)
        .then((order) => {
          // After the asynchronous work is done, call `respond()` with a message object to update the
          // message.
          const message = {
            text: `Thank you for completing an order, <@${payload.user.id}>. ` +
                  `Your order number is ${order.number}`,
          };
          respond(message);
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
          respond({ text: 'An error occurred while creating your order.' });
        });
    });
  }
});
```

**NOTE:** If you return a Promise which takes longer than the timeout (2.5 seconds) to complete, the
adapter will continue to wait and the user will see an error.

#### Options request matching

Use a string or RegExp as the first argument to the `.options()` method to use a `callback_id`
constraint for the handler.

```javascript
// Run handlerFunction for any options requests from messages with a callback_id of project_menu
slackInteractions.options('project_menu', handlerFunction);

// Run handlerFunction for any options requests from messages with a callback_id that match the RegExp
slackInteractions.options(/(\w+)_menu/, handlerFunction);

// This function is discussed in "Responding to options requests" below
function handlerFunction() {
}
```

Use an object to describe other constraints, even combine multiple constraints to create more
specific handlers. The full set of constraint options are described in the
[reference documentation](docs/reference.md#module_adapter--module.exports..SlackMessageAdapter+options).

```javascript
// Run handlerFunction for all options requests from inside a dialog
slackInteractions.options({ within: 'dialog' }, handlerFunction)

// Run handlerFunction for all options requests from inside a message with callback_id of 'project_menu'
slackInteractions.options({ callbackId: 'project_menu', within: 'interactive_message' }, handlerFunction)

// This function is discussed in "Responding to options requests" below
function handlerFunction() {
}
```

#### Responding to options requests

Slack requires your app to respond to options requests in a timely manner so that the user isn't
blocked. The adapter helps your app respond correctly and on time.

A response is a list of options or option groups that your app wants to populate into the menu.
Your app will return the list (or a Promise for the list) from the handler. However, if you use
a Promise which takes longer than the timeout (2.5 seconds) to resolve, the adapter will continue to
wait and the user will see an error. Find details on formatting the list in the docs for
[options fields](https://api.slack.com/docs/interactive-message-field-guide#option_fields) and
[options groups](https://api.slack.com/docs/interactive-message-field-guide#option_groups).

The handler will receive a `payload` which describes the current state of the menu. If the user
is typing into the field, the `payload.value` property contains the value they have typed so far.
Find more details about the structure of `payload` in the docs for
[dynamic menus](https://api.slack.com/docs/message-menus#options_load_url).

**Example options request handler:**

```javascript
slackInteractions.options('project_menu', (payload) => {
  // `payload` is an object that describes the interaction
  console.log(`The user ${payload.user.name} in team ${payload.team.domain} is typing in a menu`);

  // Your app gathers possible completions using the user's input
  return projects.fuzzyFind(payload.value)
    // Format the data as a list of options (or options groups)
    .then(formatProjectsAsOptions)
    .catch(error => {
      // Handle errors
      console.error(error)
      return { options: [] };
    });
});
```

**NOTE:** Options request responses vary slightly depending on whether the menu is within a
message or within a dialog. When the options request is from within a menu, the fields for each
option are `text` and `value`. When the options request is from within a dialog, the fields for each
option are `label` and `value`.

#### Chaining

The `.action()` and `.options()` methods return the adapter object, which means the API supports
chaining.

```javascript
slackInteractions
  .action('make_order_1', orderStepOne)
  .action('make_order_2', orderStepTwo)
  .action('make_order_3', orderStepThree)
  .options('make_order_3', orderStepThreeOptions);
```

## Examples

*  [Express All Interactions](examples/express-all-interactions) - A ready to run sample app that
   creates and responds to buttons, menus, and dialogs. It also demonstrates a menu with dynamic
   options. It is built on top of the [Express](https://expressjs.com) web framework.

## Reference Documentation

See the [reference documentation](docs/reference.md) a more formal description of this pacakge's
objects and functions.

## Support

Need help? Join the [Bot Developer Hangout](https://community.botkit.ai/) team and talk to us in
[#slack-api](https://dev4slack.slack.com/messages/slack-api/).

You can also [create an Issue](https://github.com/slackapi/node-slack-events-api/issues/new)
right here on GitHub.
