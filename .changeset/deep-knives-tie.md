---
"@slack/web-api": minor
---

feat: add `highlight_type` to [`files.completeUploadExternal`](https://docs.slack.dev/reference/methods/files.completeUploadExternal) and [`filesUploadV2`](https://docs.slack.dev/tools/node-slack-sdk/web-api#upload-a-file) for optimistic rendering

```js
import { WebClient } from "@slack/web-api";

const client = new WebClient(process.env.SLACK_BOT_TOKEN);

await client.filesUploadV2({
  channel_id: "C0123456789",
  file: "app.js",
  filename: "app.js",
  title: "Example Snippet",
  highlight_type: "javascript",
});
```
