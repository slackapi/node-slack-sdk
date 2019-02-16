---
layout: page
title: Using TypeScript
permalink: /typescript
order: 5
headings:
    - title: Configuration requirements
    - title: Result properties are not defined
    - title: Known issues
---

This project is written and built using [TypeScript](https://www.typescriptlang.org/), which means all of the APIs
have type information metadata :tada:. This means that if you're using a code editor like VSCode, Atom, or many others
that know how to read that metadata, or if you're using TypeScript in your own project, you'll benefit from improved
documentation as your write code, early detection of errors, easier refactoring, and more.

This page helps describe how to use this package from a project that also uses TypeScript.

---

### Configuration requirements

In your project, you'll need to make sure that certain `lib`s are referenced. Usually you would configure this inside
a `tsconfig.json` file at the root of your project. If you haven't already created this file, you can generate one
using `tsc --init` on the command line. Below is an example of what the `lib` should _at a minimum_ contain for a
project using this package.

```
{
  "compilerOptions": {
    "lib": [
      "es5",
      "es2015",
      "es2016.array.include",
      "esnext.asynciterable"
    ]
  }
}
```

The above options will help you compile down to an `"es5"` target, but if you're compiling to a target newer than that,
you won't need to explicitly include the older `"lib"` values. Also, if you are willing to include a larger set of
features from a specific language version, you don't need to include each minor feature on its own (e.g. `"es2016"`
would cover the need for `"es2016.array.include"`).

---

### Result properties are not defined

This package aims to provide complete and accurate type information for all method **inputs** (or arguments), but
doesn't necessarily provide that depth for **outputs** (or the results). This is a shortcoming we are aware of, and are
evaluating the various ways we might be able to address it in issues
[#496](https://github.com/slackapi/node-slack-sdk/issues/496) and
[#509](https://github.com/slackapi/node-slack-sdk/issues/509). There are two recommendations for working with results.

The first recommendation is to create a type that describes the result you expect based on the information available
in the [Web API method documentation](https://api.slack.com/methods). This is the preferred way, since you'll still
have rich typing available as the value is used around your codebase.

```typescript
import { WebClient, WebAPICallResult } from '@slack/client';

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
import { WebClient, WebAPICallResult } from '@slack/client';

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

### Known issues

Since type information metadata is a crowdsourced resource provided by `@types/*` packages from DefinitelyTyped, certain
packages might conflict with one another. One such case is the `@types/bluebird@1.x` package. If you need to use
`bluebird`, we recommend updating to a newer version (at least v2). Details about this conflict can be found in issue
[#612](https://github.com/slackapi/node-slack-sdk/issues/612).
