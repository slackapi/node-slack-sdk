---
"@slack/cli-test": patch
---

fix: wait for cli run start trace instead of activity output

The `platform.runStart` method now waits until "SLACK_TRACE_PLATFORM_RUN_START" is output before contining. This is output before delegating the development connection to either the SDK or CLI subprocess. This change improves automated testing support for Bolt apps.
