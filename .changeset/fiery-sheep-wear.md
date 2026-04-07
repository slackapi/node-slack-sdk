---
"@slack/cli-test": major
---

refactor(cli-test)!: rename env add/remove to env set/unset

The Slack CLI v4.0.0 release changes the `env` commands to prefer `set` and `unset` aliases and the test tracers of this package were changed to match:

```diff
- SLACK_TRACE_ENV_ADD_SUCCESS
- SLACK_TRACE_ENV_REMOVE_SUCCESS
+ SLACK_TRACE_ENV_SET_SUCCESS
+ SLACK_TRACE_ENV_UNSET_SUCCESS
```
