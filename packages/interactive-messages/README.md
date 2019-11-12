# Slack Interactive Messages for Node

<!-- TODO: per-job badge https://github.com/bjfish/travis-matrix-badges/issues/4 -->
[![Build Status](https://travis-ci.org/slackapi/node-slack-sdk.svg?branch=master)](https://travis-ci.org/slackapi/node-slack-sdk)
<!-- TODO: per-flag badge https://docs.codecov.io/docs/flags#section-flag-badges-and-graphs -->
[![codecov](https://codecov.io/gh/slackapi/node-slack-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/slackapi/node-slack-sdk)
<!-- TODO: npm versions with scoped packages: https://github.com/rvagg/nodei.co/issues/24 -->

The `@slack/interactive-messages` helps your app respond to interactions from Slack's
[interactive messages](https://api.slack.com/messaging/interactivity), [actions](https://api.slack.com/actions), and [dialogs](https://api.slack.com/dialogs). This package will help you start with convenient and secure defaults.

## Installation

```shell
$ npm install @slack/interactive-messages
```

<!-- START: Remove before copying into the docs directory -->

## Usage

These examples show how to get started using the most common features. You'll find even more extensive [documentation on
the package's website](https://slack.dev/node-slack-sdk/interactive-messages).

<!-- END: Remove before copying into the docs directory -->

Before building an app, you'll need to [create a Slack app](https://api.slack.com/apps/new) and install it to your
development workspace. You'll also **need a public URL** where the app can begin receiving actions. Finally, you'll need
to find the **request signing secret** given to you by Slack under the "Basic Information" of your app configuration.

It may be helpful to read the tutorials on [getting started](https://slack.dev/node-slack-sdk/getting-started) and
[getting a public URL that can be used for development](https://slack.dev/node-slack-sdk/tutorials/local-development).

---

### Initialize the message adapter

The package exports a `createMessageAdapter()` function, which returns an instance of the `SlackMessageAdapter` class.
The function requires one parameter, the **request signing secret**, which it uses to enforce that all events are coming
from Slack to keep your app secure.

```javascript
const { createMessageAdapter } = require('@slack/interactive-messages');

// Read the signing secret from the environment variables
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;

// Initialize
const slackInteractions = createMessageAdapter(slackSigningSecret);
```

---

### Start a server

The message adapter transforms incoming HTTP requests into verified and parsed actions, and dispatches actions to the
appropriate handler. That means, in order for it dispatch actions for your app, it needs an HTTP server. The adapter can
receive requests from an existing server, or as a convenience, it can create and start the server for you.

In the following example, the message adapter starts an HTTP server using the `.start()` method. Starting the server
requires a `port` for it to listen on. This method returns a `Promise` which resolves for an instance of an [HTTP
server](https://nodejs.org/api/http.html#http_class_http_server) once it's ready to emit events. By default, the
built-in server will be listening for events on the path `/slack/actions`, so make sure your Request URL ends with this
path.

```javascript
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackInteractions = createMessageAdapter(slackSigningSecret);

// Read the port from the environment variables, fallback to 3000 default.
const port = process.env.PORT || 3000;

(async () => {
  // Start the built-in server
  const server = await slackInteractions.start(port);

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

The message adapter can receive requests from an existing Node HTTP server. You still need to specify a port, but this
time its only given to the server. Starting a server in this manner means it is listening to requests on all paths; as
long as the Request URL is routed to this port, the adapter will receive the requests.

```javascript
const { createServer } = require('http');
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackInteractions = createMessageAdapter(slackSigningSecret);

// Read the port from the environment variables, fallback to 3000 default.
const port = process.env.PORT || 3000;

// Initialize a server using the message adapter's request listener
const server = createServer(slackInteractions.requestListener());

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

The message adapter can receive requests from an [Express](http://expressjs.com/) application. Instead of plugging the
adapter's request listener into a server, it's plugged into the Express `app`. With Express, `app.use()` can be used to
set which path you'd like the adapter to receive requests from. **You should be careful about one detail: if your
Express app is using the `body-parser` middleware, then the adapter can only work if it comes _before_ the body parser
in the middleware stack.** If you accidentally allow the body to be parsed before the adapter receives it, the adapter
will emit an error, and respond to requests with a status code of `500`.

```javascript
const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const port = process.env.PORT || 3000;
const slackInteractions = createMessageAdapter(slackSigningSecret);

// Create an express application
const app = express();

// Plug the adapter in as a middleware
app.use('/my/path', slackInteractions.requestListener());

// Example: If you're using a body parser, always put it after the message adapter in the middleware stack
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

### Handle an action

Actions are interactions in Slack that generate an HTTP request to your app. These are:

-  **Block actions**: A user interacted with one of the [interactive
   components](https://api.slack.com/reference/messaging/interactive-components) in a message built with [block
   elements](https://api.slack.com/reference/messaging/block-elements).
-  **Message actions**: A user selected an [action in the overflow menu of a message](https://api.slack.com/actions).
-  **Dialog submission**: A user submitted a form in a [modal dialog](https://api.slack.com/dialogs)
-  **Attachment actions**: A user clicked a button or selected an item in a menu in a message built with [legacy message
   attachments](https://api.slack.com/interactive-messages).

You app will only handle actions that occur in messages or dialogs your app produced. [Block Kit
Builder](https://api.slack.com/tools/block-kit-builder) is a playground where you can prototype your interactive
components with block elements.

Apps register functions, called **handlers**, to be triggered when an action is received by the adapter using the
`.action(constraints, handler)` method. When registering a handler, you describe which action(s) you'd like the handler
to match using **constraints**. Constraints are [described in detail](#constraints) below. The adapter will call the
handler whose constraints match the action best.

These handlers receive up to two arguments:

1. `payload`: An object whose contents describe the interaction that occurred. Use the links above as a guide for the
   shape of this object (depending on which kind of action you expect to be handling).
2. `respond(...)`: A function used to follow up on the action after the 3 second limit. This is used to send an
   additional message (`in_channel` or `ephemeral`, `replace_original` or not) after some deferred work. This can be
   used up to 5 times within 30 minutes.

Handlers can return an object, or a `Promise` for a object which must resolve within the `syncResponseTimeout` (default:
2500ms). The contents of the object depend on the kind of action that's being handled.

- **Attachment actions**: The object describes a message to replace the message where the interaction occurred. **It's
  recommended to remove interactive elements when you only expect the action once, so that no other users might trigger
  a duplicate.** If no value is returned, then the message remains the same.
- **Dialog submission**: The object describes [validation errors](https://api.slack.com/dialogs#input_validation) to
  show the user and prevent the dialog from closing. If no value is returned, the submission is treated as successful.
- **Block actions** and **Message actions**: Avoid returning any value.

```javascript
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackInteractions = createMessageAdapter(slackSigningSecret);
const port = process.env.PORT || 3000;

// Example of handling static select (a type of block action)
slackInteractions.action({ type: 'static_select' }, (payload, respond) => {
  // Logs the contents of the action to the console
  console.log('payload', payload);

  // Send an additional message to the whole channel
  doWork()
    .then(() => {
      respond({ text: 'Thanks for your submission.' });
    })
    .catch((error) => {
      respond({ text: 'Sorry, there\'s been an error. Try again later.' });
    });

  // If you'd like to replace the original message, use `chat.update`.
  // Not returning any value.
});

// Example of handling all message actions
slackInteractions.action({ type: 'message_action' }, (payload, respond) => {
  // Logs the contents of the action to the console
  console.log('payload', payload);

  // Send an additional message only to the user who made interacted, as an ephemeral message
  doWork()
    .then(() => {
      respond({ text: 'Thanks for your submission.', response_type: 'ephemeral' });
    })
    .catch((error) => {
      respond({ text: 'Sorry, there\'s been an error. Try again later.', response_type: 'ephemeral' });
    });

  // If you'd like to replace the original message, use `chat.update`.
  // Not returning any value.
});

// Example of handling all dialog submissions
slackInteractions.action({ type: 'dialog_submission' }, (payload, respond) => {
  // Validate the submission (errors is of the shape in https://api.slack.com/dialogs#input_validation)
  const errors = validate(payload.submission);

  // Only return a value if there were errors
  if (errors) {
    return errors;
  }

  // Send an additional message only to the use who made the submission, as an ephemeral message
  doWork()
    .then(() => {
      respond({ text: 'Thanks for your submission.', response_type: 'ephemeral' });
    })
    .catch((error) => {
      respond({ text: 'Sorry, there\'s been an error. Try again later.', response_type: 'ephemeral' });
    });
});

// Example of handling attachment actions. This is for button click, but menu selection would use `type: 'select'`.
slackInteractions.action({ type: 'button' }, (payload, respond) => {
  // Logs the contents of the action to the console
  console.log('payload', payload);

  // Replace the original message again after the deferred work completes.
  doWork()
    .then(() => {
      respond({ text: 'Processing complete.', replace_original: true });
    })
    .catch((error) => {
      respond({ text: 'Sorry, there\'s been an error. Try again later.',  replace_original: true });
    });

  // Return a replacement message
  return { text: 'Processing...' };
});

(async () => {
  const server = await slackInteractions.start(port);
  console.log(`Listening for events on ${server.address().port}`);
})();
```

---

### Handle an options request

Options requests are generated when a user interacts with a menu that uses a dynamic data source. These menus can be
inside a block element, an attachment, or a dialog. In order for an app to use a dynamic data source, you must save an
"Options Load URL" in the app configuration.

Apps register functions, called **handlers**, to be triggered when an options request is received by the adapter using
the `.options(constraints, handler)` method. When registering a handler, you describe which options request(s) you'd
like the handler to match using **constraints**. Constraints are [described in detail](#constraints) below. The adapter
will call the handler whose constraints match the action best.

These handlers receive a single `payload` argument. The `payload` describes the interaction with the menu that occurred.
The exact shape depends on whether the interaction occurred within a [block
element](https://api.slack.com/reference/messaging/block-elements#external-select),
[attachment](https://api.slack.com/docs/message-menus#options_load_url), or a
[dialog](https://api.slack.com/dialogs#dynamic_select_elements_external).

Handlers can return an object, or a `Promise` for a object which must resolve within the `syncResponseTimeout` (default:
2500ms). The contents of the object depend on where the options request was generated (you can find the expected shapes
in the preceding links).

```javascript
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackInteractions = createMessageAdapter(slackSigningSecret);
const port = process.env.PORT || 3000;

// Example of handling options request within block elements
slackInteractions.options({ within: 'block_actions' }, (payload) => {
  // Return a list of options to be shown to the user
  return {
    options: [
      {
        text: {
          type: 'plain_text',
          text: 'A good choice',
        },
        value: 'good_choice',
      },
    ],
  };
});

// Example of handling options request within attachments
slackInteractions.options({ within: 'interactive_message' }, (payload) => {
  // Return a list of options to be shown to the user
  return {
    options: [
      {
        text: 'A decent choice',
        value: 'decent_choice',
      },
    ],
  };
});

// Example of handling options request within dialogs
slackInteractions.options({ within: 'dialog' }, (payload) => {
  // Return a list of options to be shown to the user
  return {
    options: [
      {
        label: 'A choice',
        value: 'choice',
      },
    ],
  };
});

(async () => {
  const server = await slackInteractions.start(port);
  console.log(`Listening for events on ${server.address().port}`);
})();
```

---

### Handling view submission and view closed interactions

View submissions are generated when a user clicks on the submission button of a
[Modal](https://api.slack.com/surfaces/modals). View closed interactions are generated when a user clicks on the cancel
button of a Modal, or dismisses the modal using the `×` in the corner.

Apps register functions, called **handlers**, to be triggered when a submissions are received by the adapter using the
`.viewSubmission(constraints, handler)` method or when closed interactions are received using the
`.viewClosed(constraints, handler)` method. When registering a handler, you describe which submissions and closed
interactions you'd like the handler to match using **constraints**. Constraints are [described in detail](#constraints)
below. The adapter will call the handler whose constraints match the interaction best.

These handlers receive a single `payload` argument. The `payload` describes the
[view submission](https://api.slack.com/reference/interaction-payloads/views#view_submission) or
[view closed](https://api.slack.com/reference/interaction-payloads/views#view_closed)
interaction that occurred.

For view submissions, handlers can return an object, or a `Promise` for a object which must resolve within the
`syncResponseTimeout` (default: 2500ms). The contents of the object depend on what you'd like to happen to the view.
Your app can update the view, push a new view into the stack, close the view, or display validation errors to the user.
In the documentation, the shape of the objects for each of those possible outcomes, which the handler would return, are
described as `response_action`s. If the handler returns no value, or a Promise that resolves to no value, the view will
simply be dismissed on submission.

View closed interactions only occur if the view was opened with the `notify_on_close` property set to `true`. For these
interactions the handler should not return a value.

```javascript
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackInteractions = createMessageAdapter(slackSigningSecret);
const port = process.env.PORT || 3000;

// Example of handling a simple view submission
slackInteractions.viewSubmission('simple_modal_callback_id', (payload) => {
  // Log the input elements from the view submission.
  console.log(payload.view.state);

  // The previous value is an object keyed by block_id, which contains objects keyed by action_id,
  // which contains value properties that contain the input data. Let's log one specific value.
  console.log(payload.view.state.my_block_id.my_action_id.value);

  // Validate the inputs (errors is of the shape in https://api.slack.com/surfaces/modals/using#displaying_errors)
  const errors = validate(payload.view.state);

  // Return validation errors if there were errors in the inputs
  if (errors) {
    return errors;
  }

  // Process the submission
  doWork();
});

// Example of handling a view submission which pushes another view onto the stack
slackInteractions.viewSubmission('first_step_callback_id', () => {
  const errors = validate(payload.view.state);

  if (errors) {
    return errors;
  }

  // Process the submission (needs to complete under 2.5 seconds)
  return doWork()
    .then(() => {
      return {
        response_action: 'push',
        view: {
          type: 'modal',
          callback_id: 'second_step_callback_id',
          title: {
            type: 'plain_text',
            text: 'Second step',
          },
          blocks: [
            {
              type: 'input',
              block_id: 'last_thing',
              element: {
                type: 'plain_text_input',
                action_id: 'text',
              },
              label: {
                type: 'plain_text',
                text: 'One last thing...',
              },
            },
          ],
        },
      };
    })
    .catch((error) => {
      // Log the error. In your app, inform the user of a failure using a DM or some other area in Slack.
      console.log(error);
    });
});

// Example of handling view closed
slackInteractions.viewClosed('my_modal_callback_id', (payload) => {
  // If you accumulated partial state using block actions, now is a good time to clear it
  clearPartialState();
});

(async () => {
  const server = await slackInteractions.start(port);
  console.log(`Listening for events on ${server.address().port}`);
})();
```

---

### Constraints

Constraints allow you to describe when a handler should be called. In simpler apps, you can use very simple constraints
to divide up the structure of your app. In more complex apps, you can use specific constraints to target very specific
conditions, and express a more nuanced structure of your app.

Constraints can be a simple string, a `RegExp`, or an object with a number of properties.

| Property name | Type | Description | Used with `.action()` | Used with `.options()` | Used with `.viewSubmission()` and `.viewClosed()` |
|---------------|------|-------------|-----------------------|------------------------|---------------------------------------------------|
| `callbackId` | `string` or `RegExp` | Match the `callback_id` for attachment or dialog | ✅ | ✅ | ✅ |
| `blockId` | `string` or `RegExp` | Match the `block_id` for a block action | ✅ | ✅ | 🚫 |
| `actionId` | `string` or `RegExp` | Match the `action_id` for a block action | ✅ | ✅ | 🚫 |
| `type` | any block action element type or `message_actions` or `dialog_submission` or `button` or `select` | Match the kind of interaction | ✅ | 🚫 | 🚫 |
| `within` | `block_actions` or `interactive_message` or `dialog` | Match the source of options request | 🚫 | ✅ | 🚫 |
| `unfurl` | `boolean` | Whether or not the `button`, `select`, or `block_action` occurred in an App Unfurl | ✅ | 🚫 | 🚫 |
| `viewId` | `string` | Match the `view_id` for view submissions | 🚫 | 🚫 | ✅ |
| `externalId` | `string` or `RegExp` | Match the `external_id` for view submissions | 🚫 | 🚫 | ✅ |

All of the properties are optional, its just a matter of how specific you want to the handler's behavior to be. A
`string` or `RegExp` is a shorthand for only specifying the `callbackId` constraint. Here are some examples:

```javascript
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackInteractions = createMessageAdapter(slackSigningSecret);
const port = process.env.PORT || 3000;

// Example of constraints for an attachment action with a callback_id
slackInteractions.action('new_order', (payload, respond) => { /* ... */ });

// Example of constraints for a block action with an action_id
slackInteractions.action({ actionId: 'new_order' }, (payload, respond) => { /* ... */ });

// Example of constraints for an attachment action with a callback_id pattern
slackInteractions.action(/order_.*/, (payload, respond) => { /* ... */ });

// Example of constraints for a block action with a callback_id pattern
slackInteractions.action({ actionId: /order_.*/ }, (payload, respond) => { /* ... */ });

// Example of constraints for an options request with a callback_id and within a dialog
slackInteractions.options({ within: 'dialog', callbackId: 'model_name' }, (payload) => { /* ... */ });

// Example of constraints for all actions.
slackInteractions.action({}, (payload, respond) => { /* ... */ });

(async () => {
  const server = await slackInteractions.start(port);
  console.log(`Listening for events on ${server.address().port}`);
})();
```

---

### Debugging

If you're having difficulty understanding why a certain request received a certain response, you can try debugging your
program. A common cause is a request signature verification failing, sometimes because the wrong secret was used. The
following example shows how you might figure this out using debugging.

Start your program with the `DEBUG` environment variable set to `@slack/interactive-messages:*`. This should only be
used for development/debugging purposes, and should not be turned on in production. This tells the adapter to write
messages about what its doing to the console. The easiest way to set this environment variable is to prepend it to the
`node` command when you start the program.

```shell
$ DEBUG=@slack/interactive-messages:* node app.js
```

`app.js`:

```javascript
const { createMessageAdapter } = require('@slack/interactive-messages');
const port = process.env.PORT || 3000;

// Oops! Wrong signing secret
const slackInteractions = createMessageAdapter('not a real signing secret');

slackInteractions.action({ action_id: 'welcome_agree_button' }, (payload) => {
  /* Not shown: Record user agreement to database... */
  return {
    text: 'Thanks!',
  };
});

(async () => {
  const server = await slackInteractions.start(port);
  console.log(`Listening for events on ${server.address().port}`);
})();
```

When the adapter receives a request, it will now output something like the following to the console:

```
@slack/interactive-messages:adapter instantiated
@slack/interactive-messages:adapter server created - path: /slack/actions
@slack/interactive-messages:adapter server started - port: 3000
@slack/interactive-messages:http-handler request received - method: POST, path: /slack/actions
@slack/interactive-messages:http-handler request signature is not valid
@slack/interactive-messages:http-handler handling error - message: Slack request signing verification failed, code: SLACKHTTPHANDLER_REQUEST_SIGNATURE_VERIFICATION_FAILURE
@slack/interactive-messages:http-handler sending response - error: Slack request signing verification failed, responseOptions: {}
```

This output tells the whole story of why the adapter responded to the request the way it did. Towards the end you can
see that the signature verification failed.

If you believe the adapter is behaving incorrectly, before filing a bug please gather the output from debugging and
include it in your bug report.

---

### More

The [documentation website](https://slack.dev/node-slack-sdk/interactive-messages) has information about these
additional features of the `SlackMessageAdapter`:

* Custom timeout on handler returned `Promise`s
* Opt out of late response fallback

---

## Examples

*  [Express All Interactions](../../examples/express-all-interactions) - A ready to run sample app that creates and responds
   to buttons, menus, and dialogs. It also demonstrates a menu with dynamic options. It is built on top of the
   [Express](https://expressjs.com) web framework.

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
