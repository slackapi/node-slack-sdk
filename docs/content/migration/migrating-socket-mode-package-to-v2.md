# Migrating the `socket‐mode` package to v2.x

This migration guide helps you transition an application written using the `v1.x` series of the `@slack/socket-mode` package to the `v2.x` series. This guide focuses specifically on the breaking changes to help get your existing projects up and running as quickly as possible.

## Installation

```
npm i @slack/socket-mode
```

## Breaking Changes

1. Two [Lifecycle Events](https://github.com/slackapi/node-slack-sdk/tree/main/packages/socket-mode#lifecycle-events) have been removed: 
  - `authenticated`. This event corresponded to the client retrieving a response from the [`apps.connections.open`](https://api.slack.com/methods/apps.connections.open) Slack API method - but it didn't signal anything about the actual socket connection that matters! If you had been listening to this event, we recommend moving instead to one of these two events:
    - `connected`. This signals that the client has established a connection with Slack and has received a `hello` message from the Slack backend. Events will start flowing to your app after this event.
    - `connecting`. This signals that the client is about to establish a connection with Slack. If you were using `authenticated` to be notified _before_ the client establishes a connection, we recommend using this event instead.
  - `unable_to_socket_mode_start`. This event corresponded to an error happening when attempting to hit the [`apps.connections.open`](https://api.slack.com/methods/apps.connections.open) Slack API method. We recommend moving instead to `reconnecting` (if you have client reconnections enabled), or the `error` event.
2. Two public properties on the client have been removed: `connected` and `authenticated`. Instead, we recommend migrating to the `isActive()` method to determine whether the WebSocket connection powering the client is healthy.