# Slack CLI Hooks

The `@slack/hooks` package contains scripts that implement the contract between
the [Slack CLI][cli] and [Bolt for JavaScript][bolt].

## Requirements

This package supports Node v18 and higher. It's highly recommended to use [the
latest LTS version of Node][node].

An updated version of the Slack CLI is also encouraged while using this package.

## Installation

Add this package as a development dependency for your project with the following
command:

```sh
$ npm install --save-dev @slack/hooks
```

Follow [the installation guide][install] to download the Slack CLI and easily
run the scripts included in this package.

## Usage

Scripts in this package are used by the Slack CLI when running certain commands.

These scripts are automatically added to the `./node_modules/.bin` directory of
a project when this package is installed.

### Preparing a project manifest

Define the [manifest of your application][manifest] in a `manifest.json` file:

```json
{
  "display_information": {
    "name": "Hooks"
  },
  "settings": {
    "org_deploy_enabled": true,
    "socket_mode_enabled": true,
  },
  "features": {
    "bot_user": {
      "display_name": "Hooks"
    }
  },
  "oauth_config": {
    "scopes": {
      "bot": ["chat:write"]
    }
  }
}
```

Or collect an existing manifest for your app from the **App Manifest** tab on
[App Config][config].

### Configuring the hooks interface

Configure a Bolt project to use these scripts by creating a `slack.json` file in
the root directory of your project:

```json
{
  "hooks": {
    "get-hooks": "npx -q --no-install -p @slack/hooks slack-cli-get-hooks"
  }
}
```

### Running the app

With this package configured and the Slack CLI installed, you're ready to run
your app:

```sh
$ slack run
```

## Getting help

If you get stuck, we're here to help. The following are the best ways to get
assistance working through your issue:

* [Issue Tracker][issues] for questions, feature requests, bug reports and
  general discussion related to these packages. Try searching before you create
  a new issue.
* [Email us][email]: `developers@slack.com`
* [Community Slack][community]: a Slack community for developers building all
  kinds of Slack apps. You can find the maintainers and users of these packages
  in **#lang-javascript**.

<!-- a collection of links -->
[bolt]: https://github.com/slackapi/bolt-js
[cli]: https://api.slack.com/automation/cli
[community]: https://community.slack.com/
[config]: https://api.slack.com/apps
[email]: mailto:developers@slack.com
[install]: https://api.slack.com/automation/cli/install
[issues]: http://github.com/slackapi/node-slack-sdk/issues
[manifest]: https://api.slack.com/reference/manifests
[node]: https://github.com/nodejs/Release#release-schedule
