---
"@slack/web-api": patch
---

fix: reject `files.uploadV2` with a `WebAPIFileUploadReadFileDataError` when the `file` stream errors, instead of an uncaught exception
