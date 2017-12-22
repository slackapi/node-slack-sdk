---
layout: page
title: Getting Started
permalink: /getting_started
order: 1
headings:
    - title: Create a Slack app
    - title: Setting up your local project
    - title: Sending a notification with incoming webhooks
    - title: Calling a web API method
---

You've never built a Slack app before? Want some direction on how to use this package? Well, my
friend, you're in the right place.

This guide introduces fundamentals of the Slack Developer Kit for Node.js and Slack apps.

## Create a Slack app

The first step is to [register a new app](https://api.slack.com/apps/new) with Slack at the API
website. Give your app a fun name and choose a Development Slack Workspace. We recommend using
a workspace where you aren't going to disrupt real work getting done -- you can create a new
workspace for free.

You'll be greeted with some basic information. In this guide we'll be setting up an Incoming Webhook
and make a request to the Web API. The webhook allows your app to post rich notifications into
one specific channel that a user gets to decide when they install your app into their workspace.
The Web API allows your app to call methods that can be used for everything from creating a channel
to searching messages. Let's configure our new app for these capabilities.

### Setting up incoming webhooks

Navigate to incoming webhooks and activate the feature. When you click the "Add New Webhook to
Workspace" button, you'll be taken to your app installation page. This page is asking you for
permission to install the app in your development workspace with specific capabilities. That's
right, the development workspace is like every other workspace -- apps must be authorized by a user
each time it asks for more permissions. Go ahead and choose a channel and click "Authorize".
Copy the webhook URL that was added to the table below and keep it safe. This URL should be treated
like a password since it contains the permissions to post in a channel from the outside world. In
a later step, you'll be asked to use this URL in your code.

### Getting a token to use the Web API

Navigate to OAuth & Permissions and scroll down to the section for scopes. Slack describes the
various permissions your app could obtain from a user as **scopes**. There are a
[ton of scopes](https://api.slack.com/scopes)! Some are coarse and authorize your app to access lots
of data, while others are very specific and let your app touch just a tiny sliver. Your users (and
their IT admins) will have opinions about which data your app should access, so we recommend finding
the scope(s) with the least amount of privilege for your app's needs. In this guide we will use the
Web API to perform a search for messages. The scope required for this is called `search:read`. Use
the dropdown or start typing its name to select and add the scope, then click "Save Changes".

Our app has described which scope it desires in the workspace, but a user hasn't authorized those
scopes for the development workspace yet. Scroll up and click "Install (or Reinstall) App". You'll
be back at the page asking you for permission, but this time with an additional entry corresponding
to the `search:read` scope we just added. Choose your channel again and click "Authorize". When you
return to the OAuth & Permissions page copy the OAuth Access Token. Just like the webhook URL from
above, treat this value like a password and keep it safe. The Web API uses tokens to
to authenticate the requests your app makes. In a later step, you'll be asked to use this token in
your code.

## Set up your local project

If you don't already have a project, let's create a new one. In an empty directory, you can
initialize a new project using the following command:

```shell
$ npm init
```

You'll be prompted with a series of questions to describe your project, and you can accept the
defaults if you aren't picky. After you're done, you'll have a new `package.json` file in your
directory.

Install this package and save it to your `package.json` dependencies using the following command:

```shell
$ npm install @slack/client
```

Create a new file called `tutorial.js` in this directory and add the following code:

```javascript
const { IncomingWebhook, WebClient } = require('@slack/client');

console.log('Getting started with Slack Developer Kit for Node.js');
```

Back at the command line, run the program using the following command:

```shell
$ node tutorial.js
Getting started with Slack Developer Kit for Node.js
```

If you see the same output as above, you're ready to build your Slack app!

## Sending a notification with incoming webhooks

In this guide we'll post a simple notification that contains the current time. We'll also follow
the best practice of keeping secrets outside of your code (do not hardcode sensitive data).

Store the webhook URL in a new environment variable. The following example works on Linux and MacOS;
but [similar commands are available on Windows](https://superuser.com/a/212153/94970). Replace the
value with webhook URL that you copied above.

```shell
$ export SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

Open `tutorial.js` and add the following code:

```javascript
const timeNotification = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
const currentTime = new Date().toTimeString();
timeNotification.send(`The current time is ${currentTime}`, (error, resp) => {
  if (error) {
    return console.error(error);
  }
  console.log('Notification sent');
});
```

This code creates an instance of the `IncomingWebhook` class, which requires a webhook URL. The
program reads the webhook URL from the environment variable. Then the `.send()` method is called to
send a simple string to the Slack channel. The second argument is a callback which handles any
error by logging it, and otherwise prints "Notification sent".

Run the program. The output should look like the following:

```shell
$ node tutorial.js
Getting started with Slack Developer Kit for Node.js
Notification sent
```

Look inside Slack to verify the notification message was sent.

## Calling a web API method

Now that you app has sent a message, let's search for the message using the
[`search.messages`](https://api.slack.com/methods/search.messages) web API method.

Store the access token in a new environment variable. The following example works on Linux and MacOS;
but [similar commands are available on Windows](https://superuser.com/a/212153/94970). Replace the
value with token that you copied above.

```
$ export SLACK_TOKEN=xoxp-...
```

Open `tutorial.js` and update the code to look like the following:

```javascript
const { IncomingWebhook, WebClient } = require('@slack/client');

console.log('Getting started with Slack Developer Kit for Node.js');

const web = new WebClient(process.env.SLACK_TOKEN);
const timeNotification = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
const currentTime = new Date().toTimeString();

timeNotification.send(`The current time is ${currentTime}`, (error, resp) => {
  if (error) {
    return console.error(error);
  }
  console.log('Notification sent');
  console.log('Waiting a few seconds for search indexes to update...');
  setTimeout(() => {
    console.log('Calling search.messages');
    web.search.messages(currentTime)
      .then(resp => {
        if (resp.messages.total > 0) {
          console.log('First match:', resp.messages.matches[0]);
        } else {
          console.log('No matches found');
        }
      })
      .catch(console.error)
  }, 12000);
});
```

Run the program and you should see output similar to the following:

```shell
$ node tutorial.js
Getting started with Slack Developer Kit for Node.js
Notification sent
Waiting a few seconds for search indexes to update...
Calling search.messages
First match: { type: 'message',
  ts: '1513884363.000142',
  text: 'The current time is 11:26:03 GMT-0800 (PST)',
  iid: '0a4d7acd-c0d9-49f4-813f-7a21f3cf78dc',
  permalink: 'https://workspace-subdomain.slack.com/archives/C34SDV231/p231234192347',
  team: 'T0AS345LD',
  channel:
   { id: 'C34SDV231',
     is_channel: true,
     is_group: false,
     is_im: false,
     name: 'blah',
     is_shared: false,
     is_org_shared: false,
     is_ext_shared: false,
     is_private: false,
     is_mpim: false,
     pending_shared: [],
     is_pending_ext_shared: false } }
```

_If you see no results, try increasing the timeout time and run the program again. Slack's
search indexes could take more than a few seconds._

## Next Steps

You just built your first Slack app with Node.js! 🎉💃🌮

There's plenty more to learn and explore about this package and the Slack platform. Here are some
ideas about where to look next:

* You now know how to build a Slack app for a single workspace,
  [learn how to implement Slack OAuth](https://api.slack.com/docs/oauth) to make your app
  installable in many workspaces. If you are using [Passport](http://www.passportjs.org/) to handle
  authentication, you may find the
  [`@aoberoi/passport-slack`](https://github.com/aoberoi/passport-slack) strategy package helpful.

* Tokens are an important part of using the Slack platform. Learn about the
  [different types of tokens](https://api.slack.com/docs/token-types).

* This tutorial only used one of **over 130 Web API methods** available.
  [Look through them](https://api.slack.com/methods) to and get ideas about what to build next!

* Dive deeper into the `IncomingWebhook`, `WebClient`, and `RtmClient` classes in this package by
  exploring their documentation pages.
