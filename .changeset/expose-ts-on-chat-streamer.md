---
"@slack/web-api": minor
---

feat: expose public read-only `ts` getter on `ChatStreamer` for fallback to [`chat.update`](https://docs.slack.dev/reference/methods/chat.update) when a stream expires server-side

```js
import { WebClient } from "@slack/web-api";

const client = new WebClient(process.env.SLACK_BOT_TOKEN);

const streamer = client.chatStream({
  channel: "C0123456789",
  thread_ts: "1700000001.123456",
  recipient_team_id: "T0123456789",
  recipient_user_id: "U0123456789",
});

await streamer.append({ markdown_text: "hello!" });
// streamer.ts is now set after the first flush
console.log(streamer.ts);

await streamer.stop();
```
