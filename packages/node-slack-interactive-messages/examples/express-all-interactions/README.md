# Express All Interacttions Example

This example shows a fully functioning app using the
[Slack Interactive Messages](https://github.com/slackapi/node-slack-interactive-messages) package.

## Setup

### Create a Slack app

1. Create an app at <https://api.slack.com/apps> (don't close this window, you'll need it later).

### Run the code

1. Choose where you want to run:
  *  Either clone this repo, navigate to this directory, and run `npm install`
  *  Or, <a href="https://glitch.com/edit/#!/remix/slack-express-all-interactions-example"><img src="https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fremix%402x.png?1513093958726" alt="remix button" aria-label="remix" height="33"></a>

2. Set the following environment variables
  *  `SLACK_VERIFICATION_TOKEN`: Available on your app's _Basic Information_ page in Slack.
  *  `SLACK_ACCESS_TOKEN`: Available on your app's _Install App_ page in Slack (after installing on your Development Workspace).
  *  `PORT`: _ONLY_ if you are running locally

3. _ONLY_ If you're running the app locally:
  *  Make sure you're on a supported version of node (see `.nvmrc` or if you have nvm run `nvm use`)
  *  Start the app (`npm start`)
  *  In another terminal window, start ngrok on the same port as the webserver (`ngrok http $PORT`)

### Enable Interactive Components

1. Open your app's _Interactive Components_ page in Slack.
2. Enable interactive components and enter the Request URL and Options URL (use the same URL for both)
  *  ngrok URL or Glitch URL + '/slack/actions'

### Create a Slash Command

1. Open your app's _Slash Commands_ page in Slack.
2. Click "Create New Command"
  *  In command use: `/interactive-example`
  *  In request URL use: ngrok URL or Glitch URL + `/slack/commands`
  *  Click Save
3. On the _Install App_ page, reinstall in your Development Workspace.

## Usage

The slash command can be triggered in three ways:
*  `/interactive-example button`: Creates a message with message butons. When you click one, the message updates.
*  `/interactive-example menu`: Creates a message with a dynamic menu. When you begin typing, the options are narrowed down. Selecting an option updates the message.
*  `/interactive-exmaple dialog`: Creates a dialog with a user menu input and text input. Sends a confirmation message after submission.
