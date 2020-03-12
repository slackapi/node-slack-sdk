# OAuth v1 Example

This repo contains a sample app for doing OAuth with Slack for Classic Slack Apps. I recommending checking out `app.js`. I've included a few different options in the code which have been commented out. As you play around with the app, I recommend you uncomment some of these options to get a deeper understanding of how to use this library. 

I recommend using [`ngrok`](https://ngrok.com/download) for local development of Slack apps. Checkout [this guide](https://api.slack.com/tutorials/tunneling-with-ngrok) for setting it up.

Before we get started, make sure you have a development workspace where you have permissions to install apps. If you don’t have one setup, go ahead and [create one](https://slack.com/create). You also need to [create a new app](https://api.slack.com/apps?new_app=1) if you haven’t already. 

## Install Dependencies

```
npm install
```

## Setup Environment Variables

This app requires you setup a few environment variables. You can get these values by navigating to your app's [**BASIC INFORMATION** Page](https://api.slack.com/apps). 

```
export SLACK_CLIENT_ID = YOUR_SLACK_CLIENT_ID
export SLACK_CLIENT_SECRET = YOUR_SLACK_CLIENT_SECRET
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

Go to your app on https://api.slack.com/apps and navigate to your apps **OAuth & Permissions** page. Under **Redirect URLs**, add your `ngrok` forwarding address with the `/slack/install` path appended. ex:

```
https://3cb89939.ngrok.io/slack/install
```

Everything is now setup. In your browser, navigate to http://localhost:3000/begin_auth to initiate the oAuth flow. Once you install the app, it should redirect you back to a generic success page.
