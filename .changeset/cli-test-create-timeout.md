---
"@slack/cli-test": minor
---

feat(cli-test): accept a `timeout` for `project.create`

`project.create` takes an optional `timeout` in milliseconds to wait for `slack create` to finish. It still defaults to 30 seconds. `SlackCLIProcess.execAsync` now passes its `timeout` option to `shell.checkIfFinished`, which accepts an optional `timeout` too.
