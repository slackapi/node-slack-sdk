# @slack/cli-test

## 3.0.2

### Patch Changes

- 3c4e927: fix: invoke commands without shell intermediate

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

## 3.0.1

### Patch Changes

- f5696c3: fix: wait for cli run start trace instead of activity output

  The `platform.runStart` method now waits until "SLACK_TRACE_PLATFORM_RUN_START" is output before contining. This is output before delegating the development connection to either the SDK or CLI subprocess. This change improves automated testing support for Bolt apps.

## 3.0.0

### Major Changes

- d2b7a89: refactor(cli-test)!: rename env add/remove to env set/unset

  The Slack CLI v4.0.0 release changes the `env` commands to prefer `set` and `unset` aliases and the test tracers of this package were changed to match:

  ```diff
  - SLACK_TRACE_ENV_ADD_SUCCESS
  - SLACK_TRACE_ENV_REMOVE_SUCCESS
  + SLACK_TRACE_ENV_SET_SUCCESS
  + SLACK_TRACE_ENV_UNSET_SUCCESS
  ```

- 5a9bb9a: refactor(cli-test)!: move 'create' to 'project create'

  Before the Slack CLI v4.0.0 release, the `create` command became a `project` subcommand while remaining aliased the same. This project now prefers:

  ```js
  const createOutput = await SlackCLI.project.create({
    template: "slack-samples/bolt-js-starter-template",
    appPath,
    verbose: true,
  });
  ```

  But continues to run the `slack create` command for confidence in getting started guides.

## 2.2.2

### Patch Changes

- b8d922f: build: add support for node 24

## 2.2.1

### Patch Changes

- 9318ec9: build(cli-test): document the compatible version of slack cli with each release

  The minimum supported Slack CLI version is now documented in the README instead of being encoded in the package version using build metadata (e.g. `+cli.2.32.2`). Build metadata is stripped by npm during publish, causing version conflicts with previously published versions and breaking the automated release workflow.
