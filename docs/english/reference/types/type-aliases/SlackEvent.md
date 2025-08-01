[@slack/types](../index.md) / SlackEvent

# Type Alias: SlackEvent

```ts
type SlackEvent = 
  | AppDeletedEvent
  | AppHomeOpenedEvent
  | AppInstalledEvent
  | AppMentionEvent
  | AppRateLimitedEvent
  | AppRequestedEvent
  | AppUninstalledTeamEvent
  | AppUninstalledEvent
  | AssistantThreadContextChangedEvent
  | AssistantThreadStartedEvent
  | CallRejectedEvent
  | ChannelArchiveEvent
  | ChannelCreatedEvent
  | ChannelDeletedEvent
  | ChannelHistoryChangedEvent
  | ChannelIDChangedEvent
  | ChannelLeftEvent
  | ChannelRenameEvent
  | ChannelSharedEvent
  | ChannelUnarchiveEvent
  | ChannelUnsharedEvent
  | DNDUpdatedEvent
  | DNDUpdatedUserEvent
  | EmailDomainChangedEvent
  | EmojiChangedEvent
  | FileChangeEvent
  | FileCommentDeletedEvent
  | FileCreatedEvent
  | FileDeletedEvent
  | FilePublicEvent
  | FileSharedEvent
  | FileUnsharedEvent
  | FunctionExecutedEvent
  | GridMigrationFinishedEvent
  | GridMigrationStartedEvent
  | GroupArchiveEvent
  | GroupCloseEvent
  | GroupDeletedEvent
  | GroupHistoryChangedEvent
  | GroupLeftEvent
  | GroupOpenEvent
  | GroupRenameEvent
  | GroupUnarchiveEvent
  | IMCloseEvent
  | IMCreatedEvent
  | IMHistoryChangedEvent
  | IMOpenEvent
  | InviteRequestedEvent
  | LinkSharedEvent
  | MemberJoinedChannelEvent
  | MemberLeftChannelEvent
  | AllMessageEvents
  | AllMessageMetadataEvents
  | PinAddedEvent
  | PinRemovedEvent
  | ReactionAddedEvent
  | ReactionRemovedEvent
  | SharedChannelInviteAcceptedEvent
  | SharedChannelInviteApprovedEvent
  | SharedChannelInviteDeclinedEvent
  | SharedChannelInviteReceivedEvent
  | SharedChannelInviteRequestedEvent
  | StarAddedEvent
  | StarRemovedEvent
  | SubteamCreatedEvent
  | SubteamMembersChangedEvent
  | SubteamSelfAddedEvent
  | SubteamSelfRemovedEvent
  | SubteamUpdatedEvent
  | TeamAccessGrantedEvent
  | TeamAccessRevokedEvent
  | TeamDomainChangeEvent
  | TeamJoinEvent
  | TeamRenameEvent
  | TokensRevokedEvent
  | UserChangeEvent
  | UserHuddleChangedEvent
  | UserProfileChangedEvent
  | UserStatusChangedEvent
  | WorkflowDeletedEvent
  | WorkflowPublishedEvent
  | WorkflowUnpublishedEvent
  | WorkflowStepDeletedEvent
  | WorkflowStepExecuteEvent;
```

Defined in: [events/index.ts:121](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/index.ts#L121)

All known event types in Slack's Events API
Please refer to https://docs.slack.dev/reference/events for more details
This is a discriminated union. The discriminant is the `type` property.
