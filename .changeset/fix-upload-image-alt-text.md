---
"@slack/web-api": patch
---

fix: image alt text passed to `files.uploadV2` is now saved. Before, it was sent as `alt_text`, which Slack ignores. Deprecate `alt_text` in `files.getUploadURLExternal` arguments in favor of `alt_txt` ([#2788](https://github.com/slackapi/node-slack-sdk/issues/2788))
