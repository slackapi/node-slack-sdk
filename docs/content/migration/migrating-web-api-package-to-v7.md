# Migrating the `web-api` package to v7.x

This migration guide helps you transition an application written using the `v6.x` series of the `@slack/web-api` package to the `v7.x`
series. This guide focuses specifically on the breaking changes to help get your existing app up and running as
quickly as possible.

## Installation

```
npm i @slack/web-api
```

## `@slack/web-api` v7 Changes

**TL;DR**: this package now supports only node v18 and newer, and HTTP API arguments passed to methods in this project in the context of a  TypeScript project are stricter.

This release focusses on the type safety of Slack HTTP API method arguments provided by `@slack/web-api`. If you use this package in a TypeScript project, many of the HTTP API methods now have stricter argument typing, which hopefully helps guide developers towards proper argument usage for Slack's HTTP API methods.

**If you use this package in a JavaScript project, no such guidance is provided and the breaking changes listed below do not apply to you.**

This release broadly is composed of five significant changes to the `web-api` codebase:

1. ⬆️ The minimum supported (and thus tested) version of node.js is now v18,
1. 🚨 Breaking changes to API method arguments for TypeScript users (_not_ for JavaScript users),
2. 🧹 We deprecated a few sets of methods that are on their way out,
3. 📝 Added a _ton_ of new hand-written JSDocs to provide useful method-specific context and descriptions directly in your IDE, and
4. 🧑‍🔬 Type tests for method arguments, formalizing some of the co-dependencies and constraints unique to specific API methods

Let's dive into these three sets of changes and begin with the 🚨 Breaking Changes 🚨 to make sure we set you all up for success and an easy migration to v7.

## Breaking Changes (TypeScript users only)

### All Web API methods no longer allow arbitrary arguments

Previously, the arguments provided to specific methods extended from a [`WebAPICallOptions` TypeScript interface](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L68-L70).
This interface made all API arguments effectively type un-safe: you could place whatever properties you wanted on arguments, and
the TypeScript compiler would be fine with it.

