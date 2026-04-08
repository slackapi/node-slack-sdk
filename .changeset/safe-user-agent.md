---
"@slack/web-api": patch
---

Fix user-agent header to URI-encode characters outside the Latin-1 range, preventing errors when `process.title` contains non-ASCII characters
