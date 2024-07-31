# Changelog

<a name="@slack/web-api@7.3.1"></a>
# [@slack/web-api@7.3.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@7.3.1) - 04 Jul 2024

This release fixes a problem between web-api 7.3.0 and projects consuming it that used versions of TypeScript older than 5.0. Moving forward, web-api should guarantee compatibility with at least TypeScript 4.7.2 or newer; if this changes, that will likely warrant a major new semver release.

# What's Changed

b2849947 web-api(fix): revert use of `export type *` to maintain backwards compatibility with TS 4.7 ([#1841](https://github.com/slackapi/node-slack-sdk/issues/1841))

[Changes][@slack/web-api@7.3.1]


<a name="@slack/web-api@7.3.0"></a>
# [@slack/web-api@7.3.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@7.3.0) - 03 Jul 2024

# What's New

We've added two new APIs:

1. [`teams.externalTeams.disconnect`](https://api.slack.com/methods/team.externalTeams.list)
2. [`conversations.externalInvitePermissions.set`](https://api.slack.com/methods/conversations.externalInvitePermissions.set)

# What's Changed

a18c1ea7 feat (web-api): add support for `teams.externalTeams.disconnect` API ([#1837](https://github.com/slackapi/node-slack-sdk/issues/1837))
4ef80b76 web-api: add new `conversations.externalInvitePermissions.set` API ([#1834](https://github.com/slackapi/node-slack-sdk/issues/1834))
9e20ca36 web-api: update `files.info`, `files.list` `files.remote.list` and `team.externalTeams.list` response types ([#1833](https://github.com/slackapi/node-slack-sdk/issues/1833))
fc87d515 chore: tweak lint config to allow for `eslint --fix` to fix import order ([#1827](https://github.com/slackapi/node-slack-sdk/issues/1827))

[Changes][@slack/web-api@7.3.0]


<a name="@slack/web-api@7.2.0"></a>
# [@slack/web-api@7.2.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@7.2.0) - 18 Jun 2024

# What's Changed

4df9fb8c feat(web-api): add new Slack Connect APIs `team.externalTeams.list` and `users.discoverableContacts.lookup` ([#1826](https://github.com/slackapi/node-slack-sdk/issues/1826))
f3acb2f5 feat(web-api): Update response types to latest automatically generated ([#1824](https://github.com/slackapi/node-slack-sdk/issues/1824))
20f026b6 feat(web-api): user id map in MigrationExchangeResponse as map ([#1821](https://github.com/slackapi/node-slack-sdk/issues/1821))

[Changes][@slack/web-api@7.2.0]


<a name="@slack/web-api@7.1.0"></a>
# [@slack/web-api@7.1.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@7.1.0) - 12 Jun 2024

## What's Changed

The new feature available in this release is access to [new Canvas APIs](https://api.slack.com/methods?query=canvases) - programmatically manipulate your Canvases to your heart's content!

Additionally:

- Previously in v7 of `web-api`, if you were using an API method that required no arguments (e.g. `api.test`), you still had to pass it an empty object (`{}`). Thanks to [@davidlj95](https://github.com/davidlj95)'s work in [#1809](https://github.com/slackapi/node-slack-sdk/issues/1809), that is no longer a requirement!
- You can now set the `attachOriginalToWebAPIRequestError` to `false` to ensure API responses are _not_ logged. By default, this option will be set to `false`. Many thanks to [@Parama92](https://github.com/Parama92) for their work in this area!

a2c0fe56 web-api: public canvas APIs ([#1813](https://github.com/slackapi/node-slack-sdk/issues/1813))
9f2935ff feat: allow using WebClient APIs without argument ([#1809](https://github.com/slackapi/node-slack-sdk/issues/1809)) - fixes [#1769](https://github.com/slackapi/node-slack-sdk/issues/1769); thank you [@davidlj95](https://github.com/davidlj95) for your contribution! ❤️ 
b98ef1e1 feat: providing a way to disable message content being logged ([#1786](https://github.com/slackapi/node-slack-sdk/issues/1786)) - fixes [#1751](https://github.com/slackapi/node-slack-sdk/issues/1751); thank you [@Parama92](https://github.com/Parama92) for your contribution! ❤️ 

[Changes][@slack/web-api@7.1.0]


<a name="@slack/types@2.12.0"></a>
# [@slack/types@2.12.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@2.12.0) - 05 Jun 2024

## What's Changed

The [Image Block](https://api.slack.com/reference/block-kit/blocks#image_fields) and [Image Block Element](https://api.slack.com/reference/block-kit/block-elements#image__fields) now correctly support using _either_ an `image_url` string _or_ [a `slack_file` object](https://api.slack.com/reference/block-kit/composition-objects#slack_file). The latter is particularly useful when wanting to display an image that is only uploaded within Slack, and not available via a public URL.

Also, the [`rich_text_quote` Block Element](https://api.slack.com/reference/block-kit/blocks#rich_text_quote) had a missing `border` property. We have addressed this deficiency. Hooray!

aea11d00 Add `slack_file` object to `image` block/element types ([#1783](https://github.com/slackapi/node-slack-sdk/issues/1783))
20899b01 Add missing `border` property to `rich_text_quote` block element ([#1753](https://github.com/slackapi/node-slack-sdk/issues/1753))




[Changes][@slack/types@2.12.0]


<a name="@slack/cli-test@0.2.0+cli.2.25.0"></a>
# [@slack/cli-test@0.2.0+cli.2.25.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/cli-test@0.2.0+cli.2.25.0) - 03 Jun 2024

## What's Changed

A few new APIs were added: a suite of low-level shell process wrappers under `shell.*`, a new `app.list` command, and exposing QA environment targeting for all commands.

* cli-test: add ability to invoke arbitrary CLI commands by [@filmaj](https://github.com/filmaj) in https://github.com/slackapi/node-slack-sdk/pull/1798
* cli-test: expose --slackdev flag as `qa` option to all commands by [@filmaj](https://github.com/filmaj) in https://github.com/slackapi/node-slack-sdk/pull/1799
* cli-test: adding `shell` and `app.list` APIs, exposing QA environment flags, added more traces available in CLI v2.25.0 by [@filmaj](https://github.com/filmaj) in https://github.com/slackapi/node-slack-sdk/pull/1804


[Changes][@slack/cli-test@0.2.0+cli.2.25.0]


<a name="@slack/cli-test@0.1.0-cli.2.25.0"></a>
# [@slack/cli-test@0.1.0-cli.2.25.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/cli-test@0.1.0-cli.2.25.0) - 27 May 2024

## What's Changed

First official GitHub release of the new `cli-test` module! This module aims to provide node.js bindings for the [Slack Platform CLI](https://api.slack.com/automation/quickstart).

9fb278a4 cli-test: small internal refactor to use new `app.list` command ([#1797](https://github.com/slackapi/node-slack-sdk/issues/1797))
c3725a96 cli-test(trace): include test trace constants for 'datastore count' ([#1795](https://github.com/slackapi/node-slack-sdk/issues/1795))
11cb80e5 cli-test: add `app.list` command ([#1794](https://github.com/slackapi/node-slack-sdk/issues/1794))

## New Contributors
* [@zimeg](https://github.com/zimeg) made their first contribution in https://github.com/slackapi/node-slack-sdk/pull/1795

[Changes][@slack/cli-test@0.1.0-cli.2.25.0]


<a name="@slack/socket-mode@2.0.0"></a>
# [@slack/socket-mode@2.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/socket-mode@2.0.0) - 30 Apr 2024

# What's Changed

New major version! We have dropped the ancient, finite-state-machine-based implementation and ported the rock solid python-slack-sdk socket-mode implementation to node.

We also removed a couple of events and properties that are no longer relevant in the new implementation. Check out our [socket mode 1.x -> 2.0 migration guide](https://github.com/slackapi/node-slack-sdk/wiki/Migration-Guide-for-socket%E2%80%90mode-2.0) to get all the details and ease your upgrading path.

# Full Changelog

476e6a9e socket-mode: Rewrite to Python(ish) Implementation ([#1781](https://github.com/slackapi/node-slack-sdk/issues/1781))
3ebb6cef socket-mode: do not throw exception when calling `disconnect()` and already disconnected; do not raise `slack_event` in case of `type:disconnect` messages ([#1762](https://github.com/slackapi/node-slack-sdk/issues/1762))
6ab1e68b socket-mode: add more debug logging to low level websocket event handlers ([#1757](https://github.com/slackapi/node-slack-sdk/issues/1757))
46b500db socket-mode: fix bug when `apps.connections.open` returns an error and won't retry ([#1735](https://github.com/slackapi/node-slack-sdk/issues/1735))
a6f2b283 socket-mode: prep for major release, `start` now completes only once `Connected` state is emitted ([#1732](https://github.com/slackapi/node-slack-sdk/issues/1732))

[Changes][@slack/socket-mode@2.0.0]


<a name="@slack/socket-mode@1.3.5"></a>
# [@slack/socket-mode@1.3.5](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/socket-mode@1.3.5) - 30 Apr 2024

# Final 1.x Release

Please note that this will be the final planned release of `@slack/socket-mode` in the 1.x line. The next release will be 2.0, which will include a few breaking changes.

# What's Changed

A few bug fixes and stability improvements were landed in this release:

- WebSocket messages of `type:disconnect` coming from the Slack backend should now consistently force-reconnect the socket mode client; previously certain `type:disconnect` messages (containing a specific `reason` property) were not treated in this way.
- All `type:disconnect` messages from the Slack backend now do not raise a `slack_event` event; this led to problems, particularly for users of bolt-js.
- Calling `disconnect()` if the client is already disconnected no longer raises an exception.

# Full Changelog

dc489596 socket-mode: do not throw if calling `disconnect()` and already disconnected, and do not raise `slack_event` if message received is of `type: disconnect`

[Changes][@slack/socket-mode@1.3.5]


<a name="@slack/web-api@7.0.4"></a>
# [@slack/web-api@7.04 (@slack/web-api@7.0.4)](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@7.0.4) - 19 Apr 2024

# What's Changed

We released a fix for the `oauth.v2.exchange` method argument type; previously it did not require a `token`, which was incorrect. It now requires a `token` parameter, which matches the expectations of this API method.

# Full Changelog

ae755dc4 web-api(fix): `oauth.v2.exchange` method requires a `token` parameter ([#1779](https://github.com/slackapi/node-slack-sdk/issues/1779)) - thanks for reporting [@iggyray](https://github.com/iggyray)!

[Changes][@slack/web-api@7.0.4]


<a name="@slack/web-api@7.0.3"></a>
# [@slack/web-api@7.0.3](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@7.0.3) - 15 Apr 2024

# What's Changed

We've [deprecated the `files.upload` method](https://api.slack.com/methods/files.upload#markdown). Check out our announcement on the topic [here](https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay). Instead, use the `uploadV2` method provided by the client.

# Full Changelog

ae9ace8b web-api(fix): fix node-retry types ([#1772](https://github.com/slackapi/node-slack-sdk/issues/1772)) - thanks [@cotsupa](https://github.com/cotsupa)!
fec4895f web-api(docs): Add deprecation JSdoc to `files.upload` method ([#1773](https://github.com/slackapi/node-slack-sdk/issues/1773))
8bff32ff web-api(fix): Fix typo in error throwing for rate limit exceeded ([#1755](https://github.com/slackapi/node-slack-sdk/issues/1755)) - thanks [@WhiteKiwi](https://github.com/WhiteKiwi)!

[Changes][@slack/web-api@7.0.3]


<a name="@slack/rtm-api@7.0.0"></a>
# [@slack/rtm-api@7.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/rtm-api@7.0.0) - 01 Apr 2024

# What's Changed

This major release bumps dependencies to their latest versions and sets the minimum node version is to v18, the current LTS node.js. While the library should work with older versions of node, we no longer test the library against versions of node older than 18, so we cannot guarantee compatibility.

In addition, calling `disconnect()` when already disconnected should no longer throw an exception (fixed https://github.com/slackapi/node-slack-sdk/issues/842).

[Changes][@slack/rtm-api@7.0.0]


<a name="@slack/cli-hooks@1.1.0"></a>
# [@slack/cli-hooks@1.1.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/cli-hooks@1.1.0) - 27 Mar 2024

## What's Changed

A new `doctor` hook was added to surface certain runtime dependencies depended upon by your project! Stay tuned for [an upcoming CLI release](https://api.slack.com/automation/changelog) to find out how it'll be used. Hint: It's related to the `doctor` command 😉 

## Full Changelog

* [`3e296410e2`](https://github.com/slackapi/node-slack-sdk/commit/3e296410e26caa756f91f59ac37a950f59ca7ce4) feat: return runtime versions used by the application with a doctor hook (https://github.com/slackapi/node-slack-sdk/pull/1763)

https://github.com/slackapi/node-slack-sdk/compare/@slack/socket-mode@1.3.4...@slack/cli-hooks@1.1.0

[Changes][@slack/cli-hooks@1.1.0]


<a name="@slack/socket-mode@1.3.4"></a>
# [@slack/socket-mode@1.3.4](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/socket-mode@1.3.4) - 18 Mar 2024

## What's Changed

We added some more debug-level logging to the underlying socket connections used in this package. Now both primary and backup secondary websocket connections are identified in logs, and websocket-level events (like `open` and `close`) are logged out at the debug level.

## Full Changelog

e3bf5cdb socket-mode: add more debug logging to low level websocket event handlers ([#1757](https://github.com/slackapi/node-slack-sdk/issues/1757))

https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.6.2...@slack/socket-mode@1.3.4

[Changes][@slack/socket-mode@1.3.4]


<a name="@slack/web-api@7.0.2"></a>
# [@slack/web-api@7.0.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@7.0.2) - 12 Feb 2024

## What's Changed

Nothing major or even minor in this release! Just a few patches:

* web-api: prevent apps.event.authorizations.list API from ever sending token in the body by [@filmaj](https://github.com/filmaj) in https://github.com/slackapi/node-slack-sdk/pull/1737
* web-api(fix): include file or contents types in file_uploads arguments by [@zimeg](https://github.com/zimeg) in https://github.com/slackapi/node-slack-sdk/pull/1744
* web-api(fix): share tokens provided as arguments in files upload to upload jobs by [@zimeg](https://github.com/zimeg) in https://github.com/slackapi/node-slack-sdk/pull/1745
* web-api(chore): release @slack/web-api@7.0.2 by [@zimeg](https://github.com/zimeg) in https://github.com/slackapi/node-slack-sdk/pull/1746

**Full Changelog**: https://github.com/slackapi/node-slack-sdk/compare/@slack/cli-hooks@1.0.0...@slack/web-api@7.0.2

[Changes][@slack/web-api@7.0.2]


<a name="@slack/cli-hooks@1.0.0"></a>
# [@slack/cli-hooks@1.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/cli-hooks@1.0.0) - 26 Jan 2024

# What's Changed

A new package has been introduced to enable inter-process communication between the Slack CLI and applications built with Bolt for JavaScript. That's this `@slack/cli-hooks` package!

More information on this package can be found on the package's [`README.md`](https://github.com/slackapi/node-slack-sdk/tree/main/packages/cli-hooks#slack-cli-hooks) and releases are currently [available on NPM](https://www.npmjs.com/package/@slack/cli-hooks).

# Full Changelog

[`f3dff4d2d2`](https://github.com/slackapi/node-slack-sdk/commit/f3dff4d2d278d5a38de2c526b3a372017f4f95ca) Introduce a `@slack/cli-hooks` package that implements Slack CLI hooks in https://github.com/slackapi/node-slack-sdk/pull/1714 - Thanks [@zimeg](https://github.com/zimeg) [@misscoded](https://github.com/misscoded) [@WilliamBergamin](https://github.com/WilliamBergamin) [@filmaj](https://github.com/filmaj)

[Changes][@slack/cli-hooks@1.0.0]


<a name="@slack/web-api@6.12.0"></a>
# [@slack/web-api@6.12.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.12.0) - 26 Jan 2024

# What's Changed

The following methods were added to the web client to support `functions.*` methods:

- [`functions.completeError`](https://api.slack.com/methods/functions.completeError)
- [`functions.completeSuccess`](https://api.slack.com/methods/functions.completeSuccess)

# Full Changelog

[`4f393719e7`](https://github.com/slackapi/node-slack-sdk/commit/4f393719e76236d8d3eb9e5961e6837045e445b4) Add support for functions.* (complete) methods in [#1702](https://github.com/slackapi/node-slack-sdk/issues/1702) - Thanks [@misscoded](https://github.com/misscoded)!

https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.11.2...@slack/web-api@6.12.0

[Changes][@slack/web-api@6.12.0]


<a name="@slack/web-api@7.0.1"></a>
# [@slack/web-api@7.0.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@7.0.1) - 19 Jan 2024

# What's Changed

Only relevant to consumers in TypeScript projects: we mistakenly removed the types for method _arguments_ as exports in the 7.0.0 major release (e.g. `ViewsPushArguments`, etc. - any of the types listed in [this file](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/index.ts)). These were available for consumers to `import` in the 6.x versions of `web-api`. Woops! This release simply adds these back in.

# Full Changelog

d5c17d8 web-api: re-export method argument types ([#1729](https://github.com/slackapi/node-slack-sdk/issues/1729))


[Changes][@slack/web-api@7.0.1]


<a name="@slack/oauth@3.0.0"></a>
# [@slack/oauth@3.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@3.0.0) - 18 Jan 2024

# What's Changed

This major release introduces two major changes:

- the minimum node version is now v18, the current LTS node.js. While the library should work with older versions of node, we no longer test the library against versions of node older than 18, so we cannot guarantee compatibility.
- the dependent `@slack/web-api` package has been updated to the latest major version, v7. While `web-api` is not directly exposed in  this `oauth` library so it should not affect consuming applications, it is worth mentioning that the client methods `web-api` exposes has newer, stricter, more accurate TypeScript types. This should not affect developers, but is worth calling out.

No other changes were released!

[Changes][@slack/oauth@3.0.0]


<a name="@slack/web-api@7.0.0"></a>
# [@slack/web-api@7.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@7.0.0) - 16 Jan 2024

# What's Changed

There are two big (potentially) breaking changes library users should be aware of:

1. The minimum supported (and thus tested) version of node.js is now v18. While older versions of node should still work, we no longer guarantee this, especially now that versions of node.js older than 18 are end-of-life'd.
2. If you use this library in a TypeScript project, many of the HTTP API methods that this library exposes now have stricter, and more correct / accurate, argument types and constraints modeled.

But do not fear! We have written [a migration guide for v6 -> v7 users](https://github.com/slackapi/node-slack-sdk/wiki/Migration-Guide-for-web%E2%80%90api-v7) which painstakingly list out the changes per-method, which should provide you with an easy upgrade process.

As usual, if you have trouble with this library, feel free to file an issue! We are here to help 🫂 😄 

Much love,
The Slack DevRel Engineering team

# Changelog

e29f6a1 Add support for overriding token when using `fileUploadV2` ([#1723](https://github.com/slackapi/node-slack-sdk/issues/1723) fixes [#1644](https://github.com/slackapi/node-slack-sdk/issues/1644))
d53ef02 `@slack/web-api` argument type safety ([#1673](https://github.com/slackapi/node-slack-sdk/issues/1673))
4a8eeac Remove warning about lack of fallback text from `chat.update` invocations ([#1674](https://github.com/slackapi/node-slack-sdk/issues/1674))
6e8a31e Bump minimum node version to v18 ([#1667](https://github.com/slackapi/node-slack-sdk/issues/1667))

[Changes][@slack/web-api@7.0.0]


<a name="@slack/socket-mode@1.3.3"></a>
# [@slack/socket-mode@1.3.3](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/socket-mode@1.3.3) - 10 Jan 2024

This patch release bumps the `@slack/web-api` dependency up a patch version to address an underlying security vulnerability in the axios sub-dependency.

[Changes][@slack/socket-mode@1.3.3]


<a name="@slack/rtm-api@6.2.1"></a>
# [@slack/rtm-api@6.2.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/rtm-api@6.2.1) - 10 Jan 2024

This patch release bumps the @slack/web-api dependency up a patch version to address an underlying security vulnerability in the axios sub-dependency.

[Changes][@slack/rtm-api@6.2.1]


<a name="@slack/oauth@2.6.2"></a>
# [@slack/oauth@2.6.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@2.6.2) - 10 Jan 2024

This patch release bumps the `@slack/web-api` dependency up a patch version to address an underlying security vulnerability in the axios sub-dependency.

[Changes][@slack/oauth@2.6.2]


<a name="@slack/web-api@6.11.2"></a>
# [@slack/web-api@6.11.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.11.2) - 09 Jan 2024

Bumps axios to 1.6.5 to address _another_ security vulnerability.

[Changes][@slack/web-api@6.11.2]


<a name="@slack/webhook@7.0.2"></a>
# [@slack/webhook@7.0.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/webhook@7.0.2) - 02 Jan 2024

Bumps axios to 1.6.3 to address a security vulnerability.

[Changes][@slack/webhook@7.0.2]


<a name="@slack/web-api@6.11.1"></a>
# [@slack/web-api@6.11.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.11.1) - 02 Jan 2024

Bumps axios to 1.6.3 to address a security vulnerability.

[Changes][@slack/web-api@6.11.1]


<a name="@slack/web-api@6.11.0"></a>
# [@slack/web-api@6.11.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.11.0) - 20 Dec 2023

- Adds support for `style.code` properties on rich text elements. See original issue [#1706](https://github.com/slackapi/node-slack-sdk/issues/1706) and PR to resolve [#1707](https://github.com/slackapi/node-slack-sdk/issues/1707).

[Changes][@slack/web-api@6.11.0]


<a name="@slack/types@2.11.0"></a>
# [@slack/types@2.11.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@2.11.0) - 20 Dec 2023

## What's Changed

* Add `code` property to `RichTextStyleable`, allowing to inline-code style rich text by [@filmaj](https://github.com/filmaj) in https://github.com/slackapi/node-slack-sdk/pull/1707

[Changes][@slack/types@2.11.0]


<a name="@slack/web-api@7.0.0-rc.0"></a>
# [@slack/web-api@7.0.0-rc.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@7.0.0-rc.0) - 14 Dec 2023

## What's Changed

A lot! While this is only a release candidate as we finalize the next major version of web-api, v7, you can give it a go while we put the final touches on it.

We have also prepared a [migration guide](https://github.com/slackapi/node-slack-sdk/wiki/Migration-Guide-for-web%E2%80%90api-v7) for those worried about what has changed and how to migrate from v6.

For the full list of changes, please take a look at the [migration guide](https://github.com/slackapi/node-slack-sdk/wiki/Migration-Guide-for-web%E2%80%90api-v7).

To install and give it a whirl, simply:

    npm i @slack/web-api@rc

Your feedback is incredibly valuable to us! If you do give this release candidate a try, first: thank you! Second, if you find any issues or have trouble using it, please let us know by [filing an issue](https://github.com/slackapi/node-slack-sdk/issues/new/choose).

[Changes][@slack/web-api@7.0.0-rc.0]


<a name="@slack/rtm-api@6.2.0"></a>
# [@slack/rtm-api@6.2.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/rtm-api@6.2.0) - 27 Nov 2023

## What's Changed
62e4570 rtm-api: add support for custom `webClient` ([#1696](https://github.com/slackapi/node-slack-sdk/issues/1696))

## New Contributors
* [@ishangarg0](https://github.com/ishangarg0) made their first contribution in https://github.com/slackapi/node-slack-sdk/pull/1696

**Full Changelog**: https://github.com/slackapi/node-slack-sdk/compare/@slack/rtm@6.1.1...@slack/rtm-api@6.2.0

[Changes][@slack/rtm-api@6.2.0]


<a name="@slack/web-api@6.10.0"></a>
# [@slack/web-api@6.10.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.10.0) - 14 Nov 2023

## What's Changed
66eb303 Add support for apps.manifest.* endpoints - thanks [@misscoded](https://github.com/misscoded)! ([#1690](https://github.com/slackapi/node-slack-sdk/issues/1690))
6e07903 Add new args to admin.users.list and update web API response types - thanks [@seratch](https://github.com/seratch)! ([#1688](https://github.com/slackapi/node-slack-sdk/issues/1688))


**Full Changelog**: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.9.1...@slack/web-api@6.10.0

[Changes][@slack/web-api@6.10.0]


<a name="@slack/types@2.10.0"></a>
# [@slack/types@2.10.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@2.10.0) - 14 Nov 2023

## What's Changed
41f771e Add new `file_input` block kit element - thanks [@filmaj](https://github.com/filmaj)! For more information, check out the [File Input Block Kit Element reference documentation](https://api.slack.com/reference/block-kit/block-elements#file_input). ([#1689](https://github.com/slackapi/node-slack-sdk/issues/1689))
a8b948d typo in types package README fix - thanks [@marcomow](https://github.com/marcomow)! ([#1678](https://github.com/slackapi/node-slack-sdk/issues/1678))

**Full Changelog**: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@2.9.0...@slack/types@2.10.0

[Changes][@slack/types@2.10.0]


<a name="@slack/webhook@7.0.1"></a>
# [@slack/webhook@7.0.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/webhook@7.0.1) - 30 Oct 2023

## What's Changed

a74e35b feat: upgrade axios to resolve CVE-2023-45857 ([#1682](https://github.com/slackapi/node-slack-sdk/issues/1682))

## New Contributors
* [@enza252](https://github.com/enza252) made their first contribution in https://github.com/slackapi/node-slack-sdk/pull/1682

[Changes][@slack/webhook@7.0.1]


<a name="@slack/web-api@6.9.1"></a>
# [@slack/web-api@6.9.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.9.1) - 30 Oct 2023

## What's Changed

* chore: update axios in web-api to 1.6.0. See [#1682](https://github.com/slackapi/node-slack-sdk/issues/1682) for more info by [@enza252](https://github.com/enza252) in https://github.com/slackapi/node-slack-sdk/pull/1686

**Full Changelog**: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.9.0...@slack/web-api@6.9.1

[Changes][@slack/web-api@6.9.1]


<a name="@slack/webhook@7.0.0"></a>
# [@slack/webhook@7.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/webhook@7.0.0) - 04 Oct 2023

# What's Changed

85c07d9 Set minimum node version to 18 ([#1666](https://github.com/slackapi/node-slack-sdk/issues/1666))
0ba6dc2 Add metadata to incoming webhooks parameters ([#1617](https://github.com/slackapi/node-slack-sdk/issues/1617))

# Breaking Changes

While this release is a new major version, the only "breaking change" is that we dropped support for node versions below v18 (at the time of this release, v16 and lower have reached their end of life). No APIs from this package were changed.

[Changes][@slack/webhook@7.0.0]


<a name="@slack/types@2.9.0"></a>
# [@slack/types@2.9.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@2.9.0) - 29 Sep 2023

## What's Changed
* 124d8ca Add rich text types ([#1643](https://github.com/slackapi/node-slack-sdk/issues/1643)) - thank you [@chrisronline](https://github.com/chrisronline) !
* 208c53f Drop use of deprecated interfaces and use new aliased one. ([#1664](https://github.com/slackapi/node-slack-sdk/issues/1664))
* d0b04a0 Add a README to the types package. ([#1663](https://github.com/slackapi/node-slack-sdk/issues/1663))
* e4a291a `@slack/types` Full JSdoc, deprecate `WorkflowStep`, `Action` (aliased to `Actionable`) and `Confirm` (aliased to `ConfirmationDialog`) and upcoming major version breaking change TODOs as comments ([#1662](https://github.com/slackapi/node-slack-sdk/issues/1662))
* 09ef142 Types: split single index.ts file into files based on function/category ([#1656](https://github.com/slackapi/node-slack-sdk/issues/1656))
* da5da33 types: Adding deprecation notices to Dialogs and Steps From Apps types ([#1655](https://github.com/slackapi/node-slack-sdk/issues/1655))
* 708ee5e Add `author_subname` property to `MessageAttachment` ([#1621](https://github.com/slackapi/node-slack-sdk/issues/1621)) - thank you [@mztnnrt](https://github.com/mztnnrt) ! 

## New Contributors
* [@chrisronline](https://github.com/chrisronline) made their first contribution in https://github.com/slackapi/node-slack-sdk/pull/1643
* [@mztnnrt](https://github.com/mztnnrt) made their first contribution in https://github.com/slackapi/node-slack-sdk/pull/1621

[Changes][@slack/types@2.9.0]


<a name="@slack/rtm-api@6.1.1"></a>
# [@slack/rtm-api@6.1.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/rtm-api@6.1.1) - 11 Aug 2023

## What's Changed

For compatibility with node v19.5 and newer (including node v20+), it is recommended to update to this version as the WebSocket API changed slightly. In certain websocket failure modes, versions of `rtm-api` prior to 6.1.1 using node v19.5 or newer may see `Cannot read properties of null (reading 'message')` failures (see [#1641](https://github.com/slackapi/node-slack-sdk/issues/1641) for an example).

- Update socket send errback by [@cmbuckley](https://github.com/cmbuckley) in [#1597](https://github.com/slackapi/node-slack-sdk/issues/1597)


[Changes][@slack/rtm-api@6.1.1]


<a name="@slack/web-api@6.9.0"></a>
# [@slack/web-api@6.9.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.9.0) - 02 Aug 2023

## What's Changed
* Fix bug with `files.uploadV2` to ensure complete file is uploaded by [@srajiang](https://github.com/srajiang) in https://github.com/slackapi/node-slack-sdk/pull/1616
* Add cursor pagination to `team.accessLogs` by [@seratch](https://github.com/seratch) in https://github.com/slackapi/node-slack-sdk/pull/1625
* Mark `stars.*` API methods as deprecated by [@seratch](https://github.com/seratch) in https://github.com/slackapi/node-slack-sdk/pull/1632
* chore: fix imports order by [@levenleven](https://github.com/levenleven) in https://github.com/slackapi/node-slack-sdk/pull/1639
* feat: add context to rate-limited event by [@levenleven](https://github.com/levenleven) in https://github.com/slackapi/node-slack-sdk/pull/1637
* Upgrade dependency to `@slack/types` by [@ClementValot](https://github.com/ClementValot) in https://github.com/slackapi/node-slack-sdk/pull/1559

## New Contributors
* [@levenleven](https://github.com/levenleven) made their first contribution in https://github.com/slackapi/node-slack-sdk/pull/1639
* [@ClementValot](https://github.com/ClementValot) made their first contribution in https://github.com/slackapi/node-slack-sdk/pull/1559

**Full Changelog**: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.8.1...@slack/web-api@6.9.0

[Changes][@slack/web-api@6.9.0]


<a name="@slack/oauth@2.6.1"></a>
# [@slack/oauth@2.6.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@2.6.1) - 13 Apr 2023

## What's Changed
* Improve the default OAuth page renderer not to embed any params as-is by [@seratch](https://github.com/seratch) https://github.com/slackapi/node-slack-sdk/pull/1604 

**Full Changelog**: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.6.0...@slack/oauth@2.6.1

[Changes][@slack/oauth@2.6.1]


<a name="@slack/rtm-api@6.1.0"></a>
# [@slack/rtm-api@6.1.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/rtm-api@6.1.0) - 22 Feb 2023

## What's Changed
* Replace TSLint with ESLint by [@filmaj](https://github.com/filmaj) in https://github.com/slackapi/node-slack-sdk/pull/1325
* Fix [#1251](https://github.com/slackapi/node-slack-sdk/issues/1251) Upgrade the minimum version of "ws" package by [@seratch](https://github.com/seratch) in https://github.com/slackapi/node-slack-sdk/pull/1322
* Update code to make it TS 4.4 compatible by [@seratch](https://github.com/seratch) in https://github.com/slackapi/node-slack-sdk/pull/1319
* Publish @slack/rtm-api@6.1.0 by [@hello-ashleyintech](https://github.com/hello-ashleyintech) in https://github.com/slackapi/node-slack-sdk/pull/1591
* Vulnerability in ws@5.2.3 by [@gamboaa](https://github.com/gamboaa) in https://github.com/slackapi/node-slack-sdk/issues/1590

**Full Changelog**: https://github.com/slackapi/node-slack-sdk/compare/@slack/rtm-api@6.0.0...@slack/rtm-api@6.1.0

[Changes][@slack/rtm-api@6.1.0]


<a name="@slack/web-api@6.8.1"></a>
# [@slack/web-api@6.8.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.8.1) - 01 Feb 2023

## What's Changed
* Add `include_categories` to `emoji.list` API arguments by [@seratch](https://github.com/seratch) in https://github.com/slackapi/node-slack-sdk/pull/1581
* feat: set default max concurrency to 100 for by [@callumsteele4](https://github.com/callumsteele4) in https://github.com/slackapi/node-slack-sdk/pull/1583 (fixes https://github.com/slackapi/node-slack-sdk/issues/1582)
* Use `Readable` instead of `ReadStream` in `uploadV2` by [@redneb](https://github.com/redneb) in https://github.com/slackapi/node-slack-sdk/pull/1577 (fixes https://github.com/slackapi/node-slack-sdk/issues/1586)
* Add `admin.conversations.bulk{Archive|Delete|Move}` API method support by [@seratch](https://github.com/seratch) in https://github.com/slackapi/node-slack-sdk/issues/1566
* fix auth.revoke argument type definition (`test` should be optional) by [@Cattttttttt](https://github.com/Cattttttttt) in https://github.com/slackapi/node-slack-sdk/pull/1562

## New Contributors
* [@callumsteele4](https://github.com/callumsteele4) made their first contribution in https://github.com/slackapi/node-slack-sdk/pull/1583
* [@redneb](https://github.com/redneb) made their first contribution in https://github.com/slackapi/node-slack-sdk/pull/1577

[Changes][@slack/web-api@6.8.1]


<a name="@slack/oauth@2.6.0"></a>
# [@slack/oauth@2.6.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@2.6.0) - 04 Jan 2023

## What's Changed

## Security
* Upgraded `jsonwebtoken` dependency for critical level security issues by [@seratch](https://github.com/seratch) in https://github.com/slackapi/node-slack-sdk/pull/1575
* Fixed `auth.revoke` argument type definition by [@Cattttttttt](https://github.com/Cattttttttt) in https://github.com/slackapi/node-slack-sdk/pull/1562
* Added support for `admin.conversations.bulk{Archive|Delete|Move}`  API method, by [@hello-ashleyintech](https://github.com/hello-ashleyintech) in https://github.com/slackapi/node-slack-sdk/pull/1572

### Docs
* Update docs to include `files.uploadV2` by [@srajiang](https://github.com/srajiang) in https://github.com/slackapi/node-slack-sdk/pull/1548
* Update maintainer's guide to clarify release instructions by [@hello-ashleyintech](https://github.com/hello-ashleyintech) in https://github.com/slackapi/node-slack-sdk/pull/1556

## New Contributors
* [@Cattttttttt](https://github.com/Cattttttttt) made their first contribution in https://github.com/slackapi/node-slack-sdk/pull/1562 🎉, thank you!

**Full Changelog**: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.8.0...@slack/oauth@2.6.0

[Changes][@slack/oauth@2.6.0]


<a name="@slack/web-api@6.8.0"></a>
# [@slack/web-api@6.8.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.8.0) - 08 Nov 2022

## What's Changed
* Added in functionality for admin.analytics.getFile method by [@hello-ashleyintech](https://github.com/hello-ashleyintech) in https://github.com/slackapi/node-slack-sdk/pull/1515
* avoid creating unnecessary function by [@jimmywarting](https://github.com/jimmywarting) in https://github.com/slackapi/node-slack-sdk/pull/1524
* Add include_all_metadata to conversations.replies API arguments by [@seratch](https://github.com/seratch) in https://github.com/slackapi/node-slack-sdk/pull/1537
* Add files.uploadv2 support (fixing [#1541](https://github.com/slackapi/node-slack-sdk/issues/1541)) by [@srajiang](https://github.com/srajiang) in https://github.com/slackapi/node-slack-sdk/pull/1544
* fix(1528): better warnings about webclient fallbacks by [@edwmurph](https://github.com/edwmurph) in https://github.com/slackapi/node-slack-sdk/pull/1529
* ChatUnfurlArguments require either `channel` and `ts` or `unfurl_id` and `source` properties to be specified in pairs by [@filmaj](https://github.com/filmaj) in https://github.com/slackapi/node-slack-sdk/pull/1551

## New Contributors
* [@jimmywarting](https://github.com/jimmywarting) made their first contribution in https://github.com/slackapi/node-slack-sdk/pull/1524
* [@edwmurph](https://github.com/edwmurph) made their first contribution in https://github.com/slackapi/node-slack-sdk/pull/1529

**Full Changelog**: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.7.2...@slack/web-api@6.8.0

[Changes][@slack/web-api@6.8.0]


<a name="@slack/types@2.8.0"></a>
# [@slack/types@2.8.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@2.8.0) - 08 Nov 2022

## What's Changed
* Fix [#1512](https://github.com/slackapi/node-slack-sdk/issues/1512) Add video block to Block Kit support by [@seratch](https://github.com/seratch) in https://github.com/slackapi/node-slack-sdk/pull/1514
* Add types for DateTimepicker, EmailInput, NumberInput and URLInput by [@filmaj](https://github.com/filmaj) in https://github.com/slackapi/node-slack-sdk/pull/1549

**Full Changelog**: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@2.7.0...@slack/types@2.8.0

[Changes][@slack/types@2.8.0]


<a name="@slack/socket-mode@1.3.2"></a>
# [@slack/socket-mode@1.3.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/socket-mode@1.3.2) - 25 Oct 2022

## What's Changed

* Always handle web socket open when connecting by [@WilliamBergamin](https://github.com/WilliamBergamin) in https://github.com/slackapi/node-slack-sdk/pull/1522
* Fix [#1546](https://github.com/slackapi/node-slack-sdk/issues/1546) SocketModeClient raise TypeError when running Node.js 19 by [@seratch](https://github.com/seratch) in https://github.com/slackapi/node-slack-sdk/pull/1547

[Changes][@slack/socket-mode@1.3.2]


<a name="@slack/web-api@6.7.2-nextGen.1"></a>
# [@slack/web-api@6.7.2-nextGen.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.7.2-nextGen.1) - 09 Sep 2022

## What's Changed
* Add interactivity pointer by [@hello-ashleyintech](https://github.com/hello-ashleyintech) in https://github.com/slackapi/node-slack-sdk/pull/1526
* Publish by [@hello-ashleyintech](https://github.com/hello-ashleyintech) in https://github.com/slackapi/node-slack-sdk/pull/1533
* Update maintainer's guide to add more specific instructions for releases by [@hello-ashleyintech](https://github.com/hello-ashleyintech) in https://github.com/slackapi/node-slack-sdk/pull/1511
* Add types module to issue templates by [@seratch](https://github.com/seratch) in https://github.com/slackapi/node-slack-sdk/pull/1513
* Fix [#1512](https://github.com/slackapi/node-slack-sdk/issues/1512) Add video block to Block Kit support by [@seratch](https://github.com/seratch) in https://github.com/slackapi/node-slack-sdk/pull/1514
* Added in functionality for admin.analytics.getFile method by [@hello-ashleyintech](https://github.com/hello-ashleyintech) in https://github.com/slackapi/node-slack-sdk/pull/1515
* Update @slack/client README to reflect deprecation by [@hello-ashleyintech](https://github.com/hello-ashleyintech) in https://github.com/slackapi/node-slack-sdk/pull/1519
* Always handle web socket open when connecting by [@WilliamBergamin](https://github.com/WilliamBergamin) in https://github.com/slackapi/node-slack-sdk/pull/1522
* avoid creating unnecessary function by [@jimmywarting](https://github.com/jimmywarting) in https://github.com/slackapi/node-slack-sdk/pull/1524
* Bump lerna dependency by [@srajiang](https://github.com/srajiang) in https://github.com/slackapi/node-slack-sdk/pull/1532

## New Contributors
* [@WilliamBergamin](https://github.com/WilliamBergamin) made their first contribution in https://github.com/slackapi/node-slack-sdk/pull/1522
* [@jimmywarting](https://github.com/jimmywarting) made their first contribution in https://github.com/slackapi/node-slack-sdk/pull/1524

**This release is a beta release and is not production ready.**
**Full Changelog**: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.5.4...@slack/web-api@6.7.2-nextGen.1

[Changes][@slack/web-api@6.7.2-nextGen.1]


<a name="@slack/types@2.7.0"></a>
# [@slack/types@2.7.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@2.7.0) - 08 Jul 2022

* [#1502](https://github.com/slackapi/node-slack-sdk/issues/1502) Add timezone property to Timepicker block element (via [#1503](https://github.com/slackapi/node-slack-sdk/issues/1503)) - thanks [@hello-ashleyintech](https://github.com/hello-ashleyintech) !

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/57?closed=1).

[Changes][@slack/types@2.7.0]


<a name="@slack/oauth@2.5.4"></a>
# [@slack/oauth@2.5.4](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@2.5.4) - 08 Jul 2022

* Fix [#1506](https://github.com/slackapi/node-slack-sdk/issues/1506): `handleInstallPath` throws an error when `stateVerification` is `false` (via [#1507](https://github.com/slackapi/node-slack-sdk/issues/1507)) - thanks [@rockingskier](https://github.com/rockingskier) !

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/55?closed=1).

[Changes][@slack/oauth@2.5.4]


<a name="@slack/types@2.6.0"></a>
# [@slack/types@2.6.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@2.6.0) - 04 Jul 2022

* [#1504](https://github.com/slackapi/node-slack-sdk/issues/1504) Adding Message Metadata support - thanks [@dannyhostetler](https://github.com/dannyhostetler) !

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/39?closed=1).

[Changes][@slack/types@2.6.0]


<a name="@slack/oauth@2.5.3"></a>
# [@slack/oauth@2.5.3](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@2.5.3) - 16 Jun 2022

* Improve InstallationProvide logic not to save new data when token rotation is enabled plus the tokens are not refreshed (via [#1497](https://github.com/slackapi/node-slack-sdk/issues/1497) ) - thanks [@omermizr](https://github.com/omermizr)!

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/52?closed=1).

[Changes][@slack/oauth@2.5.3]


<a name="@slack/socket-mode@1.3.1"></a>
# [@slack/socket-mode@1.3.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/socket-mode@1.3.1) - 14 Jun 2022

* [#1496](https://github.com/slackapi/node-slack-sdk/issues/1496) Fix [#1495](https://github.com/slackapi/node-slack-sdk/issues/1495) SocketModeClient still fails to automatically reconnect when apps.connections.open API returns an error code - Thanks [@seratch](https://github.com/seratch) [@levenleven](https://github.com/levenleven)

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/44?closed=1).

[Changes][@slack/socket-mode@1.3.1]


<a name="@slack/web-api@6.7.2"></a>
# [@slack/web-api@6.7.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.7.2) - 10 Jun 2022

* Add domain to team.info API parameters (via [#1457](https://github.com/slackapi/node-slack-sdk/issues/1457)) - thanks [@seratch](https://github.com/seratch)
* Fix [#1490](https://github.com/slackapi/node-slack-sdk/issues/1490) Add missing properties to UsersInfoResponse (via [#1491](https://github.com/slackapi/node-slack-sdk/issues/1491)) - thanks [@seratch](https://github.com/seratch) [@AdriannaBeck](https://github.com/AdriannaBeck)
* [#1476](https://github.com/slackapi/node-slack-sdk/issues/1476) Tweaking logic for warning when using conversation APIs that are missing accessibility parameters (via [#1479](https://github.com/slackapi/node-slack-sdk/issues/1479)) - thanks [@filmaj](https://github.com/filmaj) [@saveman71](https://github.com/saveman71)

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/50?closed=1).

[Changes][@slack/web-api@6.7.2]


<a name="@slack/types@2.5.0"></a>
# [@slack/types@2.5.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@2.5.0) - 26 May 2022

* [#1478](https://github.com/slackapi/node-slack-sdk/issues/1478): Add `accessibility_label` field to Button interface - thanks [@kpeters-cbsi](https://github.com/kpeters-cbsi) !
* [#1462](https://github.com/slackapi/node-slack-sdk/issues/1462): Add app unfurl related properties in attachments (fixed via [#1463](https://github.com/slackapi/node-slack-sdk/issues/1463)) - thanks [@seratch](https://github.com/seratch) !

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/38?closed=1).

[Changes][@slack/types@2.5.0]


<a name="@slack/oauth@2.5.2"></a>
# [@slack/oauth@2.5.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@2.5.2) - 16 May 2022

* Fix a bug where additional cookies set by beforeRedirection are overwritten (via [#1485](https://github.com/slackapi/node-slack-sdk/issues/1485) ) - thanks [@seratch](https://github.com/seratch)!

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/51?closed=1).

[Changes][@slack/oauth@2.5.2]


<a name="@slack/socket-mode@1.3.0"></a>
# [@slack/socket-mode@1.3.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/socket-mode@1.3.0) - 04 May 2022

* [#1465](https://github.com/slackapi/node-slack-sdk/issues/1465) [#1470](https://github.com/slackapi/node-slack-sdk/issues/1470) Fix [#1243](https://github.com/slackapi/node-slack-sdk/issues/1243) [#1464](https://github.com/slackapi/node-slack-sdk/issues/1464) Socket Mode reconnection issue - Thanks [@seratch](https://github.com/seratch) [@Zenexer](https://github.com/Zenexer) [@kyman2001](https://github.com/kyman2001)
* [#1456](https://github.com/slackapi/node-slack-sdk/issues/1456) Fix [#1455](https://github.com/slackapi/node-slack-sdk/issues/1455) bolt-js's ack(string) does not work in Socket Mode - Thanks [@seratch](https://github.com/seratch) 
* [#1459](https://github.com/slackapi/node-slack-sdk/issues/1459) Fix [#1450](https://github.com/slackapi/node-slack-sdk/issues/1450) Add isActive property to the SocketModeClient - Thanks [@seratch](https://github.com/seratch) 
* [#1467](https://github.com/slackapi/node-slack-sdk/issues/1467) Split SocketModeClient.ts into several files - Thanks [@seratch](https://github.com/seratch) 
* [#1466](https://github.com/slackapi/node-slack-sdk/issues/1466) Add envelope_id to Socket Mode listener arguments - Thanks [@seratch](https://github.com/seratch) 
* [#1458](https://github.com/slackapi/node-slack-sdk/issues/1458) Add skip comments for any type warnings in socket-mode module - Thanks [@seratch](https://github.com/seratch) 

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/30?closed=1).

[Changes][@slack/socket-mode@1.3.0]


<a name="@slack/socket-mode@1.3.0-rc.1"></a>
# [@slack/socket-mode@1.3.0-rc.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/socket-mode@1.3.0-rc.1) - 16 Apr 2022

See [@slack/socket-mode@1.3.0](https://github.com/slackapi/node-slack-sdk/releases/tag/%40slack%2Fsocket-mode%401.3.0) instead

[Changes][@slack/socket-mode@1.3.0-rc.1]


<a name="@slack/socket-mode@1.3.0-rc.0"></a>
# [@slack/socket-mode@1.3.0-rc.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/socket-mode@1.3.0-rc.0) - 15 Apr 2022

See [@slack/socket-mode@1.3.0-rc.1](https://github.com/slackapi/node-slack-sdk/releases/tag/%40slack%2Fsocket-mode%401.3.0-rc.1) instead

[Changes][@slack/socket-mode@1.3.0-rc.0]


<a name="@slack/web-api@6.7.1"></a>
# [@slack/web-api@6.7.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.7.1) - 28 Mar 2022

* Add missing parameters in chat.update API method (via [#1433](https://github.com/slackapi/node-slack-sdk/issues/1433)) - thanks [@seratch](https://github.com/seratch)!
* Upgrade the minimum axios version to the latest (web-api) (via [#1447](https://github.com/slackapi/node-slack-sdk/issues/1447) ) - thanks [@seratch](https://github.com/seratch)!
* Fix [#1452](https://github.com/slackapi/node-slack-sdk/issues/1452) fields[key].label is missing in users.profile.get responses (via [#1453](https://github.com/slackapi/node-slack-sdk/issues/1453) ) - thanks [@seratch](https://github.com/seratch) [@75asa](https://github.com/75asa)!
* Auto code generation added Huddles / clip related properties to response types - thanks [@seratch](https://github.com/seratch)!

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/40?closed=1).


[Changes][@slack/web-api@6.7.1]


<a name="@slack/oauth@2.5.1"></a>
# [@slack/oauth@2.5.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@2.5.1) - 28 Mar 2022

* Improve debug-level logging in `InstallProvider#handleInstallPath()` (via [#1451](https://github.com/slackapi/node-slack-sdk/issues/1451)) - thanks [@seratch](https://github.com/seratch)!

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/49?closed=1).

[Changes][@slack/oauth@2.5.1]


<a name="@slack/oauth@2.5.0"></a>
# [@slack/oauth@2.5.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@2.5.0) - 25 Mar 2022

#### Changes

* Fix [#1435](https://github.com/slackapi/node-slack-sdk/issues/1435): Proper use of state parameter for the OAuth CSRF protection (via [#1436](https://github.com/slackapi/node-slack-sdk/issues/1436)) - thanks [@seratch](https://github.com/seratch)!
* Fix [#1439](https://github.com/slackapi/node-slack-sdk/issues/1439): Add built-in StateStore implementations using server-side database (via [#1441](https://github.com/slackapi/node-slack-sdk/issues/1441)) - thanks [@seratch](https://github.com/seratch)!
* Fix [#1438](https://github.com/slackapi/node-slack-sdk/issues/1438): Add more callbacks (`beforeRedirection`, `before/afterInstallation`, async success/failure) in `InstallProvider` (via [#1442](https://github.com/slackapi/node-slack-sdk/issues/1442)) - thanks [@seratch](https://github.com/seratch)!
* Re-organize the source files in the OAuth package (via [#1430](https://github.com/slackapi/node-slack-sdk/issues/1430)) - thanks [@seratch](https://github.com/seratch)!
* Add error types to exposed ones from @slack/oauth (via [#1431](https://github.com/slackapi/node-slack-sdk/issues/1431)) - thanks [@seratch](https://github.com/seratch)!
* Update `FileInstallationStore` to behave more consistently (via [#1437](https://github.com/slackapi/node-slack-sdk/issues/1437)) - thanks [@seratch](https://github.com/seratch)!
* Fix eslint warnings and TODOs in OAuth module (via [#1425](https://github.com/slackapi/node-slack-sdk/issues/1425)) - thanks [@seratch](https://github.com/seratch)!
* Rename sub directory for installation stores (via [#1443](https://github.com/slackapi/node-slack-sdk/issues/1443)) - thanks [@seratch](https://github.com/seratch)!
* Add exported interface types that were missing in v2.5.0-rc1 release (via [#1446](https://github.com/slackapi/node-slack-sdk/issues/1446)) - thanks [@seratch](https://github.com/seratch)!

#### Document changes

* Fix docs `callbackOptions.success` param to be `installOptions` (via [#1429](https://github.com/slackapi/node-slack-sdk/issues/1429)) - thanks [@mwbrooks](https://github.com/mwbrooks)!
* Adding documentation for handleInstallPath, beforeRedirection, beforeInstallation, afterInstallation (via [#1448](https://github.com/slackapi/node-slack-sdk/issues/1448)) - thanks [@filmaj](https://github.com/filmaj) 

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/13?closed=1).

[Changes][@slack/oauth@2.5.0]


<a name="@slack/oauth@2.5.0-rc.1"></a>
# [@slack/oauth@2.5.0-rc.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@2.5.0-rc.1) - 03 Mar 2022

* Fix docs `callbackOptions.success` param to be `installOptions` (via [#1429](https://github.com/slackapi/node-slack-sdk/issues/1429)) - thanks [@mwbrooks](https://github.com/mwbrooks)!
* Re-organize the source files in the OAuth package (via [#1430](https://github.com/slackapi/node-slack-sdk/issues/1430)) - thanks [@seratch](https://github.com/seratch)!
* Fix eslint warnings and TODOs in OAuth module (via [#1425](https://github.com/slackapi/node-slack-sdk/issues/1425)) - thanks [@seratch](https://github.com/seratch)!
* Add error types to exposed ones from @slack/oauth (via [#1431](https://github.com/slackapi/node-slack-sdk/issues/1431)) - thanks [@seratch](https://github.com/seratch)!
* Update FileInstallationStore to behave more consistently (via [#1437](https://github.com/slackapi/node-slack-sdk/issues/1437)) - thanks [@seratch](https://github.com/seratch)!
* Fix [#1439](https://github.com/slackapi/node-slack-sdk/issues/1439): Add built-in StateStore implementations using server-side database (via [#1441](https://github.com/slackapi/node-slack-sdk/issues/1441)) - thanks [@seratch](https://github.com/seratch)!
* Fix [#1435](https://github.com/slackapi/node-slack-sdk/issues/1435): Proper use of state parameter for the OAuth CSRF protection (via [#1436](https://github.com/slackapi/node-slack-sdk/issues/1436)) - thanks [@seratch](https://github.com/seratch)!
* Fix [#1438](https://github.com/slackapi/node-slack-sdk/issues/1438): Add more callbacks (`beforeRedirection`, `before/afterInstallation`, async success/failure) in `InstallProvider` (via [#1442](https://github.com/slackapi/node-slack-sdk/issues/1442)) - thanks [@seratch](https://github.com/seratch)!
* Rename sub directory for installation stores (via [#1443](https://github.com/slackapi/node-slack-sdk/issues/1443)) - thanks [@seratch](https://github.com/seratch)!

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/13?closed=1).

[Changes][@slack/oauth@2.5.0-rc.1]


<a name="@slack/web-api@6.7.0"></a>
# [@slack/web-api@6.7.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.7.0) - 23 Feb 2022

* Add accessibility_label to button type block element (via [#1419](https://github.com/slackapi/node-slack-sdk/issues/1419)) - thanks [@seratch](https://github.com/seratch)!
* Add [`admin.users.unsupportedVersions.export` API](https://api.slack.com/methods/admin.users.unsupportedVersions.export) support (via [#1420](https://github.com/slackapi/node-slack-sdk/issues/1420)) - thanks [@seratch](https://github.com/seratch)!
* Generate Web API response types including bookmarks.* (via [#1423](https://github.com/slackapi/node-slack-sdk/issues/1423)) - thanks [@seratch](https://github.com/seratch)!
* Include `Retry-After` raw response header value when throwing an error due to invalid `Retry-After` header (via [#1426](https://github.com/slackapi/node-slack-sdk/issues/1426)) - thanks [@filmaj](https://github.com/filmaj)!
* Add [`bookmarks.*` API](https://api.slack.com/methods?query=bookmarks) methods (via [#1427](https://github.com/slackapi/node-slack-sdk/issues/1427)) - thanks [@srajiang](https://github.com/srajiang)!

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/35?closed=1).

[Changes][@slack/web-api@6.7.0]


<a name="@slack/web-api@6.6.0"></a>
# [@slack/web-api@6.6.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.6.0) - 20 Jan 2022

* Upgrade axios to 0.25 to address security vulnerabilities (via [#1416](https://github.com/slackapi/node-slack-sdk/issues/1416)) - thanks [@seratch](https://github.com/seratch)!
* Add support for the [`admin.apps.requests.cancel` API method](https://api.slack.com/methods/admin.apps.requests.cancel) (via [#1413](https://github.com/slackapi/node-slack-sdk/issues/1413)) - thanks [@seratch](https://github.com/seratch)!
* Add the `files` and related properties and their types in `conversations.replies` API responses (via [#1405](https://github.com/slackapi/node-slack-sdk/issues/1405) and [#1403](https://github.com/slackapi/node-slack-sdk/issues/1403)) - thanks [@seratch](https://github.com/seratch)!
* Fix [#1397](https://github.com/slackapi/node-slack-sdk/issues/1397): some fields in `conversations.list` API responses were missing their types (via [#1398](https://github.com/slackapi/node-slack-sdk/issues/1398)) - thanks [@seratch](https://github.com/seratch)!
* Add the `focus_on_load` property to the `views.*` API responses (via [#1386](https://github.com/slackapi/node-slack-sdk/issues/1386)) - thanks [@seratch](https://github.com/seratch)!
* Tweaking the User-Agent field when communicating with Slack APIs in the deno runtime (via [#1384](https://github.com/slackapi/node-slack-sdk/issues/1384)) - thanks [@filmaj](https://github.com/filmaj)!

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/32?closed=1).

[Changes][@slack/web-api@6.6.0]


<a name="@slack/webhook@6.1.0"></a>
# [@slack/webhook@6.1.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/webhook@6.1.0) - 12 Jan 2022

* Fix [#1378](https://github.com/slackapi/node-slack-sdk/issues/1378): Expose axios timeout parameter for webhooks (via [#1394](https://github.com/slackapi/node-slack-sdk/issues/1394)) - thanks [@xuhas](https://github.com/xuhas)!
* Fix [#1368](https://github.com/slackapi/node-slack-sdk/issues/1368): NPM Audit fix: https://github.com/advisories/GHSA-cph5-m8f7-6c5x - thanks [@xmariopereira](https://github.com/xmariopereira)!

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/8?closed=1).

[Changes][@slack/webhook@6.1.0]


<a name="@slack/oauth@2.4.0"></a>
# [@slack/oauth@2.4.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@2.4.0) - 12 Jan 2022

* Fix [#1083](https://github.com/slackapi/node-slack-sdk/issues/1083): Add test to confirm clientOptions get passed to web-api (via [#1359](https://github.com/slackapi/node-slack-sdk/issues/1359)) - thanks [@filmaj](https://github.com/filmaj)!
* [#1360](https://github.com/slackapi/node-slack-sdk/issues/1360): Add explicit check for enterprise id - thanks [@stophecom](https://github.com/stophecom)!
* Fix [#1409](https://github.com/slackapi/node-slack-sdk/issues/1409): installerOptions.failure() options can be undefined (via [#1410](https://github.com/slackapi/node-slack-sdk/issues/1410)) - thanks [@seratch](https://github.com/seratch)!
* [#1411](https://github.com/slackapi/node-slack-sdk/issues/1411): Refactor the internals of InstallProvider for better null safety - thanks [@seratch](https://github.com/seratch)!

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/33?closed=1).

[Changes][@slack/oauth@2.4.0]


<a name="@slack/web-api@6.5.1-hermesBeta.2"></a>
# [@slack/web-api@6.5.1-hermesBeta.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.5.1-hermesBeta.2) - 15 Dec 2021

- Adds support for apps.notifications.subscriptions.* API endpoints (Subscribe in Slack) -([#1401](https://github.com/slackapi/node-slack-sdk/issues/1401)) thanks [@srajiang](https://github.com/srajiang) 


[Changes][@slack/web-api@6.5.1-hermesBeta.2]


<a name="@slack/types@2.4.0-hermesBeta.1"></a>
# [@slack/types@2.4.0-hermesBeta.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@2.4.0-hermesBeta.1) - 15 Dec 2021

* Adds a new Metadata type ([#1401](https://github.com/slackapi/node-slack-sdk/issues/1401)) - thanks [@srajiang](https://github.com/srajiang)!



[Changes][@slack/types@2.4.0-hermesBeta.1]


<a name="@slack/types@2.4.0"></a>
# [@slack/types@2.4.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@2.4.0) - 03 Dec 2021

* [#1392](https://github.com/slackapi/node-slack-sdk/issues/1392), [#1391](https://github.com/slackapi/node-slack-sdk/issues/1391) - Updates `WorkflowStepView` fields - thanks [@srajiang](https://github.com/srajiang) [@filmaj](https://github.com/filmaj) [@bkeung](https://github.com/bkeung)!

[Changes][@slack/types@2.4.0]


<a name="@slack/types@2.3.0"></a>
# [@slack/types@2.3.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@2.3.0) - 01 Dec 2021

* [#1349](https://github.com/slackapi/node-slack-sdk/issues/1349) [#1350](https://github.com/slackapi/node-slack-sdk/issues/1350) @slack/type View changes cause compile errors - Thanks [@amphro](https://github.com/amphro) [@misscoded](https://github.com/misscoded) 
* [#1387](https://github.com/slackapi/node-slack-sdk/issues/1387) Add focus_on_load to the block element types - Thanks [@seratch](https://github.com/seratch) 

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/29?closed=1).

[Changes][@slack/types@2.3.0]


<a name="@slack/web-api@6.5.0"></a>
# [@slack/web-api@6.5.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.5.0) - 08 Nov 2021

* [#1365](https://github.com/slackapi/node-slack-sdk/issues/1365) Add `team.*` APIs for `rtm.start` migration - Thanks [@seratch](https://github.com/seratch)!
* [#1371](https://github.com/slackapi/node-slack-sdk/issues/1371) Add `admin.users.session.resetBulk` API support - Thanks [@seratch](https://github.com/seratch)!
* [#1336](https://github.com/slackapi/node-slack-sdk/issues/1336) Fix [#1326](https://github.com/slackapi/node-slack-sdk/issues/1326) Add `admin.conversations.{get|set|remove}CustomRetention` API - Thanks [@seratch](https://github.com/seratch)!
* [#1373](https://github.com/slackapi/node-slack-sdk/issues/1373) Remove invalid arguments from `oauth.v2.exchange` API method - Thanks [@seratch](https://github.com/seratch)!
* [#1351](https://github.com/slackapi/node-slack-sdk/issues/1351) Add pronouns to user.profile response data - Thanks [@seratch](https://github.com/seratch)!
* [#1341](https://github.com/slackapi/node-slack-sdk/issues/1341) [#1348](https://github.com/slackapi/node-slack-sdk/issues/1348) [#1362](https://github.com/slackapi/node-slack-sdk/issues/1362) Add new properties to web-api responses - Thanks [@seratch](https://github.com/seratch)!
* [#1337](https://github.com/slackapi/node-slack-sdk/issues/1337) [#1132](https://github.com/slackapi/node-slack-sdk/issues/1132) web-api token should be passed in header instead of body param - Thanks [@filmaj](https://github.com/filmaj)!
* [#1334](https://github.com/slackapi/node-slack-sdk/issues/1334) Upgrade axios once nock issue is resolved - Thanks [@filmaj](https://github.com/filmaj)!
* [#1321](https://github.com/slackapi/node-slack-sdk/issues/1321) Fix [#1302](https://github.com/slackapi/node-slack-sdk/issues/1302) Invalid JSON string causing "Cannot create property 'response_metadata' on string" error - Thanks [@seratch](https://github.com/seratch) [@wizar](https://github.com/wizar)!
* [#1374](https://github.com/slackapi/node-slack-sdk/issues/1374) Disable typescript-eslint/no-explicit-any in internal code of web-api - Thanks [@seratch](https://github.com/seratch)!
* [#1324](https://github.com/slackapi/node-slack-sdk/issues/1324) [#1320](https://github.com/slackapi/node-slack-sdk/issues/1320) Fix [#1318](https://github.com/slackapi/node-slack-sdk/issues/1318) Add notice comments to auto-generated source files - Thanks [@seratch](https://github.com/seratch)!

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/28?closed=1).

[Changes][@slack/web-api@6.5.0]


<a name="@slack/socket-mode@1.2.0"></a>
# [@slack/socket-mode@1.2.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/socket-mode@1.2.0) - 26 Oct 2021

* [#1317](https://github.com/slackapi/node-slack-sdk/issues/1317) Add more event data to event listener arguments - Thanks [@seratch](https://github.com/seratch)!
* [#1322](https://github.com/slackapi/node-slack-sdk/issues/1322) [#1251](https://github.com/slackapi/node-slack-sdk/issues/1251) CVE-2021-32640 - "ws" is vulnerable to ReDoS attacks - Thanks [@seratch](https://github.com/seratch) [@simeon95](https://github.com/simeon95)!
* [#1205](https://github.com/slackapi/node-slack-sdk/issues/1205) Add unit tests for @slack/socket-mode - Thanks [@seratch](https://github.com/seratch)!

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/24?closed=1).

[Changes][@slack/socket-mode@1.2.0]


<a name="@slack/web-api@6.4.0-appManifestsBeta.1"></a>
# [@slack/web-api@6.4.0-appManifestsBeta.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.4.0-appManifestsBeta.1) - 07 Oct 2021

### New Features (Beta)

#### App Manifests 
This release includes support for [app manifests](https://api.slack.com/reference/manifests). The `apps.manifest.*` endpoints can be used to create, delete, update, and copy your Slack apps with ease. New endpoints include:

- [`apps.manifest.create`](https://api.slack.com/methods/apps.manifest.create)
- [`apps.manifest.delete`](https://api.slack.com/methods/apps.manifest.delete)
- [`apps.manifest.export`](https://api.slack.com/methods/apps.manifest.export)
- [`apps.manifest.update`](https://api.slack.com/methods/apps.manifest.update)
- [`apps.manifest.validate`](https://api.slack.com/methods/apps.manifest.validate)
- [`tooling.tokens.rotate`](https://api.slack.com/methods/tooling.tokens.rotate)

### Changes
Added support for App Manifest Endpoints  ([#1355](https://github.com/slackapi/node-slack-sdk/issues/1355)) - Thanks, [@misscoded](https://github.com/misscoded)!

[Changes][@slack/web-api@6.4.0-appManifestsBeta.1]


<a name="@slack/oauth@2.3.0"></a>
# [@slack/oauth@2.3.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@2.3.0) - 22 Sep 2021

- Adds an option to disable default state verification during OAuth flow - Thanks [@srajiang](https://github.com/srajiang) and [@seratch](https://github.com/seratch)!
- Better error handling when users cancel installations ([#1186](https://github.com/slackapi/node-slack-sdk/issues/1186), [#1333](https://github.com/slackapi/node-slack-sdk/issues/1333)) - Thanks [@filmaj](https://github.com/filmaj) and [@misscoded](https://github.com/misscoded)!


[Changes][@slack/oauth@2.3.0]


<a name="@slack/web-api@6.4.0"></a>
# [@slack/web-api@6.4.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.4.0) - 19 Aug 2021

* Added Sign in With Slack (OpenID Connect) support ([#1296](https://github.com/slackapi/node-slack-sdk/issues/1296), [#1307](https://github.com/slackapi/node-slack-sdk/issues/1307)) - Thanks [@seratch](https://github.com/seratch) 
* Add Slack Connect APIs response types and tests ([#1284](https://github.com/slackapi/node-slack-sdk/issues/1284), [#1283](https://github.com/slackapi/node-slack-sdk/issues/1283), [#1306](https://github.com/slackapi/node-slack-sdk/issues/1306)) - Thanks, [@srajiang](https://github.com/srajiang) and [@seratch](https://github.com/seratch) 
* Adding "private" property in shares in files API responses ([#1294](https://github.com/slackapi/node-slack-sdk/issues/1294), [#1303](https://github.com/slackapi/node-slack-sdk/issues/1303)) - Thanks, [@seratch](https://github.com/seratch) and [@JeanBarriere](https://github.com/JeanBarriere). 
* Added more info to rate limited error exception message ([#1214](https://github.com/slackapi/node-slack-sdk/issues/1214), [#1312](https://github.com/slackapi/node-slack-sdk/issues/1312)) - Thanks [@seratch](https://github.com/seratch)  
* Updated `admin.users.invite` endpoint ([#1297](https://github.com/slackapi/node-slack-sdk/issues/1297), [#1298](https://github.com/slackapi/node-slack-sdk/issues/1298)) - Thanks [@stevengill](https://github.com/stevengill)!

[Changes][@slack/web-api@6.4.0]


<a name="@slack/types@2.2.0"></a>
# [@slack/types@2.2.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@2.2.0) - 19 Aug 2021

* Split `View` type for improved linting ([#1276](https://github.com/slackapi/node-slack-sdk/issues/1276)) - Thanks [@alexjamesmalcolm](https://github.com/alexjamesmalcolm)!
* Split `Option` into `PlainTextOption` and `MrkdwnOption` ([#1270](https://github.com/slackapi/node-slack-sdk/issues/1270), [#1268](https://github.com/slackapi/node-slack-sdk/issues/1268)) - Thanks, [@rr-codes](https://github.com/rr-codes)!

[Changes][@slack/types@2.2.0]


<a name="@slack/web-api@6.4.0-hermesBeta.1"></a>
# [@slack/web-api@6.4.0-hermesBeta.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.4.0-hermesBeta.1) - 19 Aug 2021

* Adds Message Metadata property to chatPostMessage + chatUpdate ([#1309](https://github.com/slackapi/node-slack-sdk/issues/1309), [#1308](https://github.com/slackapi/node-slack-sdk/issues/1308)) - Thanks, [@srajiang](https://github.com/srajiang) 

[Changes][@slack/web-api@6.4.0-hermesBeta.1]


<a name="@slack/web-api@6.3.0"></a>
# [@slack/web-api@6.3.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.3.0) - 15 Jul 2021

- Add Slack Connect (conversations.\*) and admin.auth.policy.\* support ([#1283](https://github.com/slackapi/node-slack-sdk/issues/1283), [#1284](https://github.com/slackapi/node-slack-sdk/issues/1284)) - Thanks, [@srajiang](https://github.com/srajiang)!
- Updated Web API response types ([#1285](https://github.com/slackapi/node-slack-sdk/issues/1285)) - Thanks, [@seratch](https://github.com/seratch)!
- Added Node 16.x to the CI ([#1249](https://github.com/slackapi/node-slack-sdk/issues/1249)) - Thanks, [@connorads](https://github.com/connorads)!
- Fixed the `PinsAddArguments` and `PinsRemoveArguments` interfaces ([#1277](https://github.com/slackapi/node-slack-sdk/issues/1277)) - Thanks, [@rr-codes](https://github.com/rr-codes)!
- Added support for Axios `timeout` customization ([#1264](https://github.com/slackapi/node-slack-sdk/issues/1264)) - Thanks, [@misscoded](https://github.com/misscoded)!

[Changes][@slack/web-api@6.3.0]


<a name="@slack/oauth@2.2.0"></a>
# [@slack/oauth@2.2.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@2.2.0) - 15 Jul 2021

- Added support for token rotation ([#1287](https://github.com/slackapi/node-slack-sdk/issues/1287)) - Thanks, [@misscoded](https://github.com/misscoded)!
- Added support for `FileInstallationStore` ([#1279](https://github.com/slackapi/node-slack-sdk/issues/1279)) - Thanks, [@misscoded](https://github.com/misscoded)!
- Added support for `deleteInstallation` method off of `InstallationStore` ([#1272](https://github.com/slackapi/node-slack-sdk/issues/1272)) - Thanks, [@misscoded](https://github.com/misscoded)!

[Changes][@slack/oauth@2.2.0]


<a name="@slack/types@2.1.0"></a>
# [@slack/types@2.1.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@2.1.0) - 08 Jun 2021

[#1226](https://github.com/slackapi/node-slack-sdk/issues/1226) Add type support for the time picker block element - Thanks, [@raycharius](https://github.com/raycharius)!
[#1189](https://github.com/slackapi/node-slack-sdk/issues/1189) Fix misspelled words - Thanks, [@seratch](https://github.com/seratch)!

[Changes][@slack/types@2.1.0]


<a name="@slack/interactive-messages@2.0.2"></a>
# [@slack/interactive-messages@2.0.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@2.0.2) - 08 Jun 2021

[#1258](https://github.com/slackapi/node-slack-sdk/issues/1258) Update README + docs with deprecation notice - Thanks, [@misscoded](https://github.com/misscoded)!
[#1194](https://github.com/slackapi/node-slack-sdk/issues/1194) Remove broken CI badges from READMEs - Thanks, [@seratch](https://github.com/seratch)!

[Changes][@slack/interactive-messages@2.0.2]


<a name="@slack/events-api@3.0.1"></a>
# [@slack/events-api@3.0.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/events-api@3.0.1) - 08 Jun 2021

[#1258](https://github.com/slackapi/node-slack-sdk/issues/1258) Update README + docs with deprecation notice - Thanks, [@misscoded](https://github.com/misscoded)!
[#1189](https://github.com/slackapi/node-slack-sdk/issues/1189) Fix misspelled words - Thanks, [@seratch](https://github.com/seratch)!

[Changes][@slack/events-api@3.0.1]


<a name="@slack/oauth@2.1.0"></a>
# [@slack/oauth@2.1.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@2.1.0) - 04 Jun 2021

* [#1187](https://github.com/slackapi/node-slack-sdk/issues/1187) Fix [#1185](https://github.com/slackapi/node-slack-sdk/issues/1185) Add state metadata to Installation interface - Thanks [@misscoded](https://github.com/misscoded) [@seratch](https://github.com/seratch)!
* [#1206](https://github.com/slackapi/node-slack-sdk/issues/1206) Pass logger through to WebClient and fix broken logLevel warning - Thanks [@sommd](https://github.com/sommd)!
* [#1208](https://github.com/slackapi/node-slack-sdk/issues/1208) Resolve inconsistent package dependencies across slack packages - Thanks [@seratch](https://github.com/seratch)!

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/7?closed=1).


[Changes][@slack/oauth@2.1.0]


<a name="@slack/web-api@6.2.4"></a>
# [@slack/web-api@6.2.4](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.2.4) - 03 Jun 2021

* [#1236](https://github.com/slackapi/node-slack-sdk/issues/1236) Fix [#1235](https://github.com/slackapi/node-slack-sdk/issues/1235) ViewsOpenResponse type is incorrect - Thanks [@rr-codes](https://github.com/rr-codes)!
* [#1242](https://github.com/slackapi/node-slack-sdk/issues/1242) Fix [#1240](https://github.com/slackapi/node-slack-sdk/issues/1240) by enabling to pass integer as post_at in chat.scheduleMessage API calls - Thanks [@Zummek](https://github.com/Zummek)!
* [#1252](https://github.com/slackapi/node-slack-sdk/issues/1252) [#1254](https://github.com/slackapi/node-slack-sdk/issues/1254) Changed type of created on UsersConversationsResponse - Thanks [@swaters-atlassian](https://github.com/swaters-atlassian)!
* [#1238](https://github.com/slackapi/node-slack-sdk/issues/1238) [#1247](https://github.com/slackapi/node-slack-sdk/issues/1247) [#1254](https://github.com/slackapi/node-slack-sdk/issues/1254) Update the web-api response types - Thanks [@seratch](https://github.com/seratch)!

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/20?closed=1).


[Changes][@slack/web-api@6.2.4]


<a name="@slack/socket-mode@1.1.0"></a>
# [@slack/socket-mode@1.1.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/socket-mode@1.1.0) - 03 Jun 2021

* Update apps.connections.open API response type in SocketModeClient ([#1234](https://github.com/slackapi/node-slack-sdk/issues/1234)) - Thanks [@seratch](https://github.com/seratch)!
* Correct Socket Mode package README ([#1193](https://github.com/slackapi/node-slack-sdk/issues/1193)) - Thanks [@slifty](https://github.com/slifty)!

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/6?closed=1).


[Changes][@slack/socket-mode@1.1.0]


<a name="@slack/web-api@6.2.3"></a>
# [@slack/web-api@6.2.3](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.2.3) - 11 May 2021

* Enable accessing all response types from @slack/web-api  ([#1232](https://github.com/slackapi/node-slack-sdk/issues/1232)) - Thanks [@seratch](https://github.com/seratch)!
* Update Web API responses - Thanks [@seratch](https://github.com/seratch)!

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/19?closed=1).


[Changes][@slack/web-api@6.2.3]


<a name="@slack/web-api@6.2.2"></a>
# [@slack/web-api@6.2.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.2.2) - 11 May 2021

* Fix invalid types introduced by [#1209](https://github.com/slackapi/node-slack-sdk/issues/1209)  ([#1233](https://github.com/slackapi/node-slack-sdk/issues/1233)) - Thanks [@seratch](https://github.com/seratch)!

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/18?closed=1).


[Changes][@slack/web-api@6.2.2]


<a name="@slack/web-api@6.2.1"></a>
# [@slack/web-api@6.2.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.2.1) - 11 May 2021



[Changes][@slack/web-api@6.2.1]


<a name="@slack/web-api@6.2.0"></a>
# [@slack/web-api@6.2.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.2.0) - 11 May 2021

* Add API response types to web-api methods  ([#1188](https://github.com/slackapi/node-slack-sdk/issues/1188) [#1203](https://github.com/slackapi/node-slack-sdk/issues/1203) [#1215](https://github.com/slackapi/node-slack-sdk/issues/1215)) - Thanks [@seratch](https://github.com/seratch)!
* Add a few missing ones and types to WebClient arguments ([#1209](https://github.com/slackapi/node-slack-sdk/issues/1209)) - Thanks [@seratch](https://github.com/seratch)!
* Fix [#1192](https://github.com/slackapi/node-slack-sdk/issues/1192) Add admin.users.session.* API support ([#1198](https://github.com/slackapi/node-slack-sdk/issues/1198)) - Thanks [@seratch](https://github.com/seratch)!
* Fix [#1195](https://github.com/slackapi/node-slack-sdk/issues/1195) Make text arg optional in chat.* methods ([#1197](https://github.com/slackapi/node-slack-sdk/issues/1197)) - Thanks [@seratch](https://github.com/seratch)!
* Make text optional in chat.postMessage arguments and add warn logging if it's missing ([#1173](https://github.com/slackapi/node-slack-sdk/issues/1173)) - Thanks [@kentac55](https://github.com/kentac55)!
* Pass logger through to WebClient and fix broken logLevel warning ([#1206](https://github.com/slackapi/node-slack-sdk/issues/1206)) - Thanks [@sommd](https://github.com/sommd)!
* Fix required parameters in chat.update method ([#1063](https://github.com/slackapi/node-slack-sdk/issues/1063))  - Thanks [@dginovker](https://github.com/dginovker)!
* Warn logging if thread_ts is not a string ([#1223](https://github.com/slackapi/node-slack-sdk/issues/1223)) - Thanks [@hi1280](https://github.com/hi1280)!
* Added exclusion logic for Electron based apps to prevent changing User-Agent header  ([#1220](https://github.com/slackapi/node-slack-sdk/issues/1220)) - Thanks [@5tarlxrd](https://github.com/5tarlxrd)!
* Resolve inconsistent package dependencies across slack packages ([#1208](https://github.com/slackapi/node-slack-sdk/issues/1208)) - Thanks [@seratch](https://github.com/seratch)!
* Add integration tests with real Slack servers ([#1200](https://github.com/slackapi/node-slack-sdk/issues/1200)) - Thanks [@seratch](https://github.com/seratch)!
* Add a unit test verifying [#1037](https://github.com/slackapi/node-slack-sdk/issues/1037) is no longer an issue ([#1204](https://github.com/slackapi/node-slack-sdk/issues/1204)) - Thanks [@seratch](https://github.com/seratch) 

See the full list of issues/pull requests of this release [here](https://github.com/slackapi/node-slack-sdk/milestone/18?closed=1).

[Changes][@slack/web-api@6.2.0]


<a name="@slack/web-api@6.1.0"></a>
# [@slack/web-api@6.1.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.1.0) - 09 Mar 2021

- Add new `user_auth_blocks` property to `chat.unfurl` ([#1174](https://github.com/slackapi/node-slack-sdk/issues/1174)) - Thanks [@pichsenmeister](https://github.com/pichsenmeister)!

[Changes][@slack/web-api@6.1.0]


<a name="@slack/socket-mode@1.0.2"></a>
# [@slack/socket-mode@1.0.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/socket-mode@1.0.2) - 09 Mar 2021

- Improved debug logging (https://github.com/slackapi/node-slack-sdk/pull/1175) - Thanks [@seratch](https://github.com/seratch)!

[Changes][@slack/socket-mode@1.0.2]


<a name="@slack/interactive-messages@2.0.1"></a>
# [@slack/interactive-messages@2.0.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@2.0.1) - 09 Mar 2021

- Clear timer when input promise resolves before time runs out ([#1180](https://github.com/slackapi/node-slack-sdk/issues/1180) [#1181](https://github.com/slackapi/node-slack-sdk/issues/1181)) - Thanks [@oshchyhol](https://github.com/oshchyhol)!

[Changes][@slack/interactive-messages@2.0.1]


<a name="@slack/socket-mode@1.0.1"></a>
# [@slack/socket-mode@1.0.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/socket-mode@1.0.1) - 26 Jan 2021

* fixed **socketMode** error with incorrect `appToken` not being properly thrown ([#1156](https://github.com/slackapi/node-slack-sdk/issues/1156), [#1161](https://github.com/slackapi/node-slack-sdk/issues/1161)) - thanks [@stevengill](https://github.com/stevengill), [@g12i](https://github.com/g12i)
* fixed passing in an agent to WebSocket in a proper way ([#1162](https://github.com/slackapi/node-slack-sdk/issues/1162)) - thanks [@g12i](https://github.com/g12i) 

[Changes][@slack/socket-mode@1.0.1]


<a name="@slack/oauth@2.0.1"></a>
# [@slack/oauth@2.0.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@2.0.1) - 26 Jan 2021

* fixed `@slack/oauth` failing when no bot scopes (only user scopes) are requested ([#1158](https://github.com/slackapi/node-slack-sdk/issues/1158), [#1163](https://github.com/slackapi/node-slack-sdk/issues/1163)) - thanks [@stevengill](https://github.com/stevengill), [@KhushrajRathod](https://github.com/KhushrajRathod)

[Changes][@slack/oauth@2.0.1]


<a name="@slack/webhook@6.0.0"></a>
# [@slack/webhook@6.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/webhook@6.0.0) - 12 Jan 2021

* Updated minimum Nodejs version to 12.13.0, updated minimum TypeScript version to 4.1 ([#1146](https://github.com/slackapi/node-slack-sdk/issues/1146), [#1147](https://github.com/slackapi/node-slack-sdk/issues/1147)) - thanks [@stevengill](https://github.com/stevengill)

[Changes][@slack/webhook@6.0.0]


<a name="@slack/web-api@6.0.0"></a>
# [@slack/web-api@6.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@6.0.0) - 12 Jan 2021

* Updated minimum Nodejs version to 12.13.0, updated minimum TypeScript version to 4.1 ([#1146](https://github.com/slackapi/node-slack-sdk/issues/1146), [#1147](https://github.com/slackapi/node-slack-sdk/issues/1147)) - thanks [@stevengill](https://github.com/stevengill)
* Added [apps.connections.open](https://api.slack.com/methods/apps.connections.open) method ([#1096](https://github.com/slackapi/node-slack-sdk/issues/1096)) - thanks [@stevengill](https://github.com/stevengill) 

[Changes][@slack/web-api@6.0.0]


<a name="@slack/types@2.0.0"></a>
# [@slack/types@2.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@2.0.0) - 12 Jan 2021

* Updated minimum Nodejs version to 12.13.0, updated minimum TypeScript version to 4.1 ([#1146](https://github.com/slackapi/node-slack-sdk/issues/1146), [#1147](https://github.com/slackapi/node-slack-sdk/issues/1147)) - thanks [@stevengill](https://github.com/stevengill)

[Changes][@slack/types@2.0.0]


<a name="@slack/socket-mode@1.0.0"></a>
# [@slack/socket-mode@1.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/socket-mode@1.0.0) - 12 Jan 2021

* Released the new `@slack/socket-mode` package 🎉 !  This package is designed to support [**Socket Mode**](https://api.slack.com/socket-mode), which allows your app to receive events from Slack over a WebSocket connection. To learn more about **Socket Mode**, checkout the [release blog post](https://medium.com/slack-developer-blog/socket-to-me-3d122f96d955) ([#1096](https://github.com/slackapi/node-slack-sdk/issues/1096)) - thanks [@stevengill](https://github.com/stevengill) 

[Changes][@slack/socket-mode@1.0.0]


<a name="@slack/rtm-api@6.0.0"></a>
# [@slack/rtm-api@6.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/rtm-api@6.0.0) - 12 Jan 2021

* Updated minimum Nodejs version to 12.13.0, updated minimum TypeScript version to 4.1 ([#1146](https://github.com/slackapi/node-slack-sdk/issues/1146), [#1147](https://github.com/slackapi/node-slack-sdk/issues/1147)) - thanks [@stevengill](https://github.com/stevengill)

[Changes][@slack/rtm-api@6.0.0]


<a name="@slack/oauth@2.0.0"></a>
# [@slack/oauth@2.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@2.0.0) - 12 Jan 2021

* Updated minimum Nodejs version to 12.13.0, updated minimum TypeScript version to 4.1 ([#1146](https://github.com/slackapi/node-slack-sdk/issues/1146), [#1147](https://github.com/slackapi/node-slack-sdk/issues/1147)) - thanks [@stevengill](https://github.com/stevengill)
* **Breaking**: Removed `fetchOrgInstallation` and `storeOrgInstallation` methods from the `InstallationStore`. See our [migration guide](https://slack.dev/node-slack-sdk/tutorials/migrating-to-v6) for more details on how to support [org wide app installations](https://api.slack.com/enterprise/apps). ([#1133](https://github.com/slackapi/node-slack-sdk/issues/1133), [#1148](https://github.com/slackapi/node-slack-sdk/issues/1148)) - thanks [@stevengill](https://github.com/stevengill) 

[Changes][@slack/oauth@2.0.0]


<a name="@slack/logger@3.0.0"></a>
# [@slack/logger@3.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/logger@3.0.0) - 12 Jan 2021

* Updated minimum Nodejs version to 12.13.0, updated minimum TypeScript version to 4.1 ([#1146](https://github.com/slackapi/node-slack-sdk/issues/1146), [#1147](https://github.com/slackapi/node-slack-sdk/issues/1147)) - thanks [@stevengill](https://github.com/stevengill)

[Changes][@slack/logger@3.0.0]


<a name="@slack/interactive-messages@2.0.0"></a>
# [@slack/interactive-messages@2.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@2.0.0) - 12 Jan 2021

* Updated minimum Nodejs version to 12.13.0, updated minimum TypeScript version to 4.1 ([#1146](https://github.com/slackapi/node-slack-sdk/issues/1146), [#1147](https://github.com/slackapi/node-slack-sdk/issues/1147)) - thanks [@stevengill](https://github.com/stevengill)

This package is now deprecated. Please consider migration over to [Bolt for JavaScript](https://slack.dev/bolt-js). See our [migration guide](https://slack.dev/node-slack-sdk/tutorials/migrating-to-v6) for more details.

[Changes][@slack/interactive-messages@2.0.0]


<a name="@slack/events-api@3.0.0"></a>
# [@slack/events-api@3.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/events-api@3.0.0) - 12 Jan 2021

* Updated minimum Nodejs version to 12.13.0, updated minimum TypeScript version to 4.1 ([#1146](https://github.com/slackapi/node-slack-sdk/issues/1146), [#1147](https://github.com/slackapi/node-slack-sdk/issues/1147)) - thanks [@stevengill](https://github.com/stevengill)

This package is now deprecated. Please consider migration over to [Bolt for JavaScript](https://slack.dev/bolt-js). See our [migration guide](https://slack.dev/node-slack-sdk/tutorials/migrating-to-v6) for more details.


[Changes][@slack/events-api@3.0.0]


<a name="@slack/webhook@5.0.4"></a>
# [@slack/webhook@5.0.4](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/webhook@5.0.4) - 05 Jan 2021

* Updated `axios` dependency to fix security issue ([#1140](https://github.com/slackapi/node-slack-sdk/issues/1140), [#1141](https://github.com/slackapi/node-slack-sdk/issues/1141)) - Thanks [@mlarraz](https://github.com/mlarraz)

[Changes][@slack/webhook@5.0.4]


<a name="@slack/web-api@5.15.0"></a>
# [@slack/web-api@5.15.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.15.0) - 05 Jan 2021

* Updated axios dependency to fix security issue ([#1142](https://github.com/slackapi/node-slack-sdk/issues/1142)) - Thanks [@stevengill](https://github.com/stevengill)
* Added `auth.teams.list` api method ([#1137](https://github.com/slackapi/node-slack-sdk/issues/1137), [#1139](https://github.com/slackapi/node-slack-sdk/issues/1139)) - Thanks [@stevengill](https://github.com/stevengill), [@daveagill](https://github.com/daveagill)
* Added support for `admin.barriers.*` methods ([#1126](https://github.com/slackapi/node-slack-sdk/issues/1126), [#1127](https://github.com/slackapi/node-slack-sdk/issues/1127)) - Thanks [@misscoded](https://github.com/misscoded) 
* Migrated CI over to GitHub Actions (https://github.com/slackapi/node-slack-sdk/pull/1129) - Thanks [@stevengill](https://github.com/stevengill) 





[Changes][@slack/web-api@5.15.0]


<a name="@slack/interactive-messages@1.7.1"></a>
# [@slack/interactive-messages@1.7.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@1.7.1) - 05 Jan 2021

* Updated axios dependency to fix security issue ([#1144](https://github.com/slackapi/node-slack-sdk/issues/1144)) - Thanks [@stevengill](https://github.com/stevengill)

[Changes][@slack/interactive-messages@1.7.1]


<a name="@slack/web-api@5.14.0"></a>
# [@slack/web-api@5.14.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.14.0) - 01 Dec 2020

* added support for [org wide app installations](https://api.slack.com/enterprise/apps). This includes adding `team_id` as an optional argument to [various web-api methods](https://api.slack.com/enterprise/apps/changes-apis#methods) and adding `team_id` as an optional parameter to `WebClientOptions` so it will be automatically passed along to any web-api calls being made. ([#1046](https://github.com/slackapi/node-slack-sdk/issues/1046)) - Thanks [@stevengill](https://github.com/stevengill) 
* Update `ViewsUpdateArguments` to accommodate `external_id` and `view_id` ([#1002](https://github.com/slackapi/node-slack-sdk/issues/1002), [#1116](https://github.com/slackapi/node-slack-sdk/issues/1116)) - thanks [@misscoded](https://github.com/misscoded) 
* Added [`admin.users.session.list`](https://api.slack.com/methods/admin.users.session.list) method ([#1111](https://github.com/slackapi/node-slack-sdk/issues/1111)) - thanks [@stevengill](https://github.com/stevengill) 

[Changes][@slack/web-api@5.14.0]


<a name="@slack/oauth@1.4.0"></a>
# [@slack/oauth@1.4.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@1.4.0) - 26 Nov 2020

* Added support for the upcoming org wide installation feature ([#1046](https://github.com/slackapi/node-slack-sdk/issues/1046))! This new release introduces two new optional methods to the `installationStore`, `fetchOrgInstallation` and `storeOrgInstallation`. It is recommended adding these methods to your custom `installationStores` if you wish to support org wide installations. Checkout our [docs](https://slack.dev/node-slack-sdk/oauth#storing-installations-in-a-database) to learn more!

[Changes][@slack/oauth@1.4.0]


<a name="@slack/web-api@5.13.0"></a>
# [@slack/web-api@5.13.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.13.0) - 22 Oct 2020

Added the following API method:

- [admin.conversations.archive](https://api.slack.com/methods/admin.conversations.archive)
- [admin.conversations.convertToPrivate](https://api.slack.com/methods/admin.conversations.convertToPrivate)
- [admin.conversations.create](https://api.slack.com/methods/admin.conversations.create)
- [admin.conversations.delete](https://api.slack.com/methods/admin.conversations.delete)
- [admin.conversations.disconnectShared](https://api.slack.com/methods/admin.conversations.disconnectShared)
- [admin.conversations.ekm.listOriginalConnectedChannelInfo](https://api.slack.com/methods/admin.conversations.ekm.listOriginalConnectedChannelInfo)
- [admin.conversations.getConversationPrefs](https://api.slack.com/methods/admin.conversations.getConversationPrefs)
- [admin.conversations.getTeams](https://api.slack.com/methods/admin.conversations.getTeams)
- [admin.conversations.invite](https://api.slack.com/methods/admin.conversations.invite)
- [admin.conversations.rename](https://api.slack.com/methods/admin.conversations.rename)
- [admin.conversations.search](https://api.slack.com/methods/admin.conversations.search)
- [admin.conversations.setConversationPrefs](https://api.slack.com/methods/admin.conversations.setConversationPrefs)
- [admin.conversations.unarchive](https://api.slack.com/methods/admin.conversations.unarchive)
- [admin.emoji.add](https://api.slack.com/methods/admin.emoji.add)
- [admin.emoji.addAlias](https://api.slack.com/methods/admin.emoji.addAlias)
- [admin.emoji.list](https://api.slack.com/methods/admin.emoji.list)
- [admin.emoji.remove](https://api.slack.com/methods/admin.emoji.remove)
- [admin.emoji.rename](https://api.slack.com/methods/admin.emoji.rename)
- [admin.users.session.invalidate](https://api.slack.com/methods/admin.users.session.invalidate)
- [apps.event.authorizations.list](https://api.slack.com/methods/apps.event.authorizations.list)
- [apps.uninstall](https://api.slack.com/methods/apps.uninstall)

([#1093](https://github.com/slackapi/node-slack-sdk/issues/1093), [#1098](https://github.com/slackapi/node-slack-sdk/issues/1098), [#1099](https://github.com/slackapi/node-slack-sdk/issues/1099)) - thanks [@stevengill](https://github.com/stevengill), [@cjdenio](https://github.com/cjdenio) & [@mwbrooks](https://github.com/mwbrooks) 

[Changes][@slack/web-api@5.13.0]


<a name="@slack/types@1.10.0"></a>
# [@slack/types@1.10.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@1.10.0) - 22 Oct 2020

* Added `dispatch_action`property to input blocks ([#1102](https://github.com/slackapi/node-slack-sdk/issues/1102)) - Thanks [@stevengill](https://github.com/stevengill) 
* Added `dispatch_action_config` property to `PlainTextInput` ([#1108](https://github.com/slackapi/node-slack-sdk/issues/1108), [#1109](https://github.com/slackapi/node-slack-sdk/issues/1109)) - Thanks [@stevengill](https://github.com/stevengill) 


[Changes][@slack/types@1.10.0]


<a name="@slack/oauth@1.3.0"></a>
# [@slack/oauth@1.3.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@1.3.0) - 22 Oct 2020

* added missing `user_id` to oauth v1 responses ([#1103](https://github.com/slackapi/node-slack-sdk/issues/1103), [#1105](https://github.com/slackapi/node-slack-sdk/issues/1105)) - thanks [@lasseschou](https://github.com/lasseschou) and [@stevengill](https://github.com/stevengill) 

[Changes][@slack/oauth@1.3.0]


<a name="@slack/web-api@5.12.0"></a>
# [@slack/web-api@5.12.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.12.0) - 14 Sep 2020

* Adds new Web API methods as part of the [Workflow Steps from Apps](https://api.slack.com/tutorials/workflow-builder-steps) functionality ([#1094](https://github.com/slackapi/node-slack-sdk/issues/1094)) - thanks [@misscoded](https://github.com/misscoded). **NOTE:** This feature is currently in open beta, and some details may change between now and when the beta is complete.
  - [`workflows.stepCompleted`](https://api.slack.com/methods/workflows.stepCompleted)
  - [`workflows.stepFailed`](https://api.slack.com/methods/workflows.stepFailed)
  - [`workflows.updateStep`](https://api.slack.com/methods/workflows.updateStep)

[Changes][@slack/web-api@5.12.0]


<a name="@slack/types@1.9.0"></a>
# [@slack/types@1.9.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@1.9.0) - 14 Sep 2020

* Updates `View` to include the new possible value for the `type` property, `workflow_step` ([#1094](https://github.com/slackapi/node-slack-sdk/issues/1094), [#1076](https://github.com/slackapi/node-slack-sdk/issues/1076)) - thanks [@misscoded](https://github.com/misscoded), [@selfcontained](https://github.com/selfcontained) 
* Adds missing properties of `View`: `submit_disabled` and `external_id`. ([#1094](https://github.com/slackapi/node-slack-sdk/issues/1094)) - thanks [@misscoded](https://github.com/misscoded) 

[Changes][@slack/types@1.9.0]


<a name="@slack/types@1.8.0-workflowStepsBeta.2"></a>
# [@slack/types@1.8.0-workflowStepsBeta.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@1.8.0-workflowStepsBeta.2) - 21 Aug 2020

This release includes a minor addition to the [Workflow Steps from Apps](https://medium.com/slack-developer-blog/stickier-slack-apps-with-workflow-steps-68f24ce48311) beta. 🎉 

- Added `external_id` to `View` interface ([#1085](https://github.com/slackapi/node-slack-sdk/issues/1085)) - Thanks, [@misscoded](https://github.com/misscoded)!

[Changes][@slack/types@1.8.0-workflowStepsBeta.2]


<a name="@slack/oauth@1.2.0"></a>
# [@slack/oauth@1.2.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@1.2.0) - 20 Aug 2020

* Added `clientOptions` and `authorizationUrl` as options that `@slack/oauth` accepts. `clientOptions` is passed along to `@slack/web-api`. `authorizationUrl` is used to override the authorization endpoint this library uses (default is `https://slack.com/oauth/v2/authorize` ([#1055](https://github.com/slackapi/node-slack-sdk/issues/1055), [#1081](https://github.com/slackapi/node-slack-sdk/issues/1081)) - Thanks [@stevengill](https://github.com/stevengill) 

[Changes][@slack/oauth@1.2.0]


<a name="@slack/web-api@5.11.0-workflowStepsBeta.1"></a>
# [@slack/web-api@5.11.0-workflowStepsBeta.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.11.0-workflowStepsBeta.1) - 17 Aug 2020

This release includes additions to the [Workflow Steps from Apps](https://medium.com/slack-developer-blog/stickier-slack-apps-with-workflow-steps-68f24ce48311) beta. 🎉 

Updated `@slack/types` dependency

[Changes][@slack/web-api@5.11.0-workflowStepsBeta.1]


<a name="@slack/types@1.8.0-workflowStepsBeta.1"></a>
# [@slack/types@1.8.0-workflowStepsBeta.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@1.8.0-workflowStepsBeta.1) - 17 Aug 2020

This release includes additions to the [Workflow Steps from Apps](https://medium.com/slack-developer-blog/stickier-slack-apps-with-workflow-steps-68f24ce48311) beta. 🎉 

- Added methods ([#1076](https://github.com/slackapi/node-slack-sdk/issues/1076)) - Thanks, [@selfcontained](https://github.com/selfcontained)! 
    - Add a type value for the new `workflow_step` view type

[Changes][@slack/types@1.8.0-workflowStepsBeta.1]


<a name="@slack/types@1.8.0"></a>
# [@slack/types@1.8.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@1.8.0) - 07 Aug 2020

- Added header block support to types ([#1066](https://github.com/slackapi/node-slack-sdk/issues/1066), [#1068](https://github.com/slackapi/node-slack-sdk/issues/1068)) - Thanks [@ifvictr](https://github.com/ifvictr) + [@seratch](https://github.com/seratch)!

[Changes][@slack/types@1.8.0]


<a name="@slack/events-api@2.3.4"></a>
# [@slack/events-api@2.3.4](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/events-api@2.3.4) - 07 Aug 2020

- Added check that headers exist before calling `verifySignature` ([#1069](https://github.com/slackapi/node-slack-sdk/issues/1069), [#1070](https://github.com/slackapi/node-slack-sdk/issues/1070)) - Thanks to first-time contributor [@ramsgoli](https://github.com/ramsgoli)!

[Changes][@slack/events-api@2.3.4]


<a name="@slack/web-api@5.11.0"></a>
# [@slack/web-api@5.11.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.11.0) - 20 Jul 2020

- Added new web-api methods ([#1047](https://github.com/slackapi/node-slack-sdk/issues/1047), [#1049](https://github.com/slackapi/node-slack-sdk/issues/1049), [#1045](https://github.com/slackapi/node-slack-sdk/issues/1045) ) - Thanks, [@kian2attari](https://github.com/kian2attari) + [@clavin](https://github.com/clavin)!
   - [admin.conversations.restrictAccess.addGroup](https://api.slack.com/methods/admin.conversations.restrictAccess.addGroup)
   - [admin.conversations.restrictAccess.listGroups](https://api.slack.com/methods/admin.conversations.restrictAccess.listGroups)
   - [admin.conversations.restrictAccess.removeGroup](https://api.slack.com/methods/admin.conversations.restrictAccess.removeGroup)
   - [conversations.mark](https://api.slack.com/methods/conversations.mark)
   - [calls.participants.remove](https://api.slack.com/methods/calls.participants.remove)
   - [admin.usergroups.addTeams](https://api.slack.com/methods/admin.usergroups.addTeams)
- Deprecated `admin.conversations.whitelist.*` methods ([#1048](https://github.com/slackapi/node-slack-sdk/issues/1048), [#1050](https://github.com/slackapi/node-slack-sdk/issues/1050)) - Thanks, [@kian2attari](https://github.com/kian2attari)!
- Change `paginate` return type to `AsyncIterable` ([#1040](https://github.com/slackapi/node-slack-sdk/issues/1040), [#779](https://github.com/slackapi/node-slack-sdk/issues/779)) - Thanks, [@clavin](https://github.com/clavin)!
- Add error to `Methods` superclass ([#1036](https://github.com/slackapi/node-slack-sdk/issues/1036), [#1042](https://github.com/slackapi/node-slack-sdk/issues/1042)) - Thanks, [@clavin](https://github.com/clavin)!
- Move method bindings from `WebClient.ts` to `methods.ts` ([#1036](https://github.com/slackapi/node-slack-sdk/issues/1036)) - Thanks, [@clavin](https://github.com/clavin)!


[Changes][@slack/web-api@5.11.0]


<a name="@slack/web-api@5.10.0-workflowStepsBeta.1"></a>
# [@slack/web-api@5.10.0-workflowStepsBeta.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.10.0-workflowStepsBeta.1) - 20 Jul 2020

This release is for the [Workflow Steps from Apps](https://medium.com/slack-developer-blog/stickier-slack-apps-with-workflow-steps-68f24ce48311) beta. 🎉 

- Added methods ([#1056](https://github.com/slackapi/node-slack-sdk/issues/1056)) - Thanks, [@misscoded](https://github.com/misscoded)! 
    - [workflows.stepCompleted](https://api.slack.com/methods/workflows.stepCompleted)
    - [workflows.stepFailed](https://api.slack.com/methods/workflows.stepFailed)
    - [workflows.updateStep](https://api.slack.com/methods/workflows.updateStep)

[Changes][@slack/web-api@5.10.0-workflowStepsBeta.1]


<a name="@slack/web-api@5.10.0"></a>
# [@slack/web-api@5.10.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.10.0) - 05 Jun 2020

- Added [calls API](https://api.slack.com/apis/calls) support ([#1021](https://github.com/slackapi/node-slack-sdk/issues/1021), [#1026](https://github.com/slackapi/node-slack-sdk/issues/1026)) - Thanks [@stevengill](https://github.com/stevengill) 

[Changes][@slack/web-api@5.10.0]


<a name="@slack/types@1.7.0"></a>
# [@slack/types@1.7.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@1.7.0) - 05 Jun 2020

- Added [calls API](https://api.slack.com/apis/calls) support ([#1021](https://github.com/slackapi/node-slack-sdk/issues/1021), [#1026](https://github.com/slackapi/node-slack-sdk/issues/1026)) - Thanks [@stevengill](https://github.com/stevengill)
- Added `default_to_current_conversation` field to `conversations_select` and `multi_conversations_select` ([#1029](https://github.com/slackapi/node-slack-sdk/issues/1029), [#1030](https://github.com/slackapi/node-slack-sdk/issues/1030)) - Thanks [@seratch](https://github.com/seratch) 
- Added `style` field to `Confirm` interface ([#1022](https://github.com/slackapi/node-slack-sdk/issues/1022), [#1023](https://github.com/slackapi/node-slack-sdk/issues/1023)) - Thanks [@seratch](https://github.com/seratch) 

[Changes][@slack/types@1.7.0]


<a name="@slack/rtm-api@5.0.5"></a>
# [@slack/rtm-api@5.0.5](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/rtm-api@5.0.5) - 05 Jun 2020

- Updated `types/ws` dependency to fix failing tests ([#1024](https://github.com/slackapi/node-slack-sdk/issues/1024), [#1034](https://github.com/slackapi/node-slack-sdk/issues/1034)) - Thanks [@stevengill](https://github.com/stevengill) 

[Changes][@slack/rtm-api@5.0.5]


<a name="@slack/web-api@5.9.0"></a>
# [@slack/web-api@5.9.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.9.0) - 20 May 2020

- Add `admin.usergroups.*` APIs for Grid org admins (https://github.com/slackapi/node-slack-sdk/pull/1015) - Thanks [@seratch](https://github.com/seratch) 

[Changes][@slack/web-api@5.9.0]


<a name="@slack/oauth@1.1.0"></a>
# [@slack/oauth@1.1.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@1.1.0) - 20 May 2020

* Fixed `enterprise` field not being populated in `installation` object (https://github.com/slackapi/node-slack-sdk/pull/1020) - Thanks [@stevengill](https://github.com/stevengill) 
* Improved OAuth success user experience flow (https://github.com/slackapi/node-slack-sdk/pull/1011) - Thanks [@stevengill](https://github.com/stevengill) 
* Updated OAuth examples and copyright date (https://github.com/slackapi/node-slack-sdk/pull/1006) - Thanks [@marks](https://github.com/marks)!

[Changes][@slack/oauth@1.1.0]


<a name="@slack/events-api@2.3.3"></a>
# [@slack/events-api@2.3.3](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/events-api@2.3.3) - 20 May 2020

- Updated `yargs` dependency due to a security issue (https://github.com/slackapi/node-slack-sdk/pull/1008) - Thanks [@shlasouski](https://github.com/shlasouski)

[Changes][@slack/events-api@2.3.3]


<a name="@slack/web-api@5.8.1"></a>
# [@slack/web-api@5.8.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.8.1) - 29 Apr 2020

* Added package prefix to logger name ([#995](https://github.com/slackapi/node-slack-sdk/issues/995), [#999](https://github.com/slackapi/node-slack-sdk/issues/999)) - thanks [@stevengill](https://github.com/stevengill), [@seratch](https://github.com/seratch) 
* Added warnings for [deprecated methods](https://api.slack.com/changelog/2020-01-deprecating-antecedents-to-the-conversations-api) ([#992](https://github.com/slackapi/node-slack-sdk/issues/992)) - thanks [@stevengill](https://github.com/stevengill) 

[Changes][@slack/web-api@5.8.1]


<a name="@slack/types@1.6.0"></a>
# [@slack/types@1.6.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@1.6.0) - 29 Apr 2020

* Support `checkboxes` block element in input block for TypeScript users. ([#993](https://github.com/slackapi/node-slack-sdk/issues/993), [#994](https://github.com/slackapi/node-slack-sdk/issues/994)) - thanks [@yoichiro](https://github.com/yoichiro)  
* Support `radio_buttons` block element in input block for TypeScript users ([#979](https://github.com/slackapi/node-slack-sdk/issues/979), [#980](https://github.com/slackapi/node-slack-sdk/issues/980)) - thanks [@seratch](https://github.com/seratch)

[Changes][@slack/types@1.6.0]


<a name="@slack/rtm-api@5.0.4"></a>
# [@slack/rtm-api@5.0.4](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/rtm-api@5.0.4) - 29 Apr 2020

* Added package prefix to logger name ([#995](https://github.com/slackapi/node-slack-sdk/issues/995), [#999](https://github.com/slackapi/node-slack-sdk/issues/999)) - thanks [@stevengill](https://github.com/stevengill), [@seratch](https://github.com/seratch)

[Changes][@slack/rtm-api@5.0.4]


<a name="@slack/oauth@1.0.0"></a>
# [@slack/oauth@1.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/oauth@1.0.0) - 30 Apr 2020

This is the first release of our new @slack/oauth package! Slack apps that are installed in multiple workspaces, like in the App Directory or in an Enterprise Grid, will need to implement OAuth and store information about each of those installations.

* Supports [V2 OAuth](https://api.slack.com/authentication/oauth-v2) for Slack Apps as well as [V1 OAuth](https://api.slack.com/docs/oauth) for [Classic Slack apps](https://api.slack.com/authentication/quickstart).
* Includes a pluggable interface to easily hook in your own database to save and fetch installation data (like tokens).
* Handles state generation and state verification
* Has a method for creating "Add to Slack" buttons for direct installs
* Redirects back to the Slack app after the installation flow completes

Make sure to checkout the [docs](https://slack.dev/node-slack-sdk/oauth) and our [OAuth Express example app](https://github.com/slackapi/node-slack-sdk/tree/master/examples/oauth-v1) to learn more!

Issue: [#950](https://github.com/slackapi/node-slack-sdk/issues/950)
PR: [#963](https://github.com/slackapi/node-slack-sdk/issues/963)

Thanks [@stevengill](https://github.com/stevengill), [@aoberoi](https://github.com/aoberoi), [@seratch](https://github.com/seratch) and [@shaydewael](https://github.com/shaydewael)!


[Changes][@slack/oauth@1.0.0]


<a name="@slack/interactive-messages@1.6.0"></a>
# [@slack/interactive-messages@1.6.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@1.6.0) - 29 Apr 2020

* Added new `.shortcut` method to support global shortcuts ([#984](https://github.com/slackapi/node-slack-sdk/issues/984), [#985](https://github.com/slackapi/node-slack-sdk/issues/985)) - thanks [@stevengill](https://github.com/stevengill)
* Improved code sample in interactive-messages docs ([#986](https://github.com/slackapi/node-slack-sdk/issues/986), [#987](https://github.com/slackapi/node-slack-sdk/issues/987)) - thanks [@seratch](https://github.com/seratch)

[Changes][@slack/interactive-messages@1.6.0]


<a name="@slack/types@1.5.0"></a>
# [@slack/types@1.5.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@1.5.0) - 18 Mar 2020

* Add filter objects on `conversations_select` and `conversations_multi_select` ([#976](https://github.com/slackapi/node-slack-sdk/issues/976)) - thanks [@shaydewael](https://github.com/shaydewael)
* Add `MrkdwnElement` to `text` on `Option` - thanks [@tteltrab](https://github.com/tteltrab) 

[Changes][@slack/types@1.5.0]


<a name="@slack/webhook@5.0.3"></a>
# [@slack/web-hook@5.3.0 (@slack/webhook@5.0.3)](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/webhook@5.0.3) - 03 Mar 2020

* Update security issue due to outdated `axios` dependency. ([#955](https://github.com/slackapi/node-slack-sdk/issues/955), [#959](https://github.com/slackapi/node-slack-sdk/issues/959)) - Thanks [@seratch](https://github.com/seratch) 

[Changes][@slack/webhook@5.0.3]


<a name="@slack/web-api@5.8.0"></a>
# [@slack/web-api@5.8.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.8.0) - 03 Mar 2020

* Update security issue due to outdated `axios` dependency. ([#955](https://github.com/slackapi/node-slack-sdk/issues/955), [#959](https://github.com/slackapi/node-slack-sdk/issues/959)) - Thanks [@seratch](https://github.com/seratch)
* Surface up error message from platform api calls ([#946](https://github.com/slackapi/node-slack-sdk/issues/946), [#945](https://github.com/slackapi/node-slack-sdk/issues/945)) - Thanks [@stevengill](https://github.com/stevengill) 


[Changes][@slack/web-api@5.8.0]


<a name="@slack/types@1.4.0"></a>
# [@slack/types@1.4.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@1.4.0) - 03 Mar 2020

* Added types for radio buttons and checkboxes ([#964](https://github.com/slackapi/node-slack-sdk/issues/964), [#966](https://github.com/slackapi/node-slack-sdk/issues/966)) - Thanks [@seratch](https://github.com/seratch) 

[Changes][@slack/types@1.4.0]


<a name="@slack/interactive-messages@1.5.0"></a>
# [@slack/interactive-messages@1.5.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@1.5.0) - 03 Mar 2020

* Update security issue due to outdated axios dependency. ([#955](https://github.com/slackapi/node-slack-sdk/issues/955), [#959](https://github.com/slackapi/node-slack-sdk/issues/959)) - Thanks [@seratch](https://github.com/seratch)
* Add types field to package.json ([#919](https://github.com/slackapi/node-slack-sdk/issues/919)) - Thanks [@G-Rath](https://github.com/G-Rath)
* Fix `viewSubmission` callbackId constraint error ([#910](https://github.com/slackapi/node-slack-sdk/issues/910), [#947](https://github.com/slackapi/node-slack-sdk/issues/947)) - Thanks [@pichsenmeister](https://github.com/pichsenmeister) 

[Changes][@slack/interactive-messages@1.5.0]


<a name="@slack/events-api@2.3.2"></a>
# [@slack/events-api@2.3.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/events-api@2.3.2) - 03 Mar 2020

* Fix TypeScript build failure related to EventEmitter types ([#951](https://github.com/slackapi/node-slack-sdk/issues/951), [#958](https://github.com/slackapi/node-slack-sdk/issues/958)) - Thanks [@seratch](https://github.com/seratch) 
* Minor docs improvements ([#956](https://github.com/slackapi/node-slack-sdk/issues/956)) - Thanks [@mlnchk](https://github.com/mlnchk) 
* Add `types` field to `package.json` ([#918](https://github.com/slackapi/node-slack-sdk/issues/918)) - Thanks [@G-Rath](https://github.com/G-Rath) 

[Changes][@slack/events-api@2.3.2]


<a name="@slack/web-api@5.7.0"></a>
# [@slack/web-api@5.7.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.7.0) - 15 Jan 2020

* Added new `admin.*` APIs ([#942](https://github.com/slackapi/node-slack-sdk/issues/942)). Thanks [@stevengill](https://github.com/stevengill)! These include:
  * [`admin.apps.approved.list`](https://api.slack.com/methods/admin.apps.approved.list)
  * [`admin.apps.restricted.list`](https://api.slack.com/methods/admin.apps.restricted.list)
  * [`admin.conversations.setTeams`](https://api.slack.com/methods/admin.conversations.setTeams)
  * [`admin.teams.create`](https://api.slack.com/methods/admin.teams.create)
  * [`admin.teams.list`](https://api.slack.com/methods/admin.teams.list)
  * [`admin.teams.settings.info`](https://api.slack.com/methods/admin.teams.settings.info)
  * [ `admin.teams.settings.setDefaultChannels`](https://api.slack.com/methods/admin.teams.settings.setDefaultChannels)
  * [`admin.teams.settings.setDescription`](https://api.slack.com/methods/admin.teams.settings.setDescription)
  * [`admin.teams.settings.setDiscoverability`](https://api.slack.com/methods/admin.teams.settings.setDiscoverability)
  * [`admin.teams.settings.setIcon`](https://api.slack.com/methods/admin.teams.settings.setIcon)
  * [`admin.teams.settings.setName`](https://api.slack.com/methods/admin.teams.settings.setName)
  * [`admin.users.list`](https://api.slack.com/methods/admin.users.list)
  * [`admin.users.setExpiration`](https://api.slack.com/methods/admin.users.setExpiration)
* Fixed `Logger` given to `WebClient` being destructively modified bug ([#916](https://github.com/slackapi/node-slack-sdk/issues/916)). Thanks [@seratch](https://github.com/seratch)
* Minor docs readability improvements ([#915](https://github.com/slackapi/node-slack-sdk/issues/915)). Thanks [@TigerTopher](https://github.com/TigerTopher)

[Changes][@slack/web-api@5.7.0]


<a name="@slack/interactive-messages@1.4.1"></a>
# [@slack/interactive-messages@1.4.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@1.4.1) - 15 Jan 2020

* added `payload` to debug when no handler matches ([#928](https://github.com/slackapi/node-slack-sdk/issues/928)). Thanks [@davidalpert](https://github.com/davidalpert)!

[Changes][@slack/interactive-messages@1.4.1]


<a name="@slack/events-api@2.3.1"></a>
# [@slack/events-api@2.3.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/events-api@2.3.1) - 15 Jan 2020

* Fixed an error in a code sample in the documentation ([#936](https://github.com/slackapi/node-slack-sdk/issues/936)) - Thanks [@seratch](https://github.com/seratch)! 

[Changes][@slack/events-api@2.3.1]


<a name="@slack/web-api@5.6.0"></a>
# [@slack/web-api@5.6.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.6.0) - 23 Nov 2019

* Added `admin.inviteRequests.*` APIs ([#907](https://github.com/slackapi/node-slack-sdk/issues/907)).  - thanks [@seratch](https://github.com/seratch)! These include:
  * [admin.inviteRequests.approve](https://api.slack.com/methods/admin.inviteRequests.approve)
  * [admin.inviteRequests.deny](https://api.slack.com/methods/admin.inviteRequests.deny)
  * [admin.inviteRequests.list](https://api.slack.com/methods/admin.inviteRequests.list)
  * [admin.inviteRequests.approved.list](https://api.slack.com/methods/admin.inviteRequests.approved.list)
  * [admin.inviteRequests.denied.list](https://api.slack.com/methods/admin.inviteRequests.denied.list)
* Added configuration in `launch.json` for vscode debugging of tests ([#913](https://github.com/slackapi/node-slack-sdk/issues/913)) - thanks [@stevengill](https://github.com/stevengill) 

[Changes][@slack/web-api@5.6.0]


<a name="@slack/types@1.3.0"></a>
# [@slack/types@1.3.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@1.3.0) - 23 Nov 2019

* Removed `UserElement` type as it is not available publicly. ([#905](https://github.com/slackapi/node-slack-sdk/issues/905)/[#912](https://github.com/slackapi/node-slack-sdk/issues/912))  - thanks [@stevengill](https://github.com/stevengill) 
* Make `title` optional and support `home` type for `views`. ([#902](https://github.com/slackapi/node-slack-sdk/issues/902)) - thanks [@ahayworth](https://github.com/ahayworth)

[Changes][@slack/types@1.3.0]


<a name="@slack/web-api@5.5.0"></a>
# [@slack/web-api@5.5.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.5.0) - 12 Nov 2019

- Adds `oauth.v2.access` method to `WebClient` to support [v2 OAuth flow](https://api.slack.com/authentication/oauth-v2) ([#903](https://github.com/slackapi/node-slack-sdk/issues/903)) - thanks [@seratch](https://github.com/seratch)

[Changes][@slack/web-api@5.5.0]


<a name="@slack/interactive-messages@1.4.0"></a>
# [@slack/interactive-messages@1.4.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@1.4.0) - 12 Nov 2019

- Adds the `.viewSubmission()` and `.viewClosed()` methods to the adapter to handle events from Modals ([#904](https://github.com/slackapi/node-slack-sdk/issues/904)) - thanks [@aoberoi](https://github.com/aoberoi)

[Changes][@slack/interactive-messages@1.4.0]


<a name="@slack/web-api@5.4.0"></a>
# [@slack/web-api@5.4.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.4.0) - 31 Oct 2019

Adds Admin APIs v1 [#897](https://github.com/slackapi/node-slack-sdk/issues/897) - Thanks [@seratch](https://github.com/seratch) 🎉 

[Changes][@slack/web-api@5.4.0]


<a name="@slack/web-api@5.3.0"></a>
# [@slack/web-api@5.3.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.3.0) - 23 Oct 2019

* Adds the `views.publish` Web API method, and type definitions. ([#894](https://github.com/slackapi/node-slack-sdk/issues/894)) - thanks [@shanedewael](https://github.com/shanedewael) 

[Changes][@slack/web-api@5.3.0]


<a name="@slack/logger@2.0.0"></a>
# [@slack/logger@2.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/logger@2.0.0) - 09 Oct 2019

Re-add `getLogger()` to the logger interface - [#887](https://github.com/slackapi/node-slack-sdk/issues/887)

[Changes][@slack/logger@2.0.0]


<a name="@slack/logger@1.1.1"></a>
# [@slack/logger@1.1.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/logger@1.1.1) - 09 Oct 2019

Reverts `getLevel()` on logger interface because that's a semver major change. Includes changes from [#884](https://github.com/slackapi/node-slack-sdk/issues/884) and [#885](https://github.com/slackapi/node-slack-sdk/issues/885)

[Changes][@slack/logger@1.1.1]


<a name="@slack/web-api@5.2.1"></a>
# [@slack/web-api@5.2.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.2.1) - 07 Oct 2019

- Fixes the arguments for `views.update` ([#877](https://github.com/slackapi/node-slack-sdk/issues/877)) - thanks [@seratch](https://github.com/seratch) 

[Changes][@slack/web-api@5.2.1]


<a name="@slack/types@1.2.1"></a>
# [@slack/types@1.2.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@1.2.1) - 07 Oct 2019

- Fixes the `callback_id` argument for `views.open` ([#879](https://github.com/slackapi/node-slack-sdk/issues/879)) - thanks [@PerStirpes](https://github.com/PerStirpes) 

[Changes][@slack/types@1.2.1]


<a name="@slack/webhook@5.0.2"></a>
# [@slack/webhook@5.0.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/webhook@5.0.2) - 25 Sep 2019

- Fixes `HTTPError` status code in error message. [#850](https://github.com/slackapi/node-slack-sdk/issues/850) (thanks [@aoberoi](https://github.com/aoberoi))

[Changes][@slack/webhook@5.0.2]


<a name="@slack/web-api@5.2.0"></a>
# [@slack/web-api@5.2.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.2.0) - 25 Sep 2019

- Adds support for Block Kit in Modals. [#870](https://github.com/slackapi/node-slack-sdk/issues/870) (thanks [@shanedewael](https://github.com/shanedewael))
- Adds support for the Remote Files API. [#839](https://github.com/slackapi/node-slack-sdk/issues/839) (thanks [@seratch](https://github.com/seratch) and [@aoberoi](https://github.com/aoberoi))
- Adds support for managing App approvals. [#855](https://github.com/slackapi/node-slack-sdk/issues/855) (thanks [@aoberoi](https://github.com/aoberoi))
- Adds support for user session reset for Admins. [#856](https://github.com/slackapi/node-slack-sdk/issues/856) (thanks [@aoberoi](https://github.com/aoberoi))
- Marks `channels.list` arguments `exclude_archived` and `exclude_members` optional. [#865](https://github.com/slackapi/node-slack-sdk/issues/865) (thanks [@mottox2](https://github.com/mottox2))


[Changes][@slack/web-api@5.2.0]


<a name="@slack/types@1.2.0"></a>
# [@slack/types@1.2.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@1.2.0) - 25 Sep 2019

- Adds types for various multi-select blocks, for app views, and updates existing Block Kit types with confirm properties. [#870](https://github.com/slackapi/node-slack-sdk/issues/870) (thanks [@shanedewael](https://github.com/shanedewael))

[Changes][@slack/types@1.2.0]


<a name="@slack/rtm-api@5.0.3"></a>
# [@slack/rtm-api@5.0.3](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/rtm-api@5.0.3) - 25 Sep 2019

- Adds workaround for TypeScript 3.6 breaking change. [#864](https://github.com/slackapi/node-slack-sdk/issues/864) (thanks [@aoberoi](https://github.com/aoberoi))

[Changes][@slack/rtm-api@5.0.3]


<a name="@slack/logger@1.1.0"></a>
# [@slack/logger@1.1.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/logger@1.1.0) - 25 Sep 2019

- Adds `getLevel()` method to the `Logger` interface, and the `ConsoleLogger` implementation [#792](https://github.com/slackapi/node-slack-sdk/issues/792) (thanks [@seratch](https://github.com/seratch))

[Changes][@slack/logger@1.1.0]


<a name="@slack/interactive-messages@1.3.0"></a>
# [@slack/interactive-messages@1.3.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@1.3.0) - 08 Aug 2019

- Add support for pre-parsed requests ([#800](https://github.com/slackapi/node-slack-sdk/issues/800), [#844](https://github.com/slackapi/node-slack-sdk/issues/844)) - thanks [@troysteinbauer](https://github.com/troysteinbauer), [@clavin](https://github.com/clavin).
  - Functionality was ported from `@slack/events-api`.
  - This enables serverless environments & other middleware to pre-parse a request's body so long as they populate the `rawBody` field of the request.

[Changes][@slack/interactive-messages@1.3.0]


<a name="@slack/webhook@5.0.1"></a>
# [@slack/webhook@5.0.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/webhook@5.0.1) - 26 Jul 2019

- Add KnownBlock to incoming webhook argument ([#807](https://github.com/slackapi/node-slack-sdk/issues/807)) - thanks [@beeme1mr](https://github.com/beeme1mr).
- Use destructuring import for IncomingWebhook ([#782](https://github.com/slackapi/node-slack-sdk/issues/782)) - thanks [@Nilhcem](https://github.com/Nilhcem).
- Correcting documentation of https-proxy-agent usage ([#811](https://github.com/slackapi/node-slack-sdk/issues/811)) - thanks [@rajashekar](https://github.com/rajashekar).
- Bump webhook deps to fix security warnings ([#812](https://github.com/slackapi/node-slack-sdk/issues/812)) - thanks [@seratch](https://github.com/seratch).

[Changes][@slack/webhook@5.0.1]


<a name="@slack/web-api@5.1.0"></a>
# [@slack/web-api@5.1.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.1.0) - 26 Jul 2019

- Add support for the Remote Files API ([#839](https://github.com/slackapi/node-slack-sdk/issues/839)) - thanks [@seratch](https://github.com/seratch) & [@aoberoi](https://github.com/aoberoi).
- Update form-data to 2.5.0, removes @types/form-data ([#833](https://github.com/slackapi/node-slack-sdk/issues/833)) - thanks [@copperwall](https://github.com/copperwall).
- Add WebClient test cases for invalid Retry-After headers ([#803](https://github.com/slackapi/node-slack-sdk/issues/803)) - thanks [@copperwall](https://github.com/copperwall).
- Bump web-api deps to fix security warnings ([#812](https://github.com/slackapi/node-slack-sdk/issues/812)) - thanks [@seratch](https://github.com/seratch).
- Add messages property under response_metadata ([#832](https://github.com/slackapi/node-slack-sdk/issues/832)) - thanks [@seratch](https://github.com/seratch).
- Add method name to apiCall debug ([#835](https://github.com/slackapi/node-slack-sdk/issues/835)) - thanks [@clavin](https://github.com/clavin).

[Changes][@slack/web-api@5.1.0]


<a name="@slack/types@1.1.0"></a>
# [@slack/types@1.1.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/types@1.1.0) - 26 Jul 2019

- Add support for the Remote Files API ([#839](https://github.com/slackapi/node-slack-sdk/issues/839)) - thanks [@seratch](https://github.com/seratch) & [@aoberoi](https://github.com/aoberoi).
- Add 'style' to Button type ([#797](https://github.com/slackapi/node-slack-sdk/issues/797)) - thanks [@deremer](https://github.com/deremer).

[Changes][@slack/types@1.1.0]


<a name="@slack/interactive-messages@1.2.0"></a>
# [@slack/interactive-messages@1.2.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@1.2.0) - 26 Jul 2019

- Convert `@slack/interactive-messages` to TypeScript ([#799](https://github.com/slackapi/node-slack-sdk/issues/799)) - thanks [@clavin](https://github.com/clavin).
  - This package is still meant to be used by JavaScript developers!
- Bump interactive-messages deps to fix security warnings ([#812](https://github.com/slackapi/node-slack-sdk/issues/812)) - thanks [@seratch](https://github.com/seratch).
- Fixes broken links to local development tutorial ([#774](https://github.com/slackapi/node-slack-sdk/issues/774)) - thanks [@aoberoi](https://github.com/aoberoi).
- Increase test timeout multipliers ([#840](https://github.com/slackapi/node-slack-sdk/issues/840)) - thanks [@clavin](https://github.com/clavin).

[Changes][@slack/interactive-messages@1.2.0]


<a name="@slack/events-api@2.3.0"></a>
# [@slack/events-api@2.3.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/events-api@2.3.0) - 26 Jul 2019

- Convert `@slack/events-api` to TypeScript ([#799](https://github.com/slackapi/node-slack-sdk/issues/799)) - thanks [@clavin](https://github.com/clavin).
  - This package is still meant to be used by JavaScript developers!
- Bump events-api deps to fix security warnings ([#812](https://github.com/slackapi/node-slack-sdk/issues/812)) - thanks [@seratch](https://github.com/seratch).
- Fixes broken links to local development tutorial ([#774](https://github.com/slackapi/node-slack-sdk/issues/774)) - thanks [@aoberoi](https://github.com/aoberoi).

[Changes][@slack/events-api@2.3.0]


<a name="@slack/client@5.0.2"></a>
# [@slack/client@5.0.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/client@5.0.2) - 26 Jul 2019

- Fix incorrect homepage for legacy wrapper ([#793](https://github.com/slackapi/node-slack-sdk/issues/793)) - thanks [@felixrieseberg](https://github.com/felixrieseberg).

[Changes][@slack/client@5.0.2]


<a name="@slack/web-api@5.0.1"></a>
# [@slack/web-api@5.0.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.0.1) - 18 Apr 2019

* Change eventemitter3 import for compatibility when TypeScript is configured without `esModuleInterop` ([#760](https://github.com/slackapi/node-slack-sdk/issues/760)) - thanks [@aoberoi](https://github.com/aoberoi)

[Changes][@slack/web-api@5.0.1]


<a name="@slack/rtm-api@5.0.1"></a>
# [@slack/rtm-api@5.0.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/rtm-api@5.0.1) - 18 Apr 2019

* Fixes a typo in the README that accidentally mentioned `@slack/web-api` ([#768](https://github.com/slackapi/node-slack-sdk/issues/768)) - thanks [@the6thm0nth](https://github.com/the6thm0nth).
* Change eventemitter3 import for compatibility when TypeScript is configured without `esModuleInterop` ([#760](https://github.com/slackapi/node-slack-sdk/issues/760)) - thanks [@aoberoi](https://github.com/aoberoi)

[Changes][@slack/rtm-api@5.0.1]


<a name="@slack/client@5.0.1"></a>
# [@slack/client@5.0.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/client@5.0.1) - 18 Apr 2019

* Adds a README to the package distribution ([#776](https://github.com/slackapi/node-slack-sdk/issues/776)) - thanks [@aoberoi](https://github.com/aoberoi).

[Changes][@slack/client@5.0.1]


<a name="v5.0.0"></a>
# [Node Slack SDK v5.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v5.0.0) - 28 Mar 2019

This meta-release marks the beginning of a new organizational structure for the code related to each of Slack's official Node.js packages.

### Major version releases

The following packages have changes listed in their release notes:

* [`@slack/web-api@v5.0.0`](https://github.com/slackapi/node-slack-sdk/releases/tag/%40slack%2Fweb-api%405.0.0)
* [`@slack/rtm-api@v5.0.0`](https://github.com/slackapi/node-slack-sdk/releases/tag/%40slack%2Frtm-api%405.0.0)
* [`@slack/webhook@v5.0.0`](https://github.com/slackapi/node-slack-sdk/releases/tag/%40slack%2Fwebhook%405.0.0)
* [`@slack/client@v5.0.0`](https://github.com/slackapi/node-slack-sdk/releases/tag/%40slack%2Fclient%405.0.0)

See the [migration guide](https://slack.dev/node-slack-sdk/tutorials/migrating-to-v5) for information about how to update your app from a previous version.

### No new release

* `@slack/events-api@v5.0.0`: Moved from the [original repository](https://github.com/slackapi/node-slack-events-api).
* `@slack/interactive-messages@v5.0.0`: Moved from the [original repository](https://github.com/slackapi/node-slack-interactive-messages).



[Changes][v5.0.0]


<a name="@slack/webhook@5.0.0"></a>
# [@slack/webhook@5.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/webhook@5.0.0) - 28 Mar 2019

## New features

* Brand new, independent, and lighter weight package

## Breaking changes

* Supports Node v8.9.0 and higher
* No longer supports a callback parameter for `IncomingWebhook.send()`
* `agent` option has been simplified
* Some `ErrorCode` constants have changed.

See [the migration guide](https://slack.dev/node-slack-sdk/tutorials/migrating-to-v5/#incomingwebhook) for details. 

[Changes][@slack/webhook@5.0.0]


<a name="@slack/web-api@5.0.0"></a>
# [@slack/web-api@5.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/web-api@5.0.0) - 28 Mar 2019

## New features

* Brand new, independent, and lighter weight package
* `WebClient.paginate()` method: call cursor-paginated Web API methods using an async iterator 🎉 

## Breaking changes

* Supports Node v8.9.0 and higher
* No longer supports a callbacks for named Web API methods, or the `WebClient.apiCall()` method.
* The `scopes`, `acceptedScopes`, and `retryAfter` properties of a Web API call result have moved into the `response_metadata`.
* Removed previously deprecated methods
* Removed deprecated token rotation
* Renamed retry policies to more intuitive names
* `agent` option has been simplified
* Some `ErrorCode` constants have changed.
* Support `Logger` objects without a logger function.

See [the migration guide](https://slack.dev/node-slack-sdk/tutorials/migrating-to-v5/#webclient) for details. 

[Changes][@slack/web-api@5.0.0]


<a name="@slack/rtm-api@5.0.0"></a>
# [@slack/rtm-api@5.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/rtm-api@5.0.0) - 28 Mar 2019

## New features

* Brand new, independent, and lighter weight package

## Breaking changes

* Supports Node v8.9.0 and higher
* No longer supports a callbacks for named Web API methods, or the `RTMClient.sendMessage()` method.
* Removed the `raw_message` event in favor of the `slack_event` event.
* `agent` option has been simplified
* Some `ErrorCode` constants have changed.
* Support `Logger` objects without a logger function.

See [the migration guide](https://slack.dev/node-slack-sdk/tutorials/migrating-to-v5/#rtmclient) for details. 

[Changes][@slack/rtm-api@5.0.0]


<a name="@slack/interactive-messages@v1.1.1"></a>
# [@slack/interactive-messages@v1.1.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@v1.1.1) - 28 Mar 2019

> Fixes matching with `actionId` and `blockId` ([#90](https://github.com/slackapi/node-slack-sdk/issues/90))

Original: https://github.com/slackapi/node-slack-interactive-messages/releases/tag/v1.1.1

[Changes][@slack/interactive-messages@v1.1.1]


<a name="@slack/interactive-messages@v1.1.0"></a>
# [@slack/interactive-messages@v1.1.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@v1.1.0) - 28 Mar 2019

> * Adds Block Kit support ([#85](https://github.com/slackapi/node-slack-sdk/issues/85))
> * Improves express all interactions by using body parser and removing verification check ([#79](https://github.com/slackapi/node-slack-sdk/issues/79) - thanks [@ErwinLengkeek](https://github.com/ErwinLengkeek))

Original: https://github.com/slackapi/node-slack-interactive-messages/releases/tag/v1.1.0

[Changes][@slack/interactive-messages@v1.1.0]


<a name="@slack/interactive-messages@v1.0.2"></a>
# [@slack/interactive-messages@v1.0.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@v1.0.2) - 28 Mar 2019

> *  Adds a timing safe comparison to guard from timing attacks. Thanks [@episod](https://github.com/episod) billdybas ([#71](https://github.com/slackapi/node-slack-sdk/issues/71))

Original: https://github.com/slackapi/node-slack-interactive-messages/releases/tag/v1.0.2

[Changes][@slack/interactive-messages@v1.0.2]


<a name="@slack/interactive-messages@v1.0.0"></a>
# [@slack/interactive-messages@v1.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@v1.0.0) - 28 Mar 2019

> This release adds support for request signing, decouples the adapter from express, and fixes bugs:
> - Adds support for the more secure [request signing](https://api.slack.com/docs/verifying-requests-from-slack) over legacy verification tokens. This change requires developers to now pass in a Signing Secret to the adapter rather than a verification token. ([#57](https://github.com/slackapi/node-slack-sdk/issues/57))
> - Refactored the adapter to decouple `express`, which included adding parsing within the adapter, meaning developers no longer need to use middleware to parse the request (such as the `body-parser` package). ([#31](https://github.com/slackapi/node-slack-sdk/issues/31))
> - A bug preventing message actions from working properly was fixed. ([#56](https://github.com/slackapi/node-slack-sdk/issues/56) - thanks [@mcolyer](https://github.com/mcolyer) 🎉)

Original: https://github.com/slackapi/node-slack-interactive-messages/releases/tag/v1.0.0

[Changes][@slack/interactive-messages@v1.0.0]


<a name="@slack/interactive-messages@v0.4.0"></a>
# [@slack/interactive-messages@v0.4.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@v0.4.0) - 28 Mar 2019

> This release adds support for new [message actions](https://api.slack.com/actions). Your users can now interact with you app through dedicated actions per message.

Original: https://github.com/slackapi/node-slack-interactive-messages/releases/tag/v0.4.0

[Changes][@slack/interactive-messages@v0.4.0]


<a name="@slack/interactive-messages@v0.3.0"></a>
# [@slack/interactive-messages@v0.3.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@v0.3.0) - 28 Mar 2019

> -  *New Feature* Support for dynamic menu options inside dialogs and the `within` constraint! [#36](https://github.com/slackapi/node-slack-sdk/issues/36)
> -  Fixed bugs in dialog submission action support ([#25](https://github.com/slackapi/node-slack-sdk/issues/25)) and menu options requests ([#23](https://github.com/slackapi/node-slack-sdk/issues/23)) [#28](https://github.com/slackapi/node-slack-sdk/issues/28)
> - README has been rewritten with numerous clarifications and improvements ([#27](https://github.com/slackapi/node-slack-sdk/issues/27), [#29](https://github.com/slackapi/node-slack-sdk/issues/29)) [#39](https://github.com/slackapi/node-slack-sdk/issues/39)
> - Example app `express-all-interactions` added [#39](https://github.com/slackapi/node-slack-sdk/issues/39) 
> - Reference documentation added ([#11](https://github.com/slackapi/node-slack-sdk/issues/11)) [#39](https://github.com/slackapi/node-slack-sdk/issues/39) 
> - Test coverage exceeds 85% ([#9](https://github.com/slackapi/node-slack-sdk/issues/9))
> - `SlackMessageAdapter`'s `dispatch()` method is now always async ([#33](https://github.com/slackapi/node-slack-sdk/issues/33))
> - Added vscode workspace settings ([#35](https://github.com/slackapi/node-slack-sdk/issues/35))

Original: https://github.com/slackapi/node-slack-interactive-messages/releases/tag/v0.3.0

[Changes][@slack/interactive-messages@v0.3.0]


<a name="@slack/interactive-messages@v0.2.0"></a>
# [@slack/interactive-messages@v0.2.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@v0.2.0) - 28 Mar 2019

> - Added support for dialogs

Original: https://github.com/slackapi/node-slack-interactive-messages/releases/tag/v0.2.0

[Changes][@slack/interactive-messages@v0.2.0]


<a name="@slack/interactive-messages@v0.1.2"></a>
# [@slack/interactive-messages@v0.1.2](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/interactive-messages@v0.1.2) - 28 Mar 2019

> **Our first real distributable release!** 🎉 
> 
> The `@slack/interactive-messages` module makes it quick and simple for your app to respond to buttons and menus inside Slack. Find out all about the features in the [README](https://github.com/slackapi/node-slack-interactive-messages).
> 
> *  Fixes an issue with regex-based action matching ([#1](https://github.com/slackapi/node-slack-sdk/issues/1)) - thanks [@hwz](https://github.com/hwz).

Original: https://github.com/slackapi/node-slack-interactive-messages/releases/tag/v0.1.2

[Changes][@slack/interactive-messages@v0.1.2]


<a name="@slack/events-api@v2.2.1"></a>
# [@slack/events-api@v2.2.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/events-api@v2.2.1) - 28 Mar 2019

> *  Supports Firebase Cloud Functions and other serverless cloud providers by inspecting `req.rawBody` when the body appears to already be parsed. thanks [@pichsenmeister](https://github.com/pichsenmeister)! ([#90](https://github.com/slackapi/node-slack-sdk/issues/90))
> 
> *  Improves the example app `greet-and-react`. It can now persist tokens using `node-localstorage`, so that you don't need to install the app each time its restarted ([#84](https://github.com/slackapi/node-slack-sdk/issues/84)). Also, a bug in the arguments for `chat.postMessage()` was fixed ([#83](https://github.com/slackapi/node-slack-sdk/issues/83)). thanks [@ErwinLengkeek](https://github.com/ErwinLengkeek)!

Original: https://github.com/slackapi/node-slack-events-api/releases/tag/v2.2.0

[Changes][@slack/events-api@v2.2.1]


<a name="@slack/events-api@v2.2.0"></a>
# [@slack/events-api@v2.2.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/events-api@v2.2.0) - 28 Mar 2019

> *  Adds a timing safe comparison to guard from timing attacks. Thanks [@episod](https://github.com/episod) billdybas ([#77](https://github.com/slackapi/node-slack-sdk/issues/77))

Original: https://github.com/slackapi/node-slack-events-api/releases/tag/v2.1.1

[Changes][@slack/events-api@v2.2.0]


<a name="@slack/events-api@v2.1.0"></a>
# [@slack/events-api@v2.1.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/events-api@v2.1.0) - 28 Mar 2019

> *  Exports a new function `verifyRequestSignature({ signingSecret, requestSignature, requestTimestamp, body })`. This function can be used to verify the authenticity of a request even without using the `requestListener` or `expressMiddleware` offered by this package. It's a useful utility when your application doesn't need the adapter (`EventEmitter`), but you don't want to reinvent the signature check. thanks [@ianwsperber](https://github.com/ianwsperber) ([#71](https://github.com/slackapi/node-slack-sdk/issues/71))

Original: https://github.com/slackapi/node-slack-events-api/releases/tag/v2.1.0

[Changes][@slack/events-api@v2.1.0]


<a name="@slack/events-api@v2.0.0"></a>
# [@slack/events-api@v2.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/events-api@v2.0.0) - 28 Mar 2019

> This releases refactors a large portion of the adapter, adds support for request signing, and fixes a lot of bugs:
> - The export name is changed from `createSlackEventAdapter` to `createEventAdapter` ([#37](https://github.com/slackapi/node-slack-sdk/issues/37))
> - Adds request signing support, discontinuing support for verification tokens. This change requires developers to now pass in a Signing Secret in to the adapter rather than a verification token. ([#57](https://github.com/slackapi/node-slack-sdk/issues/57))
> - Decouples the adapter from `express`, which included adding parsing within the adapter, meaning developers no longer need to use middleware to parse the request (using something like the `body-parser` package)
> - Documentation improvements ([#41](https://github.com/slackapi/node-slack-sdk/issues/41), [#42](https://github.com/slackapi/node-slack-sdk/issues/42), [#44](https://github.com/slackapi/node-slack-sdk/issues/44), [#45](https://github.com/slackapi/node-slack-sdk/issues/45), [#46](https://github.com/slackapi/node-slack-sdk/issues/46))

Original: https://github.com/slackapi/node-slack-events-api/releases/tag/v2.0.0

[Changes][@slack/events-api@v2.0.0]


<a name="@slack/events-api@v1.0.1"></a>
# [@slack/events-api@v1.0.1](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/events-api@v1.0.1) - 28 Mar 2019

> This release addresses a number of bug fixes since the initial release.
> 
> *  When using the `waitForResponse` adapter option, error events sometimes did not emit the `respond()` callback function ([#18](https://github.com/slackapi/node-slack-sdk/issues/18))
> *  Added a `adapter.stop()` method which is close the built-in HTTP server if one was started, and return a Promise which resolves after all connections have ended. ([#27](https://github.com/slackapi/node-slack-sdk/issues/27))
> *  Errors thrown inside a handler will now result in a success response to the request by default (can be overridden by using `waitForResponse` and passing an error to the `respond()` callback) ([#21](https://github.com/slackapi/node-slack-sdk/issues/21), [#25](https://github.com/slackapi/node-slack-sdk/issues/25))
> *  Debugging support using the `DEBUG` environment variable. ([#19](https://github.com/slackapi/node-slack-sdk/issues/19), [#22](https://github.com/slackapi/node-slack-sdk/issues/22))
> *  More tests and documentation ([#23](https://github.com/slackapi/node-slack-sdk/issues/23), [#26](https://github.com/slackapi/node-slack-sdk/issues/26))

Original: https://github.com/slackapi/node-slack-events-api/releases/tag/v1.0.1

[Changes][@slack/events-api@v1.0.1]


<a name="@slack/client@5.0.0"></a>
# [@slack/client@5.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/client@5.0.0) - 28 Mar 2019

This release is meant to help users migrate to the smaller, lighter, independent packages. If you'd just like to test the compatibility of your app with the latest breaking changes, you can simply update the from a previous version of this package to this version. If everything works, you're ready to change your code to depend on the independent packages instead.

For each of the follow classes, these packages should be used directly.

| Class name        | Command to install           |
|-------------------|------------------------------|
| `WebClient`       | `npm install @slack/web-api` |
| `RTMClient`       | `npm install @slack/rtm-api` |
| `IncomingWebhook` | `npm install @slack/webhook` |

See the [migration guide](https://slack.dev/node-slack-sdk/tutorials/migrating-to-v5) for more details.

[Changes][@slack/client@5.0.0]


<a name="v4.12.0"></a>
# [@slack/client v4.12.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.12.0) - 19 Mar 2019

- Adds support for scheduled messages ([#743](https://github.com/slackapi/node-slack-sdk/issues/743))
- Changes `p-cancelable` version to `~1.0.0` to fix type errors ([#743](https://github.com/slackapi/node-slack-sdk/issues/743))

[Changes][v4.12.0]


<a name="v4.11.0"></a>
# [@slack/client v4.11.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.11.0) - 08 Mar 2019

- Deprecates auto-pagination. ([#721](https://github.com/slackapi/node-slack-sdk/issues/721)) - thanks [@aoberoi](https://github.com/aoberoi)
- Changes log level of failed requests from `DEBUG` to `WARN`. ([#718](https://github.com/slackapi/node-slack-sdk/issues/718)) - thanks [@aoberoi](https://github.com/aoberoi)
- Fixes bug where `http_proxy` and `https_proxy` environment variables unexpectedly interact with `WebClient` and
  `RTMClient` configuration. ([#672](https://github.com/slackapi/node-slack-sdk/issues/672)) - thanks [@aoberoi](https://github.com/aoberoi)
- Fixes tests for `IncomingWebhook` agent option. ([#719](https://github.com/slackapi/node-slack-sdk/issues/719)) - thanks [@aoberoi](https://github.com/aoberoi)
- Updates dependencies. ([#725](https://github.com/slackapi/node-slack-sdk/issues/725)) - thanks [@aoberoi](https://github.com/aoberoi)


[Changes][v4.11.0]


<a name="v4.10.0"></a>
# [@slack/client v4.10.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.10.0) - 27 Feb 2019

- Adds deprecation warnings for usage of a logging function. Use a `Logger` object instead. ([#703](https://github.com/slackapi/node-slack-sdk/issues/703)) - thanks [@aoberoi](https://github.com/aoberoi)

[Changes][v4.10.0]


<a name="v4.9.0"></a>
# [@slack/client v4.9.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.9.0) - 27 Feb 2019

- Adds support for Block Kit ([#688](https://github.com/slackapi/node-slack-sdk/issues/688)) - thanks [@shanedewael](https://github.com/shanedewael) 
- Adds deprecation warnings for callback and refresh token use ([#698](https://github.com/slackapi/node-slack-sdk/issues/698)) - thanks [@aoberoi](https://github.com/aoberoi)

[Changes][v4.9.0]


<a name="v4.8.0"></a>
# [@slack/client v4.8.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.8.0) - 03 Oct 2018

## New Features

- The `IncomingWebhook` constructor now has an `agent` option. It works exactly like the `agent` option from `WebClient`. It's very useful for setting a proxy for requests using packages like `https-proxy-agent` or `tunnel`. Thanks [@romanbalayan](https://github.com/romanbalayan) ([#640](https://github.com/slackapi/node-slack-sdk/issues/640))

## Documentation improvements

- Fixes the TypeScript `lib` configuration instructions for versions 3.1 and above. Thanks [@melisdogan](https://github.com/melisdogan) ([#650](https://github.com/slackapi/node-slack-sdk/issues/650)).

[Changes][v4.8.0]


<a name="v4.7.0"></a>
# [@slack/client v4.7.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.7.0) - 02 Oct 2018

## New Features

- You can now specify HTTP headers you'd like to include on all requests from `WebClient`. Just pass a `headers` option to the constructor. Thanks [@ethan0920](https://github.com/ethan0920) ([#629](https://github.com/slackapi/node-slack-sdk/issues/629)).

## Bug fixes

- Fixes a bug when specifying the `agent` option on `WebClient` using an agent from `https-proxy-agent`. Thanks [@aoberoi](https://github.com/aoberoi) ([#645](https://github.com/slackapi/node-slack-sdk/issues/645)).

## Documentation improvements

- Fixes pagination sample code. Thanks [@smaeda-ks](https://github.com/smaeda-ks) ([#641](https://github.com/slackapi/node-slack-sdk/issues/641)).

- Adds missing `WebClient` instance in the Getting Started guide. Thanks [@jharrilim](https://github.com/jharrilim) ([#637](https://github.com/slackapi/node-slack-sdk/issues/637)).

- Adds documentation for using the package within a TypeScript project - see https://slackapi.github.io/node-slack-sdk/typescript. Thanks [@aoberoi](https://github.com/aoberoi) ([#644](https://github.com/slackapi/node-slack-sdk/issues/644)).

- Clarifies usage of Web API methods with no required options using callbacks. Thanks [@aoberoi](https://github.com/aoberoi) ([#631](https://github.com/slackapi/node-slack-sdk/issues/631)).


[Changes][v4.7.0]


<a name="v3.16.1-sec.2"></a>
# [@slack/client v3.16.1-sec.2](https://github.com/slackapi/node-slack-sdk/releases/tag/v3.16.1-sec.2) - 10 Sep 2018

**This version is a special pre-release that is specifically meant to address a security issue. See [#621](https://github.com/slackapi/node-slack-sdk/issues/621) for details**

- Upgrades the `https-proxy-agent` dependency (thanks [@mistydemeo](https://github.com/mistydemeo)) [#621](https://github.com/slackapi/node-slack-sdk/issues/621)

[Changes][v3.16.1-sec.2]


<a name="v4.6.0"></a>
# [@slack/client v4.6.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.6.0) - 30 Aug 2018

## New Features

- Adds support for short lived tokens and automatic token refresh ([#617](https://github.com/slackapi/node-slack-sdk/issues/617)) - thanks [@aoberoi](https://github.com/aoberoi) and [@shanedewael](https://github.com/shanedewael)

[Changes][v4.6.0]


<a name="v4.5.0"></a>
# [@slack/client v4.5.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.5.0) - 25 Aug 2018

## New Features

- `RTMClient.start()` now returns a Promise that resolves with the data emitted with the `authenticated` event - thanks [@clavin](https://github.com/clavin) ([#611](https://github.com/slackapi/node-slack-sdk/issues/611))
- Adds the `state` property to the type definition of `Dialog` - thanks [@DominikPalo](https://github.com/DominikPalo) ([#619](https://github.com/slackapi/node-slack-sdk/issues/619))

## Bug Fixes

- Fixes an issue where `RTMClient` did not emit the `"disconnected"` event when it fails to connect - thanks [@clavin](https://github.com/clavin) ([#610](https://github.com/slackapi/node-slack-sdk/issues/610))

## Other

- Replaces the `got` dependency with `axios` - thanks [@aoberoi](https://github.com/aoberoi) ([#620](https://github.com/slackapi/node-slack-sdk/issues/620))


[Changes][v4.5.0]


<a name="v4.4.0"></a>
# [@slack/client v4.4.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.4.0) - 11 Aug 2018

## New Features

- Workspace apps can now call methods on behalf of users for methods which require the `X-Slack-User` header. When
  calling one of these methods, specify the user ID in the new `on_behalf_of` option. - thanks [@aoberoi](https://github.com/aoberoi) ([#609](https://github.com/slackapi/node-slack-sdk/issues/609))
- The new `rejectRateLimitedCalls` option in the `WebClient` constructor allows you to customize how you'd like to handle
  rate limiting. If you set it to `true`, the `WebClient` will not attempt to retry an API call for you, and will instead
  return an error with a `code` property set to the value `ErrorCode.RateLimitedError`. - thanks [@aoberoi](https://github.com/aoberoi) ([#599](https://github.com/slackapi/node-slack-sdk/issues/599))
- Automatic pagination for cursor-based pagination enabled methods: It's always recommended to perform
  pagination using the `cursor` and `limit` options directly, but if you don't pass either when calling a method, the
  `WebClient` will automatically iterate through all the pages and returned a merged result. - thanks [@aoberoi](https://github.com/aoberoi) ([#596](https://github.com/slackapi/node-slack-sdk/issues/596))
- The `WebClient` will warn when calling deprecated methods (`files.comments.add` and `files.comments.edit`) - thanks [@aoberoi](https://github.com/aoberoi) ([#604](https://github.com/slackapi/node-slack-sdk/issues/604))

## Bug fixes and more

- Fixes the crash when `RTMClient#disconnect()` was called from the `connecting` state - thanks [@aoberoi](https://github.com/aoberoi) ([#603](https://github.com/slackapi/node-slack-sdk/issues/603))
- Fixes an issue where uploading a file without a token fails in `WebClient` with an unrelated error - thanks [@aoberoi](https://github.com/aoberoi) ([#587](https://github.com/slackapi/node-slack-sdk/issues/587))
- Resolves an issue where your app requires a newer version of `@types/node` than this package specifies - thanks [@aoberoi](https://github.com/aoberoi) ([#605](https://github.com/slackapi/node-slack-sdk/issues/605))
- Fixes the `Dialog.selected_options` type definition - thanks [@harveyr](https://github.com/harveyr) ([#588](https://github.com/slackapi/node-slack-sdk/issues/588))
- Adds information, fixes syntax issues, and corrects typos in the documentation - thanks [@chris-peterson](https://github.com/chris-peterson), [@jd0920](https://github.com/jd0920) ([#584](https://github.com/slackapi/node-slack-sdk/issues/584), [#600](https://github.com/slackapi/node-slack-sdk/issues/600), [#601](https://github.com/slackapi/node-slack-sdk/issues/601))
- Tests against node v10 in Travis - thanks [@aoberoi](https://github.com/aoberoi) ([#606](https://github.com/slackapi/node-slack-sdk/issues/606))


[Changes][v4.4.0]


<a name="v3.16.1-sec"></a>
# [@slack/client v3.16.1-sec](https://github.com/slackapi/node-slack-sdk/releases/tag/v3.16.1-sec) - 04 Jul 2018

**This version is a special pre-release that is specifically meant to address a security issue. See [#547](https://github.com/slackapi/node-slack-sdk/issues/547) for details**

- Drops support for node < v4 and updates `request` dep to solve for CVE-2018-3728. (thanks [@aoberoi](https://github.com/aoberoi)) [#590](https://github.com/slackapi/node-slack-sdk/issues/590)
- Removes deprecated facet `users.setActive` (thanks [@DominikPalo](https://github.com/DominikPalo)) [#464](https://github.com/slackapi/node-slack-sdk/issues/464)

[Changes][v3.16.1-sec]


<a name="v4.3.1"></a>
# [@slack/client v4.3.1](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.3.1) - 07 Jun 2018

- Fixes an issue where `RTMClient` would crash after its connection was interrupted because upon reconnection the connection monitoring code would improperly handle new messages as pongs. ([#578](https://github.com/slackapi/node-slack-sdk/issues/578)) - thanks [@aoberoi](https://github.com/aoberoi).

[Changes][v4.3.1]


<a name="v4.3.0"></a>
# [@slack/client v4.3.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.3.0) - 05 Jun 2018

- Adds new permissions method named aliases to `WebClient`: `apps.permissions.resources.list` and
  `apps.permissions.scopes.list` ([#568](https://github.com/slackapi/node-slack-sdk/issues/568)) - thanks [@ggruiz](https://github.com/ggruiz)
- Fixes an issue where an `RTMClient` instance throws errors while trying to reconnect after a connection interuption
  ([#560](https://github.com/slackapi/node-slack-sdk/issues/560)) - thanks [@aoberoi](https://github.com/aoberoi)
- Fixes issue where rate-limit handling in `WebClient` was not triggering, and adds tests ([#570](https://github.com/slackapi/node-slack-sdk/issues/570), [#573](https://github.com/slackapi/node-slack-sdk/issues/573)) - thanks [@ggruiz](https://github.com/ggruiz)
- Adds missing `IncomingWebhookResult` type to exports ([#562](https://github.com/slackapi/node-slack-sdk/issues/562)) - thanks [@mledom](https://github.com/mledom)
- Changes `options` argument of `RTMClient#start()` to be optional as it was intended ([#567](https://github.com/slackapi/node-slack-sdk/issues/567)) - thanks [@christophehurpeau](https://github.com/christophehurpeau)

[Changes][v4.3.0]


<a name="v4.2.2"></a>
# [@slack/client v4.2.2](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.2.2) - 12 May 2018

- Adds the `notify_on_cancel` field to the `Dialog` type definition ([#541](https://github.com/slackapi/node-slack-sdk/issues/541)) - thanks [@DominikPalo](https://github.com/DominikPalo)
- Adds `AttachmentAction` type definition to express the type of the `action` property of `MessageAttachment`. ([#543](https://github.com/slackapi/node-slack-sdk/issues/543), [#551](https://github.com/slackapi/node-slack-sdk/issues/551)) - thanks [@brianeletype](https://github.com/brianeletype), [@DominikPalo](https://github.com/DominikPalo)
- Adds the `SelectOption` type defintion and related properties to the `Dialog` type definition. ([#549](https://github.com/slackapi/node-slack-sdk/issues/549)) - thanks [@DominikPalo](https://github.com/DominikPalo)
- Fixes the missing `scopes` property in `WebClient` responses. ([#554](https://github.com/slackapi/node-slack-sdk/issues/554)) - thanks [@aoberoi](https://github.com/aoberoi)
- Fixes an issue in `RTMClient` where websocket errors in the `connecting:authenticated` state would cause the program
  to crash. ([#555](https://github.com/slackapi/node-slack-sdk/issues/555)) thanks [@aoberoi](https://github.com/aoberoi)
- Fixes an issue where `KeepAlive` would monitor the RTM connection while the websocket was not ready after a
  reconnection. ([#555](https://github.com/slackapi/node-slack-sdk/issues/555)) thanks [@aoberoi](https://github.com/aoberoi)
- Uses the `"files"` key in `package.json` to implement a whitelist of files that are packed for `npm publish`.

[Changes][v4.2.2]


<a name="v4.2.0"></a>
# [@slack/client v4.2.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.2.0) - 26 Apr 2018

- Allows `mrkdwn_in` and `callback_id` fields in message attachments for formatting on attachment fields ([#528](https://github.com/slackapi/node-slack-sdk/issues/528)) - thanks [@DominikPalo](https://github.com/DominikPalo)
- Fixes optionality of `validate` argument for `channels.join` method ([#530](https://github.com/slackapi/node-slack-sdk/issues/530)) - thanks [@DominikPalo](https://github.com/DominikPalo)
- Adds the `users.conversations` method ([#532](https://github.com/slackapi/node-slack-sdk/issues/532)) - thanks [@DominikPalo](https://github.com/DominikPalo)
- Fixes overwriting of default parameters after `send()` call ([#535](https://github.com/slackapi/node-slack-sdk/issues/535)) - thanks [@franckbrignoli](https://github.com/franckbrignoli)
- Fixes and adds logging for unexpected websocket close in StateMachine ([#537](https://github.com/slackapi/node-slack-sdk/issues/537)) - thanks [@shanedewael](https://github.com/shanedewael)

[Changes][v4.2.0]


<a name="v4.1.0"></a>
# [@slack/client v4.1.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.1.0) - 23 Mar 2018

- `IncomingWebhook.send()` works with both callbacks and Promises ([#508](https://github.com/slackapi/node-slack-sdk/issues/508)) - thanks [@clavin](https://github.com/clavin)
- Completes type defintions for all `WebClient` method arguments ([#512](https://github.com/slackapi/node-slack-sdk/issues/512)) - thanks [@clavin](https://github.com/clavin)
- Allows `files.upload` to work with Buffers (in addition to ReadableStreams) ([#500](https://github.com/slackapi/node-slack-sdk/issues/500)) - thanks [@KharitonOff](https://github.com/KharitonOff)
- Allows any WebClient methods argument to work with binary types ([#519](https://github.com/slackapi/node-slack-sdk/issues/519)) - thanks [@clavin](https://github.com/clavin) and [@aoberoi](https://github.com/aoberoi)
- Fails when `WebClient.apiCall()` options don't look like the right type ([#522](https://github.com/slackapi/node-slack-sdk/issues/522)) - thanks [@aoberoi](https://github.com/aoberoi)
- Fixes TypeScript compile errors in node \>=6 \<=8 related to `callbackify` ([#518](https://github.com/slackapi/node-slack-sdk/issues/518)) - thanks [@aoberoi](https://github.com/aoberoi)
- Fixes mismatched parenthesis in RTMClient usage example documentation ([#511](https://github.com/slackapi/node-slack-sdk/issues/511)) - thanks [@parthsr](https://github.com/parthsr)
- Adds `examples` directory back to the repository ([#520](https://github.com/slackapi/node-slack-sdk/issues/520)) - thanks [@aoberoi](https://github.com/aoberoi)

[Changes][v4.1.0]


<a name="v4.0.1"></a>
# [@slack/client v4.0.1](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.0.1) - 15 Mar 2018

-  Fixes crash in projects where `"name"` or `"version"` were not defined in the `package.json` file ([#478](https://github.com/slackapi/node-slack-sdk/issues/478)) - thanks [@wilhelmklopp](https://github.com/wilhelmklopp) [@clavin](https://github.com/clavin) [@aoberoi](https://github.com/aoberoi)
-  Fixes `IncomingWebhook.send()` to parse the response as text instead of JSON ([#477](https://github.com/slackapi/node-slack-sdk/issues/477)) - thanks [@aoberoi](https://github.com/aoberoi)
-  Allows `IncomingWebhook` to be initialized without defaults ([#479](https://github.com/slackapi/node-slack-sdk/issues/479)) - thanks [@aoberoi](https://github.com/aoberoi)
-  Allows `WebClient` to be initialized without a `token` in TypeScript ([#482](https://github.com/slackapi/node-slack-sdk/issues/482)) - thanks [@aoberoi](https://github.com/aoberoi)
-  Allows unspecificed arguments to be used with `WebClient` method aliases and `apiCall()` ([#484](https://github.com/slackapi/node-slack-sdk/issues/484)) - thanks [@clavin](https://github.com/clavin)
-  Exports method argument types as top level exports in the type declarations ([#483](https://github.com/slackapi/node-slack-sdk/issues/483)) - thanks [@aoberoi](https://github.com/aoberoi)
-  Fixes inaccurate property type for `as_user` in `ChatPostMessageArguments` ([#475](https://github.com/slackapi/node-slack-sdk/issues/475)) - thanks [@harveyr](https://github.com/harveyr)
-  Improves the `OAuthAccessArguments` and `OAuthTokenArguments` types ([#481](https://github.com/slackapi/node-slack-sdk/issues/481)) - thanks [@aoberoi](https://github.com/aoberoi)

[Changes][v4.0.1]


<a name="v4.0.0"></a>
# [@slack/client v4.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.0.0) - 08 Mar 2018

**Breaking Changes** If you are upgrading from a previous version, follow our comprehensive
   [Migration Guide](https://github.com/slackapi/node-slack-sdk/wiki/Migration-Guide-for-v4) to learn how to transport
   your app into the new, shiny, future!

## WebClient

  - New `apiCall(method, options)` public API for making generic Web API calls.
  - Improved logging
  - Improved error management
  - Configuration for custom http Agent
  - Custom TLS configuration
  - Tons of performance improvements

## RTMClient

  - Improved message queuing - No need to wait for client to connect before sending a message.
  - Lifecycle events driven by an all-new state machine
  - New keep-alive algorithm
  - Improved logging
  - Improved error management
  - Configuration for custom http Agent
  - Custom TLS configuration
  - Tons of performance improvements

## General

*  **TypeScript declarations available for all APIs :tada:**
*  Updates all dependencies to their latest version
*  Drops support for node versions less than 6.0

[Changes][v4.0.0]


<a name="v3.16.0"></a>
# [@slack/client v3.16.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v3.16.0) - 02 Feb 2018

- Adds several missing RTM events into `RTM.EVENTS` export (thanks [@clavin](https://github.com/clavin)) [#457](https://github.com/slackapi/node-slack-sdk/issues/457) [#448](https://github.com/slackapi/node-slack-sdk/issues/448)
- Adds `users.lookupByEmail` to WebClient (thanks [@DominikPalo](https://github.com/DominikPalo)) [#434](https://github.com/slackapi/node-slack-sdk/issues/434)
- Fixes stale values kept across requests when using `requestOptionsTransport` (thanks [@bertrandom](https://github.com/bertrandom)) [#450](https://github.com/slackapi/node-slack-sdk/issues/450)
- Adds documentation for presence subscription over RTM (thanks [@aoberoi](https://github.com/aoberoi)) [#454](https://github.com/slackapi/node-slack-sdk/issues/454)
- Fixes typos in documentation (thanks [@konklone](https://github.com/konklone), [@marclemagne](https://github.com/marclemagne), [@aoberoi](https://github.com/aoberoi)) [#444](https://github.com/slackapi/node-slack-sdk/issues/444), [#446](https://github.com/slackapi/node-slack-sdk/issues/446), [#461](https://github.com/slackapi/node-slack-sdk/issues/461), [#466](https://github.com/slackapi/node-slack-sdk/issues/466)

As always, just run `npm install @slack/client` to get the latest version. _Stay tuned for v4, coming soon!_

[Changes][v3.16.0]


<a name="v3.15.0"></a>
# [@slack/client v3.15.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v3.15.0) - 22 Dec 2017

 **Deprecates data store APIs** See the migration document for more details: https://github.com/slackapi/node-slack-sdk/wiki/DataStore-v3.x-Migration-Guide


  - Major docs content rewrite (thanks [@aoberoi](https://github.com/aoberoi)) [#428](https://github.com/slackapi/node-slack-sdk/issues/428), [#239](https://github.com/slackapi/node-slack-sdk/issues/239), [#305](https://github.com/slackapi/node-slack-sdk/issues/305), [#310](https://github.com/slackapi/node-slack-sdk/issues/310), [#364](https://github.com/slackapi/node-slack-sdk/issues/364), [#366](https://github.com/slackapi/node-slack-sdk/issues/366), [#413](https://github.com/slackapi/node-slack-sdk/issues/413), [#411](https://github.com/slackapi/node-slack-sdk/issues/411), [#423](https://github.com/slackapi/node-slack-sdk/issues/423)
  - Adds `chat.getPermalink` Web API method (thanks [@DominikPalo](https://github.com/DominikPalo)) [#431](https://github.com/slackapi/node-slack-sdk/issues/431)
  - Adds `opts.user` argument to `users.identity` Web API method (thanks [@bertrandom](https://github.com/bertrandom)) [#432](https://github.com/slackapi/node-slack-sdk/issues/432)
  - Fixes bug with not passing optional arguments for `conversations.info` (thanks [@aoberoi](https://github.com/aoberoi)) [#441](https://github.com/slackapi/node-slack-sdk/issues/441)
  - Fixes dead link to node-retry (thanks [@pine](https://github.com/pine)) [#433](https://github.com/slackapi/node-slack-sdk/issues/433)
  - Adds eaiser support for `Buffer` input in `files.upload` Web API method (thanks [@aoeberoi](https://github.com/aoeberoi)) [#307](https://github.com/slackapi/node-slack-sdk/issues/307)
  - Refactors logger usage across the package (thanks [@aoberoi](https://github.com/aoberoi)) [#334](https://github.com/slackapi/node-slack-sdk/issues/334)
  - General JSDoc, `require()`, dead code, clean up

[Changes][v3.15.0]


<a name="v3.14.2"></a>
# [@slack/client 3.14.2 (v3.14.2)](https://github.com/slackapi/node-slack-sdk/releases/tag/v3.14.2) - 15 Nov 2017

Adds a new transport that lets you define options on the request module, expose it from the library

[Changes][v3.14.2]


<a name="v3.14.0"></a>
# [@slack/client v3.14.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v3.14.0) - 28 Sep 2017

Adds support for Dialogs

[Changes][v3.14.0]


<a name="v3.13.0"></a>
# [@slack/client v3.13.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v3.13.0) - 12 Sep 2017

  * Adds support for the `conversations.*` family of Web API methods. See https://api.slack.com/docs/conversations-api. - thanks [@aoberoi](https://github.com/aoberoi)
  * Adds locale awareness options to various Web API methods. - thanks [@aoberoi](https://github.com/aoberoi)
  * Fixes an argument encoding issue with calling `users.profile.set` ([#360](https://github.com/slackapi/node-slack-sdk/issues/360)) - thanks [@aoberoi](https://github.com/aoberoi)
  * Removes an inaccurate comment ([#394](https://github.com/slackapi/node-slack-sdk/issues/394)) - thanks [@AriLFrankel](https://github.com/AriLFrankel)

[Changes][v3.13.0]


<a name="v3.12.0"></a>
# [@slack/client v3.12.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v3.12.0) - 24 Aug 2017

* Adds MPIM data to the DataStore as Groups ([#389](https://github.com/slackapi/node-slack-sdk/issues/389)) - thanks [@aoberoi](https://github.com/aoberoi) and [@bradslavin](https://github.com/bradslavin)

[Changes][v3.12.0]


<a name="v3.11.0"></a>
# [@slack/client v3.11.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v3.11.0) - 11 Aug 2017

  * Added `chat.postEphemeral` Web API endpoint to the `WebClient` ([#384](https://github.com/slackapi/node-slack-sdk/issues/384)) - thanks [@shanedewael](https://github.com/shanedewael)
  * Added `linkNames` option to `IncomingWebhook` ([#342](https://github.com/slackapi/node-slack-sdk/issues/342)) - thanks [@mozamimy](https://github.com/mozamimy)
  * Ignored `package-lock.json` for use with npm 5 ([#385](https://github.com/slackapi/node-slack-sdk/issues/385)) - thanks [@aoberoi](https://github.com/aoberoi)

[Changes][v3.11.0]


<a name="v3.10.0"></a>
# [@slack/client v3.10.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v3.10.0) - 26 May 2017

  * RTM client can now be initialized to use `rtm.connect` instead of `rtm.start` with option `useConnect: true` ([#344](https://github.com/slackapi/node-slack-sdk/issues/344)) - thanks [@CharlieHess](https://github.com/CharlieHess)
  * Adds the new Web API method: `rtm.connect` ([#344](https://github.com/slackapi/node-slack-sdk/issues/344)) - thanks [@CharlieHess](https://github.com/CharlieHess)
  * Adds support for the `chat.unfurl` option `userAuthRequired` ([#336](https://github.com/slackapi/node-slack-sdk/issues/336)) - thanks [@againer](https://github.com/againer)
  * Adds the new Web API method: `im.replies` ([#339](https://github.com/slackapi/node-slack-sdk/issues/339)) - thanks [@moinism](https://github.com/moinism)
  * Adds support for presence subscriptions ([#350](https://github.com/slackapi/node-slack-sdk/issues/350)) - thanks [@CharlieHess](https://github.com/CharlieHess)
  * Improve reliability of RTM reconnects ([#349](https://github.com/slackapi/node-slack-sdk/issues/349)) - thanks [@CharlieHess](https://github.com/CharlieHess)
  * Fixes issue with RTM reconnect not using the same options as the initial connect ([#347](https://github.com/slackapi/node-slack-sdk/issues/347)) - thanks [@CharlieHess](https://github.com/CharlieHess)
  * Fixes out of order messages in client's request queue ([#346](https://github.com/slackapi/node-slack-sdk/issues/346)) - thanks [@chapmanc](https://github.com/chapmanc)
  * Fixes bug in `MemoryDataStore` when seaching for a user by username that does not exist in the team ([#332](https://github.com/slackapi/node-slack-sdk/issues/332)) - thanks [@frejos](https://github.com/frejos)
  * Fixes example code to work as described in the comments ([#337](https://github.com/slackapi/node-slack-sdk/issues/337)) - thanks [@lukeb-uk](https://github.com/lukeb-uk)

[Changes][v3.10.0]


<a name="v3.9.0"></a>
# [@slack/client v3.9.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v3.9.0) - 15 Mar 2017

Adds the new Web API method: `chat.unfurl`. Check out [App Unfurls](https://api.slack.com/docs/message-link-unfurling)!

[Changes][v3.9.0]


<a name="v3.8.1"></a>
# [@slack/client v3.8.1](https://github.com/slackapi/node-slack-sdk/releases/tag/v3.8.1) - 21 Dec 2016

- Well, that didn't go so well, now did it? This release fixes [#303](https://github.com/slackapi/node-slack-sdk/issues/303)


[Changes][v3.8.1]


<a name="v3.8.0"></a>
# [@slack/client v3.8.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v3.8.0) - 20 Dec 2016

- In the past, you had to contort your callbacks to any Web API endpoint, because not all errors were propogated through the error parameter. Well, good news: We are no longer forcing you to sit uncomfortably. Server errors that result in a `200 OK` + `{ok: false, error:"mumble_mumble"}` result are now passed through the error parameter so you can simplify your callback logic. If you want.
- Did you know that Slack will pass information on the scopes required to call a particular Web API endpoint? [We do](https://api.slack.com/docs/oauth-scopes#working_with_scopes)! And now you can get your hands on that very same information in your Web API callbacks too. Will help you debug and identify failed calls due to scoping issues.
- The Web API functionality has been expanded to include `users.profile.[get|set]`. Mind that you can only update your own profile :wink:
- Did you notice that there were errors in the documentation? There were (and almost certainly still are). Several concerned readers wrote in with comments and fixes, all of which have been addressed.
- Last but not least, we have added functionality to track basic usage of this SDK. All calls to the Web API and the RTM API are made with a user agent string that identifies the version of this SDK in use, as well as system information on node version and operating system. More better, you can add to this treasure trove of analytics—we've added a function in `helpers.js` that you can call from your code to let us know more about your framework or bot. In the future, we will be adding this same information to a wide range of SDKs that access the Slack Platform, and releasing usage data publicly so we can all see who is winning this popularity contest. 


[Changes][v3.8.0]


<a name="v3.7.0"></a>
# [@slack/client v3.7.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v3.7.0) - 05 Dec 2016

- Don't know a user's ID? Want to find a DM with that user anyway? Now you can retrieve a DM from the memory store by username. Awesome.
- API endpoints of the form `a.b.c` required a bit of rather tortured code to call. We have removed the torture requirements, and you can now call them as you might expect.


[Changes][v3.7.0]


<a name="v3.6.1"></a>
# [@slack/client v3.6.1](https://github.com/slackapi/node-slack-sdk/releases/tag/v3.6.1) - 05 Dec 2016

- You can now use arbitrary images for your bot's avatar with incoming webhooks. Because
  your app wasn't creepy enough before.
- Previously, we had no support for HTTPS proxies. This unfortunate situation has been
  rectified, and now your bot can live behind the nastiest sorts of firewalls.


[Changes][v3.6.1]


<a name="v3.6.0"></a>
# [@slack/client v3.6.0](https://github.com/slackapi/node-slack-sdk/releases/tag/v3.6.0) - 06 Sep 2016

- Adds support for Incoming Webhooks
- Fixes a bug around User IDs


[Changes][v3.6.0]


<a name="3.5.4"></a>
# [@slack/client v3.5.4](https://github.com/slackapi/node-slack-sdk/releases/tag/3.5.4) - 01 Aug 2016

- Fixes a bug whereby events with fields not recognized cause a crash. Wow.
- Updated some logic around what user ids look like.


[Changes][3.5.4]


<a name="3.5.3"></a>
# [@slack/client v3.5.3](https://github.com/slackapi/node-slack-sdk/releases/tag/3.5.3) - 25 Jul 2016

- Fixes a bug in the `package.json` published by 3.5.2.


[Changes][3.5.3]


<a name="3.5.2"></a>
# [@slack/client v3.5.2](https://github.com/slackapi/node-slack-sdk/releases/tag/3.5.2) - 25 Jul 2016

- Updating the links in `package.json` so that you don't need SSL credentials to pull down the github repo.


[Changes][3.5.2]


<a name="3.5.1"></a>
# [@slack/client v3.5.1](https://github.com/slackapi/node-slack-sdk/releases/tag/3.5.1) - 06 Jul 2016

- Updates `lodash` from `^3.10.1` to `^4.13.1`. And means it.
- Minor tweaks to existing documentation and example code to make them consistent with each other. Because hobgoblins are friendly and love you.


[Changes][3.5.1]


<a name="3.5.0"></a>
# [@slack/client v3.5.0](https://github.com/slackapi/node-slack-sdk/releases/tag/3.5.0) - 15 Jun 2016

- Adds the [team.billableInfo](https://api.slack.com/methods/team.billableInfo) endpoint to the team facet
- Adds the [bots.info](https://api.slack.com/methods/bots.info) endpoint and creates the `bots` facet
- Removes the `user` optional argument from the [stars.list](https://api.slack.com/methods/stars.list) method


[Changes][3.5.0]


<a name="3.4.0"></a>
# [@slack/client v3.4.0](https://github.com/slackapi/node-slack-sdk/releases/tag/3.4.0) - 01 Jun 2016

- Adds the [chat.meMessage](https://api.slack.com/methods/chat.meMessage) endpoint to the chat facet


[Changes][3.4.0]


<a name="3.3.0"></a>
# [@slack/client v3.3.0](https://github.com/slackapi/node-slack-sdk/releases/tag/3.3.0) - 25 May 2016

- Creates a memory data store by default if an undefined, but not false|null value is passed for `opts.dataStore`
- Aliases the retry policies to be human readable


[Changes][3.3.0]


<a name="3.2.1"></a>
# [@slack/client v3.2.1](https://github.com/slackapi/node-slack-sdk/releases/tag/3.2.1) - 25 May 2016

- Updates the RTM client to emit an UNABLE_TO_RTM_START event when all reconnection attempts are exhausted, rather than throwing an error
- Suppresses some spurious log lines when tests are run


[Changes][3.2.1]


<a name="3.2.0"></a>
# [@slack/client v3.2.0](https://github.com/slackapi/node-slack-sdk/releases/tag/3.2.0) - 24 May 2016

- Updates the `_makeAPICall` method to make the optional API args param optional to pass in, so the third param to this function can be either an opts object or a cb. This is to allow us to add optional arguments to API methods without it being a breaking change.
- Fixes the `retry-after` header name and adds a numeric fallback if the retry-after value can't be parsed, thanks [@foiseworth](https://github.com/foiseworth)!
- Adds new API methods to various facets
  - [`auth.revoke`](/lib/clients/web/facets/auth.js)
  - [`users.identify`](/lib/clients/web/facets/users.js)
- Adds optional arguments to:
  - [`files.comments.add`](/lib/clients/web/facets/files.comments.js): adds a `channel` param, for the channel id of the location to associate with the new comment
  - [`chat.delete`](/lib/clients/web/facets/chat.js): adds a boolean `as_user` param, to support deleting a message as the authed user


[Changes][3.2.0]


<a name="3.1.1"></a>
# [@slack/client v3.1.1](https://github.com/slackapi/node-slack-sdk/releases/tag/3.1.1) - 19 May 2016

- Removes the DM facet
- Updates the aliasing approach for IM / DM to correctly alias DM to the IM Facet


[Changes][3.1.1]


<a name="3.1.0"></a>
# [@slack/client v3.1.0](https://github.com/slackapi/node-slack-sdk/releases/tag/3.1.0) - 02 May 2016

- Updates the [`lib/clients/web/facets/index.js`](/lib/clients/web/facets/index.js) to reference the new facets added in the 3.0.0 update, thanks [@ekmartin](https://github.com/ekmartin)
- Adds in a [`reminders`](/lib/clients/web/facets/reminders.js) client facet
- MemoryDataStore.getUserByEmail now looks at the correct part of the user object for the email, thanks [@SimantovYousoufov](https://github.com/SimantovYousoufov)
- Adds docs and examples for the data store and sending DMs, thanks [@PaulAsjes](https://github.com/PaulAsjes)!


[Changes][3.1.0]


<a name="3.0.0"></a>
# [@slack/client v3.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/3.0.0) - 02 May 2016

- Adds a number of new web client API facets:
  - [`dnd`](/lib/clients/web/facets/dnd.js)
  - [`files.comments`](/lib/clients/web/facets/files.comments.js)
  - [`mpim`](/lib/clients/web/facets/mpim.js)
  - [`usergroups`](/lib/clients/web/facets/usergroups.js)
  - [`usergroups.users`](/lib/clients/web/facets/usergroups.users.js)
- **BREAKING** Changes the function signatures for some facet methods:
  - [`channels.list`](/lib/clients/web/facets/channels.js): `exclude_archived` moves to an `opts` object, instead of being a separate argument
  - [`groups.list`](/lib/clients/web/facets/groups.js): `exclude_archived` moves to an `opts` object, instead of being a separate argument
  - [`chat.delete`](/lib/clients/web/facets/chat.js): The `ts` and `channel` arguments are re-ordered to be alphabetical
  - [`stars.list`](/lib/clients/web/facets/stars.js): `user` moves to an `opts` object, instead of being a separate argument
  - [`users.list`](/lib/clients/web/facets/users.js): `presence` moves to an `opts` object, instead of being a separate argument
- **BREAKING** Updates the function signature for [`BaseAPIClient.prototype.makeAPICall`](/lib/clients/client.js) to take required API args and optional API args as separate params, from `makeAPICall(endpoint, optData, optCb)` to `makeAPICall(endpoint, apiArgs, apiOptArgs, optCb)`
- New methods are added to various facets:
  - [`files.revokePublicURL`](/lib/clients/web/facets/files.js)
  - [`files.sharedPublicURL`](/lib/clients/web/facets/files.js)
  - [`team.integrationLogs`](/lib/clients/web/facets/team.js)
  - [`team.integrationLogs`](/lib/clients/web/facets/team.js)


[Changes][3.0.0]


<a name="2.3.0"></a>
# [@slack/client v2.3.0](https://github.com/slackapi/node-slack-sdk/releases/tag/2.3.0) - 29 Mar 2016

- Caches messages on the RTM client, to improve handling in cases where message send fails
- Removes the handler for the websocket level ping handler (not the RTM API level ping handler)
- Refactors the logic for handling ws send responses to a single function


[Changes][2.3.0]


<a name="2.2.1"></a>
# [@slack/client v2.2.1](https://github.com/slackapi/node-slack-sdk/releases/tag/2.2.1) - 13 Mar 2016

- Adds an `im` alias for the `dm` facet to the web client, to match the API endpoint naming


[Changes][2.2.1]


<a name="2.2.0"></a>
# [@slack/client v2.2.0](https://github.com/slackapi/node-slack-sdk/releases/tag/2.2.0) - 12 Mar 2016

- Adds promise support to the RTM client `send` and `sendMessage` methods
- Fixes the way message response callbacks work, so that the success case is only called when the websocket receives a message with a `reply_to` matching the id of the dispatched message, instead of when the ws instance signals message send success
- Fixes the way `getAPICallArgs` works, to correctly pull data out of the `opts` arg


[Changes][2.2.0]


<a name="2.0.6"></a>
# [@slack/client v2.0.6](https://github.com/slackapi/node-slack-sdk/releases/tag/2.0.6) - 01 Mar 2016

- Fixes a crash introduce in `2.0.5` if you try and instantiate a `WebClient` without passing in any options


[Changes][2.0.6]


<a name="2.0.5"></a>
# [@slack/client v2.0.5](https://github.com/slackapi/node-slack-sdk/releases/tag/2.0.5) - 01 Mar 2016

- Updates the way that API requests are throttled to:
  - avoid a condition where the request queue callback could be called multiple times, causing a crash
  - refactor the logic in `_callTransport` into multiple functions to make it easier to follow
- Updates dev dependencies:
  - eslint
  - nock
  - eslint-config-airbnb

NOTE: This release contained a bad bag that would cause a crash if you created a `WebClient` without passing in any options. It's been unpublished from NPM and _should not_ be used from here. Please use the `2.0.6` release instead.


[Changes][2.0.5]


<a name="2.0.4"></a>
# [@slack/client v2.0.4](https://github.com/slackapi/node-slack-sdk/releases/tag/2.0.4) - 28 Feb 2016

- Passes through the logLevel param to the getLogger function


[Changes][2.0.4]


<a name="2.0.3"></a>
# [@slack/client v2.0.3](https://github.com/slackapi/node-slack-sdk/releases/tag/2.0.3) - 28 Feb 2016

- The RTM `AUTHENTICATED` event now also emits the `rtm.start` payload
- Fixes the way that loggers are instantiated and used, so that the JSDoc for `opts.logger` is correct


[Changes][2.0.3]


<a name="2.0.2"></a>
# [@slack/client v2.0.2](https://github.com/slackapi/node-slack-sdk/releases/tag/2.0.2) - 16 Feb 2016

- Adds coveralls to the repo, to track code coverage and display a badge in the README
- Updates the disconnect function on the RTM client to support both an error message and a code or reason for the disconnect, e.g. `account_inactive`
- Updates the message-handlers for `team_xxx` events to set the team back to the data-store once changes are made


[Changes][2.0.2]


<a name="2.0.1"></a>
# [@slack/client v2.0.1](https://github.com/slackapi/node-slack-sdk/releases/tag/2.0.1) - 13 Feb 2016

- Updates to ws@1.0.1
- Fixes a bad variable name in example-web-client


[Changes][2.0.1]


<a name="2.0.0"></a>
# [@slack/client v2.0.0](https://github.com/slackapi/node-slack-sdk/releases/tag/2.0.0) - 13 Feb 2016

Refactors the library to javascript, adds a lot of tests and restructures it to improve maintainability and extend functionality.
- Creates two separate clients:
  - RTM; manages connection to Slack's RTM API, including reconnects
  - Web; provideas a callback interface to all of Slack's Web API endpoints
- Moves the memory data store implementation off the clients and into its own class
- Uncouples the model objects from the clients; model functions to send messages to channels etc are now accessed via the web and RTM client
- Moves the transport layer (websockets and HTTP) to a pluggable model, so that complex transports (through request proxies etc) can be handled
- Adds test coverage on most core functionality in the library


[Changes][2.0.0]


[@slack/web-api@7.3.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@7.3.0...@slack/web-api@7.3.1
[@slack/web-api@7.3.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@7.2.0...@slack/web-api@7.3.0
[@slack/web-api@7.2.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@7.1.0...@slack/web-api@7.2.0
[@slack/web-api@7.1.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@2.12.0...@slack/web-api@7.1.0
[@slack/types@2.12.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/cli-test@0.2.0+cli.2.25.0...@slack/types@2.12.0
[@slack/cli-test@0.2.0+cli.2.25.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/cli-test@0.1.0-cli.2.25.0...@slack/cli-test@0.2.0+cli.2.25.0
[@slack/cli-test@0.1.0-cli.2.25.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/socket-mode@2.0.0...@slack/cli-test@0.1.0-cli.2.25.0
[@slack/socket-mode@2.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/socket-mode@1.3.5...@slack/socket-mode@2.0.0
[@slack/socket-mode@1.3.5]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@7.0.4...@slack/socket-mode@1.3.5
[@slack/web-api@7.0.4]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@7.0.3...@slack/web-api@7.0.4
[@slack/web-api@7.0.3]: https://github.com/slackapi/node-slack-sdk/compare/@slack/rtm-api@7.0.0...@slack/web-api@7.0.3
[@slack/rtm-api@7.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/cli-hooks@1.1.0...@slack/rtm-api@7.0.0
[@slack/cli-hooks@1.1.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/socket-mode@1.3.4...@slack/cli-hooks@1.1.0
[@slack/socket-mode@1.3.4]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@7.0.2...@slack/socket-mode@1.3.4
[@slack/web-api@7.0.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/cli-hooks@1.0.0...@slack/web-api@7.0.2
[@slack/cli-hooks@1.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.12.0...@slack/cli-hooks@1.0.0
[@slack/web-api@6.12.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@7.0.1...@slack/web-api@6.12.0
[@slack/web-api@7.0.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@3.0.0...@slack/web-api@7.0.1
[@slack/oauth@3.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@7.0.0...@slack/oauth@3.0.0
[@slack/web-api@7.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/socket-mode@1.3.3...@slack/web-api@7.0.0
[@slack/socket-mode@1.3.3]: https://github.com/slackapi/node-slack-sdk/compare/@slack/rtm-api@6.2.1...@slack/socket-mode@1.3.3
[@slack/rtm-api@6.2.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.6.2...@slack/rtm-api@6.2.1
[@slack/oauth@2.6.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.11.2...@slack/oauth@2.6.2
[@slack/web-api@6.11.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/webhook@7.0.2...@slack/web-api@6.11.2
[@slack/webhook@7.0.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.11.1...@slack/webhook@7.0.2
[@slack/web-api@6.11.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.11.0...@slack/web-api@6.11.1
[@slack/web-api@6.11.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@2.11.0...@slack/web-api@6.11.0
[@slack/types@2.11.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@7.0.0-rc.0...@slack/types@2.11.0
[@slack/web-api@7.0.0-rc.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/rtm-api@6.2.0...@slack/web-api@7.0.0-rc.0
[@slack/rtm-api@6.2.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.10.0...@slack/rtm-api@6.2.0
[@slack/web-api@6.10.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@2.10.0...@slack/web-api@6.10.0
[@slack/types@2.10.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/webhook@7.0.1...@slack/types@2.10.0
[@slack/webhook@7.0.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.9.1...@slack/webhook@7.0.1
[@slack/web-api@6.9.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/webhook@7.0.0...@slack/web-api@6.9.1
[@slack/webhook@7.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@2.9.0...@slack/webhook@7.0.0
[@slack/types@2.9.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/rtm-api@6.1.1...@slack/types@2.9.0
[@slack/rtm-api@6.1.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.9.0...@slack/rtm-api@6.1.1
[@slack/web-api@6.9.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.6.1...@slack/web-api@6.9.0
[@slack/oauth@2.6.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/rtm-api@6.1.0...@slack/oauth@2.6.1
[@slack/rtm-api@6.1.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.8.1...@slack/rtm-api@6.1.0
[@slack/web-api@6.8.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.6.0...@slack/web-api@6.8.1
[@slack/oauth@2.6.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.8.0...@slack/oauth@2.6.0
[@slack/web-api@6.8.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@2.8.0...@slack/web-api@6.8.0
[@slack/types@2.8.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/socket-mode@1.3.2...@slack/types@2.8.0
[@slack/socket-mode@1.3.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.7.2-nextGen.1...@slack/socket-mode@1.3.2
[@slack/web-api@6.7.2-nextGen.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@2.7.0...@slack/web-api@6.7.2-nextGen.1
[@slack/types@2.7.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.5.4...@slack/types@2.7.0
[@slack/oauth@2.5.4]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@2.6.0...@slack/oauth@2.5.4
[@slack/types@2.6.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.5.3...@slack/types@2.6.0
[@slack/oauth@2.5.3]: https://github.com/slackapi/node-slack-sdk/compare/@slack/socket-mode@1.3.1...@slack/oauth@2.5.3
[@slack/socket-mode@1.3.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.7.2...@slack/socket-mode@1.3.1
[@slack/web-api@6.7.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@2.5.0...@slack/web-api@6.7.2
[@slack/types@2.5.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.5.2...@slack/types@2.5.0
[@slack/oauth@2.5.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/socket-mode@1.3.0...@slack/oauth@2.5.2
[@slack/socket-mode@1.3.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/socket-mode@1.3.0-rc.1...@slack/socket-mode@1.3.0
[@slack/socket-mode@1.3.0-rc.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/socket-mode@1.3.0-rc.0...@slack/socket-mode@1.3.0-rc.1
[@slack/socket-mode@1.3.0-rc.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.7.1...@slack/socket-mode@1.3.0-rc.0
[@slack/web-api@6.7.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.5.1...@slack/web-api@6.7.1
[@slack/oauth@2.5.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.5.0...@slack/oauth@2.5.1
[@slack/oauth@2.5.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.5.0-rc.1...@slack/oauth@2.5.0
[@slack/oauth@2.5.0-rc.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.7.0...@slack/oauth@2.5.0-rc.1
[@slack/web-api@6.7.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.6.0...@slack/web-api@6.7.0
[@slack/web-api@6.6.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/webhook@6.1.0...@slack/web-api@6.6.0
[@slack/webhook@6.1.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.4.0...@slack/webhook@6.1.0
[@slack/oauth@2.4.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.5.1-hermesBeta.2...@slack/oauth@2.4.0
[@slack/web-api@6.5.1-hermesBeta.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@2.4.0-hermesBeta.1...@slack/web-api@6.5.1-hermesBeta.2
[@slack/types@2.4.0-hermesBeta.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@2.4.0...@slack/types@2.4.0-hermesBeta.1
[@slack/types@2.4.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@2.3.0...@slack/types@2.4.0
[@slack/types@2.3.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.5.0...@slack/types@2.3.0
[@slack/web-api@6.5.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/socket-mode@1.2.0...@slack/web-api@6.5.0
[@slack/socket-mode@1.2.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.4.0-appManifestsBeta.1...@slack/socket-mode@1.2.0
[@slack/web-api@6.4.0-appManifestsBeta.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.3.0...@slack/web-api@6.4.0-appManifestsBeta.1
[@slack/oauth@2.3.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.4.0...@slack/oauth@2.3.0
[@slack/web-api@6.4.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@2.2.0...@slack/web-api@6.4.0
[@slack/types@2.2.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.4.0-hermesBeta.1...@slack/types@2.2.0
[@slack/web-api@6.4.0-hermesBeta.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.3.0...@slack/web-api@6.4.0-hermesBeta.1
[@slack/web-api@6.3.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.2.0...@slack/web-api@6.3.0
[@slack/oauth@2.2.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@2.1.0...@slack/oauth@2.2.0
[@slack/types@2.1.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@2.0.2...@slack/types@2.1.0
[@slack/interactive-messages@2.0.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/events-api@3.0.1...@slack/interactive-messages@2.0.2
[@slack/events-api@3.0.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.1.0...@slack/events-api@3.0.1
[@slack/oauth@2.1.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.2.4...@slack/oauth@2.1.0
[@slack/web-api@6.2.4]: https://github.com/slackapi/node-slack-sdk/compare/@slack/socket-mode@1.1.0...@slack/web-api@6.2.4
[@slack/socket-mode@1.1.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.2.3...@slack/socket-mode@1.1.0
[@slack/web-api@6.2.3]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.2.2...@slack/web-api@6.2.3
[@slack/web-api@6.2.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.2.1...@slack/web-api@6.2.2
[@slack/web-api@6.2.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.2.0...@slack/web-api@6.2.1
[@slack/web-api@6.2.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.1.0...@slack/web-api@6.2.0
[@slack/web-api@6.1.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/socket-mode@1.0.2...@slack/web-api@6.1.0
[@slack/socket-mode@1.0.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@2.0.1...@slack/socket-mode@1.0.2
[@slack/interactive-messages@2.0.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/socket-mode@1.0.1...@slack/interactive-messages@2.0.1
[@slack/socket-mode@1.0.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.0.1...@slack/socket-mode@1.0.1
[@slack/oauth@2.0.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/webhook@6.0.0...@slack/oauth@2.0.1
[@slack/webhook@6.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@6.0.0...@slack/webhook@6.0.0
[@slack/web-api@6.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@2.0.0...@slack/web-api@6.0.0
[@slack/types@2.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/socket-mode@1.0.0...@slack/types@2.0.0
[@slack/socket-mode@1.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/rtm-api@6.0.0...@slack/socket-mode@1.0.0
[@slack/rtm-api@6.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@2.0.0...@slack/rtm-api@6.0.0
[@slack/oauth@2.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/logger@3.0.0...@slack/oauth@2.0.0
[@slack/logger@3.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@2.0.0...@slack/logger@3.0.0
[@slack/interactive-messages@2.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/events-api@3.0.0...@slack/interactive-messages@2.0.0
[@slack/events-api@3.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/webhook@5.0.4...@slack/events-api@3.0.0
[@slack/webhook@5.0.4]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.15.0...@slack/webhook@5.0.4
[@slack/web-api@5.15.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@1.7.1...@slack/web-api@5.15.0
[@slack/interactive-messages@1.7.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.14.0...@slack/interactive-messages@1.7.1
[@slack/web-api@5.14.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@1.4.0...@slack/web-api@5.14.0
[@slack/oauth@1.4.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.13.0...@slack/oauth@1.4.0
[@slack/web-api@5.13.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@1.10.0...@slack/web-api@5.13.0
[@slack/types@1.10.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@1.3.0...@slack/types@1.10.0
[@slack/oauth@1.3.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.12.0...@slack/oauth@1.3.0
[@slack/web-api@5.12.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@1.9.0...@slack/web-api@5.12.0
[@slack/types@1.9.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@1.8.0-workflowStepsBeta.2...@slack/types@1.9.0
[@slack/types@1.8.0-workflowStepsBeta.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@1.2.0...@slack/types@1.8.0-workflowStepsBeta.2
[@slack/oauth@1.2.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.11.0-workflowStepsBeta.1...@slack/oauth@1.2.0
[@slack/web-api@5.11.0-workflowStepsBeta.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@1.8.0-workflowStepsBeta.1...@slack/web-api@5.11.0-workflowStepsBeta.1
[@slack/types@1.8.0-workflowStepsBeta.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@1.8.0...@slack/types@1.8.0-workflowStepsBeta.1
[@slack/types@1.8.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/events-api@2.3.4...@slack/types@1.8.0
[@slack/events-api@2.3.4]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.11.0...@slack/events-api@2.3.4
[@slack/web-api@5.11.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.10.0-workflowStepsBeta.1...@slack/web-api@5.11.0
[@slack/web-api@5.10.0-workflowStepsBeta.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.10.0...@slack/web-api@5.10.0-workflowStepsBeta.1
[@slack/web-api@5.10.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@1.7.0...@slack/web-api@5.10.0
[@slack/types@1.7.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/rtm-api@5.0.5...@slack/types@1.7.0
[@slack/rtm-api@5.0.5]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.9.0...@slack/rtm-api@5.0.5
[@slack/web-api@5.9.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@1.1.0...@slack/web-api@5.9.0
[@slack/oauth@1.1.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/events-api@2.3.3...@slack/oauth@1.1.0
[@slack/events-api@2.3.3]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.8.1...@slack/events-api@2.3.3
[@slack/web-api@5.8.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@1.6.0...@slack/web-api@5.8.1
[@slack/types@1.6.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/rtm-api@5.0.4...@slack/types@1.6.0
[@slack/rtm-api@5.0.4]: https://github.com/slackapi/node-slack-sdk/compare/@slack/oauth@1.0.0...@slack/rtm-api@5.0.4
[@slack/oauth@1.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@1.6.0...@slack/oauth@1.0.0
[@slack/interactive-messages@1.6.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@1.5.0...@slack/interactive-messages@1.6.0
[@slack/types@1.5.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/webhook@5.0.3...@slack/types@1.5.0
[@slack/webhook@5.0.3]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.8.0...@slack/webhook@5.0.3
[@slack/web-api@5.8.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@1.4.0...@slack/web-api@5.8.0
[@slack/types@1.4.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@1.5.0...@slack/types@1.4.0
[@slack/interactive-messages@1.5.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/events-api@2.3.2...@slack/interactive-messages@1.5.0
[@slack/events-api@2.3.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.7.0...@slack/events-api@2.3.2
[@slack/web-api@5.7.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@1.4.1...@slack/web-api@5.7.0
[@slack/interactive-messages@1.4.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/events-api@2.3.1...@slack/interactive-messages@1.4.1
[@slack/events-api@2.3.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.6.0...@slack/events-api@2.3.1
[@slack/web-api@5.6.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@1.3.0...@slack/web-api@5.6.0
[@slack/types@1.3.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.5.0...@slack/types@1.3.0
[@slack/web-api@5.5.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@1.4.0...@slack/web-api@5.5.0
[@slack/interactive-messages@1.4.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.4.0...@slack/interactive-messages@1.4.0
[@slack/web-api@5.4.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.3.0...@slack/web-api@5.4.0
[@slack/web-api@5.3.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/logger@2.0.0...@slack/web-api@5.3.0
[@slack/logger@2.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/logger@1.1.1...@slack/logger@2.0.0
[@slack/logger@1.1.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.2.1...@slack/logger@1.1.1
[@slack/web-api@5.2.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@1.2.1...@slack/web-api@5.2.1
[@slack/types@1.2.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/webhook@5.0.2...@slack/types@1.2.1
[@slack/webhook@5.0.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.2.0...@slack/webhook@5.0.2
[@slack/web-api@5.2.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@1.2.0...@slack/web-api@5.2.0
[@slack/types@1.2.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/rtm-api@5.0.3...@slack/types@1.2.0
[@slack/rtm-api@5.0.3]: https://github.com/slackapi/node-slack-sdk/compare/@slack/logger@1.1.0...@slack/rtm-api@5.0.3
[@slack/logger@1.1.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@1.3.0...@slack/logger@1.1.0
[@slack/interactive-messages@1.3.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/webhook@5.0.1...@slack/interactive-messages@1.3.0
[@slack/webhook@5.0.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.1.0...@slack/webhook@5.0.1
[@slack/web-api@5.1.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/types@1.1.0...@slack/web-api@5.1.0
[@slack/types@1.1.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@1.2.0...@slack/types@1.1.0
[@slack/interactive-messages@1.2.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/events-api@2.3.0...@slack/interactive-messages@1.2.0
[@slack/events-api@2.3.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/client@5.0.2...@slack/events-api@2.3.0
[@slack/client@5.0.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.0.1...@slack/client@5.0.2
[@slack/web-api@5.0.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/rtm-api@5.0.1...@slack/web-api@5.0.1
[@slack/rtm-api@5.0.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/client@5.0.1...@slack/rtm-api@5.0.1
[@slack/client@5.0.1]: https://github.com/slackapi/node-slack-sdk/compare/v5.0.0...@slack/client@5.0.1
[v5.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/webhook@5.0.0...v5.0.0
[@slack/webhook@5.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/web-api@5.0.0...@slack/webhook@5.0.0
[@slack/web-api@5.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/rtm-api@5.0.0...@slack/web-api@5.0.0
[@slack/rtm-api@5.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@v1.1.1...@slack/rtm-api@5.0.0
[@slack/interactive-messages@v1.1.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@v1.1.0...@slack/interactive-messages@v1.1.1
[@slack/interactive-messages@v1.1.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@v1.0.2...@slack/interactive-messages@v1.1.0
[@slack/interactive-messages@v1.0.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@v1.0.0...@slack/interactive-messages@v1.0.2
[@slack/interactive-messages@v1.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@v0.4.0...@slack/interactive-messages@v1.0.0
[@slack/interactive-messages@v0.4.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@v0.3.0...@slack/interactive-messages@v0.4.0
[@slack/interactive-messages@v0.3.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@v0.2.0...@slack/interactive-messages@v0.3.0
[@slack/interactive-messages@v0.2.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/interactive-messages@v0.1.2...@slack/interactive-messages@v0.2.0
[@slack/interactive-messages@v0.1.2]: https://github.com/slackapi/node-slack-sdk/compare/@slack/events-api@v2.2.1...@slack/interactive-messages@v0.1.2
[@slack/events-api@v2.2.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/events-api@v2.2.0...@slack/events-api@v2.2.1
[@slack/events-api@v2.2.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/events-api@v2.1.0...@slack/events-api@v2.2.0
[@slack/events-api@v2.1.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/events-api@v2.0.0...@slack/events-api@v2.1.0
[@slack/events-api@v2.0.0]: https://github.com/slackapi/node-slack-sdk/compare/@slack/events-api@v1.0.1...@slack/events-api@v2.0.0
[@slack/events-api@v1.0.1]: https://github.com/slackapi/node-slack-sdk/compare/@slack/client@5.0.0...@slack/events-api@v1.0.1
[@slack/client@5.0.0]: https://github.com/slackapi/node-slack-sdk/compare/v4.12.0...@slack/client@5.0.0
[v4.12.0]: https://github.com/slackapi/node-slack-sdk/compare/v4.11.0...v4.12.0
[v4.11.0]: https://github.com/slackapi/node-slack-sdk/compare/v4.10.0...v4.11.0
[v4.10.0]: https://github.com/slackapi/node-slack-sdk/compare/v4.9.0...v4.10.0
[v4.9.0]: https://github.com/slackapi/node-slack-sdk/compare/v4.8.0...v4.9.0
[v4.8.0]: https://github.com/slackapi/node-slack-sdk/compare/v4.7.0...v4.8.0
[v4.7.0]: https://github.com/slackapi/node-slack-sdk/compare/v3.16.1-sec.2...v4.7.0
[v3.16.1-sec.2]: https://github.com/slackapi/node-slack-sdk/compare/v4.6.0...v3.16.1-sec.2
[v4.6.0]: https://github.com/slackapi/node-slack-sdk/compare/v4.5.0...v4.6.0
[v4.5.0]: https://github.com/slackapi/node-slack-sdk/compare/v4.4.0...v4.5.0
[v4.4.0]: https://github.com/slackapi/node-slack-sdk/compare/v3.16.1-sec...v4.4.0
[v3.16.1-sec]: https://github.com/slackapi/node-slack-sdk/compare/v4.3.1...v3.16.1-sec
[v4.3.1]: https://github.com/slackapi/node-slack-sdk/compare/v4.3.0...v4.3.1
[v4.3.0]: https://github.com/slackapi/node-slack-sdk/compare/v4.2.2...v4.3.0
[v4.2.2]: https://github.com/slackapi/node-slack-sdk/compare/v4.2.0...v4.2.2
[v4.2.0]: https://github.com/slackapi/node-slack-sdk/compare/v4.1.0...v4.2.0
[v4.1.0]: https://github.com/slackapi/node-slack-sdk/compare/v4.0.1...v4.1.0
[v4.0.1]: https://github.com/slackapi/node-slack-sdk/compare/v4.0.0...v4.0.1
[v4.0.0]: https://github.com/slackapi/node-slack-sdk/compare/v3.16.0...v4.0.0
[v3.16.0]: https://github.com/slackapi/node-slack-sdk/compare/v3.15.0...v3.16.0
[v3.15.0]: https://github.com/slackapi/node-slack-sdk/compare/v3.14.2...v3.15.0
[v3.14.2]: https://github.com/slackapi/node-slack-sdk/compare/v3.14.0...v3.14.2
[v3.14.0]: https://github.com/slackapi/node-slack-sdk/compare/v3.13.0...v3.14.0
[v3.13.0]: https://github.com/slackapi/node-slack-sdk/compare/v3.12.0...v3.13.0
[v3.12.0]: https://github.com/slackapi/node-slack-sdk/compare/v3.11.0...v3.12.0
[v3.11.0]: https://github.com/slackapi/node-slack-sdk/compare/v3.10.0...v3.11.0
[v3.10.0]: https://github.com/slackapi/node-slack-sdk/compare/v3.9.0...v3.10.0
[v3.9.0]: https://github.com/slackapi/node-slack-sdk/compare/v3.8.1...v3.9.0
[v3.8.1]: https://github.com/slackapi/node-slack-sdk/compare/v3.8.0...v3.8.1
[v3.8.0]: https://github.com/slackapi/node-slack-sdk/compare/v3.7.0...v3.8.0
[v3.7.0]: https://github.com/slackapi/node-slack-sdk/compare/v3.6.1...v3.7.0
[v3.6.1]: https://github.com/slackapi/node-slack-sdk/compare/v3.6.0...v3.6.1
[v3.6.0]: https://github.com/slackapi/node-slack-sdk/compare/3.5.4...v3.6.0
[3.5.4]: https://github.com/slackapi/node-slack-sdk/compare/3.5.3...3.5.4
[3.5.3]: https://github.com/slackapi/node-slack-sdk/compare/3.5.2...3.5.3
[3.5.2]: https://github.com/slackapi/node-slack-sdk/compare/3.5.1...3.5.2
[3.5.1]: https://github.com/slackapi/node-slack-sdk/compare/3.5.0...3.5.1
[3.5.0]: https://github.com/slackapi/node-slack-sdk/compare/3.4.0...3.5.0
[3.4.0]: https://github.com/slackapi/node-slack-sdk/compare/3.3.0...3.4.0
[3.3.0]: https://github.com/slackapi/node-slack-sdk/compare/3.2.1...3.3.0
[3.2.1]: https://github.com/slackapi/node-slack-sdk/compare/3.2.0...3.2.1
[3.2.0]: https://github.com/slackapi/node-slack-sdk/compare/3.1.1...3.2.0
[3.1.1]: https://github.com/slackapi/node-slack-sdk/compare/3.1.0...3.1.1
[3.1.0]: https://github.com/slackapi/node-slack-sdk/compare/3.0.0...3.1.0
[3.0.0]: https://github.com/slackapi/node-slack-sdk/compare/2.3.0...3.0.0
[2.3.0]: https://github.com/slackapi/node-slack-sdk/compare/2.2.1...2.3.0
[2.2.1]: https://github.com/slackapi/node-slack-sdk/compare/2.2.0...2.2.1
[2.2.0]: https://github.com/slackapi/node-slack-sdk/compare/2.0.6...2.2.0
[2.0.6]: https://github.com/slackapi/node-slack-sdk/compare/2.0.5...2.0.6
[2.0.5]: https://github.com/slackapi/node-slack-sdk/compare/2.0.4...2.0.5
[2.0.4]: https://github.com/slackapi/node-slack-sdk/compare/2.0.3...2.0.4
[2.0.3]: https://github.com/slackapi/node-slack-sdk/compare/2.0.2...2.0.3
[2.0.2]: https://github.com/slackapi/node-slack-sdk/compare/2.0.1...2.0.2
[2.0.1]: https://github.com/slackapi/node-slack-sdk/compare/2.0.0...2.0.1
[2.0.0]: https://github.com/slackapi/node-slack-sdk/tree/2.0.0

<!-- Generated by https://github.com/rhysd/changelog-from-release v3.7.2 -->
