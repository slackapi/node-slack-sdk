---
"@slack/cli-test": patch
---

fix: stop the output wait timeout from killing `run` and `activity --tail`

`platform.runStart` and `platform.activityTailStart` passed their `timeout` to the spawned Slack CLI process as well as to the wait for output. Node then stopped the process once the timeout passed, even after the expected output arrived. The timeout now applies only to the wait for output, so these processes keep running until they are stopped.
