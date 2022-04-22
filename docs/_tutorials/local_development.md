---
title: Developing Slack apps locally
order: 1
slug: local_development
---

# Developing Slack apps locally

This tutorial is meant to guide developers through setting up and configuring a Slack app for local development.

Feel free to skip around to the specific sections relevant to you — we won't mind 🙂

- [Create an app](#create-an-app)
- [Tokens and installing apps](#tokens-and-installing-apps)
- [Socket Mode vs. HTTP](#socket-mode-vs-http)
  - [Socket Mode](#socket-mode)
  - [HTTP](#http)
    - [What is a Request URL?](#what-is-a-request-url)
    - [Using a local Request URL for development](#using-a-local-request-url-for-development)
    - [Add Request URL to your app configuration](#add-the-url-to-your-app-configuration)
- [Listening to workspace events](#listening-to-workspace-events)
- [Adding event subscriptions](#adding-event-subscriptions)
- [Next steps](#next-steps)


## Create an app
Head over to our [Bolt JS Getting Started Guide's section "Create an App"](https://slack.dev/bolt-js/tutorial/getting-started#create-an-app) for the latest up-to-date instructions on how to create a new app on [api.slack.com/apps](https://api.slack.com/apps).

## Tokens and installing apps
Head over to our [Bolt JS Getting Started Guide's section "Tokens and installing apps"](https://slack.dev/bolt-js/tutorial/getting-started#tokens-and-installing-apps) for the latest up-to-date information on what tokens are, the [different kinds of tokens available](https://api.slack.com/docs/token-types), how to create them on [api.slack.com/apps](https://api.slack.com/apps) and finally how to install your app to a live Slack workspace.

## Socket Mode vs. HTTP
Your app can [communicate with Slack using one of two methods](https://api.slack.com/apis/connections):

1. [Socket Mode](https://api.slack.com/apis/connections/socket). Connect to Slack using a direct and long-lived socket connection. While convenient, easy to setup and the recommended approach when getting started or iterating on your app, apps cannot use Socket Mode and be listed in the App Directory (for that you'll need to use [HTTP](#http)). It is also important to remember that Socket Mode is prone to network faults because the connection is long-lived.
2. [HTTP](https://api.slack.com/apis/connections/events-api). Expose your app using a public-facing URL that Slack will send HTTP POST requests to. A bit harder to set up, but more resilient to network disruptions.

This tutorial will cover how to set up your app using either approach.

### Socket Mode

Setting up your node.js application for Socket Mode development is fast and easy with the [`@slack/socket-mode`](https://slack.dev/node-slack-sdk/socket-mode) package. In the previous [Tokens and installing apps](#tokens-and-installing-apps) section, you should have created and saved an App Token. You'll need that when following the [socket mode package setup instructions](../socket-mode).

### HTTP

#### What is a Request URL
A Request URL is a public URL where Slack can send HTTP POST requests.

When a button is clicked, a dialog is submitted, or a user interacts with your app [using another interactive feature](https://api.slack.com/messaging/interactivity), Slack will send information about that event to your app's Request URL, like who clicked it in what channel.

#### Using a local Request URL for development
If you're just getting started with your app development, you probably don't have a publicly accessible URL yet. Eventually, you'll want to set that up, but for now a development proxy like [ngrok](https://ngrok.com/) will do the job.

Once you've installed a development proxy, run it to begin forwarding requests to a specific port (we're using port 3000 for this example):

> ngrok: `ngrok http 3000`

![Running ngrok](ngrok.gif "Running ngrok")

The output should show a generated URL that you can use (we recommend the one that starts with `https://`). This URL will be the base of your request URL, in this case `https://8e8ec2d7.ngrok.io`.

#### Add the URL to your app configuration
At this point you have a public-facing URL. Now, let's add that to the **Interactive Components** page. Under the **Request URL** box, go ahead and paste in your accessible URL.

![Configuring a Request URL](request-url-config.png "Configuring a Request URL")

### Listening to workspace events
If you want your app to listen to events like when a reaction is added, when a user mentions your app, or [another Events API event](https://api.slack.com/events), you'll need to enable events for your app.

Start by clicking **Event Subscriptions** on the left sidebar. If your app is using HTTP to communicate with Slack, after you toggle the switch, you'll need to add a Request URL. This is similar to [adding a Request URL in the **Interactive Components** section](#what-is-a-Request-URL), but as described on this page, Slack will issue a `challenge` request to verify that your app's request URL can respond appropriately to incoming requests. Read through our [Request URL Configuration &amp; Verification](https://api.slack.com/apis/connections/events-api#the-events-api__subscribing-to-event-types__events-api-request-urls__request-url-configuration--verification) documentation for details on how to properly handle a `challenge` request.

### Adding event subscriptions
On the **Event Subscriptions** page, you can add each event you want your app to subscribe to. In the tables below, you may add Workspace events and Bot events.

Most events require additional scopes (for example, the `reaction_added` event requires the `reactions:read` scope). You can add scopes to your app on the **OAuth & Permissions** page.

Once you've selected all the event types, be sure to Save Changes.

Lastly, if you've added event types that require scopes your app did not previously have, you'll need to reinstall the app into the workspace(s) you'd like Slack to send your app new events. You can reinstall the app from the **Install App** page.

## Next steps
Hopefully this guide included information that's helpful to get you up and running with a Slack app. If something is missing, feel free to open a ticket or a pull request.

The different packages have code samples, explanations, and more resources to get you started writing the code in your app using our SDKs. [The README has links to the packages and examples to get started](https://github.com/slackapi/node-slack-sdk).
