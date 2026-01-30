---
"@slack/cli-hooks": patch
---

fix(cli-hooks): stop app process if the start hook exits

Fixes a CLI [issue](https://github.com/slackapi/slack-cli/issues/128) where daemon app processes were spawned if the CLI was exited without being interrupted.
