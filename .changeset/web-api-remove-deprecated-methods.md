---
"@slack/web-api": major
---

Removed previously-deprecated API methods and their associated request/response types:

- **`files.upload`** — Use `filesUploadV2` instead (available since v6.7). The `filesUploadV2` method handles the multi-step upload process automatically.
- **`rtm.start`** — Use `rtm.connect` instead. The `rtm.start` method was deprecated by Slack in favor of the lighter-weight `rtm.connect`.
- **`workflows.stepCompleted`**, **`workflows.stepFailed`**, **`workflows.updateStep`** — These methods supported the retired [Steps from Apps](https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back) feature (deprecated August 2023, retired September 2024). The `workflows.featured.*` and `admin.workflows.*` methods for the current Workflow Builder remain available.
