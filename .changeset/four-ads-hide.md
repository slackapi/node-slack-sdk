---
"@slack/cli-test": major
---

refactor(cli-test)!: move 'create' to 'project create'

Before the Slack CLI v4.0.0 release, the `create` command became a `project` subcommand while remaining aliased the same. This project now prefers:

```js
const createOutput = await SlackCLI.project.create({
  template: "slack-samples/bolt-js-starter-template",
  appPath,
  verbose: true,
});
```

But continues to run the `slack create` command for confidence in getting started guides.
