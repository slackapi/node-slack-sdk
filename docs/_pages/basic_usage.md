---
layout: page
title: Basic Usage
permalink: /basic_usage
order: 4
headings:
    - title: Posting a message with Incoming Webhooks
    - title: Posting a message with Web API
    - title: Uploading a file
    - title: Getting a list of channels
    - title: General Web API patterns
---

Most Slack apps are interested in posting messages into Slack channels, and generally working with our [Web API](https://api.slack.com/web). Read on
to learn how to use {{ site.product_name }} to accomplish these tasks. Bots, on the other hand, are a bit more complex,
so we have them covered in [Building Bots](bots.html).

All of these examples assume that you have set up a Slack [app](https://api.slack.com/slack-apps) or
[custom integration](https://api.slack.com/custom-integrations), and understand the basic mechanics of working with the
Slack Platform.

See [Tokens & Authentication]({{ site.baseurl | prepend: site.url }}/auth) for API token best practices.

--------

## Posting a message with Incoming Webhooks

[Incoming webhooks](https://api.slack.com/incoming-webhooks) are an easy way to get notifications posted into Slack with
a minimum of setup. You'll need to either have a custom incoming webhook set up, or an app with an incoming webhook
added to it.

```js
var IncomingWebhook = require('@slack/client').IncomingWebhook;

var url = process.env.SLACK_WEBHOOK_URL || ''; //see section above on sensitive data

var webhook = new IncomingWebhook(url);

webhook.send('Hello there', function(err, res) {
    if (err) {
        console.log('Error:', err);
    } else {
        console.log('Message sent: ', res);
    }
});
```

--------

## Posting a message with Web API

You'll need a Web API token to call any of the Slack Web API methods. For custom integrations, you'll get this
[from the token generator](https://api.slack.com/docs/oauth-test-tokens), and for apps it will come as the final part
of the [OAuth dance](https://api.slack.com/docs/oauth).

Your app will interact with the Web API through the `WebClient` object, which requires an access token to operate.

```js
var WebClient = require('@slack/client').WebClient;

var token = process.env.SLACK_API_TOKEN || ''; //see section above on sensitive data

var web = new WebClient(token);
web.chat.postMessage('C1232456', 'Hello there', function(err, res) {
    if (err) {
        console.log('Error:', err);
    } else {
        console.log('Message sent: ', res);
    }
});
```

--------

## Uploading a file

You can upload files into Slack with the Web API, cool! (Don't forget, if you are building an app, to request the
`files:write:user` scope!)

```js
var fs = require('fs');
var WebClient = require('@slack/client').WebClient;

var token = process.env.SLACK_API_TOKEN || ''; //see section above on sensitive data

var web = new WebClient(token);

var filePath = './';
var fileName = 'test_file.csv';


var streamOpts = {
  file: fs.createReadStream(filePath)
};

web.files.upload(fileName, streamOpts, function(err, res) {
   if (err) {
       console.log('Error:', err);
   } else {
       console.log('Message sent: ', res);
});
```

--------

## Getting a list of channels

You can discover the channels available on a team with this code snippet. ((Don't forget, if you are building an app,
to request the `channels:read` scope!))

```js
var WebClient = require('@slack/client').WebClient;

var token = process.env.SLACK_API_TOKEN || ''; //see section above on sensitive data

var web = new WebClient(token);

web.channels.list(function(err, info) {
   if (err) {
       console.log('Error:', err);
   } else {
       for(var i in info.channels) {
           console.log(info.channels[i].name);
       }
   }
});
```

--------

## General Web API patterns

You can find a complete list of Web API methods on the [Slack API webpage](https://api.slack.com/methods), and there
is a simple general pattern for calling any of them. Supposing we want to call the fictional method `method.name`, with
required parameters `required1` and `required2` and optional parameters `optional1` and `optional2`, and that returned
an object called `howdy`, the call would look like this:

```js
var WebClient = require('@slack/client').WebClient;

var token = process.env.SLACK_API_TOKEN || ''; //see section above on sensitive data

var web = new WebClient(token);

web.method.name(required1, required2, {
    optional1: "value",
    optional2: true
}, function(err, info) {
   //err is set if there was an error 
   //otherwise info will be an object that contains the result of the call
   if (!err) {
       console.log(info.howdy);
   }
});
```

The required parameters will be entered in the same order and name as presented in the documentation on the
[API webpage](https://api.slack.com/methods). The optional parameters are passed in as an object whose fields are also
named as in the documentation. And finally, the `info` parameter in the callback will contain an object with fields
again as named in the documentation.