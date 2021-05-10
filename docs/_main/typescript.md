---
title: Using TypeScript
permalink: /typescript
order: 5
---

This project is mostly written and built using [TypeScript](https://www.typescriptlang.org/), which means many of the APIs have type information metadata 🎉. If you're using a code editor like VSCode, Atom, or many others that know how to read that metadata, or if you're using TypeScript in your own project, you'll benefit from improved documentation as your write code, early detection of errors, easier refactoring, and more.

This page helps describe how to use this package from a project that also uses TypeScript.

---

### Minimum version

The latest major versions of the `@slack/web-api`, `@slack/rtm-api`, and `@slack/webhook` packages (v6.x) are supported to build against the minimum TypeScript version v4.1.0. See also: https://slack.dev/node-slack-sdk/tutorials/migrating-to-v6

The v5 versions of `@slack/web-api`, `@slack/rtm-api`, and `@slack/webhook` packages are supported to build against TypeScript v3.3.0 or higher. The v4 versions of the `@slack/web-api`, `@slack/rtm-api`, and `@slack/webhook` packages are supported to build against TypeScript v2.7.0 or higher.

This project adheres to a [support schedule](https://github.com/slackapi/node-slack-sdk/wiki/Support-Schedule) so that you can predictably plan your time and effort for migration. That plan covers versions of Node.js and how they correlate to major versions of these packages. However, for TypeScript, we're using a slightly different convention. Each time a major version is released, we take the most recent version of TypeScript available, and make it the minimum. That doesn't mean that the project won't work against earlier versions of TypeScript, but it does give this project a chance to adopt new features from up to and including that version of TypeScript throughout the time that the major version of the package is supported.

---

### Known issues

The `@slack/web-api` package used to provide types only for Web API arguments until version 6.2 release. Since v6.2, the API response data are fully typed as well. To leverage the response types, upgrade your `@slack/web-api` package.

Since type information metadata is a crowdsourced resource provided by `@types/*` packages from DefinitelyTyped, certain packages might conflict with one another. One such case is the `@types/bluebird@1.x` package. If you need to use `bluebird`, we recommend updating to a newer version (at least v2). Details about this conflict can be found in issue [#612](https://github.com/slackapi/node-slack-sdk/issues/612).
