---
"@slack/cli-test": patch
---

build(cli-test): document the compatible version of slack cli with each release

The minimum supported Slack CLI version is now documented in the README instead of being encoded in the package version using build metadata (e.g. `+cli.2.32.2`). Build metadata is stripped by npm during publish, causing version conflicts with previously published versions and breaking the automated release workflow.
