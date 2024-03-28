---
title: OAuth
permalink: /oauth
order: 4
anchor_links_header: Usage
---

# Slack OAuth

The `@slack/oauth` package makes it simple to setup the OAuth flow for Slack apps. It supports [V2 OAuth](https://api.slack.com/authentication/oauth-v2) for Slack Apps as well as [V1 OAuth](https://api.slack.com/docs/oauth) for [Classic Slack apps](https://api.slack.com/authentication/quickstart). Slack apps that are installed in multiple workspaces, like those available in the App Directory or installed in an Enterprise Grid, will need to implement OAuth and store information about each of those installations (such as access tokens).

The package handles URL generation, state verification, and authorization code exchange for access tokens. It also provides an interface for easily plugging in your own database for saving and retrieving installation data.

## Limitations

At this time, the `@slack/oauth` package does not support [Sign in with Slack](https://api.slack.com/authentication/sign-in-with-slack). However, there are APIs available in the [`@slack/web-api` package](./web-api) that make it easy to implement Sign in With Slack; for more information, have a look at the [`@slack/web-api` Sign in with Slack documentation](./web-api#sign-in-with-slack-via-openid-connect).

## Installation

```shell
$ npm install @slack/oauth
```

Before building an app, you'll need to [create a Slack app](https://api.slack.com/apps/new) and install it to your development workspace. You'll also need to copy the **Client ID** and **Client Secret** given to you by Slack under the **Basic Information** of your app configuration.

It may be helpful to read the tutorials on [getting started](https://slack.dev/node-slack-sdk/getting-started) and [getting a public URL that can be used for development](https://slack.dev/node-slack-sdk/tutorials/local-development).

---

### Initialize the installer

This package exposes an `InstallProvider` class, which sets up the required configuration and exposes methods such as `handleInstallPath` (which calls `generateInstallUrl` internally), `handleCallback`, and `authorize` for use within your apps. At a minimum, `InstallProvider` takes a `clientId` and `clientSecret` (both which can be obtained under the **Basic Information** of your app configuration). `InstallProvider` also requires a `stateSecret`, which is used to encode the generated state, and later used to decode that same state to verify it wasn't tampered with during the OAuth flow. **Note**: This example is not ready for production because it only stores installations (tokens) in memory. Please go to the [storing installations in a database](#storing-installations-in-a-database) section to learn how to plug in your own database.

```javascript
const { InstallProvider } = require('@slack/oauth');

// initialize the installProvider
const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'my-state-secret'
});
```

<details>
<summary markdown="span">
<strong><i>Using a classic Slack app</i></strong>
</summary>

  ```javascript
  const { InstallProvider } = require('@slack/oauth');

  // initialize the installProvider
  const installer = new InstallProvider({
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    stateSecret: 'my-state-secret',
    authVersion: 'v1' //required for classic Slack apps
  });
  ```
</details>

---

### Showing an Installation Page

You'll need an installation URL when you want to test your own installation in order to submit your app to the App Directory and in case you need additional authorizations (such as user tokens) from users inside a team where your app is already installed. These URLs are also commonly used on your own webpages as the link for an ["Add to Slack" button](https://api.slack.com/docs/slack-button).

The recommended and simplest approach is for `InstallProvider` to render the installation page at a URL/path of your choosing [using the `handleInstallPath()` method](#using-handleinstallpath). It will automatically display an "Add to Slack" button and encode any desired user or bot scopes and metadata you specify. If you wish to further customize the installation page, you can do so by passing a `renderHtmlForInstallPath` function to the `InstallProvider` constructor. Also, if your app supports Direct Install URL in the App Directory page, you can pass `directInstall: true` when initializing `InstallProvider`.

#### Using `handleInstallPath`

If you don't need to customize the installation page users will be shown, you can let this package render the installation page for you using the `handleInstallPath()` method.

```javascript
// Assume the installation page is located at /slack/install
app.get('/slack/install', async (req, res) => {
  await installer.handleInstallPath(req, res, {
    scopes: ['chat:write'],
    userScopes: ['channels:read'],
    metadata: 'some_metadata',
  });
});
```

The `handleInstallPath` method accepts an options object as its third argument which supports `scopes`, `metadata`, `userScopes`, `teamId` and `redirectUri` properties (check out the [source code for this interface](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-url-options.ts) for more details).

To have more control over the installation page contents, you can pass a `renderHtmlForInstallPath` function that takes a URL argument as a string and returns an HTML string that will be sent in the HTTP response body. This function will be invoked as part of `handleInstallPath` execution:

```javascript
const { InstallProvider } = require('@slack/oauth');

// initialize the installProvider
const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'my-state-secret',
  renderHtmlForInstallPath: (url) => `<html><body><a href="${url}">Install my app!</a></body></html>`
});
```

<details>
<summary markdown="span">
<strong><i>Manually generating installation page URL and contents</i></strong>
</summary>

If you want to customize the installation page users will be shown, you may generate an installation URL dynamically and use the generated URL as part of the installation page displayed to the user.

The `installProvider.generateInstallUrl()` method will create an installation URL for you. It takes in an options argument which at a minimum contains a `scopes` property. `installProvider.generateInstallUrl()` options argument also supports `metadata`, `teamId`, `redirectUri` and `userScopes` properties (check [the source](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-url-options.ts) for details on these properties).

```javascript
app.get('/slack/install', async (req, res, next) => {
  // feel free to modify the scopes
  const url = await installer.generateInstallUrl({
    scopes: ['channels:read'],
  })

  res.send(`<a href=${url}><img alt=""Add to Slack"" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>`);
});
```

Additionally, you might want to present an "Add to Slack" button while the user is in the middle of some other tasks (e.g. linking their Slack account to your service). In these situations, you want to bring the user back to where they left off after the app installation is complete. Custom metadata can be used to capture partial (incomplete) information about the task (like which page they were on or inputs to form elements the user began to fill out) in progress. Then when the installation is complete, that custom metadata will be available for your app to recreate exactly where they left off. You must also use a [custom success handler when handling the OAuth redirect](#handling-the-oauth-redirect) to read the custom metadata after the installation is complete.

```javascript
installer.generateInstallUrl({
  // Add the scopes your app needs
  scopes: ['channels:read'],
  metadata: JSON.stringify({some:'sessionState'})
})
```

**Note**: custom metadata is visible to the user, so don't store any secret information in the metadata. The installation provider will ensure that none of the metadata has been tampered with when the user returns. To change how metadata is handled, including hiding it from users, read about [using a custom state store](#using-a-custom-state-store).
</details>

---

### Handling the OAuth redirect

After the user approves the request to install your app (and grants access to the required permissions), Slack will redirect the user to your specified **Redirect URL**. You can either set the redirect URL in the app’s **OAuth and Permissions** page or pass a `redirectUri` when calling `installProvider.handleInstallPath`.

Your HTTP server should handle requests to this redirect URL by calling the `installProvider.handleCallback()` method. The first two arguments (`req`, `res`) to `installProvider.handleCallback` are required. By default, if the installation is successful the user will be redirected back to your App Home in Slack (or redirected back to the last open workspace in your slack app for classic Slack apps). If the installation is not successful the user will be shown an error page.

```javascript
const { createServer } = require('http');

const server = createServer((req, res) =>  {
  // our redirect_uri is /slack/oauth_redirect
  if (req.url === '/slack/oauth_redirect') {
    // call installer.handleCallback to wrap up the install flow
    installer.handleCallback(req, res);
  }
})

server.listen(3000);
```

<details>
<summary markdown="span">
<strong><i>Using an Express app</i></strong>
</summary>

You can easily use `installer.handleCallback` within an Express app by setting up a route for the OAuth redirect.

```javascript
app.get('/slack/oauth_redirect', (req, res) => {
  installer.handleCallback(req, res);
});
```
</details>

### Persisting data during the OAuth flow

There are many situations where you may want to persist some custom data relevant to your application across the entire OAuth flow. For example, you may want to map Slack resources (like users) to your own application's resources, or verify and gate eligibility for proceeding with installing your Slack application to a workspace based on your application's requirements. To this end, this package provides a series of hooks, or callbacks, that allow your application to integrate throughout key points of the OAuth flow.

These are all callbacks customizable via the [`CallbackOptions`](reference/oauth#callbackoptions) and [`InstallPathOptions`](reference/oauth#installpathoptions) interfaces - check their [reference documentation](reference/oauth) for more details.

For example, you may wish to store some information relevant to your application in a cookie before starting the OAuth flow and redirecting the user to the slack.com authorize URL. Once the user completes the authorization process on slack.com and is redirected back to your application, you can read this cookie and determine if the user has the appropriate permissions to proceed with installation of your application:

```javascript
const { InstallProvider } = require('@slack/oauth');
const { createServer } = require('http');

// initialize the installProvider
const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'my-state-secret'
});

const server = createServer(async (req, res) =>  {
  // our installation path is /slack/install
  if (req.url === '/slack/install') {
    // call installer.handleInstallPath and write a cookie using beforeRedirection
    await installer.handleInstallPath(req, res, {
      beforeRedirection: async (req, res) => {
        res.setHeader('Set-Cookie', 'mycookie=something');
        return true; // return true to continue with the OAuth flow
      }
    });
  }
  // our redirect_uri is /slack/oauth_redirect
  if (req.url === '/slack/oauth_redirect') {
    // call installer.handleCallback but check our custom cookie before
    // wrapping up the install flow
    await installer.handleCallback(req, res, {
      beforeInstallation: async (opts, req, res) => {
        if (checkCookieForInstallElibility(req)) {
          // the user is allowed to install the app
          return true;
        } else {
          // user is not allowed to install! end the http response and return false
          // to stop the installation
          res.end();
          return false;
        }
      }
    });
  }
})

server.listen(3000);
```

<details>
<summary markdown="span">
<strong><i>Using custom success or failure handlers</i></strong>
</summary>

If you decide you need custom success or failure behaviors (ex: wanting to show a page on your site with instructions on how to use the app), you can pass in your own success/failure functions.

```javascript
const callbackOptions = {
  success: (installation, installOptions, req, res) => {
    // Do custom success logic here
    // Tips:
    // - Inspect the metadata with `installOptions.metadata`
    // - Add javascript and css in the htmlResponse using the <script> and <style> tags
    const htmlResponse = `<html><body>Success!</body></html>`
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlResponse);
  },
  failure: (error, installOptions , req, res) => {
    // Do custom failure logic here
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<html><body><h1>Oops, Something Went Wrong! Please Try Again or Contact the App Owner</h1></body></html>');
  }
}
app.get('/slack/oauth_redirect', (req, res) => {
  installer.handleCallback(req, res, callbackOptions);
});
```
</details>
---

### Storing installations in a database

Although this package uses a default `MemoryInstallationStore`, it isn't recommended for production purposes since the access tokens it stores are lost when the process terminates or restarts. To override this default, `InstallProvider` allows for supplying your own `installationStore`, which is then used to save and retrieve installation information (like tokens) to your own database.

For more persistent storage during development, `FileInstallationStore` is a provided alternative to `MemoryInstallationStore` and is available for import and use directly from the package. Customizable options for this store include specifying the `baseDir`, `clientId`, and `historicalDataEnabled`.

An installation store is an object that provides three methods: `storeInstallation`, `fetchInstallation`, and `deleteInstallation`. `storeInstallation` takes an `installation` as an argument, which is an object that contains all installation related data (like tokens, teamIds, enterpriseIds, etc). `fetchInstallation` and `deleteInstallation` both take in an `installQuery`, which is used to query the database. The `installQuery` can contain `teamId`, `enterpriseId`, `userId`, `conversationId` and `isEnterpriseInstall`.

In the following example, the `installationStore` option is used and the object is defined in line. The methods are implemented by calling an example database library with simple get and set operations.

```javascript
const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'my-state-secret',
  installationStore: {
    // takes in an installation object as an argument
    // returns nothing
    storeInstallation: async (installation) => {
      // replace myDB.set with your own database or OEM setter
      if (installation.isEnterpriseInstall) {
        // support for org wide app installation
        return myDB.set(installation.enterprise.id, installation);
      } else {
        // single team app installation
        return myDB.set(installation.team.id, installation);
      }
      throw new Error('Failed saving installation data to installationStore');
    },
    // takes in an installQuery as an argument
    // installQuery = {teamId: 'string', enterpriseId: 'string', userId: 'string', conversationId: 'string', isEnterpriseInstall: boolean};
    // returns installation object from database
    fetchInstallation: async (installQuery) => {
      // replace myDB.get with your own database or OEM getter
      if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
        // org wide app installation lookup
        return await myDB.get(installQuery.enterpriseId);
      }
      if (installQuery.teamId !== undefined) {
        // single team app installation lookup
        return await myDB.get(installQuery.teamId);
      }
      throw new Error('Failed fetching installation');
    },
    // takes in an installQuery as an argument
    // installQuery = {teamId: 'string', enterpriseId: 'string', userId: 'string', conversationId: 'string', isEnterpriseInstall: boolean};
    // returns nothing
    deleteInstallation: async (installQuery) => {
      // replace myDB.get with your own database or OEM getter
      if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
        // org wide app installation deletion
        return await myDB.delete(installQuery.enterpriseId);
      }
      if (installQuery.teamId !== undefined) {
        // single team app installation deletion
        return await myDB.delete(installQuery.teamId);
      }
      throw new Error('Failed to delete installation');
    },
  },
});
```
---

### Reading tokens and other installation data

You can use the the `installationProvider.authorize()` function to fetch data that has been saved in your installation store.

```javascript
// installer.authorize takes in an installQuery as an argument
// installQuery = {teamId: 'string', enterpriseId: 'string', userId: string, conversationId: 'string', isEnterpriseInstall: boolean};
const result = installer.authorize({teamId: 'my-team-ID'});
/*
result = {
  botToken: '',
  userToken: '',
  botId: '',
  botUserId: '',
  teamId: '';
  enterpriseId: '';
}
*/
```

<details>
<summary markdown="span">
<strong><i>Reading extended installation data</i></strong>
</summary>

The `installer.authorize()` method only returns a subset of the installation data returned by the installation store. To fetch the entire saved installation, use the `installer.installationStore.fetchInstallation()` method.

```javascript
// installer.installationStore.fetchInstallation takes in an installQuery as an argument
// installQuery = {teamId: 'string', enterpriseId: 'string', userId: 'string', conversationId: 'string', isEnterpriseInstall: boolean};
// returns an installation object
const result = await installer.installationStore.fetchInstallation({teamId:'my-team-ID', enterpriseId:'my-enterprise-ID'});
```
</details>

---

### Using a custom state store

A state store handles generating the OAuth `state` parameter in the installation URL for a given set of options, and verifying the `state` in the OAuth callback and returning those same options.

The default state store, `ClearStateStore`, does not use any storage. Instead, it signs the options (using the `stateSecret`) and encodes them along with a signature into `state`. Later during the OAuth callback, it verifies the signature.

If you want to conceal the `metadata` used in the installation URL options you will need to store `state` on your server (in a database) by providing a custom state store. A custom state implements two methods: `generateStateParam()` and `verifyStateParam()`. When you instantiate the `InstallProvider` use the `stateStore` option to set your custom state store. And when using the custom state store, you no longer need to use the `stateSecret` option.

```javascript
const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateStore: {
    // generateStateParam's first argument is the entire InstallUrlOptions object which was passed into generateInstallUrl method
    // the second argument is a date object
    // the method is expected to return a string representing the state
    generateStateParam: (installUrlOptions, date) => {
      // generate a random string to use as state in the URL
      const randomState = randomStringGenerator();
      // save installOptions to cache/db
      myDB.set(randomState, installUrlOptions);
      // return a state string that references saved options in DB
      return randomState;
    },
    // verifyStateParam's first argument is a date object and the second argument is a string representing the state
    // verifyStateParam is expected to return an object representing installUrlOptions
    verifyStateParam:  (date, state) => {
      // fetch saved installOptions from DB using state reference
      const installUrlOptions = myDB.get(randomState);
      return installUrlOptions;
    }
  },
});
```
---

### State verification

By default, this package handles generating and verifying a `state` parameter during OAuth installation. This added measure helps to mitigate the risk of [Cross-Site Request Forgery](https://datatracker.ietf.org/doc/html/rfc6749#section-10.12) and is strongly recommended.

In specific installation scenarios with Enterprise Grid organizations, such as when an Org-wide app is installed from an admin page, state verification cannot be completed because a `state` parameter isn't provided. In this case, you can disable `state` verification via setting the `InstallProvider#stateVerification` option to `false`. Now, the installer will no longer require that `state` be present to proceed with installation.

```javascript
const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateVerification: false,
});
```
---

### Setting the log level and using a custom logger

The `InstallProvider` will log interesting information to the console by default. You can use the `logLevel` to decide how
much information, or how interesting the information needs to be, in order for it to be output. There are a few possible
log levels, which you can find in the `LogLevel` export. By default, the value is set to `LogLevel.INFO`. While you're
in development, its sometimes helpful to set this to the most verbose: `LogLevel.DEBUG`.

```javascript
// Import LogLevel from the package
const { InstallProvider, LogLevel } = require('@slack/oauth');

// Log level is one of the options you can set in the constructor
const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'my-state-secret',
  logLevel: LogLevel.DEBUG,
});
```

All the log levels, in order of most to least information are: `DEBUG`, `INFO`, `WARN`, and `ERROR`.

<details>
<summary markdown="span">
<strong><i>Sending log output somewhere besides the console</i></strong>
</summary>

You can also choose to have logs sent to a custom logger using the `logger` option. A custom logger needs to implement
specific methods (known as the `Logger` interface):

| Method       | Parameters        | Return type |
|--------------|-------------------|-------------|
| `setLevel()` | `level: LogLevel` | `void`      |
| `setName()`  | `name: string`    | `void`      |
| `debug()`    | `...msgs: any[]`  | `void`      |
| `info()`     | `...msgs: any[]`  | `void`      |
| `warn()`     | `...msgs: any[]`  | `void`      |
| `error()`    | `...msgs: any[]`  | `void`      |

A very simple custom logger might ignore the name and level, and write all messages to a file.

```javascript
const { createWriteStream } = require('fs');
const logWritable = createWriteStream('/var/my_log_file'); // Not shown: close this stream

const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'my-state-secret',
  // Creating a logger as a literal object. It's more likely that you'd create a class.
  logger: {
    debug(...msgs): { logWritable.write('debug: ' + JSON.stringify(msgs)); },
    info(...msgs): { logWritable.write('info: ' + JSON.stringify(msgs)); },
    warn(...msgs): { logWritable.write('warn: ' + JSON.stringify(msgs)); },
    error(...msgs): { logWritable.write('error: ' + JSON.stringify(msgs)); },
    setLevel(): { },
    setName(): { },
  },
});
```
</details>

---

### Examples

*  [OAuth Express app](https://github.com/slackapi/node-slack-sdk/tree/main/examples/oauth-v2/README.md). This example uses [Keyv](https://github.com/lukechilds/keyv) library as an installation store.
*  [classic Slack App](https://github.com/slackapi/node-slack-sdk/tree/main/examples/oauth-v1/README.md). This example uses the built-in installation store

---

### Requirements

This package supports Node v14 and higher. It's highly recommended to use [the latest LTS version of
node](https://github.com/nodejs/Release#release-schedule), and the documentation is written using syntax and features
from that version.

## Getting Help

If you get stuck, we're here to help. The following are the best ways to get assistance working through your issue:

  * [Issue Tracker](http://github.com/slackapi/node-slack-sdk/issues) for questions, feature requests, bug reports and
    general discussion related to these packages. Try searching before you create a new issue.
  * [Email us](mailto:developers@slack.com) in Slack developer support: `developers@slack.com`
  * [Bot Developers Hangout](https://community.botkit.ai/): a Slack community for developers
    building all types of bots. You can find the maintainers and users of these packages in **#sdk-node-slack-sdk**.
