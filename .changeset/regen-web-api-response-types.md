---
"@slack/web-api": minor
---

feat(web-api): add webapi response changes as of 2026-08-21

Regenerate `packages/web-api/src/types/response` from the latest `java-slack-sdk` samples, picking up new stable response properties (e.g. `agent_session` on message-bearing responses, `ListView` grouping/sort/filter fields, `bots.info` connector/workflow flags).

Two fields are removed from `UsersListResponse`, neither of which is a real success-response property:

- `Member.is_connector_bot` — not returned by `users.list`; this flag is surfaced on `bots.info` (added here to `BotsInfoResponse`).
- `arg` — an error-response echo field, not part of a successful `users.list` body.
