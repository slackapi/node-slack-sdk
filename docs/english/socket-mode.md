# Socket Mode

For baseline package documentation, please see the project's [`README`](https://github.com/slackapi/node-slack-sdk/tree/main/packages/socket-mode#readme) or the [documentation on npm](https://www.npmjs.com/package/@slack/socket-mode).

The following contain additional examples that may be useful for consumers.

## Listen for Interactivity Events

To receive interactivity events such as shortcut invocations, button clicks, and modal data submission, your listener can subscribe to `interactive` events.

```javascript
const { WebClient } = require('@slack/web-api');
const webClient = new WebClient(process.env.SLACK_BOT_TOKEN);

socketModeClient.on('interactive', async ({ body, ack }) => {
  await ack();
  if (body.callback_id === "the-shortcut") {
    // handle the shortcut here
    await webClient.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        title: {
          type: "plain_text",
          text: "My App"
        },
        close: {
          type: "plain_text",
          text: "Close"
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Hi there!"
            }
          }
        ]
      }
    });
  }
});
```

For slash commands, you can subscribe to `slash_commands` events and dispatch requests inside the listener.

```javascript
socketModeClient.on('slash_commands', async ({ body, ack }) => {
  if (body.command === "/the-command") {
    await ack({"text": "I got it!"});
  }
});
```

When your app has multiple interactive events or slash commands, you will need to include your own routing logic. This is a good time to consider using Slack's Bolt framework, which provides an easier way to register listeners for events and user actions. You can learn more in the [Bolt for JavaScript Socket Mode docs](/bolt-js/concepts/socket-mode).
