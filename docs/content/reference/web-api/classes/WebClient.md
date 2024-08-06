# Class: WebClient

A client for Slack's Web API

This client provides an alias for each [API method](https://api.slack.com/methods|Web). Each method is
a convenience wrapper for calling the [WebClient#apiCall](WebClient.md#apicall) method using the method name as the first parameter.

## Extends

- [`Methods`](Methods.md)

## Constructors

### new WebClient()

```ts
new WebClient(token?, __namedParameters?): WebClient
```

#### Parameters

• **token?**: `string`

An API token to authenticate/authorize with Slack (usually start with `xoxp`, `xoxb`)

• **\_\_namedParameters?**: [`WebClientOptions`](../interfaces/WebClientOptions.md) = `{}`

#### Returns

[`WebClient`](WebClient.md)

#### Overrides

[`Methods`](Methods.md).[`constructor`](Methods.md#constructors)

#### Defined in

[packages/web-api/src/WebClient.ts:187](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L187)

## Properties

### admin

```ts
readonly admin: object;
```

#### analytics

```ts
analytics: object;
```

#### analytics.getFile

```ts
getFile: Method<AdminAnalyticsGetFileArguments, AdminAnalyticsGetFileResponse>;
```

##### Description

Retrieve analytics data for a given date, presented as a compressed JSON file.

##### See

[`api.test` API reference](https://api.slack.com/methods/api.test).

#### apps

```ts
apps: object;
```

#### apps.activities

```ts
activities: object;
```

#### apps.activities.list

```ts
list: Method<AdminAppsActivitiesListArguments, AdminAppsActivitiesListResponse>;
```

##### Description

Get logs for a specified team/org.

##### See

[`admin.apps.activities.list` API reference](https://api.slack.com/methods/admin.apps.activities.list).

#### apps.approve

```ts
approve: Method<AdminAppsApproveArguments, AdminAppsApproveResponse>;
```

##### Description

Approve an app for installation on a workspace.

##### See

[`admin.apps.approve` API reference](https://api.slack.com/methods/admin.apps.approve).

#### apps.approved

```ts
approved: object;
```

#### apps.approved.list

```ts
list: Method<AdminAppsApprovedListArguments, AdminAppsApprovedListResponse>;
```

##### Description

List approved apps for an org or workspace.

##### See

[`admin.apps.approved.list` API reference](https://api.slack.com/methods/admin.apps.approved.list).

#### apps.clearResolution

```ts
clearResolution: Method<AdminAppsClearResolutionArguments, AdminAppsClearResolutionResponse>;
```

##### Description

Clear an app resolution.

##### See

[`admin.apps.clearResolution` API reference](https://api.slack.com/methods/admin.apps.clearResolution).

#### apps.config

```ts
config: object;
```

#### apps.config.lookup

```ts
lookup: Method<AdminAppsConfigLookupArguments, AdminAppsConfigLookupResponse>;
```

##### Description

Look up the app config for connectors by their IDs.

##### See

[`admin.apps.config.lookup` API reference](https://api.slack.com/methods/admin.apps.config.lookup).

#### apps.config.set

```ts
set: Method<AdminAppsConfigSetArguments, AdminAppsConfigSetResponse>;
```

##### Description

Set the app config for a connector.

##### See

[`admin.apps.config.set` API reference](https://api.slack.com/methods/admin.apps.config.set).

#### apps.requests

```ts
requests: object;
```

#### apps.requests.cancel

```ts
cancel: Method<AdminAppsRequestsCancelArguments, AdminAppsRequestsCancelResponse>;
```

##### Description

Cancel app request for team.

##### See

[`admin.apps.requests.cancel` API reference](https://api.slack.com/methods/admin.apps.requests.cancel).

#### apps.requests.list

```ts
list: Method<AdminAppsRequestsListArguments, AdminAppsRequestsListResponse>;
```

##### Description

List app requests for a team/workspace.

##### See

[`admin.apps.requests.list` API reference](https://api.slack.com/methods/admin.apps.requests.list).

#### apps.restrict

```ts
restrict: Method<AdminAppsRestrictArguments, AdminAppsRestrictResponse>;
```

##### Description

Restrict an app for installation on a workspace.

##### See

[`admin.apps.restrict` API reference](https://api.slack.com/methods/admin.apps.restrict).

#### apps.restricted

```ts
restricted: object;
```

#### apps.restricted.list

```ts
list: Method<AdminAppsRestrictedListArguments, AdminAppsRestrictedListResponse>;
```

##### Description

List restricted apps for an org or workspace.

##### See

[`admin.apps.restricted.list` API reference](https://api.slack.com/methods/admin.apps.restricted.list).

#### apps.uninstall

```ts
uninstall: Method<AdminAppsUninstallArguments, AdminAppsUninstallResponse>;
```

##### Description

Uninstall an app from one or many workspaces, or an entire enterprise organization.

##### See

[`admin.apps.uninstall` API reference](https://api.slack.com/methods/admin.apps.uninstall).

#### auth

```ts
auth: object;
```

#### auth.policy

```ts
policy: object;
```

#### auth.policy.assignEntities

```ts
assignEntities: Method<AdminAuthPolicyAssignEntitiesArguments, AdminAuthPolicyAssignEntitiesResponse>;
```

##### Description

Assign entities to a particular authentication policy.

##### See

[`admin.auth.policy.assignEntities` API reference](https://api.slack.com/methods/admin.auth.policy.assignEntities).

#### auth.policy.getEntities

```ts
getEntities: Method<AdminAuthPolicyGetEntitiesArguments, AdminAuthPolicyGetEntitiesResponse>;
```

##### Description

Fetch all the entities assigned to a particular authentication policy by name.

##### See

[`admin.auth.policy.getEntities` API reference](https://api.slack.com/methods/admin.auth.policy.getEntities).

#### auth.policy.removeEntities

```ts
removeEntities: Method<AdminAuthPolicyRemoveEntitiesArguments, AdminAuthPolicyRemoveEntitiesResponse>;
```

##### Description

Remove specified entities from a specified authentication policy.

##### See

[`admin.auth.policy.removeEntities` API reference](https://api.slack.com/methods/admin.auth.policy.removeEntities).

#### barriers

```ts
barriers: object;
```

#### barriers.create

```ts
create: Method<AdminBarriersCreateArguments, AdminBarriersCreateResponse>;
```

##### Description

Create an Information Barrier.

##### See

[`admin.barriers.create` API reference](https://api.slack.com/methods/admin.barriers.create).

#### barriers.delete

```ts
delete: Method<AdminBarriersDeleteArguments, AdminBarriersDeleteResponse>;
```

##### Description

Delete an existing Information Barrier.

##### See

[`admin.barriers.delete` API reference](https://api.slack.com/methods/admin.barriers.delete).

#### barriers.list

```ts
list: Method<AdminBarriersListArguments, AdminBarriersListResponse>;
```

##### Description

Get all Information Barriers for your organization.

##### See

[`admin.barriers.list` API reference](https://api.slack.com/methods/admin.barriers.list).

#### barriers.update

```ts
update: Method<AdminBarriersUpdateArguments, AdminBarriersUpdateResponse>;
```

##### Description

Update an existing Information Barrier.

##### See

[`admin.barriers.update` API reference](https://api.slack.com/methods/admin.barriers.update).

#### conversations

```ts
conversations: object;
```

#### conversations.archive

```ts
archive: Method<AdminConversationsArchiveArguments, AdminConversationsArchiveResponse>;
```

##### Description

Archive a public or private channel.

##### See

[`admin.conversations.archive` API reference](https://api.slack.com/methods/admin.conversations.archive).

#### conversations.bulkArchive

```ts
bulkArchive: Method<AdminConversationsBulkArchiveArguments, AdminConversationsBulkArchiveResponse>;
```

##### Description

Archive public or private channels in bulk.

##### See

[`admin.conversations.bulkArchive` API reference](https://api.slack.com/methods/admin.conversations.bulkArchive).

#### conversations.bulkDelete

```ts
bulkDelete: Method<AdminConversationsBulkDeleteArguments, AdminConversationsBulkDeleteResponse>;
```

##### Description

Delete public or private channels in bulk.

##### See

[`admin.conversations.bulkDelete` API reference](https://api.slack.com/methods/admin.conversations.bulkDelet).

#### conversations.bulkMove

```ts
bulkMove: Method<AdminConversationsBulkMoveArguments, AdminConversationsBulkMoveResponse>;
```

##### Description

Move public or private channels in bulk.

##### See

[`admin.conversations.bulkMove` API reference](https://api.slack.com/methods/admin.conversations.bulkMove).

#### conversations.convertToPrivate

```ts
convertToPrivate: Method<AdminConversationsConvertToPrivateArguments, AdminConversationsConvertToPrivateResponse>;
```

##### Description

Convert a public channel to a private channel.

##### See

[`admin.conversations.convertToPrivate` API reference](https://api.slack.com/methods/admin.conversations.convertToPrivate).

#### conversations.convertToPublic

```ts
convertToPublic: Method<AdminConversationsConvertToPublicArguments, AdminConversationsConvertToPublicResponse>;
```

##### Description

Convert a private channel to a public channel.

##### See

[`admin.conversations.convertToPublic` API reference](https://api.slack.com/methods/admin.conversations.convertToPublic).

#### conversations.create

```ts
create: Method<AdminConversationsCreateArguments, AdminConversationsCreateResponse>;
```

##### Description

Create a public or private channel-based conversation.

##### See

[`admin.conversations.create` API reference](https://api.slack.com/methods/admin.conversations.create).

#### conversations.delete

```ts
delete: Method<AdminConversationsDeleteArguments, AdminConversationsDeleteResponse>;
```

##### Description

Delete a public or private channel.

##### See

[`admin.conversations.delete` API reference](https://api.slack.com/methods/admin.conversations.delete).

#### conversations.disconnectShared

```ts
disconnectShared: Method<AdminConversationsDisconnectSharedArguments, AdminConversationsDisconnectSharedResponse>;
```

##### Description

Disconnect a connected channel from one or more workspaces.

##### See

[`admin.conversations.disconnectShared` API reference](https://api.slack.com/methods/admin.conversations.disconnectShared).

#### conversations.ekm

```ts
ekm: object;
```

#### conversations.ekm.listOriginalConnectedChannelInfo

```ts
listOriginalConnectedChannelInfo: Method<AdminConversationsEKMListOriginalConnectedChannelInfoArguments, AdminConversationsEkmListOriginalConnectedChannelInfoResponse>;
```

##### Description

List all disconnected channels — i.e., channels that were once connected to other workspaces
and then disconnected — and the corresponding original channel IDs for key revocation with EKM.

##### See

[`admin.conversations.ekm.listOriginalConnectedChannelInfo` API reference](https://api.slack.com/methods/admin.conversations.ekm.listOriginalConnectedChannelInfo).

#### conversations.getConversationPrefs

```ts
getConversationPrefs: Method<AdminConversationsGetConversationPrefsArguments, AdminConversationsGetConversationPrefsResponse>;
```

##### Description

Get conversation preferences for a public or private channel.

##### See

[`admin.conversations.getConversationPrefs` API reference](https://api.slack.com/methods/admin.conversations.getConversationPrefs).

#### conversations.getCustomRetention

```ts
getCustomRetention: Method<AdminConversationsGetCustomRetentionArguments, AdminConversationsGetCustomRetentionResponse>;
```

##### Description

Get a conversation's retention policy.

##### See

[`admin.conversations.getCustomRetention` API reference](https://api.slack.com/methods/admin.conversations.getCustomRetention).

#### conversations.getTeams

```ts
getTeams: Method<AdminConversationsGetTeamsArguments, AdminConversationsGetTeamsResponse>;
```

##### Description

Get all the workspaces a given public or private channel is connected to within
this Enterprise org.

##### See

[`admin.conversations.getTeams` API reference](https://api.slack.com/methods/admin.conversations.getTeams).

#### conversations.invite

```ts
invite: Method<AdminConversationsInviteArguments, AdminConversationsInviteResponse>;
```

##### Description

Invite a user to a public or private channel.

##### See

[`admin.conversations.invite` API reference](https://api.slack.com/methods/admin.conversations.invite).

#### conversations.lookup

```ts
lookup: Method<AdminConversationsLookupArguments, AdminConversationsLookupResponse>;
```

##### Description

Returns channels on the given team using the filters.

##### See

[`admin.conversations.lookup` API reference](https://api.slack.com/methods/admin.conversations.lookup).

#### conversations.removeCustomRetention

```ts
removeCustomRetention: Method<AdminConversationsRemoveCustomRetentionArguments, AdminConversationsRemoveCustomRetentionResponse>;
```

##### Description

Remove a conversation's retention policy.

##### See

[`admin.conversations.removeCustomRetention` API reference](https://api.slack.com/methods/admin.conversations.removeCustomRetention).

#### conversations.rename

```ts
rename: Method<AdminConversationsRenameArguments, AdminConversationsRenameResponse>;
```

##### Description

Rename a public or private channel.

##### See

[`admin.conversations.rename` API reference](https://api.slack.com/methods/admin.conversations.rename).

#### conversations.restrictAccess

```ts
restrictAccess: object;
```

#### conversations.restrictAccess.addGroup

```ts
addGroup: Method<AdminConversationsRestrictAccessAddGroupArguments, AdminConversationsRestrictAccessAddGroupResponse>;
```

##### Description

Add an allowlist of IDP groups for accessing a channel.

##### See

[`admin.conversations.restrictAccess.addGroup` API reference](https://api.slack.com/methods/admin.conversations.restrictAccess.addGroup).

#### conversations.restrictAccess.listGroups

```ts
listGroups: Method<AdminConversationsRestrictAccessListGroupsArguments, AdminConversationsRestrictAccessListGroupsResponse>;
```

##### Description

List all IDP Groups linked to a channel.

##### See

[`admin.conversations.restrictAccess.listGroups` API reference](https://api.slack.com/methods/admin.conversations.restrictAccess.listGroups).

#### conversations.restrictAccess.removeGroup

```ts
removeGroup: Method<AdminConversationsRestrictAccessRemoveGroupArguments, AdminConversationsRestrictAccessRemoveGroupResponse>;
```

##### Description

Remove a linked IDP group linked from a private channel.

##### See

[`admin.conversations.restrictAccess.removeGroup` API reference](https://api.slack.com/methods/admin.conversations.restrictAccess.removeGroup).

#### conversations.search

```ts
search: Method<AdminConversationsSearchArguments, AdminConversationsSearchResponse>;
```

##### Description

Search for public or private channels in an Enterprise organization.

##### See

[`admin.conversations.search` API reference](https://api.slack.com/methods/admin.conversations.search).

#### conversations.setConversationPrefs

```ts
setConversationPrefs: Method<AdminConversationsSetConversationPrefsArguments, AdminConversationsSetConversationPrefsResponse>;
```

##### Description

Set the posting permissions for a public or private channel.

##### See

[`admin.conversations.setConversationPrefs` API reference](https://api.slack.com/methods/admin.conversations.setConversationPrefs).

#### conversations.setCustomRetention

```ts
setCustomRetention: Method<AdminConversationsSetCustomRetentionArguments, AdminConversationsSetCustomRetentionResponse>;
```

##### Description

Set a conversation's retention policy.

##### See

[`admin.conversations.setCustomRetention` API reference](https://api.slack.com/methods/admin.conversations.setCustomRetention).

#### conversations.setTeams

```ts
setTeams: Method<AdminConversationsSetTeamsArguments, AdminConversationsSetTeamsResponse>;
```

##### Description

Set the workspaces in an Enterprise grid org that connect to a public or private channel.

##### See

[`admin.conversations.setTeams` API reference](https://api.slack.com/methods/admin.conversations.setTeams).

#### conversations.unarchive

```ts
unarchive: Method<AdminConversationsUnarchiveArguments, AdminConversationsUnarchiveResponse>;
```

##### Description

Unarchive a public or private channel.

##### See

[`admin.conversations.unarchive` API reference](https://api.slack.com/methods/admin.conversations.unarchive).

#### emoji

```ts
emoji: object;
```

#### emoji.add

```ts
add: Method<AdminEmojiAddArguments, AdminEmojiAddResponse>;
```

##### Description

Add an emoji.

##### See

[`admin.emoji.add` API reference](https://api.slack.com/methods/admin.emoji.add).

#### emoji.addAlias

```ts
addAlias: Method<AdminEmojiAddAliasArguments, AdminEmojiAddAliasResponse>;
```

##### Description

Add an emoji alias.

##### See

[`admin.emoji.addAlias` API reference](https://api.slack.com/methods/admin.emoji.addAlias).

#### emoji.list

```ts
list: Method<AdminEmojiListArguments, AdminEmojiListResponse>;
```

##### Description

List emoji for an Enterprise Grid organization.

##### See

[`admin.emoji.list` API reference](https://api.slack.com/methods/admin.emoji.list).

#### emoji.remove

```ts
remove: Method<AdminEmojiRemoveArguments, AdminEmojiRemoveResponse>;
```

##### Description

Remove an emoji across an Enterprise Grid organization.

##### See

[`admin.emoji.remove` API reference](https://api.slack.com/methods/admin.emoji.remove).

#### emoji.rename

```ts
rename: Method<AdminEmojiRenameArguments, AdminEmojiRenameResponse>;
```

##### Description

Rename an emoji.

##### See

[`admin.emoji.rename` API reference](https://api.slack.com/methods/admin.emoji.rename).

#### functions

```ts
functions: object;
```

#### functions.list

```ts
list: Method<AdminFunctionsListArguments, AdminFunctionsListResponse>;
```

##### Description

Look up functions by a set of apps.

##### See

[`admin.functions.list` API reference](https://api.slack.com/methods/admin.functions.list).

#### functions.permissions

```ts
permissions: object;
```

#### functions.permissions.lookup

```ts
lookup: Method<AdminFunctionsPermissionsLookupArguments, AdminFunctionsPermissionsLookupResponse>;
```

##### Description

Lookup the visibility of multiple Slack functions and include the users if
it is limited to particular named entities.

##### See

[`admin.functions.permissions.lookup` API reference](https://api.slack.com/methods/admin.functions.permissions.lookup).

#### functions.permissions.set

```ts
set: Method<AdminFunctionsPermissionsSetArguments, AdminFunctionsPermissionsSetResponse>;
```

##### Description

Set the visibility of a Slack function and define the users or workspaces if
it is set to named_entities.

##### See

[`admin.functions.permissions.set` API reference](https://api.slack.com/methods/admin.functions.permissions.set).

#### inviteRequests

```ts
inviteRequests: object;
```

#### inviteRequests.approve

```ts
approve: Method<AdminInviteRequestsApproveArguments, AdminInviteRequestsApproveResponse>;
```

##### Description

Approve a workspace invite request.

##### See

[`admin.inviteRequests.approve` API reference](https://api.slack.com/methods/admin.inviteRequests.approve).

#### inviteRequests.approved

```ts
approved: object;
```

#### inviteRequests.approved.list

```ts
list: Method<AdminInviteRequestsApprovedListArguments, AdminInviteRequestsApprovedListResponse>;
```

##### Description

List all approved workspace invite requests.

##### See

[`admin.inviteRequests.approved.list` API reference](https://api.slack.com/methods/admin.inviteRequests.approved.list).

#### inviteRequests.denied

```ts
denied: object;
```

#### inviteRequests.denied.list

```ts
list: Method<AdminInviteRequestsDeniedListArguments, AdminInviteRequestsDeniedListResponse>;
```

##### Description

List all denied workspace invite requests.

##### See

[`admin.inviteRequests.denied.list` API reference](https://api.slack.com/methods/admin.inviteRequests.denied.list).

#### inviteRequests.deny

```ts
deny: Method<AdminInviteRequestsDenyArguments, AdminInviteRequestsDenyResponse>;
```

##### Description

Deny a workspace invite request.

##### See

[`admin.inviteRequests.deny` API reference](https://api.slack.com/methods/admin.inviteRequests.deny).

#### inviteRequests.list

```ts
list: Method<AdminInviteRequestsListArguments, AdminInviteRequestsListResponse>;
```

##### Description

List all pending workspace invite requests.

##### See

[`admin.inviteRequests.list` API reference](https://api.slack.com/methods/admin.inviteRequests.list).

#### roles

```ts
roles: object;
```

#### roles.addAssignments

```ts
addAssignments: Method<AdminRolesAddAssignmentsArguments, AdminRolesAddAssignmentsResponse>;
```

##### Description

Adds members to the specified role with the specified scopes.

##### See

[`admin.roles.addAssignments` API reference](https://api.slack.com/methods/admin.roles.addAssignments).

#### roles.listAssignments

```ts
listAssignments: Method<AdminRolesListAssignmentsArguments, AdminRolesListAssignmentsResponse>;
```

##### Description

Lists assignments for all roles across entities.
Options to scope results by any combination of roles or entities.

##### See

[`admin.roles.listAssignments` API reference](https://api.slack.com/methods/admin.roles.listAssignments).

#### roles.removeAssignments

```ts
removeAssignments: Method<AdminRolesRemoveAssignmentsArguments, AdminRolesRemoveAssignmentsResponse>;
```

##### Description

Removes a set of users from a role for the given scopes and entities.

##### See

[`admin.roles.removeAssignments` API reference](https://api.slack.com/methods/admin.roles.removeAssignments).

#### teams

```ts
teams: object;
```

#### teams.admins

```ts
admins: object;
```

#### teams.admins.list

```ts
list: Method<AdminTeamsAdminsListArguments, AdminTeamsAdminsListResponse>;
```

##### Description

List all of the admins on a given workspace.

##### See

[`admin.teams.admins.list` API reference](https://api.slack.com/methods/admin.teams.admins.list).

#### teams.create

```ts
create: Method<AdminTeamsCreateArguments, AdminTeamsCreateResponse>;
```

##### Description

Create an Enterprise team.

##### See

[`admin.teams.create` API reference](https://api.slack.com/methods/admin.teams.create).

#### teams.list

```ts
list: Method<AdminTeamsListArguments, AdminTeamsListResponse>;
```

##### Description

List all teams on an Enterprise organization.

##### See

[`admin.teams.list` API reference](https://api.slack.com/methods/admin.teams.list).

#### teams.owners

```ts
owners: object;
```

#### teams.owners.list

```ts
list: Method<AdminTeamsOwnersListArguments, AdminTeamsOwnersListResponse>;
```

##### Description

List all of the owners on a given workspace.

##### See

[`admin.teams.owners.list` API reference](https://api.slack.com/methods/admin.teams.owners.list).

#### teams.settings

```ts
settings: object;
```

#### teams.settings.info

```ts
info: Method<AdminTeamsSettingsInfoArguments, AdminTeamsSettingsInfoResponse>;
```

##### Description

Fetch information about settings in a workspace.

##### See

[`admin.teams.owners.list` API reference](https://api.slack.com/methods/admin.teams.owners.list).

#### teams.settings.setDefaultChannels

```ts
setDefaultChannels: Method<AdminTeamsSettingsSetDefaultChannelsArguments, AdminTeamsSettingsSetDefaultChannelsResponse>;
```

##### Description

Set the default channels of a workspace.

##### See

[`admin.teams.settings.setDefaultChannels` API reference](https://api.slack.com/methods/admin.teams.settings.setDefaultChannels).

#### teams.settings.setDescription

```ts
setDescription: Method<AdminTeamsSettingsSetDescriptionArguments, AdminTeamsSettingsSetDescriptionResponse>;
```

##### Description

Set the description of a given workspace.

##### See

[`admin.teams.settings.setDescription` API reference](https://api.slack.com/methods/admin.teams.settings.setDescription).

#### teams.settings.setDiscoverability

```ts
setDiscoverability: Method<AdminTeamsSettingsSetDiscoverabilityArguments, AdminTeamsSettingsSetDiscoverabilityResponse>;
```

##### Description

Set the discoverability of a given workspace.

##### See

[`admin.teams.settings.setDiscoverability` API reference](https://api.slack.com/methods/admin.teams.settings.setDiscoverability).

#### teams.settings.setIcon

```ts
setIcon: Method<AdminTeamsSettingsSetIconArguments, AdminTeamsSettingsSetIconResponse>;
```

##### Description

Sets the icon of a workspace.

##### See

[`admin.teams.settings.setIcon` API reference](https://api.slack.com/methods/admin.teams.settings.setIcon).

#### teams.settings.setName

```ts
setName: Method<AdminTeamsSettingsSetNameArguments, AdminTeamsSettingsSetNameResponse>;
```

##### Description

Set the name of a given workspace.

##### See

[`admin.teams.settings.setName` API reference](https://api.slack.com/methods/admin.teams.settings.setName).

#### usergroups

```ts
usergroups: object;
```

#### usergroups.addChannels

```ts
addChannels: Method<AdminUsergroupsAddChannelsArguments, AdminUsergroupsAddChannelsResponse>;
```

##### Description

Add up to one hundred default channels to an IDP group.

##### See

[`admin.teams.usergroups.addChannels` API reference](https://api.slack.com/methods/admin.usergroups.addChannels).

#### usergroups.addTeams

```ts
addTeams: Method<AdminUsergroupsAddTeamsArguments, AdminUsergroupsAddTeamsResponse>;
```

##### Description

Associate one or more default workspaces with an organization-wide IDP group.

##### See

[`admin.teams.usergroups.addTeams` API reference](https://api.slack.com/methods/admin.usergroups.addTeams).

#### usergroups.listChannels

```ts
listChannels: Method<AdminUsergroupsListChannelsArguments, AdminUsergroupsListChannelsResponse>;
```

##### Description

List the channels linked to an org-level IDP group (user group).

##### See

[`admin.teams.usergroups.listChannels` API reference](https://api.slack.com/methods/admin.usergroups.listChannels).

#### usergroups.removeChannels

```ts
removeChannels: Method<AdminUsergroupsRemoveChannelsArguments, AdminUsergroupsRemoveChannelsResponse>;
```

##### Description

Remove one or more default channels from an org-level IDP group (user group).

##### See

[`admin.teams.usergroups.removeChannels` API reference](https://api.slack.com/methods/admin.usergroups.removeChannels).

#### users

```ts
users: object;
```

#### users.assign

```ts
assign: Method<AdminUsersAssignArguments, AdminUsersAssignResponse>;
```

##### Description

Add an Enterprise user to a workspace.

##### See

[`admin.users.assign` API reference](https://api.slack.com/methods/admin.users.assign).

#### users.invite

```ts
invite: Method<AdminUsersInviteArguments, AdminUsersInviteResponse>;
```

##### Description

Invite a user to a workspace.

##### See

[`admin.users.invite` API reference](https://api.slack.com/methods/admin.users.invite).

#### users.list

```ts
list: Method<AdminUsersListArguments, AdminUsersListResponse>;
```

##### Description

List users on a workspace.

##### See

[`admin.users.list` API reference](https://api.slack.com/methods/admin.users.list).

#### users.remove

```ts
remove: Method<AdminUsersRemoveArguments, AdminUsersRemoveResponse>;
```

##### Description

Remove a user from a workspace.

##### See

[`admin.users.remove` API reference](https://api.slack.com/methods/admin.users.remove).

#### users.session

```ts
session: object;
```

#### users.session.clearSettings

```ts
clearSettings: Method<AdminUsersSessionClearSettingsArguments, AdminUsersSessionClearSettingsResponse>;
```

##### Description

Clear user-specific session settings—the session duration and what happens when the client
closes—for a list of users.

##### See

[`admin.users.session.clearSettings` API reference](https://api.slack.com/methods/admin.users.session.clearSettings).

#### users.session.getSettings

```ts
getSettings: Method<AdminUsersSessionGetSettingsArguments, AdminUsersSessionGetSettingsResponse>;
```

##### Description

Get user-specific session settings—the session duration and what happens when the client
closes—given a list of users.

##### See

[`admin.users.session.getSettings` API reference](https://api.slack.com/methods/admin.users.session.getSettings).

#### users.session.invalidate

```ts
invalidate: Method<AdminUsersSessionInvalidateArguments, AdminUsersSessionInvalidateResponse>;
```

##### Description

Revoke a single session for a user. The user will be forced to login to Slack.

##### See

[`admin.users.session.invalidate` API reference](https://api.slack.com/methods/admin.users.session.invalidate).

#### users.session.list

```ts
list: Method<AdminUsersSessionListArguments, AdminUsersSessionListResponse>;
```

##### Description

List active user sessions for an organization.

##### See

[`admin.users.session.list` API reference](https://api.slack.com/methods/admin.users.session.list).

#### users.session.reset

```ts
reset: Method<AdminUsersSessionResetArguments, AdminUsersSessionResetResponse>;
```

##### Description

Wipes all valid sessions on all devices for a given user.

##### See

[`admin.users.session.reset` API reference](https://api.slack.com/methods/admin.users.session.reset).

#### users.session.resetBulk

```ts
resetBulk: Method<AdminUsersSessionResetBulkArguments, AdminUsersSessionResetBulkResponse>;
```

##### Description

Enqueues an asynchronous job to wipe all valid sessions on all devices for a given user list.

##### See

[`admin.users.session.resetBulk` API reference](https://api.slack.com/methods/admin.users.session.resetBulk).

#### users.session.setSettings

```ts
setSettings: Method<AdminUsersSessionSetSettingsArguments, AdminUsersSessionSetSettingsResponse>;
```

##### Description

Configure the user-level session settings—the session duration and what happens when the client
closes—for one or more users.

##### See

[`admin.users.session.setSettings` API reference](https://api.slack.com/methods/admin.users.session.setSettings).

#### users.setAdmin

```ts
setAdmin: Method<AdminUsersSetAdminArguments, AdminUsersSetAdminResponse>;
```

##### Description

Set an existing guest, regular user, or owner to be an admin user.

##### See

[`admin.users.setAdmin` API reference](https://api.slack.com/methods/admin.users.setAdmin).

#### users.setExpiration

```ts
setExpiration: Method<AdminUsersSetExpirationArguments, AdminUsersSetExpirationResponse>;
```

##### Description

Set an expiration for a guest user.

##### See

[`admin.users.setExpiration` API reference](https://api.slack.com/methods/admin.users.setExpiration).

#### users.setOwner

```ts
setOwner: Method<AdminUsersSetOwnerArguments, AdminUsersSetOwnerResponse>;
```

##### Description

Set an existing guest, regular user, or admin user to be a workspace owner.

##### See

[`admin.users.setOwner` API reference](https://api.slack.com/methods/admin.users.setOwner).

#### users.setRegular

```ts
setRegular: Method<AdminUsersSetRegularArguments, AdminUsersSetRegularResponse>;
```

##### Description

Set an existing guest user, admin user, or owner to be a regular user.

##### See

[`admin.users.setRegular` API reference](https://api.slack.com/methods/admin.users.setRegular).

#### users.unsupportedVersions

```ts
unsupportedVersions: object;
```

#### users.unsupportedVersions.export

```ts
export: Method<AdminUsersUnsupportedVersionsExportArguments, AdminUsersUnsupportedVersionsExportResponse>;
```

##### Description

Ask Slackbot to send you an export listing all workspace members using unsupported software,
presented as a zipped CSV file.

##### See

[`admin.users.unsupportedVersions.export` API reference](https://api.slack.com/methods/admin.users.unsupportedVersions.export).

#### workflows

```ts
workflows: object;
```

#### workflows.collaborators

```ts
collaborators: object;
```

#### workflows.collaborators.add

```ts
add: Method<AdminWorkflowsCollaboratorsAddArguments, AdminWorkflowsCollaboratorsAddResponse>;
```

##### Description

Add collaborators to workflows within the team or enterprise.

##### See

[`admin.workflows.collaborators.add` API reference](https://api.slack.com/methods/admin.workflows.collaborators.add).

#### workflows.collaborators.remove

```ts
remove: Method<AdminWorkflowsCollaboratorsRemoveArguments, AdminWorkflowsCollaboratorsRemoveResponse>;
```

##### Description

Remove collaborators from workflows within the team or enterprise.

##### See

[`admin.workflows.collaborators.remove` API reference](https://api.slack.com/methods/admin.workflows.collaborators.remove).

#### workflows.permissions

```ts
permissions: object;
```

#### workflows.permissions.lookup

```ts
lookup: Method<AdminWorkflowsPermissionsLookupArguments, AdminWorkflowsPermissionsLookupResponse>;
```

##### Description

Look up the permissions for a set of workflows.

##### See

[`admin.workflows.permissions.lookup` API reference](https://api.slack.com/methods/admin.workflows.permissions.lookup).

#### workflows.search

```ts
search: Method<AdminWorkflowsSearchArguments, AdminWorkflowsSearchResponse>;
```

##### Description

Search workflows within the team or enterprise.

##### See

[`admin.workflows.search` API reference](https://api.slack.com/methods/admin.workflows.search).

#### workflows.unpublish

```ts
unpublish: Method<AdminWorkflowsUnpublishArguments, AdminWorkflowsUnpublishResponse>;
```

##### Description

Unpublish workflows within the team or enterprise.

##### See

[`admin.workflows.unpublish` API reference](https://api.slack.com/methods/admin.workflows.unpublish).

#### Inherited from

[`Methods`](Methods.md).[`admin`](Methods.md#admin)

#### Defined in

[packages/web-api/src/methods.ts:546](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L546)

***

### api

```ts
readonly api: object;
```

#### test

```ts
test: Method<APITestArguments, ApiTestResponse>;
```

##### Description

Checks API calling code.

##### See

[`api.test` API reference](https://api.slack.com/methods/api.test).

#### Inherited from

[`Methods`](Methods.md).[`api`](Methods.md#api)

#### Defined in

[packages/web-api/src/methods.ts:1221](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1221)

***

### apps

```ts
readonly apps: object;
```

#### connections

```ts
connections: object;
```

#### connections.open

```ts
open: Method<AppsConnectionsOpenArguments, AppsConnectionsOpenResponse>;
```

##### Description

Generate a temporary Socket Mode WebSocket URL that your app can connect to in order to receive
events and interactive payloads over.

##### See

[`apps.connections.open` API reference](https://api.slack.com/methods/apps.connections.open).

#### event

```ts
event: object;
```

#### event.authorizations

```ts
authorizations: object;
```

#### event.authorizations.list

```ts
list: Method<AppsEventAuthorizationsListArguments, AppsEventAuthorizationsListResponse>;
```

##### Description

Get a list of authorizations for the given event context.
Each authorization represents an app installation that the event is visible to.

##### See

[`apps.event.authorizations.list` API reference](https://api.slack.com/methods/apps.event.authorizations.list).

#### manifest

```ts
manifest: object;
```

#### manifest.create

```ts
create: Method<AppsManifestCreateArguments, AppsManifestCreateResponse>;
```

##### Description

Create an app from an app manifest.

##### See

[`apps.manifest.create` API reference](https://api.slack.com/methods/apps.manifest.create).

#### manifest.delete

```ts
delete: Method<AppsManifestDeleteArguments, AppsManifestDeleteResponse>;
```

##### Description

Permanently deletes an app created through app manifests.

##### See

[`apps.manifest.delete` API reference](https://api.slack.com/methods/apps.manifest.delete).

#### manifest.export

```ts
export: Method<AppsManifestExportArguments, AppsManifestExportResponse>;
```

##### Description

Export an app manifest from an existing app.

##### See

[`apps.manifest.export` API reference](https://api.slack.com/methods/apps.manifest.export).

#### manifest.update

```ts
update: Method<AppsManifestUpdateArguments, AppsManifestUpdateResponse>;
```

##### Description

Update an app from an app manifest.

##### See

[`apps.manifest.update` API reference](https://api.slack.com/methods/apps.manifest.update).

#### manifest.validate

```ts
validate: Method<AppsManifestValidateArguments, AppsManifestValidateResponse>;
```

##### Description

Validate an app manifest.

##### See

[`apps.manifest.validate` API reference](https://api.slack.com/methods/apps.manifest.validate).

#### uninstall

```ts
uninstall: Method<AppsUninstallArguments, AppsUninstallResponse>;
```

##### Description

Uninstalls your app from a workspace.

##### See

[`apps.uninstall` API reference](https://api.slack.com/methods/apps.uninstall).

#### Inherited from

[`Methods`](Methods.md).[`apps`](Methods.md#apps-1)

#### Defined in

[packages/web-api/src/methods.ts:1229](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1229)

***

### auth

```ts
readonly auth: object;
```

#### revoke

```ts
revoke: Method<AuthRevokeArguments, AuthRevokeResponse>;
```

##### Description

Revokes a token.

##### See

[`auth.revoke` API reference](https://api.slack.com/methods/auth.revoke).

#### teams

```ts
teams: object;
```

#### teams.list

```ts
list: Method<AuthTeamsListArguments, AuthTeamsListResponse>;
```

##### Description

Obtain a full list of workspaces your org-wide app has been approved for.

##### See

[`auth.teams.list` API reference](https://api.slack.com/methods/auth.teams.list).

#### test

```ts
test: Method<AuthTestArguments, AuthTestResponse>;
```

#### Inherited from

[`Methods`](Methods.md).[`auth`](Methods.md#auth-1)

#### Defined in

[packages/web-api/src/methods.ts:1285](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1285)

***

### bookmarks

```ts
readonly bookmarks: object;
```

#### add

```ts
add: Method<BookmarksAddArguments, BookmarksAddResponse>;
```

##### Description

Add bookmark to a channel.

##### See

[`bookmarks.add` API reference](https://api.slack.com/methods/bookmarks.add).

#### edit

```ts
edit: Method<BookmarksEditArguments, BookmarksEditResponse>;
```

##### Description

Edit bookmark.

##### See

[`bookmarks.edit` API reference](https://api.slack.com/methods/bookmarks.edit).

#### list

```ts
list: Method<BookmarksListArguments, BookmarksListResponse>;
```

##### Description

List bookmarks for a channel.

##### See

[`bookmarks.list` API reference](https://api.slack.com/methods/bookmarks.list).

#### remove

```ts
remove: Method<BookmarksRemoveArguments, BookmarksRemoveResponse>;
```

##### Description

Remove bookmark from a channel.

##### See

[`bookmarks.remove` API reference](https://api.slack.com/methods/bookmarks.remove).

#### Inherited from

[`Methods`](Methods.md).[`bookmarks`](Methods.md#bookmarks)

#### Defined in

[packages/web-api/src/methods.ts:1301](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1301)

***

### bots

```ts
readonly bots: object;
```

#### info

```ts
info: Method<BotsInfoArguments, BotsInfoResponse>;
```

##### Description

Gets information about a bot user.

##### See

[`bots.info` API reference](https://api.slack.com/methods/bots.info).

#### Inherited from

[`Methods`](Methods.md).[`bots`](Methods.md#bots)

#### Defined in

[packages/web-api/src/methods.ts:1324](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1324)

***

### calls

```ts
readonly calls: object;
```

#### add

```ts
add: Method<CallsAddArguments, CallsAddResponse>;
```

##### Description

Registers a new Call.

##### See

[`calls.add` API reference](https://api.slack.com/methods/calls.add).

#### end

```ts
end: Method<CallsEndArguments, CallsEndResponse>;
```

##### Description

Ends a Call.

##### See

[`calls.end` API reference](https://api.slack.com/methods/calls.end).

#### info

```ts
info: Method<CallsInfoArguments, CallsInfoResponse>;
```

##### Description

Returns information about a Call.

##### See

[`calls.info` API reference](https://api.slack.com/methods/calls.info).

#### participants

```ts
participants: object;
```

#### participants.add

```ts
add: Method<CallsParticipantsAddArguments, CallsParticipantsAddResponse>;
```

##### Description

Registers new participants added to a Call.

##### See

[`calls.participants.add` API reference](https://api.slack.com/methods/calls.participants.add).

#### participants.remove

```ts
remove: Method<CallsParticipantsRemoveArguments, CallsParticipantsRemoveResponse>;
```

#### update

```ts
update: Method<CallsUpdateArguments, CallsUpdateResponse>;
```

##### Description

Updates information about a Call.

##### See

[`calls.info` API reference](https://api.slack.com/methods/calls.info).

#### Inherited from

[`Methods`](Methods.md).[`calls`](Methods.md#calls)

#### Defined in

[packages/web-api/src/methods.ts:1332](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1332)

***

### canvases

```ts
readonly canvases: object;
```

#### access

```ts
access: object;
```

#### access.delete

```ts
delete: Method<CanvasesAccessDeleteArguments, CanvasesAccessDeleteResponse>;
```

##### Description

Remove access to a canvas for specified entities.

##### See

[`canvases.access.delete` API reference](https://api.slack.com/methods/canvases.access.delete).

#### access.set

```ts
set: Method<CanvasesAccessSetArguments, CanvasesAccessSetResponse>;
```

##### Description

Sets the access level to a canvas for specified entities.

##### See

[`canvases.access.set` API reference](https://api.slack.com/methods/canvases.access.set).

#### create

```ts
create: Method<CanvasesCreateArguments, CanvasesCreateResponse>;
```

##### Description

Create Canvas for a user.

##### See

[`canvases.create` API reference](https://api.slack.com/methods/canvases.create).

#### delete

```ts
delete: Method<CanvasesDeleteArguments, CanvasesDeleteResponse>;
```

##### Description

Deletes a canvas.

##### See

[`canvases.delete` API reference](https://api.slack.com/methods/canvases.delete).

#### edit

```ts
edit: Method<CanvasesEditArguments, CanvasesEditResponse>;
```

##### Description

Update an existing canvas.

##### See

[`canvases.edit` API reference](https://api.slack.com/methods/canvases.edit).

#### sections

```ts
sections: object;
```

#### sections.lookup

```ts
lookup: Method<CanvasesSectionsLookupArguments, CanvasesSectionsLookupResponse>;
```

##### Description

Find sections matching the provided criteria.

##### See

[`canvases.sections.lookup` API reference](https://api.slack.com/methods/canvases.sections.lookup).

#### Inherited from

[`Methods`](Methods.md).[`canvases`](Methods.md#canvases)

#### Defined in

[packages/web-api/src/methods.ts:1363](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1363)

***

### chat

```ts
readonly chat: object;
```

#### delete

```ts
delete: Method<ChatDeleteArguments, ChatDeleteResponse>;
```

##### Description

Deletes a message.

##### See

[`chat.delete` API reference](https://api.slack.com/methods/chat.delete).

#### deleteScheduledMessage

```ts
deleteScheduledMessage: Method<ChatDeleteScheduledMessageArguments, ChatDeleteScheduledMessageResponse>;
```

##### Description

Deletes a pending scheduled message from the queue.

##### See

[`chat.deleteScheduledMessage` API reference](https://api.slack.com/methods/chat.deleteScheduledMessage).

#### getPermalink

```ts
getPermalink: Method<ChatGetPermalinkArguments, ChatGetPermalinkResponse>;
```

##### Description

Retrieve a permalink URL for a specific extant message.

##### See

[`chat.getPermalink` API reference](https://api.slack.com/methods/chat.getPermalink).

#### meMessage

```ts
meMessage: Method<ChatMeMessageArguments, ChatMeMessageResponse>;
```

##### Description

Share a me message into a channel.

##### See

[`chat.meMessage` API reference](https://api.slack.com/methods/chat.meMessage).

#### postEphemeral

```ts
postEphemeral: Method<ChatPostEphemeralArguments, ChatPostEphemeralResponse>;
```

##### Description

Sends an ephemeral message to a user in a channel.

##### See

[`chat.postEphemeral` API reference](https://api.slack.com/methods/chat.postEphemeral).

#### postMessage

```ts
postMessage: Method<ChatPostMessageArguments, ChatPostMessageResponse>;
```

##### Description

Sends a message to a channel.

##### See

[`chat.postMessage` API reference](https://api.slack.com/methods/chat.postMessage).

#### scheduleMessage

```ts
scheduleMessage: Method<ChatScheduleMessageArguments, ChatScheduleMessageResponse>;
```

##### Description

Schedules a message to be sent to a channel.

##### See

[`chat.scheduleMessage` API reference](https://api.slack.com/methods/chat.scheduleMessage).

#### scheduledMessages

```ts
scheduledMessages: object;
```

#### scheduledMessages.list

```ts
list: Method<ChatScheduledMessagesListArguments, ChatScheduledMessagesListResponse>;
```

##### Description

Returns a list of scheduled messages.

##### See

[`chat.scheduledMessages.list` API reference](https://api.slack.com/methods/chat.scheduledMessages.list).

#### unfurl

```ts
unfurl: Method<ChatUnfurlArguments, ChatUnfurlResponse>;
```

##### Description

Provide custom unfurl behavior for user-posted URLs.

##### See

[`chat.unfurl` API reference](https://api.slack.com/methods/chat.unfurl).

#### update

```ts
update: Method<ChatUpdateArguments, ChatUpdateResponse>;
```

##### Description

Updates a message.

##### See

[`chat.update` API reference](https://api.slack.com/methods/chat.update).

#### Inherited from

[`Methods`](Methods.md).[`chat`](Methods.md#chat)

#### Defined in

[packages/web-api/src/methods.ts:1400](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1400)

***

### conversations

```ts
readonly conversations: object;
```

#### acceptSharedInvite

```ts
acceptSharedInvite: Method<ConversationsAcceptSharedInviteArguments, ConversationsAcceptSharedInviteResponse>;
```

##### Description

Accepts an invitation to a Slack Connect channel.

##### See

[`conversations.acceptSharedInvite` API reference](https://api.slack.com/methods/conversations.acceptSharedInvite).

#### approveSharedInvite

```ts
approveSharedInvite: Method<ConversationsApproveSharedInviteArguments, ConversationsApproveSharedInviteResponse>;
```

##### Description

Approves an invitation to a Slack Connect channel.

##### See

[`conversations.approveSharedInvite` API reference](https://api.slack.com/methods/conversations.approveSharedInvite).

#### archive

```ts
archive: Method<ConversationsArchiveArguments, ConversationsArchiveResponse>;
```

##### Description

Archives a conversation.

##### See

[`conversations.archive` API reference](https://api.slack.com/methods/conversations.archive).

#### canvases

```ts
canvases: object;
```

#### canvases.create

```ts
create: Method<ConversationsCanvasesCreateArguments, ConversationsCanvasesCreateResponse>;
```

##### Description

Create a Channel Canvas for a channel.

##### See

[`conversations.canvases.create` API reference](https://api.slack.com/methods/conversations.canvases.create).

#### close

```ts
close: Method<ConversationsCloseArguments, ConversationsCloseResponse>;
```

##### Description

Closes a direct message or multi-person direct message.

##### See

[`conversations.close` API reference](https://api.slack.com/methods/conversations.close).

#### create

```ts
create: Method<ConversationsCreateArguments, ConversationsCreateResponse>;
```

##### Description

Initiates a public or private channel-based conversation.

##### See

[`conversations.create` API reference](https://api.slack.com/methods/conversations.create).

#### declineSharedInvite

```ts
declineSharedInvite: Method<ConversationsDeclineSharedInviteArguments, ConversationsDeclineSharedInviteResponse>;
```

##### Description

Declines an invitation to a Slack Connect channel.

##### See

[`conversations.declineSharedInvite` API reference](https://api.slack.com/methods/conversations.declineSharedInvite).

#### externalInvitePermissions

```ts
externalInvitePermissions: object;
```

#### externalInvitePermissions.set

```ts
set: Method<ConversationsExternalInvitePermissionsSetArguments, ConversationsExternalInvitePermissionsSetResponse>;
```

##### Description

Convert a team in a shared channel from an External Limited channel to a fully shared Slack
Connect channel or vice versa.

##### See

[`conversations.externalInvitePermissions.set` API reference](https://api.slack.com/methods/conversations.externalInvitePermissions.set).

#### history

```ts
history: Method<ConversationsHistoryArguments, ConversationsHistoryResponse>;
```

##### Description

Fetches a conversation's history of messages and events.

##### See

[`conversations.history` API reference](https://api.slack.com/methods/conversations.history).

#### info

```ts
info: Method<ConversationsInfoArguments, ConversationsInfoResponse>;
```

##### Description

Retrieve information about a conversation.

##### See

[`conversations.info` API reference](https://api.slack.com/methods/conversations.info).

#### invite

```ts
invite: Method<ConversationsInviteArguments, ConversationsInviteResponse>;
```

##### Description

Invites users to a channel.

##### See

[`conversations.invite` API reference](https://api.slack.com/methods/conversations.invite).

#### inviteShared

```ts
inviteShared: Method<ConversationsInviteSharedArguments, ConversationsInviteSharedResponse>;
```

##### Description

Sends an invitation to a Slack Connect channel.

##### See

[`conversations.inviteShared` API reference](https://api.slack.com/methods/conversations.inviteShared).

#### join

```ts
join: Method<ConversationsJoinArguments, ConversationsJoinResponse>;
```

##### Description

Joins an existing conversation.

##### See

[`conversations.join` API reference](https://api.slack.com/methods/conversations.join).

#### kick

```ts
kick: Method<ConversationsKickArguments, ConversationsKickResponse>;
```

##### Description

Removes a user from a conversation.

##### See

[`conversations.kick` API reference](https://api.slack.com/methods/conversations.kick).

#### leave

```ts
leave: Method<ConversationsLeaveArguments, ConversationsLeaveResponse>;
```

##### Description

Leaves a conversation.

##### See

[`conversations.leave` API reference](https://api.slack.com/methods/conversations.leave).

#### list

```ts
list: Method<ConversationsListArguments, ConversationsListResponse>;
```

##### Description

List all channels in a Slack team.

##### See

[`conversations.list` API reference](https://api.slack.com/methods/conversations.list).

#### listConnectInvites

```ts
listConnectInvites: Method<ConversationsListConnectInvitesArguments, ConversationsListConnectInvitesResponse>;
```

##### Description

Lists shared channel invites that have been generated or received but have not been approved by
all parties.

##### See

[`conversations.listConnectInvites` API reference](https://api.slack.com/methods/conversations.listConnectInvites).

#### mark

```ts
mark: Method<ConversationsMarkArguments, ConversationsMarkResponse>;
```

##### Description

Sets the read cursor in a channel.

##### See

[`conversations.mark` API reference](https://api.slack.com/methods/conversations.mark).

#### members

```ts
members: Method<ConversationsMembersArguments, ConversationsMembersResponse>;
```

##### Description

Retrieve members of a conversation.

##### See

[`conversations.members` API reference](https://api.slack.com/methods/conversations.members).

#### open

```ts
open: Method<ConversationsOpenArguments, ConversationsOpenResponse>;
```

##### Description

Opens or resumes a direct message or multi-person direct message.

##### See

[`conversations.open` API reference](https://api.slack.com/methods/conversations.open).

#### rename

```ts
rename: Method<ConversationsRenameArguments, ConversationsRenameResponse>;
```

##### Description

Renames a conversation.

##### See

[`conversations.rename` API reference](https://api.slack.com/methods/conversations.rename).

#### replies

```ts
replies: Method<ConversationsRepliesArguments, ConversationsRepliesResponse>;
```

##### Description

Retrieve a thread of messages posted to a conversation.

##### See

[`conversations.replies` API reference](https://api.slack.com/methods/conversations.replies).

#### setPurpose

```ts
setPurpose: Method<ConversationsSetPurposeArguments, ConversationsSetPurposeResponse>;
```

##### Description

Sets the purpose for a conversation.

##### See

[`conversations.setPurpose` API reference](https://api.slack.com/methods/conversations.setPurpose).

#### setTopic

```ts
setTopic: Method<ConversationsSetTopicArguments, ConversationsSetTopicResponse>;
```

##### Description

Sets the topic for a conversation.

##### See

[`conversations.setTopic` API reference](https://api.slack.com/methods/conversations.setTopic).

#### unarchive

```ts
unarchive: Method<ConversationsUnarchiveArguments, ConversationsUnarchiveResponse>;
```

##### Description

Reverses conversation archival.

##### See

[`conversations.unarchive` API reference](https://api.slack.com/methods/conversations.unarchive).

#### Inherited from

[`Methods`](Methods.md).[`conversations`](Methods.md#conversations-1)

#### Defined in

[packages/web-api/src/methods.ts:1463](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1463)

***

### dialog

```ts
readonly dialog: object;
```

#### open

```ts
open: Method<DialogOpenArguments, DialogOpenResponse>;
```

##### Description

Open a dialog with a user.

##### See

[`dialog.open` API reference](https://api.slack.com/methods/dialog.open).

#### Inherited from

[`Methods`](Methods.md).[`dialog`](Methods.md#dialog)

#### Defined in

[packages/web-api/src/methods.ts:1622](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1622)

***

### dnd

```ts
readonly dnd: object;
```

#### endDnd

```ts
endDnd: Method<DndEndDndArguments, DndEndDndResponse>;
```

##### Description

Ends the current user's Do Not Disturb session immediately.

##### See

[`dnd.endDnd` API reference](https://api.slack.com/methods/dnd.endDnd).

#### endSnooze

```ts
endSnooze: Method<DndEndSnoozeArguments, DndEndSnoozeResponse>;
```

##### Description

Ends the current user's snooze mode immediately.

##### See

[`dnd.endSnooze` API reference](https://api.slack.com/methods/dnd.endSnooze).

#### info

```ts
info: Method<DndInfoArguments, DndInfoResponse>;
```

##### Description

Retrieves a user's current Do Not Disturb status.

##### See

[`dnd.info` API reference](https://api.slack.com/methods/dnd.info).

#### setSnooze

```ts
setSnooze: Method<DndSetSnoozeArguments, DndSetSnoozeResponse>;
```

##### Description

Turns on Do Not Disturb mode for the current user, or changes its duration.

##### See

[`dnd.setSnooze` API reference](https://api.slack.com/methods/dnd.setSnooze).

#### teamInfo

```ts
teamInfo: Method<DndTeamInfoArguments, DndTeamInfoResponse>;
```

##### Description

Retrieves the Do Not Disturb status for up to 50 users on a team.

##### See

[`dnd.teamInfo` API reference](https://api.slack.com/methods/dnd.teamInfo).

#### Inherited from

[`Methods`](Methods.md).[`dnd`](Methods.md#dnd)

#### Defined in

[packages/web-api/src/methods.ts:1630](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1630)

***

### emoji

```ts
readonly emoji: object;
```

#### list

```ts
list: Method<EmojiListArguments, EmojiListResponse>;
```

##### Description

Lists custom emoji for a team.

##### See

[`emoji.list` API reference](https://api.slack.com/methods/emoji.list).

#### Inherited from

[`Methods`](Methods.md).[`emoji`](Methods.md#emoji-1)

#### Defined in

[packages/web-api/src/methods.ts:1658](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1658)

***

### files

```ts
readonly files: object;
```

#### comments

```ts
comments: object;
```

#### comments.delete

```ts
delete: Method<FilesCommentsDeleteArguments, FilesCommentsDeleteResponse>;
```

##### Description

Deletes an existing comment on a file.

##### See

[`files.comments.delete` API reference](https://api.slack.com/methods/files.comments.delete).

#### completeUploadExternal

```ts
completeUploadExternal: Method<FilesCompleteUploadExternalArguments, FilesCompleteUploadExternalResponse>;
```

##### Description

Finishes an upload started with [`files.getUploadURLExternal`](https://api.slack.com/methods/files.getUploadURLExternal).

##### See

[`files.completeUploadExternal` API reference](https://api.slack.com/methods/files.completeUploadExternal).

#### delete

```ts
delete: Method<FilesDeleteArguments, FilesDeleteResponse>;
```

##### Description

Deletes a file.

##### See

[`files.delete` API reference](https://api.slack.com/methods/files.delete).

#### getUploadURLExternal

```ts
getUploadURLExternal: Method<FilesGetUploadURLExternalArguments, FilesGetUploadURLExternalResponse>;
```

##### Description

Gets a URL for an edge external file upload.

##### See

[`files.getUploadURLExternal` API reference](https://api.slack.com/methods/files.getUploadURLExternal).

#### info

```ts
info: Method<FilesInfoArguments, FilesInfoResponse>;
```

##### Description

Gets information about a file.

##### See

[`files.info` API reference](https://api.slack.com/methods/files.info).

#### list

```ts
list: Method<FilesListArguments, FilesListResponse>;
```

##### Description

List files for a team, in a channel, or from a user with applied filters.

##### See

[`files.list` API reference](https://api.slack.com/methods/files.list).

#### remote

```ts
remote: object;
```

#### remote.add

```ts
add: Method<FilesRemoteAddArguments, FilesRemoteAddResponse>;
```

##### Description

Adds a file from a remote service.

##### See

[`files.remote.add` API reference](https://api.slack.com/methods/files.remote.add).

#### remote.info

```ts
info: Method<FilesRemoteInfoArguments, FilesRemoteInfoResponse>;
```

##### Description

Retrieve information about a remote file added to Slack.

##### See

[`files.remote.info` API reference](https://api.slack.com/methods/files.remote.info).

#### remote.list

```ts
list: Method<FilesRemoteListArguments, FilesRemoteListResponse>;
```

##### Description

List remote files added to Slack.

##### See

[`files.remote.list` API reference](https://api.slack.com/methods/files.remote.list).

#### remote.remove

```ts
remove: Method<FilesRemoteRemoveArguments, FilesRemoteRemoveResponse>;
```

##### Description

Remove a remote file.

##### See

[`files.remote.remove` API reference](https://api.slack.com/methods/files.remote.remove).

#### remote.share

```ts
share: Method<FilesRemoteShareArguments, FilesRemoteShareResponse>;
```

##### Description

Share a remote file into a channel.

##### See

[`files.remote.share` API reference](https://api.slack.com/methods/files.remote.share).

#### remote.update

```ts
update: Method<FilesRemoteUpdateArguments, FilesRemoteUpdateResponse>;
```

##### Description

Updates an existing remote file.

##### See

[`files.remote.update` API reference](https://api.slack.com/methods/files.remote.update).

#### revokePublicURL

```ts
revokePublicURL: Method<FilesRevokePublicURLArguments, FilesRevokePublicURLResponse>;
```

##### Description

Revokes public/external sharing access for a file.

##### See

[`files.revokePublicURL` API reference](https://api.slack.com/methods/files.revokePublicURL).

#### sharedPublicURL

```ts
sharedPublicURL: Method<FilesSharedPublicURLArguments, FilesSharedPublicURLResponse>;
```

##### Description

Enables a file for public/external sharing.

##### See

[`files.revokePublicURL` API reference](https://api.slack.com/methods/files.revokePublicURL).

#### ~~upload~~

```ts
upload: Method<FilesUploadArguments, FilesUploadResponse>;
```

##### Description

Uploads or creates a file.

##### Deprecated

Use `uploadV2` instead. See [our post on retiring `files.upload`](https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay).

##### See

[`files.upload` API reference](https://api.slack.com/methods/files.upload).

#### uploadV2

```ts
uploadV2: Method<FilesUploadV2Arguments, WebAPICallResult>;
```

##### Description

Custom method to support a new way of uploading files to Slack.
Supports a single file upload
Supply:
- (required) single file or content
- (optional) channel, alt_text, snippet_type,
Supports multiple file uploads
Supply:
- multiple upload_files
Will try to honor both single file or content data supplied as well
as multiple file uploads property.

##### See

[`@slack/web-api` Upload a file documentation](https://slack.dev/node-slack-sdk/web-api#upload-a-file).

#### Inherited from

[`Methods`](Methods.md).[`files`](Methods.md#files)

#### Defined in

[packages/web-api/src/methods.ts:1666](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1666)

***

### functions

```ts
readonly functions: object;
```

#### completeError

```ts
completeError: Method<FunctionsCompleteErrorArguments, FunctionsCompleteErrorResponse>;
```

##### Description

Signal the failure to execute a Custom Function.

##### See

[`functions.completeError` API reference](https://api.slack.com/methods/functions.completeError).

#### completeSuccess

```ts
completeSuccess: Method<FunctionsCompleteSuccessArguments, FunctionsCompleteSuccessResponse>;
```

##### Description

Signal the successful completion of a Custom Function.

##### See

[`functions.completeSuccess` API reference](https://api.slack.com/methods/functions.completeSuccess).

#### Inherited from

[`Methods`](Methods.md).[`functions`](Methods.md#functions-1)

#### Defined in

[packages/web-api/src/methods.ts:1767](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1767)

***

### migration

```ts
readonly migration: object;
```

#### exchange

```ts
exchange: Method<MigrationExchangeArguments, MigrationExchangeResponse>;
```

##### Description

For Enterprise Grid workspaces, map local user IDs to global user IDs.

##### See

[`migration.exchange` API reference](https://api.slack.com/methods/migration.exchange).

#### Inherited from

[`Methods`](Methods.md).[`migration`](Methods.md#migration)

#### Defined in

[packages/web-api/src/methods.ts:1783](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1783)

***

### oauth

```ts
readonly oauth: object;
```

#### ~~access~~

```ts
access: Method<OAuthAccessArguments, OauthAccessResponse>;
```

##### Description

Exchanges a temporary OAuth verifier code for an access token.

##### Deprecated

This is a legacy method only used by classic Slack apps. Use `oauth.v2.access` for new Slack apps.

##### See

[`oauth.access` API reference](https://api.slack.com/methods/oauth.access).

#### v2

```ts
v2: object;
```

#### v2.access

```ts
access: Method<OAuthV2AccessArguments, OauthV2AccessResponse>;
```

##### Description

Exchanges a temporary OAuth verifier code for an access token.

##### See

[`oauth.v2.access` API reference](https://api.slack.com/methods/oauth.v2.access).

#### v2.exchange

```ts
exchange: Method<OAuthV2ExchangeArguments, OauthV2ExchangeResponse>;
```

##### Description

Exchanges a legacy access token for a new expiring access token and refresh token.

##### See

[`oauth.v2.exchange` API reference](https://api.slack.com/methods/oauth.v2.exchange).

#### Inherited from

[`Methods`](Methods.md).[`oauth`](Methods.md#oauth)

#### Defined in

[packages/web-api/src/methods.ts:1791](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1791)

***

### openid

```ts
readonly openid: object;
```

#### connect

```ts
connect: object;
```

#### connect.token

```ts
token: Method<OpenIDConnectTokenArguments, OpenIDConnectTokenResponse>;
```

##### Description

Exchanges a temporary OAuth verifier code for an access token for [Sign in with Slack](https://api.slack.com/authentication/sign-in-with-slack).

##### See

[`openid.connect.token` API reference](https://api.slack.com/methods/openid.connect.token).

#### connect.userInfo

```ts
userInfo: Method<OpenIDConnectUserInfoArguments, OpenIDConnectUserInfoResponse>;
```

##### Description

Get the identity of a user who has authorized [Sign in with Slack](https://api.slack.com/authentication/sign-in-with-slack).

##### See

[`openid.connect.userInfo` API reference](https://api.slack.com/methods/openid.connect.userInfo).

#### Inherited from

[`Methods`](Methods.md).[`openid`](Methods.md#openid)

#### Defined in

[packages/web-api/src/methods.ts:1812](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1812)

***

### pins

```ts
readonly pins: object;
```

#### add

```ts
add: Method<PinsAddArguments, PinsAddResponse>;
```

##### Description

Pins an item to a channel.

##### See

[`pins.add` API reference](https://api.slack.com/methods/pins.add).

#### list

```ts
list: Method<PinsListArguments, PinsListResponse>;
```

##### Description

Lists items pinned to a channel.

##### See

[`pins.list` API reference](https://api.slack.com/methods/pins.list).

#### remove

```ts
remove: Method<PinsRemoveArguments, PinsRemoveResponse>;
```

##### Description

Un-pins an item from a channel.

##### See

[`pins.remove` API reference](https://api.slack.com/methods/pins.remove).

#### Inherited from

[`Methods`](Methods.md).[`pins`](Methods.md#pins)

#### Defined in

[packages/web-api/src/methods.ts:1827](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1827)

***

### reactions

```ts
readonly reactions: object;
```

#### add

```ts
add: Method<ReactionsAddArguments, ReactionsAddResponse>;
```

##### Description

Adds a reaction to an item.

##### See

[`reactions.add` API reference](https://api.slack.com/methods/reactions.add).

#### get

```ts
get: Method<ReactionsGetArguments, ReactionsGetResponse>;
```

##### Description

Gets reactions for an item.

##### See

[`reactions.get` API reference](https://api.slack.com/methods/reactions.get).

#### list

```ts
list: Method<ReactionsListArguments, ReactionsListResponse>;
```

##### Description

List reactions made by a user.

##### See

[`reactions.list` API reference](https://api.slack.com/methods/reactions.list).

#### remove

```ts
remove: Method<ReactionsRemoveArguments, ReactionsRemoveResponse>;
```

##### Description

Removes a reaction from an item.

##### See

[`reactions.remove` API reference](https://api.slack.com/methods/reactions.remove).

#### Inherited from

[`Methods`](Methods.md).[`reactions`](Methods.md#reactions)

#### Defined in

[packages/web-api/src/methods.ts:1845](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1845)

***

### reminders

```ts
readonly reminders: object;
```

#### add

```ts
add: Method<RemindersAddArguments, RemindersAddResponse>;
```

##### Description

Creates a reminder.

##### See

[`reminders.add` API reference](https://api.slack.com/methods/reminders.add).

#### complete

```ts
complete: Method<RemindersCompleteArguments, RemindersCompleteResponse>;
```

##### Description

Marks a reminder as complete.

##### See

[`reminders.complete` API reference](https://api.slack.com/methods/reminders.complete).

#### delete

```ts
delete: Method<RemindersDeleteArguments, RemindersDeleteResponse>;
```

##### Description

Deletes a reminder.

##### See

[`reminders.delete` API reference](https://api.slack.com/methods/reminders.delete).

#### info

```ts
info: Method<RemindersInfoArguments, RemindersInfoResponse>;
```

##### Description

Gets information about a reminder.

##### See

[`reminders.info` API reference](https://api.slack.com/methods/reminders.info).

#### list

```ts
list: Method<RemindersListArguments, RemindersListResponse>;
```

##### Description

Lists all reminders created by or for a given user.

##### See

[`reminders.list` API reference](https://api.slack.com/methods/reminders.list).

#### Inherited from

[`Methods`](Methods.md).[`reminders`](Methods.md#reminders)

#### Defined in

[packages/web-api/src/methods.ts:1870](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1870)

***

### rtm

```ts
readonly rtm: object;
```

#### connect

```ts
connect: Method<RTMConnectArguments, RtmConnectResponse>;
```

##### Description

Starts a Real Time Messaging session.

##### See

[`rtm.connect` API reference](https://api.slack.com/methods/rtm.connect).

#### ~~start~~

```ts
start: Method<RTMStartArguments, RtmStartResponse>;
```

##### Description

Starts a Real Time Messaging session.

##### Deprecated

Use `rtm.connect` instead. See [our post on retiring `rtm.start`](https://api.slack.com/changelog/2021-10-rtm-start-to-stop).

##### See

[`rtm.start` API reference](https://api.slack.com/methods/rtm.start).

#### Inherited from

[`Methods`](Methods.md).[`rtm`](Methods.md#rtm)

#### Defined in

[packages/web-api/src/methods.ts:1898](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1898)

***

### search

```ts
readonly search: object;
```

#### all

```ts
all: Method<SearchAllArguments, SearchAllResponse>;
```

##### Description

Searches for messages and files matching a query.

##### See

[search.all` API reference](https://api.slack.com/methods/search.all).

#### files

```ts
files: Method<SearchFilesArguments, SearchFilesResponse>;
```

##### Description

Searches for files matching a query.

##### See

[search.files` API reference](https://api.slack.com/methods/search.files).

#### messages

```ts
messages: Method<SearchMessagesArguments, SearchMessagesResponse>;
```

##### Description

Searches for messages matching a query.

##### See

[search.messages` API reference](https://api.slack.com/methods/search.messages).

#### Inherited from

[`Methods`](Methods.md).[`search`](Methods.md#search-2)

#### Defined in

[packages/web-api/src/methods.ts:1912](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1912)

***

### slackApiUrl

```ts
readonly slackApiUrl: string;
```

The base URL for reaching Slack's Web API. Consider changing this value for testing purposes.

#### Defined in

[packages/web-api/src/WebClient.ts:130](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L130)

***

### stars

```ts
readonly stars: object;
```

#### ~~add~~

```ts
add: Method<StarsAddRemoveArguments, StarsAddResponse>;
```

##### Description

Save an item for later. Formerly known as adding a star.

##### Deprecated

Stars can still be added but they can no longer be viewed or interacted with by end-users.
See [our post on stars and the Later list](https://api.slack.com/changelog/2023-07-its-later-already-for-stars-and-reminders).

##### See

[`stars.add` API reference](https://api.slack.com/methods/stars.add).

#### ~~list~~

```ts
list: Method<StarsListArguments, StarsListResponse>;
```

##### Description

List a user's saved items, formerly known as stars.

##### Deprecated

Stars can still be listed but they can no longer be viewed or interacted with by end-users.
See [our post on stars and the Later list](https://api.slack.com/changelog/2023-07-its-later-already-for-stars-and-reminders).

##### See

[`stars.list` API reference](https://api.slack.com/methods/stars.list).

#### ~~remove~~

```ts
remove: Method<StarsAddRemoveArguments, StarsRemoveResponse>;
```

##### Description

Remove a saved item from a user's saved items, formerly known as stars.

##### Deprecated

Stars can still be removed but they can no longer be viewed or interacted with by end-users.
See [our post on stars and the Later list](https://api.slack.com/changelog/2023-07-its-later-already-for-stars-and-reminders).

##### See

[`stars.remove` API reference](https://api.slack.com/methods/stars.remove).

#### Inherited from

[`Methods`](Methods.md).[`stars`](Methods.md#stars)

#### Defined in

[packages/web-api/src/methods.ts:2140](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2140)

***

### team

```ts
readonly team: object;
```

#### accessLogs

```ts
accessLogs: Method<TeamAccessLogsArguments, TeamAccessLogsResponse>;
```

##### Description

Gets the access logs for the current team.

##### See

[`team.accessLogs` API reference](https://api.slack.com/methods/team.accessLogs).

#### billableInfo

```ts
billableInfo: Method<TeamBillableInfoArguments, TeamBillableInfoResponse>;
```

##### Description

Gets billable users information for the current team.

##### See

[`team.billableInfo` API reference](https://api.slack.com/methods/team.billableInfo).

#### billing

```ts
billing: object;
```

#### billing.info

```ts
info: Method<TeamBillingInfoArguments, TeamBillingInfoResponse>;
```

##### Description

Reads a workspace's billing plan information.

##### See

[`team.billing.info` API reference](https://api.slack.com/methods/team.billing.info).

#### externalTeams

```ts
externalTeams: object;
```

#### externalTeams.disconnect

```ts
disconnect: Method<TeamExternalTeamsDisconnectArguments, TeamExternalTeamsDisconnectResponse>;
```

##### Description

Disconnect an external organization.

##### See

[`team.externalTeams.disconnect` API reference](https://api.slack.com/methods/team.externalTeams.disconnect).

#### externalTeams.list

```ts
list: Method<TeamExternalTeamsListArguments, TeamExternalTeamsListResponse>;
```

##### Description

Returns a list of all the external teams connected and details about the connection.

##### See

[`team.externalTeams.list` API reference](https://api.slack.com/methods/team.externalTeams.list).

#### info

```ts
info: Method<TeamInfoArguments, TeamInfoResponse>;
```

##### Description

Gets information about the current team.

##### See

[`team.info` API reference](https://api.slack.com/methods/team.info).

#### integrationLogs

```ts
integrationLogs: Method<TeamIntegrationLogsArguments, TeamIntegrationLogsResponse>;
```

##### Description

Gets the integration logs for the current team.

##### See

[`team.integrationLogs` API reference](https://api.slack.com/methods/team.integrationLogs).

#### preferences

```ts
preferences: object;
```

#### preferences.list

```ts
list: Method<TeamPreferencesListArguments, TeamPreferencesListResponse>;
```

##### Description

Retrieve a list of a workspace's team preferences.

##### See

[`team.preferences.list` API reference](https://api.slack.com/methods/team.preferences.list).

#### profile

```ts
profile: object;
```

#### profile.get

```ts
get: Method<TeamProfileGetArguments, TeamProfileGetResponse>;
```

##### Description

Retrieve a team's profile.

##### See

[`team.profile.get` API reference](https://api.slack.com/methods/team.profile.get).

#### Inherited from

[`Methods`](Methods.md).[`team`](Methods.md#team)

#### Defined in

[packages/web-api/src/methods.ts:1930](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1930)

***

### token?

```ts
readonly optional token: string;
```

Authentication and authorization token for accessing Slack Web API (usually begins with `xoxp` or `xoxb`)

#### Defined in

[packages/web-api/src/WebClient.ts:135](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L135)

***

### tooling

```ts
readonly tooling: object;
```

#### tokens

```ts
tokens: object;
```

#### tokens.rotate

```ts
rotate: Method<ToolingTokensRotateArguments, ToolingTokensRotateResponse>;
```

##### Description

Exchanges a refresh token for a new app configuration token.

##### See

[`tooling.tokens.rotate` API reference](https://api.slack.com/methods/tooling.tokens.rotate).

#### Inherited from

[`Methods`](Methods.md).[`tooling`](Methods.md#tooling)

#### Defined in

[packages/web-api/src/methods.ts:1987](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1987)

***

### usergroups

```ts
readonly usergroups: object;
```

#### create

```ts
create: Method<UsergroupsCreateArguments, UsergroupsCreateResponse>;
```

##### Description

Create a User Group.

##### See

[`usergroups.create` API reference](https://api.slack.com/methods/usergroups.create).

#### disable

```ts
disable: Method<UsergroupsDisableArguments, UsergroupsDisableResponse>;
```

##### Description

Disable an existing User Group.

##### See

[`usergroups.disable` API reference](https://api.slack.com/methods/usergroups.disable).

#### enable

```ts
enable: Method<UsergroupsEnableArguments, UsergroupsEnableResponse>;
```

##### Description

Enable an existing User Group.

##### See

[`usergroups.enable` API reference](https://api.slack.com/methods/usergroups.enable).

#### list

```ts
list: Method<UsergroupsListArguments, UsergroupsListResponse>;
```

##### Description

List all User Groups for a team.

##### See

[`usergroups.list` API reference](https://api.slack.com/methods/usergroups.list).

#### update

```ts
update: Method<UsergroupsUpdateArguments, UsergroupsUpdateResponse>;
```

##### Description

Update an existing User Group.

##### See

[`usergroups.update` API reference](https://api.slack.com/methods/usergroups.update).

#### users

```ts
users: object;
```

#### users.list

```ts
list: Method<UsergroupsUsersListArguments, UsergroupsUsersListResponse>;
```

##### Description

List all users in a User Group.

##### See

[`usergroups.users.list` API reference](https://api.slack.com/methods/usergroups.users.list).

#### users.update

```ts
update: Method<UsergroupsUsersUpdateArguments, UsergroupsUsersUpdateResponse>;
```

##### Description

Update the list of users in a User Group.

##### See

[`usergroups.users.update` API reference](https://api.slack.com/methods/usergroups.users.update).

#### Inherited from

[`Methods`](Methods.md).[`usergroups`](Methods.md#usergroups-1)

#### Defined in

[packages/web-api/src/methods.ts:1997](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1997)

***

### users

```ts
readonly users: object;
```

#### conversations

```ts
conversations: Method<UsersConversationsArguments, UsersConversationsResponse>;
```

##### Description

List conversations the calling user may access.

##### See

[`users.conversations` API reference](https://api.slack.com/methods/users.conversations).

#### deletePhoto

```ts
deletePhoto: Method<UsersDeletePhotoArguments, UsersDeletePhotoResponse>;
```

##### Description

Delete the user profile photo.

##### See

[`users.deletePhoto` API reference](https://api.slack.com/methods/users.deletePhoto).

#### discoverableContacts

```ts
discoverableContacts: object;
```

#### discoverableContacts.lookup

```ts
lookup: Method<UsersDiscoverableContactsLookupArguments, UsersDiscoverableContactsLookupResponse>;
```

##### Description

Lookup an email address to see if someone is on Slack.

##### See

[`users.discoverableContacts.lookup` API reference](https://api.slack.com/methods/users.discoverableContacts.lookup).

#### getPresence

```ts
getPresence: Method<UsersGetPresenceArguments, UsersGetPresenceResponse>;
```

##### Description

Gets user presence information.

##### See

[`users.getPresence` API reference](https://api.slack.com/methods/users.getPresence).

#### identity

```ts
identity: Method<UsersIdentityArguments, UsersIdentityResponse>;
```

##### Description

Get a user's identity.

##### See

[`users.identity` API reference](https://api.slack.com/methods/users.identity).

#### info

```ts
info: Method<UsersInfoArguments, UsersInfoResponse>;
```

##### Description

Gets information about a user.

##### See

[`users.info` API reference](https://api.slack.com/methods/users.info).

#### list

```ts
list: Method<UsersListArguments, UsersListResponse>;
```

##### Description

Lists all users in a Slack team.

##### See

[`users.list` API reference](https://api.slack.com/methods/users.list).

#### lookupByEmail

```ts
lookupByEmail: Method<UsersLookupByEmailArguments, UsersLookupByEmailResponse>;
```

##### Description

Find a user with an email address.

##### See

[`users.lookupByEmail` API reference](https://api.slack.com/methods/users.lookupByEmail).

#### profile

```ts
profile: object;
```

#### profile.get

```ts
get: Method<UsersProfileGetArguments, UsersProfileGetResponse>;
```

##### Description

Retrieve a user's profile information, including their custom status.

##### See

[`users.profile.get` API reference](https://api.slack.com/methods/users.profile.get).

#### profile.set

```ts
set: Method<UsersProfileSetArguments, UsersProfileSetResponse>;
```

##### Description

Set a user's profile information, including custom status.

##### See

[`users.profile.set` API reference](https://api.slack.com/methods/users.profile.set).

#### setPhoto

```ts
setPhoto: Method<UsersSetPhotoArguments, UsersSetPhotoResponse>;
```

##### Description

Set the user profile photo.

##### See

[`users.setPhoto` API reference](https://api.slack.com/methods/users.setPhoto).

#### setPresence

```ts
setPresence: Method<UsersSetPresenceArguments, UsersSetPresenceResponse>;
```

##### Description

Manually sets user presence.

##### See

[`users.setPresence` API reference](https://api.slack.com/methods/users.setPresence).

#### Inherited from

[`Methods`](Methods.md).[`users`](Methods.md#users-2)

#### Defined in

[packages/web-api/src/methods.ts:2043](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2043)

***

### views

```ts
readonly views: object;
```

#### open

```ts
open: Method<ViewsOpenArguments, ViewsOpenResponse>;
```

##### Description

Open a view for a user.

##### See

[`views.open` API reference](https://api.slack.com/methods/views.open).

#### publish

```ts
publish: Method<ViewsPublishArguments, ViewsPublishResponse>;
```

##### Description

Publish a static view for a user.

##### See

[`views.publish` API reference](https://api.slack.com/methods/views.publish).

#### push

```ts
push: Method<ViewsPushArguments, ViewsPushResponse>;
```

##### Description

Push a view onto the stack of a root view.

##### See

[`views.push` API reference](https://api.slack.com/methods/views.push).

#### update

```ts
update: Method<ViewsUpdateArguments, ViewsUpdateResponse>;
```

##### Description

Update an existing view.

##### See

[`views.update` API reference](https://api.slack.com/methods/views.update).

#### Inherited from

[`Methods`](Methods.md).[`views`](Methods.md#views)

#### Defined in

[packages/web-api/src/methods.ts:2110](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2110)

***

### workflows

```ts
readonly workflows: object;
```

#### ~~stepCompleted~~

```ts
stepCompleted: Method<WorkflowsStepCompletedArguments, WorkflowsStepCompletedResponse>;
```

##### Description

Indicate that an app's step in a workflow completed execution.

##### Deprecated

Steps from Apps is deprecated.
We're retiring all Slack app functionality around Steps from Apps in September 2024.
See [our post on deprecating Steps from Apps](https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back).

##### See

[`workflows.stepCompleted` API reference](https://api.slack.com/methods/workflows.stepCompleted).

#### ~~stepFailed~~

```ts
stepFailed: Method<WorkflowsStepFailedArguments, WorkflowsStepFailedResponse>;
```

##### Description

Indicate that an app's step in a workflow failed to execute.

##### Deprecated

Steps from Apps is deprecated.
We're retiring all Slack app functionality around Steps from Apps in September 2024.
See [our post on deprecating Steps from Apps](https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back).

##### See

[`workflows.stepFailed` API reference](https://api.slack.com/methods/workflows.stepFailed).

#### ~~updateStep~~

```ts
updateStep: Method<WorkflowsUpdateStepArguments, WorkflowsUpdateStepResponse>;
```

##### Description

Update the configuration for a workflow step.

##### Deprecated

Steps from Apps is deprecated.
We're retiring all Slack app functionality around Steps from Apps in September 2024.
See [our post on deprecating Steps from Apps](https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back).

##### See

[`workflows.updateStep` API reference](https://api.slack.com/methods/workflows.updateStep).

#### Inherited from

[`Methods`](Methods.md).[`workflows`](Methods.md#workflows-1)

#### Defined in

[packages/web-api/src/methods.ts:2164](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2164)

***

### prefixed

```ts
static prefixed: string | boolean;
```

#### Inherited from

[`Methods`](Methods.md).[`prefixed`](Methods.md#prefixed)

#### Defined in

packages/web-api/node\_modules/eventemitter3/index.d.ts:9

## Methods

### addListener()

```ts
addListener<T>(
   event, 
   fn, 
   context?): this
```

#### Type Parameters

• **T** *extends* [`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Parameters

• **event**: `T`

• **fn**

• **context?**: `any`

#### Returns

`this`

#### Inherited from

[`Methods`](Methods.md).[`addListener`](Methods.md#addlistener)

#### Defined in

packages/web-api/node\_modules/eventemitter3/index.d.ts:45

***

### apiCall()

```ts
apiCall(method, options): Promise<WebAPICallResult>
```

Generic method for calling a Web API method

#### Parameters

• **method**: `string`

the Web API method to call [https://api.slack.com/methods](https://api.slack.com/methods)

• **options**: `Record`\<`string`, `unknown`\> = `{}`

options

#### Returns

`Promise`\<[`WebAPICallResult`](../interfaces/WebAPICallResult.md)\>

#### Overrides

[`Methods`](Methods.md).[`apiCall`](Methods.md#apicall)

#### Defined in

[packages/web-api/src/WebClient.ts:255](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L255)

***

### emit()

```ts
emit<T>(event, ...args): boolean
```

Calls each of the listeners registered for a given event.

#### Type Parameters

• **T** *extends* [`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Parameters

• **event**: `T`

• ...**args**: `any`[]

#### Returns

`boolean`

#### Inherited from

[`Methods`](Methods.md).[`emit`](Methods.md#emit)

#### Defined in

packages/web-api/node\_modules/eventemitter3/index.d.ts:32

***

### eventNames()

```ts
eventNames(): RATE_LIMITED[]
```

Return an array listing the events for which the emitter has registered
listeners.

#### Returns

[`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)[]

#### Inherited from

[`Methods`](Methods.md).[`eventNames`](Methods.md#eventnames)

#### Defined in

packages/web-api/node\_modules/eventemitter3/index.d.ts:15

***

### filesUploadV2()

```ts
filesUploadV2(options): Promise<WebAPICallResult & object>
```

This wrapper method provides an easy way to upload files using the following endpoints:

**#1**: For each file submitted with this method, submit filenames
and file metadata to [files.getUploadURLExternal](https://api.slack.com/methods/files.getUploadURLExternal) to request a URL to
which to send the file data to and an id for the file

**#2**: for each returned file `upload_url`, upload corresponding file to
URLs returned from step 1 (e.g. https://files.slack.com/upload/v1/...\")

**#3**: Complete uploads [files.completeUploadExternal](https://api.slack.com/methods/files.completeUploadExternal)

#### Parameters

• **options**: [`FilesUploadV2Arguments`](../type-aliases/FilesUploadV2Arguments.md)

#### Returns

`Promise`\<[`WebAPICallResult`](../interfaces/WebAPICallResult.md) & `object`\>

#### Overrides

[`Methods`](Methods.md).[`filesUploadV2`](Methods.md#filesuploadv2)

#### Defined in

[packages/web-api/src/WebClient.ts:436](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L436)

***

### listenerCount()

```ts
listenerCount(event): number
```

Return the number of listeners listening to a given event.

#### Parameters

• **event**: [`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Returns

`number`

#### Inherited from

[`Methods`](Methods.md).[`listenerCount`](Methods.md#listenercount)

#### Defined in

packages/web-api/node\_modules/eventemitter3/index.d.ts:27

***

### listeners()

```ts
listeners<T>(event): (...args) => void[]
```

Return the listeners registered for a given event.

#### Type Parameters

• **T** *extends* [`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Parameters

• **event**: `T`

#### Returns

(...`args`) => `void`[]

#### Inherited from

[`Methods`](Methods.md).[`listeners`](Methods.md#listeners)

#### Defined in

packages/web-api/node\_modules/eventemitter3/index.d.ts:20

***

### off()

```ts
off<T>(
   event, 
   fn?, 
   context?, 
   once?): this
```

#### Type Parameters

• **T** *extends* [`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Parameters

• **event**: `T`

• **fn?**

• **context?**: `any`

• **once?**: `boolean`

#### Returns

`this`

#### Inherited from

[`Methods`](Methods.md).[`off`](Methods.md#off)

#### Defined in

packages/web-api/node\_modules/eventemitter3/index.d.ts:69

***

### on()

```ts
on<T>(
   event, 
   fn, 
   context?): this
```

Add a listener for a given event.

#### Type Parameters

• **T** *extends* [`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Parameters

• **event**: `T`

• **fn**

• **context?**: `any`

#### Returns

`this`

#### Inherited from

[`Methods`](Methods.md).[`on`](Methods.md#on)

#### Defined in

packages/web-api/node\_modules/eventemitter3/index.d.ts:40

***

### once()

```ts
once<T>(
   event, 
   fn, 
   context?): this
```

Add a one-time listener for a given event.

#### Type Parameters

• **T** *extends* [`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Parameters

• **event**: `T`

• **fn**

• **context?**: `any`

#### Returns

`this`

#### Inherited from

[`Methods`](Methods.md).[`once`](Methods.md#once)

#### Defined in

packages/web-api/node\_modules/eventemitter3/index.d.ts:54

***

### paginate()

#### paginate(method, options)

```ts
paginate(method, options?): AsyncIterable<WebAPICallResult>
```

Iterate over the result pages of a cursor-paginated Web API method. This method can return two types of values,
depending on which arguments are used. When up to two parameters are used, the return value is an async iterator
which can be used as the iterable in a for-await-of loop. When three or four parameters are used, the return
value is a promise that resolves at the end of iteration. The third parameter, `shouldStop`, is a function that is
called with each `page` and can end iteration by returning `true`. The fourth parameter, `reduce`, is a function
that is called with three arguments: `accumulator`, `page`, and `index`. The `accumulator` is a value of any type
you choose, but it will contain `undefined` when `reduce` is called for the first time. The `page` argument and
`index` arguments are exactly what they say they are. The `reduce` function's return value will be passed in as
`accumulator` the next time its called, and the returned promise will resolve to the last value of `accumulator`.

The for-await-of syntax is part of ES2018. It is available natively in Node starting with v10.0.0. You may be able
to use it in earlier JavaScript runtimes by transpiling your source with a tool like Babel. However, the
transpiled code will likely sacrifice performance.

##### Parameters

• **method**: `string`

the cursor-paginated Web API method to call [https://api.slack.com/docs/pagination](https://api.slack.com/docs/pagination)

• **options?**: `Record`\<`string`, `unknown`\>

options

##### Returns

`AsyncIterable`\<[`WebAPICallResult`](../interfaces/WebAPICallResult.md)\>

##### Defined in

[packages/web-api/src/WebClient.ts:337](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L337)

#### paginate(method, options, shouldStop)

```ts
paginate(
   method, 
   options, 
shouldStop): Promise<void>
```

##### Parameters

• **method**: `string`

• **options**: `Record`\<`string`, `unknown`\>

• **shouldStop**: [`PaginatePredicate`](../interfaces/PaginatePredicate.md)

##### Returns

`Promise`\<`void`\>

##### Defined in

[packages/web-api/src/WebClient.ts:338](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L338)

#### paginate(method, options, shouldStop, reduce)

```ts
paginate<R, A>(
   method, 
   options, 
   shouldStop, 
reduce?): Promise<A>
```

##### Type Parameters

• **R** *extends* [`PageReducer`](../interfaces/PageReducer.md)\<`any`\>

• **A** *extends* `any`

##### Parameters

• **method**: `string`

• **options**: `Record`\<`string`, `unknown`\>

• **shouldStop**: [`PaginatePredicate`](../interfaces/PaginatePredicate.md)

• **reduce?**: [`PageReducer`](../interfaces/PageReducer.md)\<`A`\>

##### Returns

`Promise`\<`A`\>

##### Defined in

[packages/web-api/src/WebClient.ts:343](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L343)

***

### removeAllListeners()

```ts
removeAllListeners(event?): this
```

Remove all listeners, or those of the specified event.

#### Parameters

• **event?**: [`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Returns

`this`

#### Inherited from

[`Methods`](Methods.md).[`removeAllListeners`](Methods.md#removealllisteners)

#### Defined in

packages/web-api/node\_modules/eventemitter3/index.d.ts:79

***

### removeListener()

```ts
removeListener<T>(
   event, 
   fn?, 
   context?, 
   once?): this
```

Remove the listeners of a given event.

#### Type Parameters

• **T** *extends* [`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Parameters

• **event**: `T`

• **fn?**

• **context?**: `any`

• **once?**: `boolean`

#### Returns

`this`

#### Inherited from

[`Methods`](Methods.md).[`removeListener`](Methods.md#removelistener)

#### Defined in

packages/web-api/node\_modules/eventemitter3/index.d.ts:63
