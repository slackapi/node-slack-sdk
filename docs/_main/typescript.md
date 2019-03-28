---
title: Using TypeScript
permalink: /typescript
order: 5
---

This project is mostly written and built using [TypeScript](https://www.typescriptlang.org/), which means many of the
APIs have type information metadata 🎉. If you're using a code editor like VSCode, Atom, or many others that know how to
read that metadata, or if you're using TypeScript in your own project, you'll benefit from improved documentation as
your write code, early detection of errors, easier refactoring, and more.

This page helps describe how to use this package from a project that also uses TypeScript.

---

### WebClient result properties are not defined

The `@slack/web-api` package aims to provide complete and accurate type information for all method **inputs** (or
arguments), but doesn't necessarily provide that depth for **outputs** (or the results). This is a shortcoming we are
aware of, and are evaluating the various ways we might be able to address it in the future (see:
[#496](https://github.com/slackapi/node-slack-sdk/issues/496) and
[#509](https://github.com/slackapi/node-slack-sdk/issues/509)). There are two recommendations for working with results.

The first recommendation is to create a type that describes the result you expect based on the information available
in the [Web API method documentation](https://api.slack.com/methods). This is the preferred way, since you'll still
have rich typing available as the value is used around your codebase.

```typescript
import { WebClient, WebAPICallResult } from '@slack/web-api';

const web = new WebClient(process.env.SLACK_TOKEN);

interface ChatPostMessageResult extends WebAPICallResult {
  channel: string;
  ts: string;
  message: {
    text: string;
  }
}

(async () => {
  // The result is cast to the interface
  const res = (await web.chat.postMessage({ text: 'Hello world', channel: 'C012345' }) as ChatPostMessageResult);

  // Properties of the result are now typed
  console.log(
    `A message was posed to conversation ${res.channel} with id ${res.ts} which contains the message ${res.message}`
  );
})();
```

Notice that we didn't need to create a complete definition for the result, just something that is accurate and
describes the properties which this app needs.

The second recommendation is less preferred, but its a useful hack for moving quickly. You can cast the result to `any`.

```typescript
import { WebClient, WebAPICallResult } from '@slack/web-api';

const web = new WebClient(process.env.SLACK_TOKEN);

(async () => {
  // The result is cast to any
  const res = (await web.chat.postMessage({ text: 'Hello world', channel: 'C012345' }) as any);

  // Properties of the result are not typed, but at least the typechecker doesn't label them as errors
  console.log(
    `A message was posed to conversation ${res.channel} with id ${res.ts} which contains the message ${res.message}`
  );
})();
```

---

### Minimum version

The latest major versions of the `@slack/web-api`, `@slack/rtm-api`, and `@slack/webhook` packages (v5.x) are supported
to build against the minimum TypeScript version v3.3.0.

The previous versions of the `@slack/web-api`, `@slack/rtm-api`, and `@slack/webhook` packages (v4.x) are supported to
build against the minimum TypeScript version v2.7.0.

This project adheres to a [support schedule](https://github.com/slackapi/node-slack-sdk/wiki/Support-Schedule) so that
you can predictably plan your time and effort for migration. That plan covers versions of Node.js and how they correlate
to major versions of these packages. However, for TypeScript, we're using a slightly different convention. Each time a
major version is released, we take the most recent version of TypeScript available, and make it the minimum. That
doesn't mean that the project won't work against earlier versions of TypeScript, but it does give this project a chance
to adopt new features from up to and including that version of TypeScript throughout the time that the major version of
the package is supported.

---

### Known issues

Since type information metadata is a crowdsourced resource provided by `@types/*` packages from DefinitelyTyped, certain
packages might conflict with one another. One such case is the `@types/bluebird@1.x` package. If you need to use
`bluebird`, we recommend updating to a newer version (at least v2). Details about this conflict can be found in issue
[#612](https://github.com/slackapi/node-slack-sdk/issues/612).
