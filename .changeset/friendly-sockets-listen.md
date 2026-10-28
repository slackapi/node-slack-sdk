---
'@slack/socket-mode': patch
---

Fix Events API dispatch for payloads without an inner event, including app_rate_limited. Keep malformed payloads available to generic slack_event listeners for acknowledgement.
