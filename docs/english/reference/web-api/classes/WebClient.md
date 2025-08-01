[@slack/web-api](../index.md) / WebClient

# Class: WebClient

Defined in: [src/WebClient.ts:191](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L191)

A client for Slack's Web API

This client provides an alias for each [API method](https://docs.slack.dev/reference/methods|Web). Each method is
a convenience wrapper for calling the [WebClient#apiCall](#apicall) method using the method name as the first parameter.

## Extends

- [`Methods`](Methods.md)

## Constructors

### Constructor

```ts
new WebClient(token?, webClientOptions?): WebClient;
```

Defined in: [src/WebClient.ts:265](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L265)

#### Parameters

##### token?

`string`

An API token to authenticate/authorize with Slack (usually start with `xoxp`, `xoxb`)

##### webClientOptions?

[`WebClientOptions`](../interfaces/WebClientOptions.md) = `{}`

Configuration options.

#### Returns

`WebClient`

#### Overrides

```ts
Methods.constructor
```

## Properties

### admin

```ts
readonly admin: object;
```

Defined in: [src/methods.ts:578](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L578)

#### analytics

```ts
analytics: object;
```

##### analytics.getFile

```ts
getFile: MethodWithRequiredArgument<AdminAnalyticsGetFileArguments, AdminAnalyticsGetFileResponse>;
```

###### Description

Retrieve analytics data for a given date, presented as a compressed JSON file.

###### See

[\`api.test\` API reference](https://docs.slack.dev/reference/methods/api.test).

#### apps

```ts
apps: object;
```

##### apps.activities

```ts
activities: object;
```

##### apps.activities.list

```ts
list: Method<AdminAppsActivitiesListArguments, AdminAppsActivitiesListResponse>;
```

###### Description

Get logs for a specified team/org.

###### See

[\`admin.apps.activities.list\` API reference](https://docs.slack.dev/reference/methods/admin.apps.activities.list).

##### apps.approve

```ts
approve: MethodWithRequiredArgument<AdminAppsApproveArguments, AdminAppsApproveResponse>;
```

###### Description

Approve an app for installation on a workspace.

###### See

[\`admin.apps.approve\` API reference](https://docs.slack.dev/reference/methods/admin.apps.approve).

##### apps.approved

```ts
approved: object;
```

##### apps.approved.list

```ts
list: MethodWithRequiredArgument<AdminAppsApprovedListArguments, AdminAppsApprovedListResponse>;
```

###### Description

List approved apps for an org or workspace.

###### See

[\`admin.apps.approved.list\` API reference](https://docs.slack.dev/reference/methods/admin.apps.approved.list).

##### apps.clearResolution

```ts
clearResolution: MethodWithRequiredArgument<AdminAppsClearResolutionArguments, AdminAppsClearResolutionResponse>;
```

###### Description

Clear an app resolution.

###### See

[\`admin.apps.clearResolution\` API reference](https://docs.slack.dev/reference/methods/admin.apps.clearResolution).

##### apps.config

```ts
config: object;
```

##### apps.config.lookup

```ts
lookup: MethodWithRequiredArgument<AdminAppsConfigLookupArguments, AdminAppsConfigLookupResponse>;
```

###### Description

Look up the app config for connectors by their IDs.

###### See

[\`admin.apps.config.lookup\` API reference](https://docs.slack.dev/reference/methods/admin.apps.config.lookup).

##### apps.config.set

```ts
set: MethodWithRequiredArgument<AdminAppsConfigSetArguments, AdminAppsConfigSetResponse>;
```

###### Description

Set the app config for a connector.

###### See

[\`admin.apps.config.set\` API reference](https://docs.slack.dev/reference/methods/admin.apps.config.set).

##### apps.requests

```ts
requests: object;
```

##### apps.requests.cancel

```ts
cancel: MethodWithRequiredArgument<AdminAppsRequestsCancelArguments, AdminAppsRequestsCancelResponse>;
```

###### Description

Cancel app request for team.

###### See

[\`admin.apps.requests.cancel\` API reference](https://docs.slack.dev/reference/methods/admin.apps.requests.cancel).

##### apps.requests.list

```ts
list: MethodWithRequiredArgument<AdminAppsRequestsListArguments, AdminAppsRequestsListResponse>;
```

###### Description

List app requests for a team/workspace.

###### See

[\`admin.apps.requests.list\` API reference](https://docs.slack.dev/reference/methods/admin.apps.requests.list).

##### apps.restrict

```ts
restrict: MethodWithRequiredArgument<AdminAppsRestrictArguments, AdminAppsRestrictResponse>;
```

###### Description

Restrict an app for installation on a workspace.

###### See

[\`admin.apps.restrict\` API reference](https://docs.slack.dev/reference/methods/admin.apps.restrict).

##### apps.restricted

```ts
restricted: object;
```

##### apps.restricted.list

```ts
list: MethodWithRequiredArgument<AdminAppsRestrictedListArguments, AdminAppsRestrictedListResponse>;
```

###### Description

List restricted apps for an org or workspace.

###### See

[\`admin.apps.restricted.list\` API reference](https://docs.slack.dev/reference/methods/admin.apps.restricted.list).

##### apps.uninstall

```ts
uninstall: MethodWithRequiredArgument<AdminAppsUninstallArguments, AdminAppsUninstallResponse>;
```

###### Description

Uninstall an app from one or many workspaces, or an entire enterprise organization.

###### See

[\`admin.apps.uninstall\` API reference](https://docs.slack.dev/reference/methods/admin.apps.uninstall).

#### auth

```ts
auth: object;
```

##### auth.policy

```ts
policy: object;
```

##### auth.policy.assignEntities

```ts
assignEntities: MethodWithRequiredArgument<AdminAuthPolicyAssignEntitiesArguments, AdminAuthPolicyAssignEntitiesResponse>;
```

###### Description

Assign entities to a particular authentication policy.

###### See

[\`admin.auth.policy.assignEntities\` API reference](https://docs.slack.dev/reference/methods/admin.auth.policy.assignEntities).

##### auth.policy.getEntities

```ts
getEntities: MethodWithRequiredArgument<AdminAuthPolicyGetEntitiesArguments, AdminAuthPolicyGetEntitiesResponse>;
```

###### Description

Fetch all the entities assigned to a particular authentication policy by name.

###### See

[\`admin.auth.policy.getEntities\` API reference](https://docs.slack.dev/reference/methods/admin.auth.policy.getEntities).

##### auth.policy.removeEntities

```ts
removeEntities: MethodWithRequiredArgument<AdminAuthPolicyRemoveEntitiesArguments, AdminAuthPolicyRemoveEntitiesResponse>;
```

###### Description

Remove specified entities from a specified authentication policy.

###### See

[\`admin.auth.policy.removeEntities\` API reference](https://docs.slack.dev/reference/methods/admin.auth.policy.removeEntities).

#### barriers

```ts
barriers: object;
```

##### barriers.create

```ts
create: MethodWithRequiredArgument<AdminBarriersCreateArguments, AdminBarriersCreateResponse>;
```

###### Description

Create an Information Barrier.

###### See

[\`admin.barriers.create\` API reference](https://docs.slack.dev/reference/methods/admin.barriers.create).

##### barriers.delete

```ts
delete: MethodWithRequiredArgument<AdminBarriersDeleteArguments, AdminBarriersDeleteResponse>;
```

###### Description

Delete an existing Information Barrier.

###### See

[\`admin.barriers.delete\` API reference](https://docs.slack.dev/reference/methods/admin.barriers.delete).

##### barriers.list

```ts
list: Method<AdminBarriersListArguments, AdminBarriersListResponse>;
```

###### Description

Get all Information Barriers for your organization.

###### See

[\`admin.barriers.list\` API reference](https://docs.slack.dev/reference/methods/admin.barriers.list).

##### barriers.update

```ts
update: MethodWithRequiredArgument<AdminBarriersUpdateArguments, AdminBarriersUpdateResponse>;
```

###### Description

Update an existing Information Barrier.

###### See

[\`admin.barriers.update\` API reference](https://docs.slack.dev/reference/methods/admin.barriers.update).

#### conversations

```ts
conversations: object;
```

##### conversations.archive

```ts
archive: MethodWithRequiredArgument<AdminConversationsArchiveArguments, AdminConversationsArchiveResponse>;
```

###### Description

Archive a public or private channel.

###### See

[\`admin.conversations.archive\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.archive).

##### conversations.bulkArchive

```ts
bulkArchive: MethodWithRequiredArgument<AdminConversationsBulkArchiveArguments, AdminConversationsBulkArchiveResponse>;
```

###### Description

Archive public or private channels in bulk.

###### See

[\`admin.conversations.bulkArchive\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.bulkArchive).

##### conversations.bulkDelete

```ts
bulkDelete: MethodWithRequiredArgument<AdminConversationsBulkDeleteArguments, AdminConversationsBulkDeleteResponse>;
```

###### Description

Delete public or private channels in bulk.

###### See

[\`admin.conversations.bulkDelete\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.bulkDelete).

##### conversations.bulkMove

```ts
bulkMove: MethodWithRequiredArgument<AdminConversationsBulkMoveArguments, AdminConversationsBulkMoveResponse>;
```

###### Description

Move public or private channels in bulk.

###### See

[\`admin.conversations.bulkMove\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.bulkMove).

##### conversations.convertToPrivate

```ts
convertToPrivate: MethodWithRequiredArgument<AdminConversationsConvertToPrivateArguments, AdminConversationsConvertToPrivateResponse>;
```

###### Description

Convert a public channel to a private channel.

###### See

[\`admin.conversations.convertToPrivate\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.convertToPrivate).

##### conversations.convertToPublic

```ts
convertToPublic: MethodWithRequiredArgument<AdminConversationsConvertToPublicArguments, AdminConversationsConvertToPublicResponse>;
```

###### Description

Convert a private channel to a public channel.

###### See

[\`admin.conversations.convertToPublic\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.convertToPublic).

##### conversations.create

```ts
create: MethodWithRequiredArgument<AdminConversationsCreateArguments, AdminConversationsCreateResponse>;
```

###### Description

Create a public or private channel-based conversation.

###### See

[\`admin.conversations.create\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.create).

##### conversations.delete

```ts
delete: MethodWithRequiredArgument<AdminConversationsDeleteArguments, AdminConversationsDeleteResponse>;
```

###### Description

Delete a public or private channel.

###### See

[\`admin.conversations.delete\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.delete).

##### conversations.disconnectShared

```ts
disconnectShared: MethodWithRequiredArgument<AdminConversationsDisconnectSharedArguments, AdminConversationsDisconnectSharedResponse>;
```

###### Description

Disconnect a connected channel from one or more workspaces.

###### See

[\`admin.conversations.disconnectShared\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.disconnectShared).

##### conversations.ekm

```ts
ekm: object;
```

##### conversations.ekm.listOriginalConnectedChannelInfo

```ts
listOriginalConnectedChannelInfo: Method<AdminConversationsEKMListOriginalConnectedChannelInfoArguments, AdminConversationsEkmListOriginalConnectedChannelInfoResponse>;
```

###### Description

List all disconnected channels — i.e., channels that were once connected to other workspaces
and then disconnected — and the corresponding original channel IDs for key revocation with EKM.

###### See

[\`admin.conversations.ekm.listOriginalConnectedChannelInfo\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.ekm.listOriginalConnectedChannelInfo).

##### conversations.getConversationPrefs

```ts
getConversationPrefs: MethodWithRequiredArgument<AdminConversationsGetConversationPrefsArguments, AdminConversationsGetConversationPrefsResponse>;
```

###### Description

Get conversation preferences for a public or private channel.

###### See

[\`admin.conversations.getConversationPrefs\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.getConversationPrefs).

##### conversations.getCustomRetention

```ts
getCustomRetention: MethodWithRequiredArgument<AdminConversationsGetCustomRetentionArguments, AdminConversationsGetCustomRetentionResponse>;
```

###### Description

Get a conversation's retention policy.

###### See

[\`admin.conversations.getCustomRetention\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.getCustomRetention).

##### conversations.getTeams

```ts
getTeams: MethodWithRequiredArgument<AdminConversationsGetTeamsArguments, AdminConversationsGetTeamsResponse>;
```

###### Description

Get all the workspaces a given public or private channel is connected to within
this Enterprise org.

###### See

[\`admin.conversations.getTeams\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.getTeams).

##### conversations.invite

```ts
invite: MethodWithRequiredArgument<AdminConversationsInviteArguments, AdminConversationsInviteResponse>;
```

###### Description

Invite a user to a public or private channel.

###### See

[\`admin.conversations.invite\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.invite).

##### conversations.lookup

```ts
lookup: MethodWithRequiredArgument<AdminConversationsLookupArguments, AdminConversationsLookupResponse>;
```

###### Description

Returns channels on the given team using the filters.

###### See

[\`admin.conversations.lookup\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.lookup).

##### conversations.removeCustomRetention

```ts
removeCustomRetention: MethodWithRequiredArgument<AdminConversationsRemoveCustomRetentionArguments, AdminConversationsRemoveCustomRetentionResponse>;
```

###### Description

Remove a conversation's retention policy.

###### See

[\`admin.conversations.removeCustomRetention\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.removeCustomRetention).

##### conversations.rename

```ts
rename: MethodWithRequiredArgument<AdminConversationsRenameArguments, AdminConversationsRenameResponse>;
```

###### Description

Rename a public or private channel.

###### See

[\`admin.conversations.rename\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.rename).

##### conversations.restrictAccess

```ts
restrictAccess: object;
```

##### conversations.restrictAccess.addGroup

```ts
addGroup: MethodWithRequiredArgument<AdminConversationsRestrictAccessAddGroupArguments, AdminConversationsRestrictAccessAddGroupResponse>;
```

###### Description

Add an allowlist of IDP groups for accessing a channel.

###### See

[\`admin.conversations.restrictAccess.addGroup\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.restrictAccess.addGroup).

##### conversations.restrictAccess.listGroups

```ts
listGroups: MethodWithRequiredArgument<AdminConversationsRestrictAccessListGroupsArguments, AdminConversationsRestrictAccessListGroupsResponse>;
```

###### Description

List all IDP Groups linked to a channel.

###### See

[\`admin.conversations.restrictAccess.listGroups\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.restrictAccess.listGroups).

##### conversations.restrictAccess.removeGroup

```ts
removeGroup: MethodWithRequiredArgument<AdminConversationsRestrictAccessRemoveGroupArguments, AdminConversationsRestrictAccessRemoveGroupResponse>;
```

###### Description

Remove a linked IDP group linked from a private channel.

###### See

[\`admin.conversations.restrictAccess.removeGroup\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.restrictAccess.removeGroup).

##### conversations.search

```ts
search: Method<AdminConversationsSearchArguments, AdminConversationsSearchResponse>;
```

###### Description

Search for public or private channels in an Enterprise organization.

###### See

[\`admin.conversations.search\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.search).

##### conversations.setConversationPrefs

```ts
setConversationPrefs: MethodWithRequiredArgument<AdminConversationsSetConversationPrefsArguments, AdminConversationsSetConversationPrefsResponse>;
```

###### Description

Set the posting permissions for a public or private channel.

###### See

[\`admin.conversations.setConversationPrefs\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.setConversationPrefs).

##### conversations.setCustomRetention

```ts
setCustomRetention: MethodWithRequiredArgument<AdminConversationsSetCustomRetentionArguments, AdminConversationsSetCustomRetentionResponse>;
```

###### Description

Set a conversation's retention policy.

###### See

[\`admin.conversations.setCustomRetention\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.setCustomRetention).

##### conversations.setTeams

```ts
setTeams: MethodWithRequiredArgument<AdminConversationsSetTeamsArguments, AdminConversationsSetTeamsResponse>;
```

###### Description

Set the workspaces in an Enterprise grid org that connect to a public or private channel.

###### See

[\`admin.conversations.setTeams\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.setTeams).

##### conversations.unarchive

```ts
unarchive: MethodWithRequiredArgument<AdminConversationsUnarchiveArguments, AdminConversationsUnarchiveResponse>;
```

###### Description

Unarchive a public or private channel.

###### See

[\`admin.conversations.unarchive\` API reference](https://docs.slack.dev/reference/methods/admin.conversations.unarchive).

#### emoji

```ts
emoji: object;
```

##### emoji.add

```ts
add: MethodWithRequiredArgument<AdminEmojiAddArguments, AdminEmojiAddResponse>;
```

###### Description

Add an emoji.

###### See

[\`admin.emoji.add\` API reference](https://docs.slack.dev/reference/methods/admin.emoji.add).

##### emoji.addAlias

```ts
addAlias: MethodWithRequiredArgument<AdminEmojiAddAliasArguments, AdminEmojiAddAliasResponse>;
```

###### Description

Add an emoji alias.

###### See

[\`admin.emoji.addAlias\` API reference](https://docs.slack.dev/reference/methods/admin.emoji.addAlias).

##### emoji.list

```ts
list: Method<AdminEmojiListArguments, AdminEmojiListResponse>;
```

###### Description

List emoji for an Enterprise Grid organization.

###### See

[\`admin.emoji.list\` API reference](https://docs.slack.dev/reference/methods/admin.emoji.list).

##### emoji.remove

```ts
remove: MethodWithRequiredArgument<AdminEmojiRemoveArguments, AdminEmojiRemoveResponse>;
```

###### Description

Remove an emoji across an Enterprise Grid organization.

###### See

[\`admin.emoji.remove\` API reference](https://docs.slack.dev/reference/methods/admin.emoji.remove).

##### emoji.rename

```ts
rename: MethodWithRequiredArgument<AdminEmojiRenameArguments, AdminEmojiRenameResponse>;
```

###### Description

Rename an emoji.

###### See

[\`admin.emoji.rename\` API reference](https://docs.slack.dev/reference/methods/admin.emoji.rename).

#### functions

```ts
functions: object;
```

##### functions.list

```ts
list: MethodWithRequiredArgument<AdminFunctionsListArguments, AdminFunctionsListResponse>;
```

###### Description

Look up functions by a set of apps.

###### See

[\`admin.functions.list\` API reference](https://docs.slack.dev/reference/methods/admin.functions.list).

##### functions.permissions

```ts
permissions: object;
```

##### functions.permissions.lookup

```ts
lookup: MethodWithRequiredArgument<AdminFunctionsPermissionsLookupArguments, AdminFunctionsPermissionsLookupResponse>;
```

###### Description

Lookup the visibility of multiple Slack functions and include the users if
it is limited to particular named entities.

###### See

[\`admin.functions.permissions.lookup\` API reference](https://docs.slack.dev/reference/methods/admin.functions.permissions.lookup).

##### functions.permissions.set

```ts
set: MethodWithRequiredArgument<AdminFunctionsPermissionsSetArguments, AdminFunctionsPermissionsSetResponse>;
```

###### Description

Set the visibility of a Slack function and define the users or workspaces if
it is set to named_entities.

###### See

[\`admin.functions.permissions.set\` API reference](https://docs.slack.dev/reference/methods/admin.functions.permissions.set).

#### inviteRequests

```ts
inviteRequests: object;
```

##### inviteRequests.approve

```ts
approve: MethodWithRequiredArgument<AdminInviteRequestsApproveArguments, AdminInviteRequestsApproveResponse>;
```

###### Description

Approve a workspace invite request.

###### See

[\`admin.inviteRequests.approve\` API reference](https://docs.slack.dev/reference/methods/admin.inviteRequests.approve).

##### inviteRequests.approved

```ts
approved: object;
```

##### inviteRequests.approved.list

```ts
list: MethodWithRequiredArgument<AdminInviteRequestsApprovedListArguments, AdminInviteRequestsApprovedListResponse>;
```

###### Description

List all approved workspace invite requests.

###### See

[\`admin.inviteRequests.approved.list\` API reference](https://docs.slack.dev/reference/methods/admin.inviteRequests.approved.list).

##### inviteRequests.denied

```ts
denied: object;
```

##### inviteRequests.denied.list

```ts
list: MethodWithRequiredArgument<AdminInviteRequestsDeniedListArguments, AdminInviteRequestsDeniedListResponse>;
```

###### Description

List all denied workspace invite requests.

###### See

[\`admin.inviteRequests.denied.list\` API reference](https://docs.slack.dev/reference/methods/admin.inviteRequests.denied.list).

##### inviteRequests.deny

```ts
deny: MethodWithRequiredArgument<AdminInviteRequestsDenyArguments, AdminInviteRequestsDenyResponse>;
```

###### Description

Deny a workspace invite request.

###### See

[\`admin.inviteRequests.deny\` API reference](https://docs.slack.dev/reference/methods/admin.inviteRequests.deny).

##### inviteRequests.list

```ts
list: MethodWithRequiredArgument<AdminInviteRequestsListArguments, AdminInviteRequestsListResponse>;
```

###### Description

List all pending workspace invite requests.

###### See

[\`admin.inviteRequests.list\` API reference](https://docs.slack.dev/reference/methods/admin.inviteRequests.list).

#### roles

```ts
roles: object;
```

##### roles.addAssignments

```ts
addAssignments: MethodWithRequiredArgument<AdminRolesAddAssignmentsArguments, AdminRolesAddAssignmentsResponse>;
```

###### Description

Adds members to the specified role with the specified scopes.

###### See

[\`admin.roles.addAssignments\` API reference](https://docs.slack.dev/reference/methods/admin.roles.addAssignments).

##### roles.listAssignments

```ts
listAssignments: Method<AdminRolesListAssignmentsArguments, AdminRolesListAssignmentsResponse>;
```

###### Description

Lists assignments for all roles across entities.
Options to scope results by any combination of roles or entities.

###### See

[\`admin.roles.listAssignments\` API reference](https://docs.slack.dev/reference/methods/admin.roles.listAssignments).

##### roles.removeAssignments

```ts
removeAssignments: MethodWithRequiredArgument<AdminRolesRemoveAssignmentsArguments, AdminRolesRemoveAssignmentsResponse>;
```

###### Description

Removes a set of users from a role for the given scopes and entities.

###### See

[\`admin.roles.removeAssignments\` API reference](https://docs.slack.dev/reference/methods/admin.roles.removeAssignments).

#### teams

```ts
teams: object;
```

##### teams.admins

```ts
admins: object;
```

##### teams.admins.list

```ts
list: MethodWithRequiredArgument<AdminTeamsAdminsListArguments, AdminTeamsAdminsListResponse>;
```

###### Description

List all of the admins on a given workspace.

###### See

[\`admin.teams.admins.list\` API reference](https://docs.slack.dev/reference/methods/admin.teams.admins.list).

##### teams.create

```ts
create: MethodWithRequiredArgument<AdminTeamsCreateArguments, AdminTeamsCreateResponse>;
```

###### Description

Create an Enterprise team.

###### See

[\`admin.teams.create\` API reference](https://docs.slack.dev/reference/methods/admin.teams.create).

##### teams.list

```ts
list: Method<AdminTeamsListArguments, AdminTeamsListResponse>;
```

###### Description

List all teams on an Enterprise organization.

###### See

[\`admin.teams.list\` API reference](https://docs.slack.dev/reference/methods/admin.teams.list).

##### teams.owners

```ts
owners: object;
```

##### teams.owners.list

```ts
list: MethodWithRequiredArgument<AdminTeamsOwnersListArguments, AdminTeamsOwnersListResponse>;
```

###### Description

List all of the owners on a given workspace.

###### See

[\`admin.teams.owners.list\` API reference](https://docs.slack.dev/reference/methods/admin.teams.owners.list).

##### teams.settings

```ts
settings: object;
```

##### teams.settings.info

```ts
info: MethodWithRequiredArgument<AdminTeamsSettingsInfoArguments, AdminTeamsSettingsInfoResponse>;
```

###### Description

Fetch information about settings in a workspace.

###### See

[\`admin.teams.settings.info\` API reference](https://docs.slack.dev/reference/methods/admin.teams.settings.info).

##### teams.settings.setDefaultChannels

```ts
setDefaultChannels: MethodWithRequiredArgument<AdminTeamsSettingsSetDefaultChannelsArguments, AdminTeamsSettingsSetDefaultChannelsResponse>;
```

###### Description

Set the default channels of a workspace.

###### See

[\`admin.teams.settings.setDefaultChannels\` API reference](https://docs.slack.dev/reference/methods/admin.teams.settings.setDefaultChannels).

##### teams.settings.setDescription

```ts
setDescription: MethodWithRequiredArgument<AdminTeamsSettingsSetDescriptionArguments, AdminTeamsSettingsSetDescriptionResponse>;
```

###### Description

Set the description of a given workspace.

###### See

[\`admin.teams.settings.setDescription\` API reference](https://docs.slack.dev/reference/methods/admin.teams.settings.setDescription).

##### teams.settings.setDiscoverability

```ts
setDiscoverability: MethodWithRequiredArgument<AdminTeamsSettingsSetDiscoverabilityArguments, AdminTeamsSettingsSetDiscoverabilityResponse>;
```

###### Description

Set the discoverability of a given workspace.

###### See

[\`admin.teams.settings.setDiscoverability\` API reference](https://docs.slack.dev/reference/methods/admin.teams.settings.setDiscoverability).

##### teams.settings.setIcon

```ts
setIcon: MethodWithRequiredArgument<AdminTeamsSettingsSetIconArguments, AdminTeamsSettingsSetIconResponse>;
```

###### Description

Sets the icon of a workspace.

###### See

[\`admin.teams.settings.setIcon\` API reference](https://docs.slack.dev/reference/methods/admin.teams.settings.setIcon).

##### teams.settings.setName

```ts
setName: MethodWithRequiredArgument<AdminTeamsSettingsSetNameArguments, AdminTeamsSettingsSetNameResponse>;
```

###### Description

Set the name of a given workspace.

###### See

[\`admin.teams.settings.setName\` API reference](https://docs.slack.dev/reference/methods/admin.teams.settings.setName).

#### usergroups

```ts
usergroups: object;
```

##### usergroups.addChannels

```ts
addChannels: MethodWithRequiredArgument<AdminUsergroupsAddChannelsArguments, AdminUsergroupsAddChannelsResponse>;
```

###### Description

Add up to one hundred default channels to an IDP group.

###### See

[\`admin.teams.usergroups.addChannels\` API reference](https://docs.slack.dev/reference/methods/admin.usergroups.addChannels).

##### usergroups.addTeams

```ts
addTeams: MethodWithRequiredArgument<AdminUsergroupsAddTeamsArguments, AdminUsergroupsAddTeamsResponse>;
```

###### Description

Associate one or more default workspaces with an organization-wide IDP group.

###### See

[\`admin.teams.usergroups.addTeams\` API reference](https://docs.slack.dev/reference/methods/admin.usergroups.addTeams).

##### usergroups.listChannels

```ts
listChannels: MethodWithRequiredArgument<AdminUsergroupsListChannelsArguments, AdminUsergroupsListChannelsResponse>;
```

###### Description

List the channels linked to an org-level IDP group (user group).

###### See

[\`admin.teams.usergroups.listChannels\` API reference](https://docs.slack.dev/reference/methods/admin.usergroups.listChannels).

##### usergroups.removeChannels

```ts
removeChannels: MethodWithRequiredArgument<AdminUsergroupsRemoveChannelsArguments, AdminUsergroupsRemoveChannelsResponse>;
```

###### Description

Remove one or more default channels from an org-level IDP group (user group).

###### See

[\`admin.teams.usergroups.removeChannels\` API reference](https://docs.slack.dev/reference/methods/admin.usergroups.removeChannels).

#### users

```ts
users: object;
```

##### users.assign

```ts
assign: MethodWithRequiredArgument<AdminUsersAssignArguments, AdminUsersAssignResponse>;
```

###### Description

Add an Enterprise user to a workspace.

###### See

[\`admin.users.assign\` API reference](https://docs.slack.dev/reference/methods/admin.users.assign).

##### users.invite

```ts
invite: MethodWithRequiredArgument<AdminUsersInviteArguments, AdminUsersInviteResponse>;
```

###### Description

Invite a user to a workspace.

###### See

[\`admin.users.invite\` API reference](https://docs.slack.dev/reference/methods/admin.users.invite).

##### users.list

```ts
list: Method<AdminUsersListArguments, AdminUsersListResponse>;
```

###### Description

List users on a workspace.

###### See

[\`admin.users.list\` API reference](https://docs.slack.dev/reference/methods/admin.users.list).

##### users.remove

```ts
remove: MethodWithRequiredArgument<AdminUsersRemoveArguments, AdminUsersRemoveResponse>;
```

###### Description

Remove a user from a workspace.

###### See

[\`admin.users.remove\` API reference](https://docs.slack.dev/reference/methods/admin.users.remove).

##### users.session

```ts
session: object;
```

##### users.session.clearSettings

```ts
clearSettings: MethodWithRequiredArgument<AdminUsersSessionClearSettingsArguments, AdminUsersSessionClearSettingsResponse>;
```

###### Description

Clear user-specific session settings—the session duration and what happens when the client
closes—for a list of users.

###### See

[\`admin.users.session.clearSettings\` API reference](https://docs.slack.dev/reference/methods/admin.users.session.clearSettings).

##### users.session.getSettings

```ts
getSettings: MethodWithRequiredArgument<AdminUsersSessionGetSettingsArguments, AdminUsersSessionGetSettingsResponse>;
```

###### Description

Get user-specific session settings—the session duration and what happens when the client
closes—given a list of users.

###### See

[\`admin.users.session.getSettings\` API reference](https://docs.slack.dev/reference/methods/admin.users.session.getSettings).

##### users.session.invalidate

```ts
invalidate: MethodWithRequiredArgument<AdminUsersSessionInvalidateArguments, AdminUsersSessionInvalidateResponse>;
```

###### Description

Revoke a single session for a user. The user will be forced to login to Slack.

###### See

[\`admin.users.session.invalidate\` API reference](https://docs.slack.dev/reference/methods/admin.users.session.invalidate).

##### users.session.list

```ts
list: Method<AdminUsersSessionListArguments, AdminUsersSessionListResponse>;
```

###### Description

List active user sessions for an organization.

###### See

[\`admin.users.session.list\` API reference](https://docs.slack.dev/reference/methods/admin.users.session.list).

##### users.session.reset

```ts
reset: MethodWithRequiredArgument<AdminUsersSessionResetArguments, AdminUsersSessionResetResponse>;
```

###### Description

Wipes all valid sessions on all devices for a given user.

###### See

[\`admin.users.session.reset\` API reference](https://docs.slack.dev/reference/methods/admin.users.session.reset).

##### users.session.resetBulk

```ts
resetBulk: MethodWithRequiredArgument<AdminUsersSessionResetBulkArguments, AdminUsersSessionResetBulkResponse>;
```

###### Description

Enqueues an asynchronous job to wipe all valid sessions on all devices for a given user list.

###### See

[\`admin.users.session.resetBulk\` API reference](https://docs.slack.dev/reference/methods/admin.users.session.resetBulk).

##### users.session.setSettings

```ts
setSettings: MethodWithRequiredArgument<AdminUsersSessionSetSettingsArguments, AdminUsersSessionSetSettingsResponse>;
```

###### Description

Configure the user-level session settings—the session duration and what happens when the client
closes—for one or more users.

###### See

[\`admin.users.session.setSettings\` API reference](https://docs.slack.dev/reference/methods/admin.users.session.setSettings).

##### users.setAdmin

```ts
setAdmin: MethodWithRequiredArgument<AdminUsersSetAdminArguments, AdminUsersSetAdminResponse>;
```

###### Description

Set an existing guest, regular user, or owner to be an admin user.

###### See

[\`admin.users.setAdmin\` API reference](https://docs.slack.dev/reference/methods/admin.users.setAdmin).

##### users.setExpiration

```ts
setExpiration: MethodWithRequiredArgument<AdminUsersSetExpirationArguments, AdminUsersSetExpirationResponse>;
```

###### Description

Set an expiration for a guest user.

###### See

[\`admin.users.setExpiration\` API reference](https://docs.slack.dev/reference/methods/admin.users.setExpiration).

##### users.setOwner

```ts
setOwner: MethodWithRequiredArgument<AdminUsersSetOwnerArguments, AdminUsersSetOwnerResponse>;
```

###### Description

Set an existing guest, regular user, or admin user to be a workspace owner.

###### See

[\`admin.users.setOwner\` API reference](https://docs.slack.dev/reference/methods/admin.users.setOwner).

##### users.setRegular

```ts
setRegular: MethodWithRequiredArgument<AdminUsersSetRegularArguments, AdminUsersSetRegularResponse>;
```

###### Description

Set an existing guest user, admin user, or owner to be a regular user.

###### See

[\`admin.users.setRegular\` API reference](https://docs.slack.dev/reference/methods/admin.users.setRegular).

##### users.unsupportedVersions

```ts
unsupportedVersions: object;
```

##### users.unsupportedVersions.export

```ts
export: MethodWithRequiredArgument<AdminUsersUnsupportedVersionsExportArguments, AdminUsersUnsupportedVersionsExportResponse>;
```

###### Description

Ask Slackbot to send you an export listing all workspace members using unsupported software,
presented as a zipped CSV file.

###### See

[\`admin.users.unsupportedVersions.export\` API reference](https://docs.slack.dev/reference/methods/admin.users.unsupportedVersions.export).

#### workflows

```ts
workflows: object;
```

##### workflows.collaborators

```ts
collaborators: object;
```

##### workflows.collaborators.add

```ts
add: MethodWithRequiredArgument<AdminWorkflowsCollaboratorsAddArguments, AdminWorkflowsCollaboratorsAddResponse>;
```

###### Description

Add collaborators to workflows within the team or enterprise.

###### See

[\`admin.workflows.collaborators.add\` API reference](https://docs.slack.dev/reference/methods/admin.workflows.collaborators.add).

##### workflows.collaborators.remove

```ts
remove: MethodWithRequiredArgument<AdminWorkflowsCollaboratorsRemoveArguments, AdminWorkflowsCollaboratorsRemoveResponse>;
```

###### Description

Remove collaborators from workflows within the team or enterprise.

###### See

[\`admin.workflows.collaborators.remove\` API reference](https://docs.slack.dev/reference/methods/admin.workflows.collaborators.remove).

##### workflows.permissions

```ts
permissions: object;
```

##### workflows.permissions.lookup

```ts
lookup: MethodWithRequiredArgument<AdminWorkflowsPermissionsLookupArguments, AdminWorkflowsPermissionsLookupResponse>;
```

###### Description

Look up the permissions for a set of workflows.

###### See

[\`admin.workflows.permissions.lookup\` API reference](https://docs.slack.dev/reference/methods/admin.workflows.permissions.lookup).

##### workflows.search

```ts
search: Method<AdminWorkflowsSearchArguments, AdminWorkflowsSearchResponse>;
```

###### Description

Search workflows within the team or enterprise.

###### See

[\`admin.workflows.search\` API reference](https://docs.slack.dev/reference/methods/admin.workflows.search).

##### workflows.unpublish

```ts
unpublish: MethodWithRequiredArgument<AdminWorkflowsUnpublishArguments, AdminWorkflowsUnpublishResponse>;
```

###### Description

Unpublish workflows within the team or enterprise.

###### See

[\`admin.workflows.unpublish\` API reference](https://docs.slack.dev/reference/methods/admin.workflows.unpublish).

#### Inherited from

[`Methods`](Methods.md).[`admin`](Methods.md#admin)

***

### api

```ts
readonly api: object;
```

Defined in: [src/methods.ts:1343](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1343)

#### test

```ts
test: Method<APITestArguments, ApiTestResponse>;
```

##### Description

Checks API calling code.

##### See

[\`api.test\` API reference](https://docs.slack.dev/reference/methods/api.test).

#### Inherited from

[`Methods`](Methods.md).[`api`](Methods.md#api)

***

### apps

```ts
readonly apps: object;
```

Defined in: [src/methods.ts:1380](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1380)

#### connections

```ts
connections: object;
```

##### connections.open

```ts
open: Method<AppsConnectionsOpenArguments, AppsConnectionsOpenResponse>;
```

###### Description

Generate a temporary Socket Mode WebSocket URL that your app can connect to in order to receive
events and interactive payloads over.

###### See

[\`apps.connections.open\` API reference](https://docs.slack.dev/reference/methods/apps.connections.open).

#### event

```ts
event: object;
```

##### event.authorizations

```ts
authorizations: object;
```

##### event.authorizations.list

```ts
list: MethodWithRequiredArgument<AppsEventAuthorizationsListArguments, AppsEventAuthorizationsListResponse>;
```

###### Description

Get a list of authorizations for the given event context.
Each authorization represents an app installation that the event is visible to.

###### See

[\`apps.event.authorizations.list\` API reference](https://docs.slack.dev/reference/methods/apps.event.authorizations.list).

#### manifest

```ts
manifest: object;
```

##### manifest.create

```ts
create: MethodWithRequiredArgument<AppsManifestCreateArguments, AppsManifestCreateResponse>;
```

###### Description

Create an app from an app manifest.

###### See

[\`apps.manifest.create\` API reference](https://docs.slack.dev/reference/methods/apps.manifest.create).

##### manifest.delete

```ts
delete: MethodWithRequiredArgument<AppsManifestDeleteArguments, AppsManifestDeleteResponse>;
```

###### Description

Permanently deletes an app created through app manifests.

###### See

[\`apps.manifest.delete\` API reference](https://docs.slack.dev/reference/methods/apps.manifest.delete).

##### manifest.export

```ts
export: MethodWithRequiredArgument<AppsManifestExportArguments, AppsManifestExportResponse>;
```

###### Description

Export an app manifest from an existing app.

###### See

[\`apps.manifest.export\` API reference](https://docs.slack.dev/reference/methods/apps.manifest.export).

##### manifest.update

```ts
update: MethodWithRequiredArgument<AppsManifestUpdateArguments, AppsManifestUpdateResponse>;
```

###### Description

Update an app from an app manifest.

###### See

[\`apps.manifest.update\` API reference](https://docs.slack.dev/reference/methods/apps.manifest.update).

##### manifest.validate

```ts
validate: MethodWithRequiredArgument<AppsManifestValidateArguments, AppsManifestValidateResponse>;
```

###### Description

Validate an app manifest.

###### See

[\`apps.manifest.validate\` API reference](https://docs.slack.dev/reference/methods/apps.manifest.validate).

#### uninstall

```ts
uninstall: MethodWithRequiredArgument<AppsUninstallArguments, AppsUninstallResponse>;
```

##### Description

Uninstalls your app from a workspace.

##### See

[\`apps.uninstall\` API reference](https://docs.slack.dev/reference/methods/apps.uninstall).

#### Inherited from

[`Methods`](Methods.md).[`apps`](Methods.md#apps)

***

### assistant

```ts
readonly assistant: object;
```

Defined in: [src/methods.ts:1351](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1351)

#### threads

```ts
threads: object;
```

##### threads.setStatus

```ts
setStatus: MethodWithRequiredArgument<AssistantThreadsSetStatusArguments, AssistantThreadsSetStatusResponse>;
```

###### Description

Set loading status to indicate that the app is building a response.

###### See

[\`assistant.threads.setStatus\` API reference](https://docs.slack.dev/reference/methods/assistant.threads.setStatus).

##### threads.setSuggestedPrompts

```ts
setSuggestedPrompts: MethodWithRequiredArgument<AssistantThreadsSetSuggestedPromptsArguments, AssistantThreadsSetSuggestedPromptsResponse>;
```

###### Description

Set suggested prompts for the user. Can suggest up to four prompts.

###### See

[\`assistant.threads.setSuggestedPrompts\` API reference](https://docs.slack.dev/reference/methods/assistant.threads.setSuggestedPrompts).

##### threads.setTitle

```ts
setTitle: MethodWithRequiredArgument<AssistantThreadsSetTitleArguments, AssistantThreadsSetTitleResponse>;
```

###### Description

Set the title of the thread. This is shown when a user views the app's chat history.

###### See

[\`assistant.threads.setTitle\` API reference](https://docs.slack.dev/reference/methods/assistant.threads.setTitle).

#### Inherited from

[`Methods`](Methods.md).[`assistant`](Methods.md#assistant)

***

### auth

```ts
readonly auth: object;
```

Defined in: [src/methods.ts:1442](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1442)

#### revoke

```ts
revoke: Method<AuthRevokeArguments, AuthRevokeResponse>;
```

##### Description

Revokes a token.

##### See

[\`auth.revoke\` API reference](https://docs.slack.dev/reference/methods/auth.revoke).

#### teams

```ts
teams: object;
```

##### teams.list

```ts
list: Method<AuthTeamsListArguments, AuthTeamsListResponse>;
```

###### Description

Obtain a full list of workspaces your org-wide app has been approved for.

###### See

[\`auth.teams.list\` API reference](https://docs.slack.dev/reference/methods/auth.teams.list).

#### test

```ts
test: Method<AuthTestArguments, AuthTestResponse>;
```

#### Inherited from

[`Methods`](Methods.md).[`auth`](Methods.md#auth)

***

### bookmarks

```ts
readonly bookmarks: object;
```

Defined in: [src/methods.ts:1458](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1458)

#### add

```ts
add: MethodWithRequiredArgument<BookmarksAddArguments, BookmarksAddResponse>;
```

##### Description

Add bookmark to a channel.

##### See

[\`bookmarks.add\` API reference](https://docs.slack.dev/reference/methods/bookmarks.add).

#### edit

```ts
edit: MethodWithRequiredArgument<BookmarksEditArguments, BookmarksEditResponse>;
```

##### Description

Edit bookmark.

##### See

[\`bookmarks.edit\` API reference](https://docs.slack.dev/reference/methods/bookmarks.edit).

#### list

```ts
list: MethodWithRequiredArgument<BookmarksListArguments, BookmarksListResponse>;
```

##### Description

List bookmarks for a channel.

##### See

[\`bookmarks.list\` API reference](https://docs.slack.dev/reference/methods/bookmarks.list).

#### remove

```ts
remove: MethodWithRequiredArgument<BookmarksRemoveArguments, BookmarksRemoveResponse>;
```

##### Description

Remove bookmark from a channel.

##### See

[\`bookmarks.remove\` API reference](https://docs.slack.dev/reference/methods/bookmarks.remove).

#### Inherited from

[`Methods`](Methods.md).[`bookmarks`](Methods.md#bookmarks)

***

### bots

```ts
readonly bots: object;
```

Defined in: [src/methods.ts:1481](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1481)

#### info

```ts
info: Method<BotsInfoArguments, BotsInfoResponse>;
```

##### Description

Gets information about a bot user.

##### See

[\`bots.info\` API reference](https://docs.slack.dev/reference/methods/bots.info).

#### Inherited from

[`Methods`](Methods.md).[`bots`](Methods.md#bots)

***

### calls

```ts
readonly calls: object;
```

Defined in: [src/methods.ts:1489](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1489)

#### add

```ts
add: MethodWithRequiredArgument<CallsAddArguments, CallsAddResponse>;
```

##### Description

Registers a new Call.

##### See

[\`calls.add\` API reference](https://docs.slack.dev/reference/methods/calls.add).

#### end

```ts
end: MethodWithRequiredArgument<CallsEndArguments, CallsEndResponse>;
```

##### Description

Ends a Call.

##### See

[\`calls.end\` API reference](https://docs.slack.dev/reference/methods/calls.end).

#### info

```ts
info: MethodWithRequiredArgument<CallsInfoArguments, CallsInfoResponse>;
```

##### Description

Returns information about a Call.

##### See

[\`calls.info\` API reference](https://docs.slack.dev/reference/methods/calls.info).

#### participants

```ts
participants: object;
```

##### participants.add

```ts
add: MethodWithRequiredArgument<CallsParticipantsAddArguments, CallsParticipantsAddResponse>;
```

###### Description

Registers new participants added to a Call.

###### See

[\`calls.participants.add\` API reference](https://docs.slack.dev/reference/methods/calls.participants.add).

##### participants.remove

```ts
remove: MethodWithRequiredArgument<CallsParticipantsRemoveArguments, CallsParticipantsRemoveResponse>;
```

#### update

```ts
update: MethodWithRequiredArgument<CallsUpdateArguments, CallsUpdateResponse>;
```

##### Description

Updates information about a Call.

##### See

[\`calls.update\` API reference](https://docs.slack.dev/reference/methods/calls.update).

#### Inherited from

[`Methods`](Methods.md).[`calls`](Methods.md#calls)

***

### canvases

```ts
readonly canvases: object;
```

Defined in: [src/methods.ts:1523](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1523)

#### access

```ts
access: object;
```

##### access.delete

```ts
delete: MethodWithRequiredArgument<CanvasesAccessDeleteArguments, CanvasesAccessDeleteResponse>;
```

###### Description

Remove access to a canvas for specified entities.

###### See

[\`canvases.access.delete\` API reference](https://docs.slack.dev/reference/methods/canvases.access.delete).

##### access.set

```ts
set: MethodWithRequiredArgument<CanvasesAccessSetArguments, CanvasesAccessSetResponse>;
```

###### Description

Sets the access level to a canvas for specified entities.

###### See

[\`canvases.access.set\` API reference](https://docs.slack.dev/reference/methods/canvases.access.set).

#### create

```ts
create: Method<CanvasesCreateArguments, CanvasesCreateResponse>;
```

##### Description

Create Canvas for a user.

##### See

[\`canvases.create\` API reference](https://docs.slack.dev/reference/methods/canvases.create).

#### delete

```ts
delete: MethodWithRequiredArgument<CanvasesDeleteArguments, CanvasesDeleteResponse>;
```

##### Description

Deletes a canvas.

##### See

[\`canvases.delete\` API reference](https://docs.slack.dev/reference/methods/canvases.delete).

#### edit

```ts
edit: MethodWithRequiredArgument<CanvasesEditArguments, CanvasesEditResponse>;
```

##### Description

Update an existing canvas.

##### See

[\`canvases.edit\` API reference](https://docs.slack.dev/reference/methods/canvases.edit).

#### sections

```ts
sections: object;
```

##### sections.lookup

```ts
lookup: MethodWithRequiredArgument<CanvasesSectionsLookupArguments, CanvasesSectionsLookupResponse>;
```

###### Description

Find sections matching the provided criteria.

###### See

[\`canvases.sections.lookup\` API reference](https://docs.slack.dev/reference/methods/canvases.sections.lookup).

#### Inherited from

[`Methods`](Methods.md).[`canvases`](Methods.md#canvases)

***

### chat

```ts
readonly chat: object;
```

Defined in: [src/methods.ts:1563](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1563)

#### delete

```ts
delete: MethodWithRequiredArgument<ChatDeleteArguments, ChatDeleteResponse>;
```

##### Description

Deletes a message.

##### See

[\`chat.delete\` API reference](https://docs.slack.dev/reference/methods/chat.delete).

#### deleteScheduledMessage

```ts
deleteScheduledMessage: MethodWithRequiredArgument<ChatDeleteScheduledMessageArguments, ChatDeleteScheduledMessageResponse>;
```

##### Description

Deletes a pending scheduled message from the queue.

##### See

[\`chat.deleteScheduledMessage\` API reference](https://docs.slack.dev/reference/methods/chat.deleteScheduledMessage).

#### getPermalink

```ts
getPermalink: MethodWithRequiredArgument<ChatGetPermalinkArguments, ChatGetPermalinkResponse>;
```

##### Description

Retrieve a permalink URL for a specific extant message.

##### See

[\`chat.getPermalink\` API reference](https://docs.slack.dev/reference/methods/chat.getPermalink).

#### meMessage

```ts
meMessage: MethodWithRequiredArgument<ChatMeMessageArguments, ChatMeMessageResponse>;
```

##### Description

Share a me message into a channel.

##### See

[\`chat.meMessage\` API reference](https://docs.slack.dev/reference/methods/chat.meMessage).

#### postEphemeral

```ts
postEphemeral: MethodWithRequiredArgument<ChatPostEphemeralArguments, ChatPostEphemeralResponse>;
```

##### Description

Sends an ephemeral message to a user in a channel.

##### See

[\`chat.postEphemeral\` API reference](https://docs.slack.dev/reference/methods/chat.postEphemeral).

#### postMessage

```ts
postMessage: MethodWithRequiredArgument<ChatPostMessageArguments, ChatPostMessageResponse>;
```

##### Description

Sends a message to a channel.

##### See

[\`chat.postMessage\` API reference](https://docs.slack.dev/reference/methods/chat.postMessage).

#### scheduledMessages

```ts
scheduledMessages: object;
```

##### scheduledMessages.list

```ts
list: Method<ChatScheduledMessagesListArguments, ChatScheduledMessagesListResponse>;
```

###### Description

Returns a list of scheduled messages.

###### See

[\`chat.scheduledMessages.list\` API reference](https://docs.slack.dev/reference/methods/chat.scheduledMessages.list).

#### scheduleMessage

```ts
scheduleMessage: MethodWithRequiredArgument<ChatScheduleMessageArguments, ChatScheduleMessageResponse>;
```

##### Description

Schedules a message to be sent to a channel.

##### See

[\`chat.scheduleMessage\` API reference](https://docs.slack.dev/reference/methods/chat.scheduleMessage).

#### unfurl

```ts
unfurl: MethodWithRequiredArgument<ChatUnfurlArguments, ChatUnfurlResponse>;
```

##### Description

Provide custom unfurl behavior for user-posted URLs.

##### See

[\`chat.unfurl\` API reference](https://docs.slack.dev/reference/methods/chat.unfurl).

#### update

```ts
update: MethodWithRequiredArgument<ChatUpdateArguments, ChatUpdateResponse>;
```

##### Description

Updates a message.

##### See

[\`chat.update\` API reference](https://docs.slack.dev/reference/methods/chat.update).

#### Inherited from

[`Methods`](Methods.md).[`chat`](Methods.md#chat)

***

### conversations

```ts
readonly conversations: object;
```

Defined in: [src/methods.ts:1627](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1627)

#### acceptSharedInvite

```ts
acceptSharedInvite: MethodWithRequiredArgument<ConversationsAcceptSharedInviteArguments, ConversationsAcceptSharedInviteResponse>;
```

##### Description

Accepts an invitation to a Slack Connect channel.

##### See

[\`conversations.acceptSharedInvite\` API reference](https://docs.slack.dev/reference/methods/conversations.acceptSharedInvite).

#### approveSharedInvite

```ts
approveSharedInvite: MethodWithRequiredArgument<ConversationsApproveSharedInviteArguments, ConversationsApproveSharedInviteResponse>;
```

##### Description

Approves an invitation to a Slack Connect channel.

##### See

[\`conversations.approveSharedInvite\` API reference](https://docs.slack.dev/reference/methods/conversations.approveSharedInvite).

#### archive

```ts
archive: MethodWithRequiredArgument<ConversationsArchiveArguments, ConversationsArchiveResponse>;
```

##### Description

Archives a conversation.

##### See

[\`conversations.archive\` API reference](https://docs.slack.dev/reference/methods/conversations.archive).

#### canvases

```ts
canvases: object;
```

##### canvases.create

```ts
create: MethodWithRequiredArgument<ConversationsCanvasesCreateArguments, ConversationsCanvasesCreateResponse>;
```

###### Description

Create a Channel Canvas for a channel.

###### See

[\`conversations.canvases.create\` API reference](https://docs.slack.dev/reference/methods/conversations.canvases.create).

#### close

```ts
close: MethodWithRequiredArgument<ConversationsCloseArguments, ConversationsCloseResponse>;
```

##### Description

Closes a direct message or multi-person direct message.

##### See

[\`conversations.close\` API reference](https://docs.slack.dev/reference/methods/conversations.close).

#### create

```ts
create: MethodWithRequiredArgument<ConversationsCreateArguments, ConversationsCreateResponse>;
```

##### Description

Initiates a public or private channel-based conversation.

##### See

[\`conversations.create\` API reference](https://docs.slack.dev/reference/methods/conversations.create).

#### declineSharedInvite

```ts
declineSharedInvite: MethodWithRequiredArgument<ConversationsDeclineSharedInviteArguments, ConversationsDeclineSharedInviteResponse>;
```

##### Description

Declines an invitation to a Slack Connect channel.

##### See

[\`conversations.declineSharedInvite\` API reference](https://docs.slack.dev/reference/methods/conversations.declineSharedInvite).

#### externalInvitePermissions

```ts
externalInvitePermissions: object;
```

##### externalInvitePermissions.set

```ts
set: MethodWithRequiredArgument<ConversationsExternalInvitePermissionsSetArguments, ConversationsExternalInvitePermissionsSetResponse>;
```

###### Description

Convert a team in a shared channel from an External Limited channel to a fully shared Slack
Connect channel or vice versa.

###### See

[\`conversations.externalInvitePermissions.set\` API reference](https://docs.slack.dev/reference/methods/conversations.externalInvitePermissions.set).

#### history

```ts
history: MethodWithRequiredArgument<ConversationsHistoryArguments, ConversationsHistoryResponse>;
```

##### Description

Fetches a conversation's history of messages and events.

##### See

[\`conversations.history\` API reference](https://docs.slack.dev/reference/methods/conversations.history).

#### info

```ts
info: MethodWithRequiredArgument<ConversationsInfoArguments, ConversationsInfoResponse>;
```

##### Description

Retrieve information about a conversation.

##### See

[\`conversations.info\` API reference](https://docs.slack.dev/reference/methods/conversations.info).

#### invite

```ts
invite: MethodWithRequiredArgument<ConversationsInviteArguments, ConversationsInviteResponse>;
```

##### Description

Invites users to a channel.

##### See

[\`conversations.invite\` API reference](https://docs.slack.dev/reference/methods/conversations.invite).

#### inviteShared

```ts
inviteShared: MethodWithRequiredArgument<ConversationsInviteSharedArguments, ConversationsInviteSharedResponse>;
```

##### Description

Sends an invitation to a Slack Connect channel.

##### See

[\`conversations.inviteShared\` API reference](https://docs.slack.dev/reference/methods/conversations.inviteShared).

#### join

```ts
join: MethodWithRequiredArgument<ConversationsJoinArguments, ConversationsJoinResponse>;
```

##### Description

Joins an existing conversation.

##### See

[\`conversations.join\` API reference](https://docs.slack.dev/reference/methods/conversations.join).

#### kick

```ts
kick: MethodWithRequiredArgument<ConversationsKickArguments, ConversationsKickResponse>;
```

##### Description

Removes a user from a conversation.

##### See

[\`conversations.kick\` API reference](https://docs.slack.dev/reference/methods/conversations.kick).

#### leave

```ts
leave: MethodWithRequiredArgument<ConversationsLeaveArguments, ConversationsLeaveResponse>;
```

##### Description

Leaves a conversation.

##### See

[\`conversations.leave\` API reference](https://docs.slack.dev/reference/methods/conversations.leave).

#### list

```ts
list: Method<ConversationsListArguments, ConversationsListResponse>;
```

##### Description

List all channels in a Slack team.

##### See

[\`conversations.list\` API reference](https://docs.slack.dev/reference/methods/conversations.list).

#### listConnectInvites

```ts
listConnectInvites: Method<ConversationsListConnectInvitesArguments, ConversationsListConnectInvitesResponse>;
```

##### Description

Lists shared channel invites that have been generated or received but have not been approved by
all parties.

##### See

[\`conversations.listConnectInvites\` API reference](https://docs.slack.dev/reference/methods/conversations.listConnectInvites).

#### mark

```ts
mark: MethodWithRequiredArgument<ConversationsMarkArguments, ConversationsMarkResponse>;
```

##### Description

Sets the read cursor in a channel.

##### See

[\`conversations.mark\` API reference](https://docs.slack.dev/reference/methods/conversations.mark).

#### members

```ts
members: MethodWithRequiredArgument<ConversationsMembersArguments, ConversationsMembersResponse>;
```

##### Description

Retrieve members of a conversation.

##### See

[\`conversations.members\` API reference](https://docs.slack.dev/reference/methods/conversations.members).

#### open

```ts
open: MethodWithRequiredArgument<ConversationsOpenArguments, ConversationsOpenResponse>;
```

##### Description

Opens or resumes a direct message or multi-person direct message.

##### See

[\`conversations.open\` API reference](https://docs.slack.dev/reference/methods/conversations.open).

#### rename

```ts
rename: MethodWithRequiredArgument<ConversationsRenameArguments, ConversationsRenameResponse>;
```

##### Description

Renames a conversation.

##### See

[\`conversations.rename\` API reference](https://docs.slack.dev/reference/methods/conversations.rename).

#### replies

```ts
replies: MethodWithRequiredArgument<ConversationsRepliesArguments, ConversationsRepliesResponse>;
```

##### Description

Retrieve a thread of messages posted to a conversation.

##### See

[\`conversations.replies\` API reference](https://docs.slack.dev/reference/methods/conversations.replies).

#### requestSharedInvite

```ts
requestSharedInvite: object;
```

##### requestSharedInvite.approve

```ts
approve: MethodWithRequiredArgument<ConversationsRequestSharedInviteApproveArguments, ConversationsRequestSharedInviteApproveResponse>;
```

###### Description

Approves a request to add an external user to a channel and sends them a Slack Connect invite.

###### See

[\`conversations.requestSharedInvite.approve\` API reference](https://docs.slack.dev/reference/methods/conversations.requestSharedInvite.approve).

##### requestSharedInvite.deny

```ts
deny: MethodWithRequiredArgument<ConversationsRequestSharedInviteDenyArguments, ConversationsRequestSharedInviteDenyResponse>;
```

###### Description

Denies a request to invite an external user to a channel.

###### See

[\`conversations.requestSharedInvite.deny\` API reference](https://docs.slack.dev/reference/methods/conversations.requestSharedInvite.deny).

##### requestSharedInvite.list

```ts
list: Method<ConversationsRequestSharedInviteListArguments, ConversationsRequestSharedInviteListResponse>;
```

###### Description

Lists requests to add external users to channels with ability to filter.

###### See

[\`conversations.requestSharedInvite.list\` API reference](https://docs.slack.dev/reference/methods/conversations.requestSharedInvite.list).

#### setPurpose

```ts
setPurpose: MethodWithRequiredArgument<ConversationsSetPurposeArguments, ConversationsSetPurposeResponse>;
```

##### Description

Sets the purpose for a conversation.

##### See

[\`conversations.setPurpose\` API reference](https://docs.slack.dev/reference/methods/conversations.setPurpose).

#### setTopic

```ts
setTopic: MethodWithRequiredArgument<ConversationsSetTopicArguments, ConversationsSetTopicResponse>;
```

##### Description

Sets the topic for a conversation.

##### See

[\`conversations.setTopic\` API reference](https://docs.slack.dev/reference/methods/conversations.setTopic).

#### unarchive

```ts
unarchive: MethodWithRequiredArgument<ConversationsUnarchiveArguments, ConversationsUnarchiveResponse>;
```

##### Description

Reverses conversation archival.

##### See

[\`conversations.unarchive\` API reference](https://docs.slack.dev/reference/methods/conversations.unarchive).

#### Inherited from

[`Methods`](Methods.md).[`conversations`](Methods.md#conversations)

***

### dialog

```ts
readonly dialog: object;
```

Defined in: [src/methods.ts:1820](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1820)

#### open

```ts
open: MethodWithRequiredArgument<DialogOpenArguments, DialogOpenResponse>;
```

##### Description

Open a dialog with a user.

##### See

[\`dialog.open\` API reference](https://docs.slack.dev/reference/methods/dialog.open).

#### Inherited from

[`Methods`](Methods.md).[`dialog`](Methods.md#dialog)

***

### dnd

```ts
readonly dnd: object;
```

Defined in: [src/methods.ts:1828](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1828)

#### endDnd

```ts
endDnd: Method<DndEndDndArguments, DndEndDndResponse>;
```

##### Description

Ends the current user's Do Not Disturb session immediately.

##### See

[\`dnd.endDnd\` API reference](https://docs.slack.dev/reference/methods/dnd.endDnd).

#### endSnooze

```ts
endSnooze: Method<DndEndSnoozeArguments, DndEndSnoozeResponse>;
```

##### Description

Ends the current user's snooze mode immediately.

##### See

[\`dnd.endSnooze\` API reference](https://docs.slack.dev/reference/methods/dnd.endSnooze).

#### info

```ts
info: Method<DndInfoArguments, DndInfoResponse>;
```

##### Description

Retrieves a user's current Do Not Disturb status.

##### See

[\`dnd.info\` API reference](https://docs.slack.dev/reference/methods/dnd.info).

#### setSnooze

```ts
setSnooze: MethodWithRequiredArgument<DndSetSnoozeArguments, DndSetSnoozeResponse>;
```

##### Description

Turns on Do Not Disturb mode for the current user, or changes its duration.

##### See

[\`dnd.setSnooze\` API reference](https://docs.slack.dev/reference/methods/dnd.setSnooze).

#### teamInfo

```ts
teamInfo: MethodWithRequiredArgument<DndTeamInfoArguments, DndTeamInfoResponse>;
```

##### Description

Retrieves the Do Not Disturb status for up to 50 users on a team.

##### See

[\`dnd.teamInfo\` API reference](https://docs.slack.dev/reference/methods/dnd.teamInfo).

#### Inherited from

[`Methods`](Methods.md).[`dnd`](Methods.md#dnd)

***

### emoji

```ts
readonly emoji: object;
```

Defined in: [src/methods.ts:1856](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1856)

#### list

```ts
list: Method<EmojiListArguments, EmojiListResponse>;
```

##### Description

Lists custom emoji for a team.

##### See

[\`emoji.list\` API reference](https://docs.slack.dev/reference/methods/emoji.list).

#### Inherited from

[`Methods`](Methods.md).[`emoji`](Methods.md#emoji)

***

### files

```ts
readonly files: object;
```

Defined in: [src/methods.ts:1864](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1864)

#### comments

```ts
comments: object;
```

##### comments.delete

```ts
delete: MethodWithRequiredArgument<FilesCommentsDeleteArguments, FilesCommentsDeleteResponse>;
```

###### Description

Deletes an existing comment on a file.

###### See

[\`files.comments.delete\` API reference](https://docs.slack.dev/reference/methods/files.comments.delete).

#### completeUploadExternal

```ts
completeUploadExternal: MethodWithRequiredArgument<FilesCompleteUploadExternalArguments, FilesCompleteUploadExternalResponse>;
```

##### Description

Finishes an upload started with [\`files.getUploadURLExternal\`](https://docs.slack.dev/reference/methods/files.getUploadURLExternal).

##### See

[\`files.completeUploadExternal\` API reference](https://docs.slack.dev/reference/methods/files.completeUploadExternal).

#### delete

```ts
delete: MethodWithRequiredArgument<FilesDeleteArguments, FilesDeleteResponse>;
```

##### Description

Deletes a file.

##### See

[\`files.delete\` API reference](https://docs.slack.dev/reference/methods/files.delete).

#### getUploadURLExternal

```ts
getUploadURLExternal: MethodWithRequiredArgument<FilesGetUploadURLExternalArguments, FilesGetUploadURLExternalResponse>;
```

##### Description

Gets a URL for an edge external file upload.

##### See

[\`files.getUploadURLExternal\` API reference](https://docs.slack.dev/reference/methods/files.getUploadURLExternal).

#### info

```ts
info: MethodWithRequiredArgument<FilesInfoArguments, FilesInfoResponse>;
```

##### Description

Gets information about a file.

##### See

[\`files.info\` API reference](https://docs.slack.dev/reference/methods/files.info).

#### list

```ts
list: MethodWithRequiredArgument<FilesListArguments, FilesListResponse>;
```

##### Description

List files for a team, in a channel, or from a user with applied filters.

##### See

[\`files.list\` API reference](https://docs.slack.dev/reference/methods/files.list).

#### remote

```ts
remote: object;
```

##### remote.add

```ts
add: MethodWithRequiredArgument<FilesRemoteAddArguments, FilesRemoteAddResponse>;
```

###### Description

Adds a file from a remote service.

###### See

[\`files.remote.add\` API reference](https://docs.slack.dev/reference/methods/files.remote.add).

##### remote.info

```ts
info: MethodWithRequiredArgument<FilesRemoteInfoArguments, FilesRemoteInfoResponse>;
```

###### Description

Retrieve information about a remote file added to Slack.

###### See

[\`files.remote.info\` API reference](https://docs.slack.dev/reference/methods/files.remote.info).

##### remote.list

```ts
list: MethodWithRequiredArgument<FilesRemoteListArguments, FilesRemoteListResponse>;
```

###### Description

List remote files added to Slack.

###### See

[\`files.remote.list\` API reference](https://docs.slack.dev/reference/methods/files.remote.list).

##### remote.remove

```ts
remove: MethodWithRequiredArgument<FilesRemoteRemoveArguments, FilesRemoteRemoveResponse>;
```

###### Description

Remove a remote file.

###### See

[\`files.remote.remove\` API reference](https://docs.slack.dev/reference/methods/files.remote.remove).

##### remote.share

```ts
share: MethodWithRequiredArgument<FilesRemoteShareArguments, FilesRemoteShareResponse>;
```

###### Description

Share a remote file into a channel.

###### See

[\`files.remote.share\` API reference](https://docs.slack.dev/reference/methods/files.remote.share).

##### remote.update

```ts
update: MethodWithRequiredArgument<FilesRemoteUpdateArguments, FilesRemoteUpdateResponse>;
```

###### Description

Updates an existing remote file.

###### See

[\`files.remote.update\` API reference](https://docs.slack.dev/reference/methods/files.remote.update).

#### revokePublicURL

```ts
revokePublicURL: MethodWithRequiredArgument<FilesRevokePublicURLArguments, FilesRevokePublicURLResponse>;
```

##### Description

Revokes public/external sharing access for a file.

##### See

[\`files.revokePublicURL\` API reference](https://docs.slack.dev/reference/methods/files.revokePublicURL).

#### sharedPublicURL

```ts
sharedPublicURL: MethodWithRequiredArgument<FilesSharedPublicURLArguments, FilesSharedPublicURLResponse>;
```

##### Description

Enables a file for public/external sharing.

##### See

[\`files.sharedPublicURL\` API reference](https://docs.slack.dev/reference/methods/files.sharedPublicURL).

#### ~~upload~~

```ts
upload: MethodWithRequiredArgument<FilesUploadArguments, FilesUploadResponse>;
```

##### Description

Uploads or creates a file.

##### Deprecated

Use `uploadV2` instead. See [our post on retiring \`files.upload\`](https://docs.slack.dev/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay).

##### See

[\`files.upload\` API reference](https://docs.slack.dev/reference/methods/files.upload).

#### uploadV2

```ts
uploadV2: MethodWithRequiredArgument<FilesUploadV2Arguments, WebAPICallResult>;
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

[\`@slack/web-api\` Upload a file documentation](https://tools.slack.dev/node-slack-sdk/web-api#upload-a-file).

#### Inherited from

[`Methods`](Methods.md).[`files`](Methods.md#files)

***

### functions

```ts
readonly functions: object;
```

Defined in: [src/methods.ts:1973](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1973)

#### completeError

```ts
completeError: MethodWithRequiredArgument<FunctionsCompleteErrorArguments, FunctionsCompleteErrorResponse>;
```

##### Description

Signal the failure to execute a Custom Function.

##### See

[\`functions.completeError\` API reference](https://docs.slack.dev/reference/methods/functions.completeError).

#### completeSuccess

```ts
completeSuccess: MethodWithRequiredArgument<FunctionsCompleteSuccessArguments, FunctionsCompleteSuccessResponse>;
```

##### Description

Signal the successful completion of a Custom Function.

##### See

[\`functions.completeSuccess\` API reference](https://docs.slack.dev/reference/methods/functions.completeSuccess).

#### Inherited from

[`Methods`](Methods.md).[`functions`](Methods.md#functions)

***

### migration

```ts
readonly migration: object;
```

Defined in: [src/methods.ts:1992](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L1992)

#### exchange

```ts
exchange: MethodWithRequiredArgument<MigrationExchangeArguments, MigrationExchangeResponse>;
```

##### Description

For Enterprise Grid workspaces, map local user IDs to global user IDs.

##### See

[\`migration.exchange\` API reference](https://docs.slack.dev/reference/methods/migration.exchange).

#### Inherited from

[`Methods`](Methods.md).[`migration`](Methods.md#migration)

***

### oauth

```ts
readonly oauth: object;
```

Defined in: [src/methods.ts:2000](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2000)

#### ~~access~~

```ts
access: MethodWithRequiredArgument<OAuthAccessArguments, OauthAccessResponse>;
```

##### Description

Exchanges a temporary OAuth verifier code for an access token.

##### Deprecated

This is a legacy method only used by classic Slack apps. Use `oauth.v2.access` for new Slack apps.

##### See

[\`oauth.access\` API reference](https://docs.slack.dev/reference/methods/oauth.access).

#### v2

```ts
v2: object;
```

##### v2.access

```ts
access: MethodWithRequiredArgument<OAuthV2AccessArguments, OauthV2AccessResponse>;
```

###### Description

Exchanges a temporary OAuth verifier code for an access token.

###### See

[\`oauth.v2.access\` API reference](https://docs.slack.dev/reference/methods/oauth.v2.access).

##### v2.exchange

```ts
exchange: MethodWithRequiredArgument<OAuthV2ExchangeArguments, OauthV2ExchangeResponse>;
```

###### Description

Exchanges a legacy access token for a new expiring access token and refresh token.

###### See

[\`oauth.v2.exchange\` API reference](https://docs.slack.dev/reference/methods/oauth.v2.exchange).

#### Inherited from

[`Methods`](Methods.md).[`oauth`](Methods.md#oauth)

***

### openid

```ts
readonly openid: object;
```

Defined in: [src/methods.ts:2021](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2021)

#### connect

```ts
connect: object;
```

##### connect.token

```ts
token: MethodWithRequiredArgument<OpenIDConnectTokenArguments, OpenIDConnectTokenResponse>;
```

###### Description

Exchanges a temporary OAuth verifier code for an access token for [Sign in with Slack](https://docs.slack.dev/authentication/sign-in-with-slack).

###### See

[\`openid.connect.token\` API reference](https://docs.slack.dev/reference/methods/openid.connect.token).

##### connect.userInfo

```ts
userInfo: Method<OpenIDConnectUserInfoArguments, OpenIDConnectUserInfoResponse>;
```

###### Description

Get the identity of a user who has authorized [Sign in with Slack](https://docs.slack.dev/authentication/sign-in-with-slack).

###### See

[\`openid.connect.userInfo\` API reference](https://docs.slack.dev/reference/methods/openid.connect.userInfo).

#### Inherited from

[`Methods`](Methods.md).[`openid`](Methods.md#openid)

***

### pins

```ts
readonly pins: object;
```

Defined in: [src/methods.ts:2039](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2039)

#### add

```ts
add: MethodWithRequiredArgument<PinsAddArguments, PinsAddResponse>;
```

##### Description

Pins an item to a channel.

##### See

[\`pins.add\` API reference](https://docs.slack.dev/reference/methods/pins.add).

#### list

```ts
list: MethodWithRequiredArgument<PinsListArguments, PinsListResponse>;
```

##### Description

Lists items pinned to a channel.

##### See

[\`pins.list\` API reference](https://docs.slack.dev/reference/methods/pins.list).

#### remove

```ts
remove: MethodWithRequiredArgument<PinsRemoveArguments, PinsRemoveResponse>;
```

##### Description

Un-pins an item from a channel.

##### See

[\`pins.remove\` API reference](https://docs.slack.dev/reference/methods/pins.remove).

#### Inherited from

[`Methods`](Methods.md).[`pins`](Methods.md#pins)

***

### reactions

```ts
readonly reactions: object;
```

Defined in: [src/methods.ts:2057](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2057)

#### add

```ts
add: MethodWithRequiredArgument<ReactionsAddArguments, ReactionsAddResponse>;
```

##### Description

Adds a reaction to an item.

##### See

[\`reactions.add\` API reference](https://docs.slack.dev/reference/methods/reactions.add).

#### get

```ts
get: MethodWithRequiredArgument<ReactionsGetArguments, ReactionsGetResponse>;
```

##### Description

Gets reactions for an item.

##### See

[\`reactions.get\` API reference](https://docs.slack.dev/reference/methods/reactions.get).

#### list

```ts
list: Method<ReactionsListArguments, ReactionsListResponse>;
```

##### Description

List reactions made by a user.

##### See

[\`reactions.list\` API reference](https://docs.slack.dev/reference/methods/reactions.list).

#### remove

```ts
remove: MethodWithRequiredArgument<ReactionsRemoveArguments, ReactionsRemoveResponse>;
```

##### Description

Removes a reaction from an item.

##### See

[\`reactions.remove\` API reference](https://docs.slack.dev/reference/methods/reactions.remove).

#### Inherited from

[`Methods`](Methods.md).[`reactions`](Methods.md#reactions)

***

### reminders

```ts
readonly reminders: object;
```

Defined in: [src/methods.ts:2082](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2082)

#### add

```ts
add: MethodWithRequiredArgument<RemindersAddArguments, RemindersAddResponse>;
```

##### Description

Creates a reminder.

##### See

[\`reminders.add\` API reference](https://docs.slack.dev/reference/methods/reminders.add).

#### complete

```ts
complete: MethodWithRequiredArgument<RemindersCompleteArguments, RemindersCompleteResponse>;
```

##### Description

Marks a reminder as complete.

##### See

[\`reminders.complete\` API reference](https://docs.slack.dev/reference/methods/reminders.complete).

#### delete

```ts
delete: MethodWithRequiredArgument<RemindersDeleteArguments, RemindersDeleteResponse>;
```

##### Description

Deletes a reminder.

##### See

[\`reminders.delete\` API reference](https://docs.slack.dev/reference/methods/reminders.delete).

#### info

```ts
info: MethodWithRequiredArgument<RemindersInfoArguments, RemindersInfoResponse>;
```

##### Description

Gets information about a reminder.

##### See

[\`reminders.info\` API reference](https://docs.slack.dev/reference/methods/reminders.info).

#### list

```ts
list: Method<RemindersListArguments, RemindersListResponse>;
```

##### Description

Lists all reminders created by or for a given user.

##### See

[\`reminders.list\` API reference](https://docs.slack.dev/reference/methods/reminders.list).

#### Inherited from

[`Methods`](Methods.md).[`reminders`](Methods.md#reminders)

***

### rtm

```ts
readonly rtm: object;
```

Defined in: [src/methods.ts:2110](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2110)

#### connect

```ts
connect: Method<RTMConnectArguments, RtmConnectResponse>;
```

##### Description

Starts a Real Time Messaging session.

##### See

[\`rtm.connect\` API reference](https://docs.slack.dev/reference/methods/rtm.connect).

#### ~~start~~

```ts
start: Method<RTMStartArguments, RtmStartResponse>;
```

##### Description

Starts a Real Time Messaging session.

##### Deprecated

Use `rtm.connect` instead. See [our post on retiring \`rtm.start\`](https://docs.slack.dev/changelog/2021-10-rtm-start-to-stop).

##### See

[\`rtm.start\` API reference](https://docs.slack.dev/reference/methods/rtm.start).

#### Inherited from

[`Methods`](Methods.md).[`rtm`](Methods.md#rtm)

***

### search

```ts
readonly search: object;
```

Defined in: [src/methods.ts:2124](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2124)

#### all

```ts
all: MethodWithRequiredArgument<SearchAllArguments, SearchAllResponse>;
```

##### Description

Searches for messages and files matching a query.

##### See

[search.all\` API reference](https://docs.slack.dev/reference/methods/search.all).

#### files

```ts
files: MethodWithRequiredArgument<SearchFilesArguments, SearchFilesResponse>;
```

##### Description

Searches for files matching a query.

##### See

[search.files\` API reference](https://docs.slack.dev/reference/methods/search.files).

#### messages

```ts
messages: MethodWithRequiredArgument<SearchMessagesArguments, SearchMessagesResponse>;
```

##### Description

Searches for messages matching a query.

##### See

[search.messages\` API reference](https://docs.slack.dev/reference/methods/search.messages).

#### Inherited from

[`Methods`](Methods.md).[`search`](Methods.md#search)

***

### slackApiUrl

```ts
readonly slackApiUrl: string;
```

Defined in: [src/WebClient.ts:195](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L195)

The base URL for reaching Slack's Web API. Consider changing this value for testing purposes.

***

### stars

```ts
readonly stars: object;
```

Defined in: [src/methods.ts:2366](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2366)

#### ~~add~~

```ts
add: MethodWithRequiredArgument<StarsAddRemoveArguments, StarsAddResponse>;
```

##### Description

Save an item for later. Formerly known as adding a star.

##### Deprecated

Stars can still be added but they can no longer be viewed or interacted with by end-users.
See [our post on stars and the Later list](https://docs.slack.dev/changelog/2023-07-its-later-already-for-stars-and-reminders).

##### See

[\`stars.add\` API reference](https://docs.slack.dev/reference/methods/stars.add).

#### ~~list~~

```ts
list: MethodWithRequiredArgument<StarsListArguments, StarsListResponse>;
```

##### Description

List a user's saved items, formerly known as stars.

##### Deprecated

Stars can still be listed but they can no longer be viewed or interacted with by end-users.
See [our post on stars and the Later list](https://docs.slack.dev/changelog/2023-07-its-later-already-for-stars-and-reminders).

##### See

[\`stars.list\` API reference](https://docs.slack.dev/reference/methods/stars.list).

#### ~~remove~~

```ts
remove: MethodWithRequiredArgument<StarsAddRemoveArguments, StarsRemoveResponse>;
```

##### Description

Remove a saved item from a user's saved items, formerly known as stars.

##### Deprecated

Stars can still be removed but they can no longer be viewed or interacted with by end-users.
See [our post on stars and the Later list](https://docs.slack.dev/changelog/2023-07-its-later-already-for-stars-and-reminders).

##### See

[\`stars.remove\` API reference](https://docs.slack.dev/reference/methods/stars.remove).

#### Inherited from

[`Methods`](Methods.md).[`stars`](Methods.md#stars)

***

### team

```ts
readonly team: object;
```

Defined in: [src/methods.ts:2142](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2142)

#### accessLogs

```ts
accessLogs: Method<TeamAccessLogsArguments, TeamAccessLogsResponse>;
```

##### Description

Gets the access logs for the current team.

##### See

[\`team.accessLogs\` API reference](https://docs.slack.dev/reference/methods/team.accessLogs).

#### billableInfo

```ts
billableInfo: Method<TeamBillableInfoArguments, TeamBillableInfoResponse>;
```

##### Description

Gets billable users information for the current team.

##### See

[\`team.billableInfo\` API reference](https://docs.slack.dev/reference/methods/team.billableInfo).

#### billing

```ts
billing: object;
```

##### billing.info

```ts
info: MethodWithRequiredArgument<TeamBillingInfoArguments, TeamBillingInfoResponse>;
```

###### Description

Reads a workspace's billing plan information.

###### See

[\`team.billing.info\` API reference](https://docs.slack.dev/reference/methods/team.billing.info).

#### externalTeams

```ts
externalTeams: object;
```

##### externalTeams.disconnect

```ts
disconnect: MethodWithRequiredArgument<TeamExternalTeamsDisconnectArguments, TeamExternalTeamsDisconnectResponse>;
```

###### Description

Disconnect an external organization.

###### See

[\`team.externalTeams.disconnect\` API reference](https://docs.slack.dev/reference/methods/team.externalTeams.disconnect).

##### externalTeams.list

```ts
list: MethodWithRequiredArgument<TeamExternalTeamsListArguments, TeamExternalTeamsListResponse>;
```

###### Description

Returns a list of all the external teams connected and details about the connection.

###### See

[\`team.externalTeams.list\` API reference](https://docs.slack.dev/reference/methods/team.externalTeams.list).

#### info

```ts
info: Method<TeamInfoArguments, TeamInfoResponse>;
```

##### Description

Gets information about the current team.

##### See

[\`team.info\` API reference](https://docs.slack.dev/reference/methods/team.info).

#### integrationLogs

```ts
integrationLogs: Method<TeamIntegrationLogsArguments, TeamIntegrationLogsResponse>;
```

##### Description

Gets the integration logs for the current team.

##### See

[\`team.integrationLogs\` API reference](https://docs.slack.dev/reference/methods/team.integrationLogs).

#### preferences

```ts
preferences: object;
```

##### preferences.list

```ts
list: Method<TeamPreferencesListArguments, TeamPreferencesListResponse>;
```

###### Description

Retrieve a list of a workspace's team preferences.

###### See

[\`team.preferences.list\` API reference](https://docs.slack.dev/reference/methods/team.preferences.list).

#### profile

```ts
profile: object;
```

##### profile.get

```ts
get: Method<TeamProfileGetArguments, TeamProfileGetResponse>;
```

###### Description

Retrieve a team's profile.

###### See

[\`team.profile.get\` API reference](https://docs.slack.dev/reference/methods/team.profile.get).

#### Inherited from

[`Methods`](Methods.md).[`team`](Methods.md#team)

***

### token?

```ts
readonly optional token: string;
```

Defined in: [src/WebClient.ts:200](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L200)

Authentication and authorization token for accessing Slack Web API (usually begins with `xoxp` or `xoxb`)

***

### tooling

```ts
readonly tooling: object;
```

Defined in: [src/methods.ts:2213](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2213)

#### tokens

```ts
tokens: object;
```

##### tokens.rotate

```ts
rotate: MethodWithRequiredArgument<ToolingTokensRotateArguments, ToolingTokensRotateResponse>;
```

###### Description

Exchanges a refresh token for a new app configuration token.

###### See

[\`tooling.tokens.rotate\` API reference](https://docs.slack.dev/reference/methods/tooling.tokens.rotate).

#### Inherited from

[`Methods`](Methods.md).[`tooling`](Methods.md#tooling)

***

### usergroups

```ts
readonly usergroups: object;
```

Defined in: [src/methods.ts:2223](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2223)

#### create

```ts
create: MethodWithRequiredArgument<UsergroupsCreateArguments, UsergroupsCreateResponse>;
```

##### Description

Create a User Group.

##### See

[\`usergroups.create\` API reference](https://docs.slack.dev/reference/methods/usergroups.create).

#### disable

```ts
disable: MethodWithRequiredArgument<UsergroupsDisableArguments, UsergroupsDisableResponse>;
```

##### Description

Disable an existing User Group.

##### See

[\`usergroups.disable\` API reference](https://docs.slack.dev/reference/methods/usergroups.disable).

#### enable

```ts
enable: MethodWithRequiredArgument<UsergroupsEnableArguments, UsergroupsEnableResponse>;
```

##### Description

Enable an existing User Group.

##### See

[\`usergroups.enable\` API reference](https://docs.slack.dev/reference/methods/usergroups.enable).

#### list

```ts
list: Method<UsergroupsListArguments, UsergroupsListResponse>;
```

##### Description

List all User Groups for a team.

##### See

[\`usergroups.list\` API reference](https://docs.slack.dev/reference/methods/usergroups.list).

#### update

```ts
update: MethodWithRequiredArgument<UsergroupsUpdateArguments, UsergroupsUpdateResponse>;
```

##### Description

Update an existing User Group.

##### See

[\`usergroups.update\` API reference](https://docs.slack.dev/reference/methods/usergroups.update).

#### users

```ts
users: object;
```

##### users.list

```ts
list: MethodWithRequiredArgument<UsergroupsUsersListArguments, UsergroupsUsersListResponse>;
```

###### Description

List all users in a User Group.

###### See

[\`usergroups.users.list\` API reference](https://docs.slack.dev/reference/methods/usergroups.users.list).

##### users.update

```ts
update: MethodWithRequiredArgument<UsergroupsUsersUpdateArguments, UsergroupsUsersUpdateResponse>;
```

###### Description

Update the list of users in a User Group.

###### See

[\`usergroups.users.update\` API reference](https://docs.slack.dev/reference/methods/usergroups.users.update).

#### Inherited from

[`Methods`](Methods.md).[`usergroups`](Methods.md#usergroups)

***

### users

```ts
readonly users: object;
```

Defined in: [src/methods.ts:2266](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2266)

#### conversations

```ts
conversations: MethodWithRequiredArgument<UsersConversationsArguments, UsersConversationsResponse>;
```

##### Description

List conversations the calling user may access.

##### See

[\`users.conversations\` API reference](https://docs.slack.dev/reference/methods/users.conversations).

#### deletePhoto

```ts
deletePhoto: MethodWithRequiredArgument<UsersDeletePhotoArguments, UsersDeletePhotoResponse>;
```

##### Description

Delete the user profile photo.

##### See

[\`users.deletePhoto\` API reference](https://docs.slack.dev/reference/methods/users.deletePhoto).

#### discoverableContacts

```ts
discoverableContacts: object;
```

##### discoverableContacts.lookup

```ts
lookup: MethodWithRequiredArgument<UsersDiscoverableContactsLookupArguments, UsersDiscoverableContactsLookupResponse>;
```

###### Description

Lookup an email address to see if someone is on Slack.

###### See

[\`users.discoverableContacts.lookup\` API reference](https://docs.slack.dev/reference/methods/users.discoverableContacts.lookup).

#### getPresence

```ts
getPresence: MethodWithRequiredArgument<UsersGetPresenceArguments, UsersGetPresenceResponse>;
```

##### Description

Gets user presence information.

##### See

[\`users.getPresence\` API reference](https://docs.slack.dev/reference/methods/users.getPresence).

#### identity

```ts
identity: MethodWithRequiredArgument<UsersIdentityArguments, UsersIdentityResponse>;
```

##### Description

Get a user's identity.

##### See

[\`users.identity\` API reference](https://docs.slack.dev/reference/methods/users.identity).

#### info

```ts
info: MethodWithRequiredArgument<UsersInfoArguments, UsersInfoResponse>;
```

##### Description

Gets information about a user.

##### See

[\`users.info\` API reference](https://docs.slack.dev/reference/methods/users.info).

#### list

```ts
list: MethodWithRequiredArgument<UsersListArguments, UsersListResponse>;
```

##### Description

Lists all users in a Slack team.

##### See

[\`users.list\` API reference](https://docs.slack.dev/reference/methods/users.list).

#### lookupByEmail

```ts
lookupByEmail: MethodWithRequiredArgument<UsersLookupByEmailArguments, UsersLookupByEmailResponse>;
```

##### Description

Find a user with an email address.

##### See

[\`users.lookupByEmail\` API reference](https://docs.slack.dev/reference/methods/users.lookupByEmail).

#### profile

```ts
profile: object;
```

##### profile.get

```ts
get: MethodWithRequiredArgument<UsersProfileGetArguments, UsersProfileGetResponse>;
```

###### Description

Retrieve a user's profile information, including their custom status.

###### See

[\`users.profile.get\` API reference](https://docs.slack.dev/reference/methods/users.profile.get).

##### profile.set

```ts
set: MethodWithRequiredArgument<UsersProfileSetArguments, UsersProfileSetResponse>;
```

###### Description

Set a user's profile information, including custom status.

###### See

[\`users.profile.set\` API reference](https://docs.slack.dev/reference/methods/users.profile.set).

#### setPhoto

```ts
setPhoto: MethodWithRequiredArgument<UsersSetPhotoArguments, UsersSetPhotoResponse>;
```

##### Description

Set the user profile photo.

##### See

[\`users.setPhoto\` API reference](https://docs.slack.dev/reference/methods/users.setPhoto).

#### setPresence

```ts
setPresence: MethodWithRequiredArgument<UsersSetPresenceArguments, UsersSetPresenceResponse>;
```

##### Description

Manually sets user presence.

##### See

[\`users.setPresence\` API reference](https://docs.slack.dev/reference/methods/users.setPresence).

#### Inherited from

[`Methods`](Methods.md).[`users`](Methods.md#users)

***

### views

```ts
readonly views: object;
```

Defined in: [src/methods.ts:2336](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2336)

#### open

```ts
open: MethodWithRequiredArgument<ViewsOpenArguments, ViewsOpenResponse>;
```

##### Description

Open a view for a user.

##### See

[\`views.open\` API reference](https://docs.slack.dev/reference/methods/views.open).

#### publish

```ts
publish: MethodWithRequiredArgument<ViewsPublishArguments, ViewsPublishResponse>;
```

##### Description

Publish a static view for a user.

##### See

[\`views.publish\` API reference](https://docs.slack.dev/reference/methods/views.publish).

#### push

```ts
push: MethodWithRequiredArgument<ViewsPushArguments, ViewsPushResponse>;
```

##### Description

Push a view onto the stack of a root view.

##### See

[\`views.push\` API reference](https://docs.slack.dev/reference/methods/views.push).

#### update

```ts
update: MethodWithRequiredArgument<ViewsUpdateArguments, ViewsUpdateResponse>;
```

##### Description

Update an existing view.

##### See

[\`views.update\` API reference](https://docs.slack.dev/reference/methods/views.update).

#### Inherited from

[`Methods`](Methods.md).[`views`](Methods.md#views)

***

### workflows

```ts
readonly workflows: object;
```

Defined in: [src/methods.ts:2390](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L2390)

#### featured

```ts
featured: object;
```

##### featured.add

```ts
add: MethodWithRequiredArgument<WorkflowsFeaturedAddArguments, WebAPICallResult>;
```

###### Description

Add featured workflows to a channel.

###### See

[\`workflows.featured.add\` API reference](https://docs.slack.dev/reference/methods/workflows.featured.add).

##### featured.list

```ts
list: MethodWithRequiredArgument<WorkflowsFeaturedListArguments, WorkflowsFeaturedListResponse>;
```

###### Description

List the featured workflows for specified channels.

###### See

[\`workflows.featured.list\` API reference](https://docs.slack.dev/reference/methods/workflows.featured.list).

##### featured.remove

```ts
remove: MethodWithRequiredArgument<WorkflowsFeaturedRemoveArguments, WebAPICallResult>;
```

###### Description

Remove featured workflows from a channel.

###### See

[\`workflows.featured.remove\` API reference](https://docs.slack.dev/reference/methods/workflows.featured.remove).

##### featured.set

```ts
set: MethodWithRequiredArgument<WorkflowsFeaturedSetArguments, WebAPICallResult>;
```

###### Description

Set featured workflows for a channel.

###### See

[\`workflows.featured.set\` API reference](https://docs.slack.dev/reference/methods/workflows.featured.set).

#### ~~stepCompleted~~

```ts
stepCompleted: MethodWithRequiredArgument<WorkflowsStepCompletedArguments, WorkflowsStepCompletedResponse>;
```

##### Description

Indicate that an app's step in a workflow completed execution.

##### Deprecated

Steps from Apps is deprecated.
We're retiring all Slack app functionality around Steps from Apps in September 2024.
See [our post on deprecating Steps from Apps](https://docs.slack.dev/changelog/2023-08-workflow-steps-from-apps-step-back).

##### See

[\`workflows.stepCompleted\` API reference](https://docs.slack.dev/legacy/legacy-steps-from-apps/legacy-steps-from-apps-workflow_step-object).

#### ~~stepFailed~~

```ts
stepFailed: MethodWithRequiredArgument<WorkflowsStepFailedArguments, WorkflowsStepFailedResponse>;
```

##### Description

Indicate that an app's step in a workflow failed to execute.

##### Deprecated

Steps from Apps is deprecated.
We're retiring all Slack app functionality around Steps from Apps in September 2024.
See [our post on deprecating Steps from Apps](https://docs.slack.dev/changelog/2023-08-workflow-steps-from-apps-step-back).

##### See

[\`workflows.stepFailed\` API reference](https://docs.slack.dev/legacy/legacy-steps-from-apps/legacy-steps-from-apps-workflow_step-object).

#### ~~updateStep~~

```ts
updateStep: MethodWithRequiredArgument<WorkflowsUpdateStepArguments, WorkflowsUpdateStepResponse>;
```

##### Description

Update the configuration for a workflow step.

##### Deprecated

Steps from Apps is deprecated.
We're retiring all Slack app functionality around Steps from Apps in September 2024.
See [our post on deprecating Steps from Apps](https://docs.slack.dev/changelog/2023-08-workflow-steps-from-apps-step-back).

##### See

[\`workflows.updateStep\` API reference](https://docs.slack.dev/legacy/legacy-steps-from-apps/legacy-steps-from-apps-workflow_step-object).

#### Inherited from

[`Methods`](Methods.md).[`workflows`](Methods.md#workflows)

***

### prefixed

```ts
static prefixed: string | boolean;
```

Defined in: node\_modules/eventemitter3/index.d.ts:9

#### Inherited from

[`Methods`](Methods.md).[`prefixed`](Methods.md#prefixed)

## Methods

### addListener()

```ts
addListener<T>(
   event, 
   fn, 
   context?): this;
```

Defined in: node\_modules/eventemitter3/index.d.ts:45

#### Type Parameters

##### T

`T` *extends* [`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Parameters

##### event

`T`

##### fn

(...`args`) => `void`

##### context?

`any`

#### Returns

`this`

#### Inherited from

[`Methods`](Methods.md).[`addListener`](Methods.md#addlistener)

***

### apiCall()

```ts
apiCall(method, options): Promise<WebAPICallResult>;
```

Defined in: [src/WebClient.ts:347](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L347)

Generic method for calling a Web API method

#### Parameters

##### method

`string`

the Web API method to call [https://docs.slack.dev/reference/methods](https://docs.slack.dev/reference/methods)

##### options

`Record`\<`string`, `unknown`\> = `{}`

options

#### Returns

`Promise`\<[`WebAPICallResult`](../interfaces/WebAPICallResult.md)\>

#### Overrides

[`Methods`](Methods.md).[`apiCall`](Methods.md#apicall)

***

### emit()

```ts
emit<T>(event, ...args): boolean;
```

Defined in: node\_modules/eventemitter3/index.d.ts:32

Calls each of the listeners registered for a given event.

#### Type Parameters

##### T

`T` *extends* [`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Parameters

##### event

`T`

##### args

...`any`[]

#### Returns

`boolean`

#### Inherited from

[`Methods`](Methods.md).[`emit`](Methods.md#emit)

***

### eventNames()

```ts
eventNames(): RATE_LIMITED[];
```

Defined in: node\_modules/eventemitter3/index.d.ts:15

Return an array listing the events for which the emitter has registered
listeners.

#### Returns

[`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)[]

#### Inherited from

[`Methods`](Methods.md).[`eventNames`](Methods.md#eventnames)

***

### filesUploadV2()

```ts
filesUploadV2(options): Promise<WebAPICallResult & object>;
```

Defined in: [src/WebClient.ts:526](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L526)

This wrapper method provides an easy way to upload files using the following endpoints:

**#1**: For each file submitted with this method, submit filenames
and file metadata to [files.getUploadURLExternal](https://docs.slack.dev/reference/methods/files.getuploadurlexternal) to request a URL to
which to send the file data to and an id for the file

**#2**: for each returned file `upload_url`, upload corresponding file to
URLs returned from step 1 (e.g. https://files.slack.com/upload/v1/...\")

**#3**: Complete uploads [files.completeUploadExternal](https://docs.slack.dev/reference/methods/files.completeuploadexternal)

#### Parameters

##### options

[`FilesUploadV2Arguments`](../type-aliases/FilesUploadV2Arguments.md)

#### Returns

`Promise`\<[`WebAPICallResult`](../interfaces/WebAPICallResult.md) & `object`\>

#### Overrides

[`Methods`](Methods.md).[`filesUploadV2`](Methods.md#filesuploadv2)

***

### listenerCount()

```ts
listenerCount(event): number;
```

Defined in: node\_modules/eventemitter3/index.d.ts:27

Return the number of listeners listening to a given event.

#### Parameters

##### event

[`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Returns

`number`

#### Inherited from

[`Methods`](Methods.md).[`listenerCount`](Methods.md#listenercount)

***

### listeners()

```ts
listeners<T>(event): (...args) => void[];
```

Defined in: node\_modules/eventemitter3/index.d.ts:20

Return the listeners registered for a given event.

#### Type Parameters

##### T

`T` *extends* [`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Parameters

##### event

`T`

#### Returns

(...`args`) => `void`[]

#### Inherited from

[`Methods`](Methods.md).[`listeners`](Methods.md#listeners)

***

### off()

```ts
off<T>(
   event, 
   fn?, 
   context?, 
   once?): this;
```

Defined in: node\_modules/eventemitter3/index.d.ts:69

#### Type Parameters

##### T

`T` *extends* [`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Parameters

##### event

`T`

##### fn?

(...`args`) => `void`

##### context?

`any`

##### once?

`boolean`

#### Returns

`this`

#### Inherited from

[`Methods`](Methods.md).[`off`](Methods.md#off)

***

### on()

```ts
on<T>(
   event, 
   fn, 
   context?): this;
```

Defined in: node\_modules/eventemitter3/index.d.ts:40

Add a listener for a given event.

#### Type Parameters

##### T

`T` *extends* [`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Parameters

##### event

`T`

##### fn

(...`args`) => `void`

##### context?

`any`

#### Returns

`this`

#### Inherited from

[`Methods`](Methods.md).[`on`](Methods.md#on)

***

### once()

```ts
once<T>(
   event, 
   fn, 
   context?): this;
```

Defined in: node\_modules/eventemitter3/index.d.ts:54

Add a one-time listener for a given event.

#### Type Parameters

##### T

`T` *extends* [`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Parameters

##### event

`T`

##### fn

(...`args`) => `void`

##### context?

`any`

#### Returns

`this`

#### Inherited from

[`Methods`](Methods.md).[`once`](Methods.md#once)

***

### paginate()

#### Call Signature

```ts
paginate(method, options?): AsyncIterable<WebAPICallResult>;
```

Defined in: [src/WebClient.ts:434](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L434)

Iterate over the result pages of a cursor-paginated Web API method. This method can return two types of values,
depending on which arguments are used. When up to two parameters are used, the return value is an async iterator
which can be used as the iterable in a for-await-of loop. When three or four parameters are used, the return
value is a promise that resolves at the end of iteration. The third parameter, `shouldStop`, is a function that is
called with each `page` and can end iteration by returning `true`. The fourth parameter, `reduce`, is a function
that is called with three arguments: `accumulator`, `page`, and `index`. The `accumulator` is a value of any type
you choose, but it will contain `undefined` when `reduce` is called for the first time. The `page` argument and
`index` arguments are exactly what they say they are. The `reduce` function's return value will be passed in as
`accumulator` the next time it's called, and the returned promise will resolve to the last value of `accumulator`.

The for-await-of syntax is part of ES2018. It is available natively in Node starting with v10.0.0. You may be able
to use it in earlier JavaScript runtimes by transpiling your source with a tool like Babel. However, the
transpiled code will likely sacrifice performance.

##### Parameters

###### method

`string`

the cursor-paginated Web API method to call [https://docs.slack.dev/apis/web-api/paginationn](https://docs.slack.dev/apis/web-api/paginationn)

###### options?

`Record`\<`string`, `unknown`\>

options

##### Returns

`AsyncIterable`\<[`WebAPICallResult`](../interfaces/WebAPICallResult.md)\>

#### Call Signature

```ts
paginate(
   method, 
   options, 
shouldStop): Promise<void>;
```

Defined in: [src/WebClient.ts:435](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L435)

Iterate over the result pages of a cursor-paginated Web API method. This method can return two types of values,
depending on which arguments are used. When up to two parameters are used, the return value is an async iterator
which can be used as the iterable in a for-await-of loop. When three or four parameters are used, the return
value is a promise that resolves at the end of iteration. The third parameter, `shouldStop`, is a function that is
called with each `page` and can end iteration by returning `true`. The fourth parameter, `reduce`, is a function
that is called with three arguments: `accumulator`, `page`, and `index`. The `accumulator` is a value of any type
you choose, but it will contain `undefined` when `reduce` is called for the first time. The `page` argument and
`index` arguments are exactly what they say they are. The `reduce` function's return value will be passed in as
`accumulator` the next time it's called, and the returned promise will resolve to the last value of `accumulator`.

The for-await-of syntax is part of ES2018. It is available natively in Node starting with v10.0.0. You may be able
to use it in earlier JavaScript runtimes by transpiling your source with a tool like Babel. However, the
transpiled code will likely sacrifice performance.

##### Parameters

###### method

`string`

the cursor-paginated Web API method to call [https://docs.slack.dev/apis/web-api/paginationn](https://docs.slack.dev/apis/web-api/paginationn)

###### options

`Record`\<`string`, `unknown`\>

options

###### shouldStop

[`PaginatePredicate`](../type-aliases/PaginatePredicate.md)

a predicate that is called with each page, and should return true when pagination can end.

##### Returns

`Promise`\<`void`\>

#### Call Signature

```ts
paginate<R, A>(
   method, 
   options, 
   shouldStop, 
reduce?): Promise<A>;
```

Defined in: [src/WebClient.ts:436](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L436)

Iterate over the result pages of a cursor-paginated Web API method. This method can return two types of values,
depending on which arguments are used. When up to two parameters are used, the return value is an async iterator
which can be used as the iterable in a for-await-of loop. When three or four parameters are used, the return
value is a promise that resolves at the end of iteration. The third parameter, `shouldStop`, is a function that is
called with each `page` and can end iteration by returning `true`. The fourth parameter, `reduce`, is a function
that is called with three arguments: `accumulator`, `page`, and `index`. The `accumulator` is a value of any type
you choose, but it will contain `undefined` when `reduce` is called for the first time. The `page` argument and
`index` arguments are exactly what they say they are. The `reduce` function's return value will be passed in as
`accumulator` the next time it's called, and the returned promise will resolve to the last value of `accumulator`.

The for-await-of syntax is part of ES2018. It is available natively in Node starting with v10.0.0. You may be able
to use it in earlier JavaScript runtimes by transpiling your source with a tool like Babel. However, the
transpiled code will likely sacrifice performance.

##### Type Parameters

###### R

`R` *extends* [`PageReducer`](../type-aliases/PageReducer.md)\<`any`\>

###### A

`A` *extends* `any`

##### Parameters

###### method

`string`

the cursor-paginated Web API method to call [https://docs.slack.dev/apis/web-api/paginationn](https://docs.slack.dev/apis/web-api/paginationn)

###### options

`Record`\<`string`, `unknown`\>

options

###### shouldStop

[`PaginatePredicate`](../type-aliases/PaginatePredicate.md)

a predicate that is called with each page, and should return true when pagination can end.

###### reduce?

[`PageReducer`](../type-aliases/PageReducer.md)\<`A`\>

a callback that can be used to accumulate a value that the return promise is resolved to

##### Returns

`Promise`\<`A`\>

***

### removeAllListeners()

```ts
removeAllListeners(event?): this;
```

Defined in: node\_modules/eventemitter3/index.d.ts:79

Remove all listeners, or those of the specified event.

#### Parameters

##### event?

[`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Returns

`this`

#### Inherited from

[`Methods`](Methods.md).[`removeAllListeners`](Methods.md#removealllisteners)

***

### removeListener()

```ts
removeListener<T>(
   event, 
   fn?, 
   context?, 
   once?): this;
```

Defined in: node\_modules/eventemitter3/index.d.ts:63

Remove the listeners of a given event.

#### Type Parameters

##### T

`T` *extends* [`RATE_LIMITED`](../enumerations/WebClientEvent.md#rate_limited)

#### Parameters

##### event

`T`

##### fn?

(...`args`) => `void`

##### context?

`any`

##### once?

`boolean`

#### Returns

`this`

#### Inherited from

[`Methods`](Methods.md).[`removeListener`](Methods.md#removelistener)
