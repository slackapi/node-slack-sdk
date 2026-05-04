# @slack/socket-mode

## 2.0.7

### Patch Changes

- 5395b0c: fix: terminate closing connections earlier if normal close responses fail

  If Slack doesn't respond to a close frame, the WebSocket connection is now force-terminated instead of waiting for a response that won't arrive. Since [disconnects are expected](https://docs.slack.dev/apis/events-api/using-socket-mode/#disconnect) every few hours, this avoids repeated "pong wasn't received" warnings and speeds up reconnection.

## 2.0.6

### Patch Changes

- b8d922f: build: add support for node 24
- Updated dependencies [75649f4]
- Updated dependencies [b8d922f]
- Updated dependencies [b8d922f]
  - @slack/web-api@7.15.0
  - @slack/logger@4.0.1
