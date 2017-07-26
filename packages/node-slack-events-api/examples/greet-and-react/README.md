# Greet and React Example

This example shows a fully functioning but very simple application using the
[Slack Event Adapter](https://github.com/slackapi/node-slack-events-api).

## Setup

### Create a Slack app
1. Create an app at [api.slack.com/apps](https://api.slack.com/apps)
2. Click on `Bot Users` on the left side navigation
3. Give your bot user a name (e.g. "@greetandreact"), turn _Always Show My Bot as Online_ on, and save your
changes

### Run locally or [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/slack-greet-and-react-example)

1. Get the code
	- Either clone this repo and run `npm install`
	- Or visit [glitch.com/edit/#!/remix/slack-greet-and-react-example](https://glitch.com/edit/#!/remix/slack-greet-and-react-example)
2. Set the following environment variables (all available on the *Basic Information* page) to `.env` (see `.env.sample` if you're developing locally)
	- `SLACK_CLIENT_ID`: You app's _Client ID_
	- `SLACK_CLIENT_SECRET`: Your app's _Client Secret_
	- `SLACK_VERIFICATION_TOKEN`: Your app's _Verification Token_
3. If you're running the app locally:
	- Start the app (`node index.js`)
	- In another window, start ngrok on the same port as your webserver (`ngrok http $PORT`)

### Enable Events
1. Go back to the app settings and click on `Event Subscriptions` on the left side navigation
2. Enable events and enter your _Request URL_:
	- ngrok or Glitch URL + `/slack/events`
3. After you set up the _Request URL_, you should add event subscriptions under the "Bot Events" category. Add `message.channels` and `reaction_added`.
4. Go to `OAuth & Permissions` item on the left side navigation, and input the _Redirect URL_:
	- ngrok or Glitch URL + `/auth/slack/callback`

## Installation and Usage
1.  Visit the URL of your development proxy
	- ngrok or Glitch URL
2. Click the "Add to Slack" button, and complete the installation
3. You can invite the Bot User into a channel (e.g. `/invite @greetandreact`), and say "hi" in the
channel. It should respond to you. You can also add reactions to messages and the Bot User will send
a message using the same emoji.
