---
layout: page
title: Getting Started
permalink: /getting_started
order: 1
headings:
    - title: Create a Slack app
    - title: Setting up your local project
    - title: Sending a message with the web API
---

You've never built a Slack app before? Want some direction on how to use this package? Well, my
friend, you're in the right place.

This guide introduces fundamentals of the Slack Developer Kit for Node.js and Slack apps.

## Create a Slack app

The first step is to [register a new app](https://api.slack.com/apps/new) with Slack at the API
website. You have the option to build a user-token app or a workspace app. Give your app a fun name and choose a Development Slack Workspace. We recommend using a workspace where you aren't going to disrupt real work getting done -- you can create a new workspace for free.

> ⚠️ For this guide, we'll assume you're building a [workspace app](https://api.slack.com/workspace-apps-preview). Workspace apps support Slack's latest-and-greatest platform features and will be required for distributed apps in the (near) future. However, most steps are the same for user-token apps.

After you create an app, you'll be greeted with some basic information. In this guide we'll be making a request to the Web API to post a message to a channel. Aside from posting messages, the Web API allows your app to call [methods](https://api.slack.com/methods) that can be used for everything from creating a channel to searching messages. Let's configure our new app with proper permissions.

### Getting a token to use the Web API

Navigate to OAuth & Permissions and scroll down to the section for scopes. Slack describes the
various permissions your app could obtain from a user as **scopes**. There are a
[ton of scopes](https://api.slack.com/scopes)! Some are broad and authorize your app to access lots
of data, while others are very specific and let your app touch just a tiny sliver. Your users (and
their IT admins) will have opinions about which data your app should access, so we recommend finding
the scope(s) with the least amount of privilege for your app's needs. In this guide we will use the
Web API to post a message. The scope required for this is called `chat:write` (or `chat:write:user` for user-token apps). Use the dropdown or start typing its name to select and add the scope, then click "Save Changes".

Our app has described which scope it desires in the workspace, but a user hasn't authorized those
scopes for the development workspace yet. Scroll up and click "Install (or Reinstall) App". You'll
be back at the page asking you for permission, but this time with an additional entry corresponding
to the `chat:write` scope we just added. Choose your channel again and click "Authorize". When you
return to the OAuth & Permissions page copy the OAuth Access Token (it should begin with `xoxa`). Treat this value like a password and keep it safe. The Web API uses tokens to to authenticate the requests your app makes. In a later step, you'll be asked to use this token in your code.

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
const { WebClient } = require('@slack/client');

console.log('Getting started with Slack Developer Kit for Node.js');
```

Back at the command line, run the program using the following command:

```shell
$ node tutorial.js
Getting started with Slack Developer Kit for Node.js
```

If you see the same output as above, you're ready to build your Slack app!

## Sending a message with the Web API

In this guide we'll post a simple message that contains the current time. We'll also follow
the best practice of keeping secrets outside of your code (do not hardcode sensitive data).

Store the access token in a new environment variable. The following example works on Linux and MacOS;
but [similar commands are available on Windows](https://superuser.com/a/212153/94970). Replace the
value with OAuth Access Token that you copied above.

```shell
$ export SLACK_ACCESS_TOKEN=xoxa-...
```

Open `tutorial.js` and add the following code:

```javascript
// This creates a new instance of WebClient with your app's access token
const web = new WebClient(process.env.SLACK_ACCESS_TOKEN);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'C1234567890';

// The current date
const currentTime = new Date().toTimeString();

web.chat.postMessage({channel: conversationId, text: `The current time is ${currentTime}`})
  .then(res => {
    console.log('Message posted!');
  })
  .catch(console.error);
```


This code creates an instance of the `WebClient`, which requires an access token to call Web API methods. The program reads the app's access token from the environment variable. Then the [chat.postMessage](https://api.slack.com/methods/chat.postMessage) method is called with the `WebClient` to send a simple string to the Slack channel.

Run the program. The output should look like the following:

```shell
$ node tutorial.js
Getting started with Slack Developer Kit for Node.js
Message posted!
```

Look inside Slack to verify the message was sent.

## Next Steps

You just built your first Slack app with Node.js! 🎉💃🌮

There's plenty more to learn and explore about this package and the Slack platform. Here are some
ideas about where to look next:

* You now know how to build a Slack app for a single workspace,
  [learn how to implement Slack OAuth](https://api.slack.com/docs/oauth) to make your app
  installable in many workspaces. If you are using [Passport](http://www.passportjs.org/) to handle
  authentication, you may find the
  [`@aoberoi/passport-slack`](https://github.com/aoberoi/passport-slack) strategy package helpful.

* This tutorial only used one of **over 130 Web API methods** available.
  [Look through them](https://api.slack.com/methods) to get ideas about what to build next!

* Token rotation is required if you plan to distribute your app. You can find examples of using
  refresh tokens with the `WebClient` [in the documentation](/web_api#using-refresh-tokens), and learn more about refresh tokens and token rotation [on the API site](https://api.dev612.slack.com/docs/rotating-and-refreshing-credentials).

* Dive deeper into the `IncomingWebhook`, `WebClient`, and `RTMClient` classes in this package by
  exploring their documentation pages.
= new Date().toTimeString();

timeNotification.send(`The current time is ${currentTime}`, (error, resp) => {
  if (error) {
    return console.error(error);
  }
  console.log('Notification sent');
  console.log('Waiting a few seconds for search indexes to update...');
  setTimeout(() => {
    console.log('Calling search.messages');
    web.search.messages({ query: currentTime })
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

* Token rotation is required if you plan on distributing your app. You can find examples of using
  refresh tokens with the `WebClient` [in the documentation](/web_api#using-refresh-tokens), and learn more about refresh tokens and token rotation [on the API site](https://api.dev612.slack.com/docs/rotating-and-refreshing-credentials).

* Tokens are an important part of using the Slack platform. Learn about the
  [different types of tokens](https://api.slack.com/docs/token-types).

* This tutorial only used one of **over 130 Web API methods** available.
  [Look through them](https://api.slack.com/methods) to get ideas about what to build next!

* Dive deeper into the `IncomingWebhook`, `WebClient`, and `RTMClient` classes in this package by
  exploring their documentation pages.
