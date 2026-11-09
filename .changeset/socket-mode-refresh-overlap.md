---
"@slack/socket-mode": patch
---

Fix a 5 to 12 second gap without a connection each time Slack refreshes a Socket Mode connection ([#2767](https://github.com/slackapi/node-slack-sdk/issues/2767)). On a `disconnect` message the client now opens the replacement connection right away, without a reconnect backoff, and leaves the old connection open until Slack sends it a `disconnect` message too, so payloads Slack still sends on it during the switch are received instead of dropped. Each payload is acknowledged on the connection it arrived on. While the replacement is being opened, the current connection keeps serving, and overlapping `disconnect` messages open one replacement. A replacement that fails for good rejects with its cause, as a failed reconnect does. A `link_disabled` message still closes the connection first, since a replacement can't connect while Socket Mode is off.
