---
"@slack/cli-test": patch
---

fix(cli-test): wait up to 60 seconds for commands to finish

Commands now wait up to 60 seconds for the Slack CLI to finish before timing out, up from 30 seconds. Some commands, such as `slack create` with a Bolt template on Windows, can take close to 30 seconds.
