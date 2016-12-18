---
layout: page
title: Tokens & Authentication
permalink: /auth
order: 2
headings:
    - title: Handling tokens and other sensitive data
---

## Handling tokens and other sensitive data

Slack tokens are the keys to your&mdash;or your customers'&mdash;teams. Keep them secret. Keep them safe. One way to do that is
to never explicitly hardcode them.
                                   
Try to avoid this when possible:

```js
var token = 'xoxp-abc-1232';
```

If you commit this code to GitHub, the world gains access to this token's team. Rather, we recommend you pass tokens as 
environment variables, or persist them in a database that is accessed at runtime. You can add a token to the
environment by starting your app as:

```bash
SLACK_API_TOKEN=xoxp-abc-123 node index.js
```

You can then get the token in your code simply:

```js
var token = process.env.SLACK_API_TOKEN || '';
```

This will ensure that your app has a Slack token before it proceeds. If it doesn't, it will set a default empty string
for the token, which will cause calls to the Web API to fail (which is what we want).

You can use the same technique for other kinds of sensitive data that ne'er-do-wells could use in nefarious ways, including

  * Incoming webhook URLs
  * Slash command verification tokens
  * Bot verification tokens
  * App client ids and client secrets
