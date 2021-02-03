---
title: Migrating to v6.x
order: 1
slug: migrating_to_v6
---

# Migration Guide (v5 to v6)

The following packages have been updated in the release being dubbed as `v6`:
* `@slack/web-api@6.0.0`
* `@slack/rtm-api@6.0.0`
* `@slack/webhook@6.0.0`
* `@slack/oauth@2.0.0`
* `@slack/interactive-messages@2.0.0`
* `@slack/events-api@3.0.0`
* `@slack/types@2.0.0`
* `@slack/logger@3.0.0`
* `@slack/socket-mode@1.0.0`

To migrate to the latest packages, updating your minimum Node.js to `12.13.0` is all that is required, except for `@slack/oauth` which has one additional breaking change. This migration should take less than 15 minutes.

### Minimum Node Version

Our newly released major versions all require a minimum Node version of `12.13.0` and minimum npm version of `6.12.0` .

**Note**: Learn more about our [support schedule](https://github.com/slackapi/node-slack-sdk/wiki/Support-Schedule) so that you can prepare and plan for future updates.

### Minimum TypeScript Version

Our newly released major versions all require a minimum TypeScript version of `4.1`.

### Org Wide App Installation changes to InstallationStore in @slack/oauth

In [`@slack/oauth@1.4.0`](https://github.com/slackapi/node-slack-sdk/releases/tag/%40slack%2Foauth%401.4.0), we introduced support for [org wide app installations](https://api.slack.com/enterprise/apps). To add support to your applications, two new methods were introduced to the Installation Store used during OAuth, `fetchOrgInstallation` & `storeOrgInstallation`. With ``@slack/oauth@2.0.0``, we have dropped support for these two new methods for a simpler interface. See the code samples below for the recommended changes to migrate.

Before:

```javascript
installationStore: {
    storeInstallation: async (installation) => {
      // change the line below so it saves to your database
      return await database.set(installation.team.id, installation);
    },
    fetchInstallation: async (installQuery) => {
      // change the line below so it fetches from your database
      return await database.get(installQuery.teamId);
    },
    storeOrgInstallation: async (installation) => {
      // include this method if you want your app to support org wide installations
      // change the line below so it saves to your database
      return await database.set(installation.enterprise.id, installation);
    },
    fetchOrgInstallation: async (installQuery) => {
      // include this method if you want your app to support org wide installations
      // change the line below so it fetches from your database
      return await database.get(installQuery.enterpriseId);
    },
  },
```

After:

```javascript
installationStore: {
    storeInstallation: async (installation) => {
      if (installation.isEnterpriseInstall) {
        // support for org wide app installation
        return await database.set(installation.enterprise.id, installation);
      } else {
        // single team app installation
        return await database.set(installation.team.id, installation);
      }
      throw new Error('Failed saving installation data to installationStore');
    },
    fetchInstallation: async (installQuery) => {
      // replace database.get so it fetches from your database
      if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
        // org wide app installation lookup
        return await database.get(installQuery.enterpriseId);
      }
      if (installQuery.teamId !== undefined) {
        // single team app installation lookup
        return await database.get(installQuery.teamId);
      }
      throw new Error('Failed fetching installation');
    },
  },
```

### Deprecating @slack/events-api & @slack/interactive-messages

`@slack/events-api` and `@slack/interactive-messages` will be deprecated on **January 12th, 2021**. We will only implement **critical bug fixes** until the official end of life date and close non critical issues and pull requests, which is slated for **May 31st, 2021**. At this time, development will fully stop for these packages and all remaining open issues and pull requests will be closed. Bolt for JavaScript can now perform all the same functionality as these packages. We think you’ll love the more modern set of features you get in Bolt. Here are some migration examples:

Before:
```javascript
// @slack/events-api
slackEvents.on('app_home_opened', (event) -> {
// fired when `app_home_opened` event is received
// do work
});

// @slack/interactive-messages
slackInteractions.action({actionId: 'buttonActionId'}, (payload, respond) => {
// fired when a clicked button's actionId matches
// do work
respond();
});
```

After:
```javascript
// @slack/bolt
app.event('app_home_opened', async ({ event }) -> {
// fired when `app_home_opened` event is received
// do work
});

// @slack/bolt
app.action('buttonActionId', async ({ action, ack }) => {
// fired when a clicked button's actionId matches
// do work
await ack();
});
// @slack/bolt also has listeners for options, view, slash commands and shortcuts
```


