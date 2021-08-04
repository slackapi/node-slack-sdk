# OpenID Connect Example

This repo contains a sample app for implementing Sign in with Slack (OpenID Connect compatible). Checkout `app.js`. The code includes a few different options which have been commented out. As you play around with the app, you can uncomment some of these options to get a deeper understanding of how to use this library.

Local development requires a public URL where Slack can send requests. In this guide, we'll be using [`ngrok`](https://ngrok.com/download). Checkout [this guide](https://api.slack.com/tutorials/tunneling-with-ngrok) for setting it up.

Before we get started, make sure you have a development workspace where you have permissions to install apps. If you don’t have one setup, go ahead and [create one](https://slack.com/create). You also need to [create a new app](https://api.slack.com/apps?new_app=1) with the following App Manifest if you haven’t already.

```yaml
_metadata:
  major_version: 1
  minor_version: 1
display_information:
  name: my-openid-connect-app
oauth_config:
  redirect_urls:
    # TODO: Replace the URL with our own one
    - https://your-own-domain/slack/oauth_redirect
  scopes:
    user:
      - openid
      - email
      - profile
```

## Install Dependencies

```
npm install
```

## Setup Environment Variables

This app requires you setup a few environment variables. You can get these values by navigating to your app's [**BASIC INFORMATION** Page](https://api.slack.com/apps).

```
export SLACK_CLIENT_ID=YOUR_SLACK_CLIENT_ID
export SLACK_CLIENT_SECRET=YOUR_SLACK_CLIENT_SECRET
export SLACK_REDIRECT_URI=https://{your-public-domain}/slack/oauth_redirect
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

Everything is now setup. In your browser, navigate to http://localhost:3000/slack/install to initiate the oAuth flow. Once you install the app, it should receive the OpenID Connect claims and an OAuth access token for the connected Slack account.
