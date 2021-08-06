# OAuth v2 Example

This repo contains a sample app for implementing OAuth with Slack for new granular permission Slack apps. Checkout `app.js`. The code includes a few different options which have been commented out. As you play around with the app, you can uncomment some of these options to get a deeper understanding of how to use this library. 

Local development requires a public URL where Slack can send requests. In this guide, we'll be using [`ngrok`](https://ngrok.com/download). Checkout [this guide](https://api.slack.com/tutorials/tunneling-with-ngrok) for setting it up.

Before we get started, make sure you have a development workspace where you have permissions to install apps. If you don’t have one setup, go ahead and [create one](https://slack.com/create). You also need to [create a new app](https://api.slack.com/apps?new_app=1) if you haven’t already. 

This example uses the [Keyv](https://github.com/lukechilds/keyv) library as a database solution. Keyv has adaptors for many popular database solutions. You can use whatever database or wrapper you wish to. 

## Install Dependencies

```
npm install
```

## Setup Environment Variables

This app requires you to setup a few environment variables. You can get these values by navigating to your app's [**BASIC INFORMATION** Page](https://api.slack.com/apps). 

```
export SLACK_CLIENT_ID=YOUR_SLACK_CLIENT_ID
export SLACK_CLIENT_SECRET=YOUR_SLACK_CLIENT_SECRET
export SLACK_SIGNING_SECRET=YOUR_SLACK_SIGNING_SECRET
```

## Run the App

Start the app with the following command:

```
npm start
```

This will start the app on port `3000`.

Now lets start `ngrok` so we can access the app on an external network and create a `redirect url` for OAuth. 

```
ngrok http 3000
```

This should output a forwarding address for `http` and `https`. Take note of the `https` one. It should look something like the following:

```
Forwarding   https://3cb89939.ngrok.io -> http://localhost:3000
```

Go to your app on https://api.slack.com/apps and navigate to your apps **OAuth & Permissions** page. Under **Redirect URLs**, add your `ngrok` forwarding address with the `/slack/oauth_redirect` path appended. ex:

```
https://3cb89939.ngrok.io/slack/oauth_redirect
```

This app also listens to the `app_home_opened` event to illustrate fetching the saved token from the database and using it to publish a view on the home tab. Navigate to the **App Home** page in your app settings and enable it. Then navigate to **Event Subscriptions** to enable it. The request URL should be set to your `ngrok` forwarding address with the `slack/events` path appended. ex:

```
https://3cb89939.ngrok.io/slack/events
```

Lastly, in the **Events Subscription** page, click **Subscribe to bot events** and add `app_home_opened`.  

Everything is now setup. In your browser, navigate to http://localhost:3000/slack/install to initiate the oAuth flow. Once you install the app, it should redirect you back to your native slack app. Click on the home tab of your app in slack to see the message `Welcome to the App Home!`.
