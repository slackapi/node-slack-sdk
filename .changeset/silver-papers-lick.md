---
"@slack/cli-test": major
---

fix: remove default "--app deployed" global flag from commands

Commands running for a specific app must now provide the "app" argument:

```diff
  await SlackCLI.app.delete({
    appPath: "my-app",
    team: "T0123456789",
+   app: "deployed",
  });
```

The options "local" or "deployed" or app ID all remain available to use.
