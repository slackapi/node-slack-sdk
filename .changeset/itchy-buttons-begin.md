---
"@slack/cli-test": patch
---

fix: invoke commands without shell intermediate

Behind the scenes commands are now spawned direct to avoid unexpected input and output redirection or odd argument parsings. This is what happens and what changed:

Linux:

```diff
- /bin/sh -c "slack trigger run --workflow #/workflows/give_kudos_workflow"
+ execvp("slack", ["trigger", "run", "--workflow", "#/workflows/give_kudos_workflow"])
```

Windows:

```diff
- cmd.exe /s /c "slack trigger run --workflow #/workflows/give_kudos_workflow"
+ CreateProcessW("slack", ["trigger", "run", "--workflow", "#/workflows/give_kudos_workflow"])
```
