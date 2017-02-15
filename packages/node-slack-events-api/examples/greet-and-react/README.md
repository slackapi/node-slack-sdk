# Greet and React Example

This example shows a fully functioning but very simple application using the
[Slack Event Adapter](https://github.com/slackapi/node-slack-events-api).

## Setting up

In order to get this application running, you need to follow the steps to
[create your Slack App](https://github.com/slackapi/node-slack-events-api#configuration), and
additionally configure a few more settings.

1.  Before setting up the Request URL, select the *Bot User* item on the left side navigation, give
your bot user a name (e.g. "@greetandreact"), turn _Always Show My Bot as Online_ on, and save your
changes.

2.  After you set up the Request URL, you should add event subscriptions under the "Bot Events"
category. Add `message.channels` and `reaction_added`.

3.  Go to the *OAuth & Permissions* item on the left side navigation, and input a _Redirect URL_.
The value would the public URL from your development proxy appended with the path
`/auth/slack/callback` (e.g. `https://greet-and-react.ngrok.io/auth/slack/callack`). Save changes.

Before you can run the application, the code also needs a bit of configuration.

1.  Copy the `.env.sample` file to a new file named `.env`.

2.  Return to the *Basic Information* item on the left side of the Slack App configuration. Copy the
_Client ID_, _Client Secret_, and _Verification Token_ into your `.env` file respectively, after the
`=`.

3.  Run `npm install` at the command line to download all necessary dependencies.

## Run the application

You can run the application locally, but remember, when using the Events API you will need your
publicly accessible Request URL to respond to events. This means you will still need the development
proxy, as explained in the
[Slack Event Adapter configuration](https://github.com/slackapi/node-slack-events-api#configuration).

The application can be run using `node index.js` at the command line.

## Usage

Once your application is running, you will need to install it on your Team. Visit the URL of your
development proxy, click the "Add to Slack" button, and complete the installation.

Then you can invite the Bot User into a channel (e.g. `/invite @greetandreact`), and say "hi" in the
channel. It should respond to you. You can also add reactions to messages and the Bot User will send
a message using the same emoji.
