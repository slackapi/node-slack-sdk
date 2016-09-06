### v3.6.0 (2016-09-06)
  * Adds support for Incoming Webhooks
  * Fixes a bug around User IDs

### v3.5.4 (2016-07-29)
  * Fixes a bug whereby events with fields not recognized cause a crash. Wow.
  * Updated some logic around what user ids look like.

### v3.5.3 (2016-07-25)
  * Fixes a bug in the package.json published by 3.5.2.

### v3.5.2 (2016-07-25)
  * Updating the links in package.json so that you don't need SSL credentials to pull down the github repo.

### v3.5.1 (2016-07-06)
  * Updates lodash from ^3.10.1 to ^4.13.1. And means it.
  * Minor tweaks to existing documentation and example code to make them consistent with each other. Because hobgoblins are friendly and love you.

### v3.5.0 (2016-06-14)

  * Adds the [team.billableInfo](https://api.slack.com/methods/team.billableInfo) endpoint to the team facet
  * Adds the [bots.info](https://api.slack.com/methods/bots.info) endpoint and creates the `bots` facet
  * Removes the `user` optional argument from the [stars.list](https://api.slack.com/methods/stars.list) method

### v3.4.0 (2016-05-31)

  * Adds the [chat.meMessage](https://api.slack.com/methods/chat.meMessage) endpoint to the chat facet

### v3.3.1 (2016-05-26)

  * Doesn't crash the RTM client if a message with a `reply_to` ID with no response handler is received

### v3.3.0 (2016-05-24)

  * Creates a memory data store by default if an undefined, but not false|null value is passed for `opts.dataStore`
  * Aliases the retry policies to be human readable

### v3.2.1 (2016-05-24)

  * Updates the RTM client to emit an UNABLE_TO_RTM_START event when all reconnection attempts are exhausted, rather than throwing an error
  * Suppresses some spurious log lines when tests are run

### v3.2.0 (2016-05-23)

  * Updates the `_makeAPICall` method to make the optional API args param optional to pass in, so the third param to this function can be either an opts object or a cb. This is to allow us to add optional arguments to API methods without it being a breaking change.
  * Fixes the `retry-after` header name and adds a numeric fallback if the retry-after value can't be parsed, thanks @foiseworth!
  * Adds new API methods to various facets
    - [`auth.revoke`](/lib/clients/web/facets/auth.js)
    - [`users.identify`](/lib/clients/web/facets/users.js)
  * Adds optional arguments to:
    - [`files.comments.add`](/lib/clients/web/facets/files.comments.js): adds a `channel` param, for the channel id of the location to associate with the new comment
    - [`chat.delete`](/lib/clients/web/facets/chat.js): adds a boolean `as_user` param, to support deleting a message as the authed user

### v3.1.1 (2016-05-19)

  * Removes the DM facet
  * Updates the aliasing approach for IM / DM to correctly alias DM to the IM Facet

### v3.1.0 (2016-05-01)

  * Updates the [`lib/clients/web/facets/index.js`](/lib/clients/web/facets/index.js) to reference the new facets added in the 3.0.0 update, thanks @ekmartin
  * Adds in a [`reminders`](/lib/clients/web/facets/reminders.js) client facet
  * MemoryDataStore.getUserByEmail now looks at the correct part of the user object for the email, thanks @SimantovYousoufov
  * Adds docs and examples for the data store and sending DMs, thanks @PaulAsjes!

### v3.0.0 (2016-04-24)

  * Adds a number of new web client API facets:
    - [`dnd`](/lib/clients/web/facets/dnd.js)
    - [`files.comments`](/lib/clients/web/facets/files.comments.js)
    - [`mpim`](/lib/clients/web/facets/mpim.js)
    - [`usergroups`](/lib/clients/web/facets/usergroups.js)
    - [`usergroups.users`](/lib/clients/web/facets/usergroups.users.js)
  * **BREAKING** Changes the function signatures for some facet methods:
    - [`channels.list`](/lib/clients/web/facets/channels.js): `exclude_archived` moves to an `opts` object, instead of being a separate argument
    - [`groups.list`](/lib/clients/web/facets/groups.js): `exclude_archived` moves to an `opts` object, instead of being a separate argument
    - [`chat.delete`](/lib/clients/web/facets/chat.js): The `ts` and `channel` arguments are re-ordered to be alphabetical
    - [`stars.list`](/lib/clients/web/facets/stars.js): `user` moves to an `opts` object, instead of being a separate argument
    - [`users.list`](/lib/clients/web/facets/users.js): `presence` moves to an `opts` object, instead of being a separate argument
  * **BREAKING** Updates the function signature for [`BaseAPIClient.prototype.makeAPICall`](/lib/clients/client.js) to take required API args and optional API args as separate params, from `makeAPICall(endpoint, optData, optCb)` to `makeAPICall(endpoint, apiArgs, apiOptArgs, optCb)`
  * New methods are added to various facets:
    - [`files.revokePublicURL`](/lib/clients/web/facets/files.js)
    - [`files.sharedPublicURL`](/lib/clients/web/facets/files.js)
    - [`team.integrationLogs`](/lib/clients/web/facets/team.js)
    - [`team.integrationLogs`](/lib/clients/web/facets/team.js)

### v2.3.0 (2016-02-28)

  * Caches messages on the RTM client, to improve handling in cases where message send fails
  * Removes the handler for the websocket level `ping` handler (not the RTM API level ping handler)
  * Refactors the logic for handling ws send responses to a single function

### v2.2.1 (2016-03-12)

  * Adds an `im` alias for the `dm` facet to the web client, to match the API endpoint naming

### v2.2.0 (2016-03-12)

  * Adds promise support to the RTM client `send` and `sendMessage` methods
  * Fixes the way message response callbacks work, so that the success case is only called when the websocket receives a message with a `reply_to` matching the id of the dispatched message, instead of when the ws instance signals message send success
  * Fixes the way `getAPICallArgs` works, to correctly pull data out of the `opts` arg

### v2.1.0 (2016-03-05)

 * Adds promises to the Slack clients. If no callback is passed to an API call, a promise will be created and returned instead.
 * Logs a warning if an API response with a `warning` key is received

### v2.0.6 (2016-03-01)

  * Fixes a crash introduce in `2.0.5` if you try and instantiate a `WebClient` without passing in any options

### v2.0.5 (2016-03-01)

  * Updates the way that API requests are throttled to:
    * avoid a condition where the request queue callback could be called multiple times, causing a crash
    * refactor the logic in `_callTransport` into multiple functions to make it easier to follow
  * Updates dev dependencies:
    * eslint
    * nock
    * eslint-config-airbnb

### v2.0.4 (2016-02-28)

  * Passes through the logLevel param to the getLogger function

### v2.0.3 (2016-02-28)

  * The RTM `AUTHENTICATED` event now also emits the `rtm.start` payload
  * Fixes the way that loggers are instantiated and used, so that the JSDoc for `opts.logger` is correct

### v2.0.2 (2016-02-15)

  * Adds coveralls to the repo, to track code coverage and display a badge in the README
  * Updates the disconnect function on the RTM client to support both an error message and a code or reason for the disconnect, e.g. `account_inactive`
  * Updates the message-handlers for `team_xxx` events to set the team back to the data-store once changes are made

### v2.0.1 (2016-02-13)

  * Updates to `ws@1.0.1`
  * Fixes a bad variable name in [`example-web-client`](/examples/example-web-client.js)

### v2.0.0 (2016-02-13)

  Refactors the library to javascript, adds a lot of tests and restructures it to improve maintainability and extend functionality.
  * Creates two separate clients:
    - RTM; manages connection to Slack's RTM API, including reconnects
    - Web; provideas a callback interface to all of Slack's Web API endpoints
  * Moves the memory data store implementation off the clients and into its own class
  * Uncouples the model objects from the clients; model functions to send messages to channels etc are now accessed via the web and RTM client
  * Moves the transport layer (websockets and HTTP) to a pluggable model, so that complex transports (through request proxies etc) can be handled
  * Adds test coverage on most core functionality in the library

### v1.5.1 (2015-12-15)

  * Adds support for a request-proxy URL to use the client from behind a proxy

### v1.5.0 (2015-12-01):

  * Updates the ws library from 0.4.3 to 0.8.1
  * Reconnects when a `team_migration_started` event is received
  * Supports finding users by email from the memory data store
  * Fixes the getUnreadCount and getChannelsWithUnreads functions
  * Emits error code and message when the ws closes
  * Removes no-op call when a `ping` is received on the websocket

### v1.4.0 (2015-02-25):

  * Added callbacks to all API calls ([#20](https://github.com/slackhq/node-slack-client/pull/20))
  * Added support for star added/delete events ([#27](https://github.com/slackhq/node-slack-client/pull/27)
  * Fixed sample code ([#18](https://github.com/slackhq/node-slack-client/issues/18))
  * `getChannelByName` now strips leading hash marks ([#9](https://github.com/slackhq/node-slack-client/pull/9))
  * Dropped support for Node 0.8 ([#25](https://github.com/slackhq/node-slack-client/pull/25))
  * Fix duplicate scripts entries in package.json ([230c7f74](https://github.com/slackhq/node-slack-client/commit/230c7f743a48f600aff5660367cf1e6816cc67e2))

### v1.3.1 (2015-02-03):

  * Added ability to call chat.postMessage web API method ([#15](https://github.com/slackhq/node-slack-client/pull/15))
  * Added ability to update and delete messages ([#14](https://github.com/slackhq/node-slack-client/pull/14) and [#17](https://github.com/slackhq/node-slack-client/pull/17))
  * Added sample code ([7ee93a7b](https://github.com/slackhq/node-slack-client/commit/7ee93a7bd51c97519d6d5deb54bd8058612a9b19))
  * Fixed `getChannelsWithUnreads` ([#8](https://github.com/slackhq/node-slack-client/pull/8))
  * Fixed race condition when emitting `open` event ([#19](https://github.com/slackhq/node-slack-client/pull/19))

### v1.2.2 (2014-12-16):

  * Compile coffeescript to JS before publishing to NPM ([#6](https://github.com/slackhq/node-slack-client/pull/6))
  * Fixed typo in docs ([#2](https://github.com/slackhq/node-slack-client/pull/2/files))

### v1.2.0 (2014-12-08)

  * First public release
