# Slack OAuth

<!-- TODO: per-job badge https://github.com/bjfish/travis-matrix-badges/issues/4 -->
[![Build Status](https://travis-ci.org/slackapi/node-slack-sdk.svg?branch=master)](https://travis-ci.org/slackapi/node-slack-sdk)
<!-- TODO: per-flag badge https://docs.codecov.io/docs/flags#section-flag-badges-and-graphs -->
[![codecov](https://codecov.io/gh/slackapi/node-slack-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/slackapi/node-slack-sdk)
<!-- TODO: npm versions with scoped packages: https://github.com/rvagg/nodei.co/issues/24 -->

The `@slack/oauth` package makes it simple to setup the OAuth flow for slack apps. It supports [V2 OAuth](https://api.slack.com/authentication/oauth-v2) for Slack Apps as well as [V1 OAuth](https://api.slack.com/docs/oauth) for [Classic Slack apps](https://api.slack.com/authentication/quickstart).

The package handles url generation, state generation and verification, code exchange for access tokens, an interface easily plugging in your own databases for saving and retrieving installation data, and much more!

## Installation

```shell
$ npm install @slack/oauth
```

<!-- START: Remove before copying into the docs directory -->

## Usage

These examples show how to get started using the most common features. You'll find more extensive [documentation on the package's website](https://slack.dev/node-slack-sdk/oauth).

<!-- END: Remove before copying into the docs directory -->

Before building an app, you'll need to [create a Slack app](https://api.slack.com/apps/new) and install it to your
development workspace. You'll also **need a public URL** where the app can receive response URLs. Finally, you'll need
to copy the **request signing secret** given to you by Slack under the "Basic Information" of your app configuration.

It may be helpful to read the tutorials on [getting started](https://slack.dev/node-slack-sdk/getting-started) and
[getting a public URL that can be used for development](https://slack.dev/node-slack-sdk/tutorials/local-development).


## Initialization

View the [Initialization Options](#initialization-options) to see the full list of options available when initializing the `InstallProvider` class. 

```javascript
const slackOauth = require('@slack/oauth');;

// initialize the installProvider
const installer = new slackOauth.InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  authVersion: 'v2',
  stateSecret: 'my-state-secret'
});
```

### Initialization Options

| Option             | Required | Type   | Description                                    |
|--------------------|----------|--------|------------------------------------------------|
| clientId           | yes      | String | Your apps client ID                           |
| clientSecret       | yes      | String | Your apps client Secret                       |
| stateSecret        | no (yes if using built-in stateStore) | String | Used to sign and verify the generated state when using the built-in `stateStore` |
| stateStore         | no       | Object | Replacement function for the built-in `stateStore`. Must follow the [`stateStore` guidelines](#state-store-guidelines) |
| installationStore  | no for dev, yes for production | Object | Interface to store and retrieve installation data from the database. Must follow the [`Installation Store` guidelines](#installation-store-guidelines)|
| authVersion        | no (defaults to 'v2') | String | Can be either `v1` or `v2`. Determines which slack Oauth URL and method to use |
| logger             | no       | Object | Pass in your own Logger if you don't want to use the built-in one | 
| logLevel           | no       | String | Pass in the log level you want (ERROR, WARN, INFO, DEBUG). Default is INFO |

## Setup a simple express app 

```javascript
const express = require('express');

const app = express();
const port = 3000;

// Setup a begin_auth route to display the Add to Slack button
// This initiates the OAuth Flow
app.get('/slack/install', (req, res, next) => {
  // Call the generateInstallUrl
  installer.generateInstallUrl({
    // Add the scopes your app needs
    scopes: ['channels:read'],
    metadata: 'some_metadata',
  }).then((url) => {
    res.send(`<a href=${url}><img alt=""Add to Slack"" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>`);
  }).catch(next);
});

// This will be where your app gets redirected after the user installs your app
app.get('/slack/oauth_redirect', (req, res) => {
  installer.handleCallback(req, res, {});
});
```
The above code has two routes. The first route is `/slack/install` and it is used to create a Slack URL for your users to install your application. This URL is how your app requests scopes, [which govern its permissions](https://api.slack.com/scopes). It calls this library's `generateInstallUrl` method which will build the URL by appending your specified scopes, generating
a state parameter, and appending any of the other options passed in. Checkout [`generateInstallUrl` options](#generateinstallurl-options) to see a full list of what options you can pass into `generateInstallUrl`.

The second route is `/slack/oauth_redirect` and is used as the **redirect url**. After the user approves the request to install your app (and grants access to the required permissions), Slack will redirect the user to your specified **redirect url**. You can either set the redirect url in the app’s **OAuth and Permissions** page or pass a `redirectUri` when calling `generateInstallUrl`. `/slack/oauth_redirect` will call this library's `handleCallback` method, which will verify that the `state` parameter from `generateInstallUrl` is the same as the one received in `handleCallback`. This is to prevent [CSRF attacks](https://en.wikipedia.org/wiki/Cross-site_request_forgery). `handleCallback` will also receive a `code` parameter in its url. It will exchange this `code` parameter for an `access_token`, which we can save in our Installation Store and use to make subsequent
API calls. It does this exchange by calling the [`oauth.v2.access` method](https://api.slack.com/methods/oauth.v2.access) (or [`oauth.access` method](https://api.slack.com/methods/oauth.access) when `authVersion` is set to `v1` for Classic Slack Apps). If the exchange is successful, `handleCallback` will redirect the user back to Slack, or show a generic success page when `authVersion` is set to `v1`. If you desire different behavior (say to show a custom success page on success), both `success` and `failure` can be overridden. Checkout [`handleCallback` options](#handlecallback-options) for more details.

### generateInstallUrl Options

| Option             | Required | Type            | Description                                    |
|--------------------|----------|-----------------|------------------------------------------------|
| scopes             | yes      | String or Array | Permissions your app requires. Either as an array of strings or a string separated by commas |
| metadata           | no       | String          | Any metadata you wish to pass through the URL to the handleCallback function. A good place to store state specific information |
| teamId             | no       | String          | Slack team ID of a workspace to attempt to restrict to |
| redirectUri        | no       | String          | URL to redirect back to                        |
| userScopes         | no       | String or Array | Permissions your app needs for the user token  |

### handleCallback Options

| Option             | Required | Type      | Description                                    |
|--------------------|----------|-----------|------------------------------------------------|
| success            | no       | function  | function to run if `handleCallback` runs successfully. Run instead of the built-in success function |
| failure            | no       | function  | function to run if `handleCallback` runs fails. Run instead of the built-in failure function |

## Fetching Data from DB

The built in [Installation Store](#installation-store-guidelines) takes in an `Installation Query` object that has a `teamId` parameter. It will then search the DB with this parameter or any matches, and return an object that could have any combination of `botToken`, `userToken`, `botId`, `botUserId`, depending on which scopes your app initially requests. *Note: your app will likely receive the `teamId` in event and action payloads.*

```javascript
const result = installer.authorize({teamId:'my-Team-ID'});
console.log(result.botToken);
console.log(result.userToken);
console.log(result.botId);
console.log(result.botUserId);
```

## State Store Guidelines

This library comes with a built-in `stateStore` that handles generating and verifying a state parameter to use in your generated install url. The built-in `stateStore` also allows developers to programmatically pass in metadata that will be sent along with the state for use within the callback. To use the `built-in` state store, developers will have to pass in a `stateSecret` when initializing their application. We use this `stateSecret` to sign the `state` parameter and later verify that it hasn't been modified by potential attackers. 

Developers can pass in their own `stateStore` if they don't want to use the built-in one. A state store must have two functions:

- `generateStateParam(installOptions, Date)`: takes in a `installOptions` as the first argument representing `installURLOptions` passed in to `generateInstallURL`. Takes a `Date` argument as the second argument. Returns a `string` representing `state`.
- `verifyStateParam(Date, state)`: takes in a `Date` argument as the first argument and `state` as the second argument. Returns the `installOptions` that were encoded into the `state` param.

## Installation Store Guidelines

`installationStore` is used to interact with a database to save and retrieve installation data. To use this library in production, you must provide a custom `installationStore`.

An `installationStore` must provide the following two functions:

- `storeInstallation`: takes in a `Installation object` as the first argument to save into your database. Optionally takes a logger as the second argument. 
- `fetchInstallation`: takes in a `Installation Query` as the first argument and optionally a logger as the second. Returns a promise with the result of the DB query.

For development, we provide an in-memory `installationStore`. This means that all saved data will be erased every time you restart the server.

---

## Examples

*  [OAuth-v2](../../examples/oauth-v2/README.md). This example uses [Keyv](https://github.com/lukechilds/keyv) library as a database.
*  [OAuth-v1](../../examples/oauth-v1/README.md) 

---

## Requirements

This package supports Node v8 LTS and higher. It's highly recommended to use [the latest LTS version of
node](https://github.com/nodejs/Release#release-schedule), and the documentation is written using syntax and features
from that version.

## Getting Help

If you get stuck, we're here to help. The following are the best ways to get assistance working through your issue:

  * [Issue Tracker](http://github.com/slackapi/node-slack-sdk/issues) for questions, feature requests, bug reports and
    general discussion related to these packages. Try searching before you create a new issue.
  * [Email us](mailto:developers@slack.com) in Slack developer support: `developers@slack.com`
  * [Bot Developers Hangout](https://community.botkit.ai/): a Slack community for developers
    building all types of bots. You can find the maintainers and users of these packages in **#sdk-node-slack-sdk**.
