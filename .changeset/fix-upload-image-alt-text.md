---
"@slack/web-api": patch
---

fix: image alt text passed to `files.uploadV2` is now saved. Before, it was sent as `alt_text`, which Slack ignores. Add `alt_txt` to `files.uploadV2` and `files.getUploadURLExternal` arguments, and deprecate `alt_text` in both. A deprecated `alt_text` passed to `files.uploadV2` is still sent as `alt_txt` ([#2788](https://github.com/slackapi/node-slack-sdk/issues/2788))