In v7, in an attempt to improve type safety, we have removed this argument. As a result, if you were using unknown or publicly undocumented API arguments, you will now see a TypeScript compiler error. If you _really_ want to send unsupported arguments to our APIs, you will have to tell TypeScript "no, trust me, I really want to do this" using [the `// @ts-expect-error` directive](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html#-ts-expect-error-comments).

If you find an issue with any of our method arguments, please let us know by [filing an issue in this project](https://github.com/slackapi/node-slack-sdk/issues/new/choose)!

### Many Web API methods have new, sometimes quite-specific, type constraints

Another change that only affects TypeScript projects. A full and detailed list of changes is at the end of this document, with migration steps where applicable.

## Deprecating some methods

The following sets of methods have been deprecated and will be removed in a future major version of `@slack/web-api`:

- `channels.*`
- `groups.*`
- `im.*`
- `mpim.*`

Generally, all of the above methods have equivalents available under the `conversations.*` APIs.

## Adding JSDoc to methods and method arguments

This one benefits both TypeScript and JavaScript users! Both API methods and API arguments are exhaustively documented with JSDoc. It includes the API method descriptions, mimicking the hand-written docs we have on https://api.slack.com/methods, as well as documenting each API argument and linking to relevant contextual documentation where applicable.

## Type tests for method arguments

All of the above-mentioned new TypeScript API argument constraints are exhaustively tested under `test/types/methods`. When in doubt, read these tests to understand exactly what combination of arguments are expected to raise a TypeScript error, and which ones are not.

## TypeScript API argument changes

Many of the API argument changes follow a similar pattern. Previously, API arguments would be modeled as a 'bag of optional arguments.' While this was a decent approach to at least surface what arguments were available, they did not model certain arguments _well_. In particular, API arguments that had either/or-style constraints (e.g. `chat.postMessage` accepts _either_ `channel` and `blocks` _or_ `channel` and `attachments` - but never all three) could not be modeled with this approach. This could lead developers to a situation where, at runtime, they would get error responses from Slack APIs when using a combination of arguments that were unsupported.

Moving forward, all of our APIs were exhaustively tested and the arguments to them modeled in such a way that would prevent TypeScript developers from using the APIs with an unsupported combination of arguments - ideally preventing ever encountering these avoidable runtime errors.

Without further ado, let's dive in the changes for each API:

## [`admin.analytics.getFile`](https://api.slack.com/methods/admin.analytics.getFile)

Previously, most arguments to this API were optional. Now, the specific combinations of `type`, `date` and `metadata_only` are [more strictly typed to ensure only valid combinations are possible](https://github.com/slackapi/node-slack-sdk/pull/1673/files?diff=unified&w=0#diff-49ab2c95a2115046c53fe532bcd82a4e52434c16fbf1a7fdab08a764321ac0cdR44).

## `admin.apps.*`

You can no longer provide _both_ `request_id` and `app_id` - these APIs will only accept one of these arguments. Similarly for `enterprise_id` and `team_id` - only one can be provided, and one of them is required as well.

### [`admin.apps.activities.list`](https://api.slack.com/methods/admin.apps.activities.list)

- `component_type` is no longer any `string`, but rather it must be one of: `events_api`, `workflows`, `functions`, `tables`
- `min_log_level` is no longer any `string`, but rather it must be one of: `trace`, `debug`, `info`, `warn`, `error`, `fatal`
- `sort_direction` is no longer any `string`, but rather it must be one of: `asc`, `desc`
- `source` is no longer any `string`, but rather it must be one of: `slack`, `developer`

## `admin.auth.*`

- `entity_type` is no longer any `string` and is now an enum that only accepts the only valid value: `USER`
- `policy_name` is no longer any `string` and is now an enum that only accepts the only valid value: `email_password`

## `admin.barriers.*`

The `restricted_subjects` array is no longer a `string[]` but enforces an array with the exact values `['im', 'mpim', 'call']` - which these APIs demands (see e.g. [`admin.barriers.create` usage info](https://api.slack.com/methods/admin.barriers.create#markdown)).

## `admin.conversations.*`

- The `channel_ids` parameter now must be passed at least one channel ID - no more empty arrays allowed!
- Similarly, `team_ids` must be passed at least one team ID. Empty arrays: no good.
- This might sound familiar, but `user_ids` must be passed at least one user ID. Keeping it consistent around here, folks.
- The `org_wide` and `team_id` parameters influence one another: if `org_wide` is true, `team_id` must not be provided. Conversely, if `team_id` is provided, `org_wide` should be omitted, or, if you really want to include it, it must be `false`. Previously, both properties were simply optional.

### [`admin.conversations.search`](https://api.slack.com/methods/admin.conversations.search)

The `search_channel_types` argument is [now an enumeration of specific values](https://github.com/slackapi/node-slack-sdk/pull/1673/files?diff=unified&w=0#diff-16abafd789456431bd84945a174544e42cf9d0ddda6077b4cfcdd85377a1971eR8), rather than just any old `string` you want.

## `admin.functions.*`

- `function_ids` now requires at least one array element.
- `visibility` is no longer any `string` and instead an enumeration: `everyone`, `app_collaborators`, `named_entities`, `no_one`.

## `admin.roles.*`

- `entity_ids` now requires at least one array element.
- `user_ids` must be passed at least one user ID.
- `sort_dir` will accept either `asc` or `desc`. Previously any `string` was, unfortunately, A-OK.

## `admin.teams.*`

- `team_discoverability` and `discoverability` are now enumerations consisting of: `open`, `closed`, `invite_only`, `unlisted`, rather than any `string`.
- `channel_ids` must be passed at least one channel ID.

## `admin.users.*`

- `channel_ids` must be passed at least one channel ID. Previously this parameter was a string, so you had to comma-separate your channel IDs manually, as if this was the 1800s.
- `user_ids` must be passed at least one user ID. Otherwise, what, you're going to invite 0 users? Who do you think you're kidding?

### [`admin.users.list`](https://api.slack.com/methods/admin.users.list)

The `team_id` and `include_deactivated_user_workspaces` parameters were previously both optional. However, they kind of depend on each other. You can either provide a `team_id` and no `include_deactivated_user_workspaces` (or set it to `false`), or set `include_deactivated_user_workspaces` to `true` and omit `team_id`. Otherwise providing both doesn't make any sense at all? We need to be logically consistent, people!

### [`admin.users.session.list`](https://api.slack.com/methods/admin.users.session.list)

This API will now accept either _both_ `team_id` and `user_id`, or _neither_. Previously both properties were optional, which was not ideal.

## `admin.workflows.*`

- `collaborator_ids` must be passed at least one collaborator ID. Collaborating with 0 other humans is not really collaborating, now is it?
- Similarly, `workflow_ids` must be passed at least one workflow ID.

### [`admin.workflows.search`](https://api.slack.com/methods/admin.workflows.search)

- `sort_dir` will accept either `asc` or `desc`. Previously any `string` was, unfortunately, A-OK.
- `sort` now only accepts `premium_runs`, whereas previously you could pass it any `string`.
- `source` now only accepts either `code` or `workflow_builder`, whereas before you could feed it any `string`.

## `apps.connections.open`

Previously this method could be called without any arguments. Now, arguments are required. The migration path is to pass an empty object (`{}`) to `apps.connections.open`.

## `apps.manifest.*`

Previously the `manifest` parameter was a `string`. In reality this is a very complex object, which we've done our best to model in excruciating detail.

## `auth.test`

Previously this method could be called without any arguments. Now, arguments are required. The migration path is to pass an empty object (`{}`) to `auth.test`.

## `bookmarks.*`

- `type` now accepts only one value: `link`.
- The `link` parameter (not to be confused with the `type: 'link'` value in the previous point!) was previously optional for the `bookmarks.add` API. That's just silly as a bookmark necessarily requires a link, so it is now a required property. It is, however, optional for the `bookmarks.edit` API.

## `chat.*`

- Previously, we didn't model message contents very well. All of the various message-posting APIs (`postEphemeral`, `postMessage`, `scheduleMessage`) would accept `text`, `attachments`, and `blocks`, but all were optional arguments. That's not exactly correct, however. Now, you _must_ provide one of these three. Previously, you could avoid all three if you wished! Additionally, if you use `attachments` or `blocks`, `text` becomes an optional addition for you to specify and will be used as fallback text for notifications.
- The properties `as_user`, `username`, `icon_emoji` and `icon_url` interact with one another:
  - If you set `as_user` to `true`, you cannot set `icon_emoji`, `icon_url` or `username`.
  - You can provide either `icon_emoji` or `icon_url`, but never both.
- If you set `reply_broadcast` to `true`, then you must also provide a `thread_ts`. Previously, both were optional.

## `conversations.*`

- For APIs that accept either `channel_id` or `invite_id` (`conversations.acceptSharedInvite`), we now enforce specifying one or the other (but not both).
- For APIs that accept either `emails` or `user_ids` (`conversations.inviteShared`), we now enforce specifying one or the other (but not both).
- For APIs that accept either `channel` or `users` (`conversations.open`), we now enforce specifying one or the other (but not both).

## `files.*`

- You must provide either `content` or `file`. Previously these were both optional.
- If you provide the `thread_ts` argument, you now must also provide the `channels`, or `channel_id` argument (depending on the method).
- The `files` array parameter must now be provided at least one element.
- The `files.remote.*` APIs require one of `file` or `external_id`, but not both. Previously both were optional.

## `reactions.*`

- `channel` and `timestamp` are now required properties for `reactions.add`.
- `reactions.add` no longer supports the `file` and `file_comment` parameters, as per our [API docs for this method](https://api.slack.com/methods/reactions.add). 
- `reactions.get` and `reactions.remove` now require to supply one and only one of:
  - both `channel` and `timestamp`, or
  - a `file` encoded file ID, or
  - a `file_comment` ID

## `stars.*`

The `add` and `remove` APIs require one of:

- both `channel` and `timestamp`, or
- a `file` encoded file ID, or
- a `file_comment` ID

## `team.*`

- `change_type` is no longer any `string` but an enumeration of: `added`, `removed`, `enabled`, `disabled`, `updated`

## `users.*`

- The deprecated `presence` parameter for [`users.list`](https://api.slack.com/methods/users.list) has been removed.
- The `profile` parameter for [`users.profile.set`](https://api.slack.com/methods/users.profile.set) has been changed from a string to, basically, any object you wish.

## `views.*`

All `views.*` APIs now accept either a `trigger_id` or an `interactivity_pointer`, as they both effectively serve the same purpose.

In addition, `views.update` now accepts either a `external_id` or a `view_id` parameter - but not both.