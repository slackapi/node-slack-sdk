# @slack/cli-hooks

## 1.3.0

### Minor Changes

- 0abdc91: feat(cli-hooks): add default app and manifest watch config

  This package now provides default watch configurations for automatic file watching during [`slack run`](https://docs.slack.dev/tools/slack-cli/reference/commands/slack_platform_run). The CLI will restart your app server when source files change and reinstall your app when the manifest changes.

  **Requirements:** These features require Slack CLI v3.12.0+ with [file watching support](https://github.com/slackapi/slack-cli/pull/310).

  ### Default Configuration

  The following watch settings are provided automatically when using this package:

  ```json
  {
    "config": {
      "watch": {
        "app": {
          "filter-regex": "\\.js$",
          "paths": ["."]
        },
        "manifest": {
          "paths": ["manifest.json"]
        }
      }
    }
  }
  ```

  - **app**: Watches for JavaScript file changes to restart the app server
  - **manifest**: Watches the manifest file for changes to reinstall the app

  **Note:** Manifest watching requires a local manifest source in your `.slack/config.json` file. Remote manifests will not be updated on file changes.

  ```json
  {
    "manifest": {
      "source": "local"
    }
  }
  ```

  ### Custom Configurations

  You can override these defaults in your `.slack/hooks.json` file to reduce the paths searched or change the file patterns. Read [Watch Configurations](https://docs.slack.dev/tools/slack-cli/reference/hooks/#watch-configurations) for more options.

  ### TypeScript Development

  TypeScript developers should run `tsc --watch` in a separate terminal during development. This compiles `.ts` files to `.js` on changes, and the default watch configuration will detect changes to the compiled `dist/*.js` files and restart the app server. This approach works best with the default settings.

### Patch Changes

- 8962739: fix(cli-hooks): stop app process if the start hook exits

  Fixes a CLI [issue](https://github.com/slackapi/slack-cli/issues/128) where daemon app processes were spawned if the CLI was exited without being interrupted.
