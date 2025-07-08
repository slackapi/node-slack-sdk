import type {
  AppDeletedEvent,
  AppHomeOpenedEvent,
  AppInstalledEvent,
  AppMentionEvent,
  AppRateLimitedEvent,
  AppRequestedEvent,
  AppUninstalledEvent,
  AppUninstalledTeamEvent,
} from './app';
import type { AssistantThreadContextChangedEvent, AssistantThreadStartedEvent } from './assistant';
import type { CallRejectedEvent } from './call';
import type {
  ChannelArchiveEvent,
  ChannelCreatedEvent,
  ChannelDeletedEvent,
  ChannelHistoryChangedEvent,
  ChannelIDChangedEvent,
  ChannelLeftEvent,
  ChannelRenameEvent,
  ChannelSharedEvent,
  ChannelUnarchiveEvent,
  ChannelUnsharedEvent,
} from './channel';
import type { DNDUpdatedEvent, DNDUpdatedUserEvent } from './dnd';
import type { EmailDomainChangedEvent } from './email';
import type { EmojiChangedEvent } from './emoji';
import type {
  FileChangeEvent,
  FileCommentDeletedEvent,
  FileCreatedEvent,
  FileDeletedEvent,
  FilePublicEvent,
  FileSharedEvent,
  FileUnsharedEvent,
} from './file';
import type { FunctionExecutedEvent } from './function';
import type { GridMigrationFinishedEvent, GridMigrationStartedEvent } from './grid-migration';
import type {
  GroupArchiveEvent,
  GroupCloseEvent,
  GroupDeletedEvent,
  GroupHistoryChangedEvent,
  GroupLeftEvent,
  GroupOpenEvent,
  GroupRenameEvent,
  GroupUnarchiveEvent,
} from './group';
import type { IMCloseEvent, IMCreatedEvent, IMHistoryChangedEvent, IMOpenEvent } from './im';
import type { InviteRequestedEvent } from './invite';
import type { LinkSharedEvent } from './link-shared';
import type { MemberJoinedChannelEvent, MemberLeftChannelEvent } from './member';
import type { AllMessageEvents } from './message';
import type { AllMessageMetadataEvents } from './message-metadata';
import type { PinAddedEvent, PinRemovedEvent } from './pin';
import type { ReactionAddedEvent, ReactionRemovedEvent } from './reaction';
import type {
  SharedChannelInviteAcceptedEvent,
  SharedChannelInviteApprovedEvent,
  SharedChannelInviteDeclinedEvent,
  SharedChannelInviteReceivedEvent,
  SharedChannelInviteRequestedEvent,
} from './shared-channel';
import type { StarAddedEvent, StarRemovedEvent } from './star';
import type {
  WorkflowDeletedEvent,
  WorkflowPublishedEvent,
  WorkflowStepDeletedEvent,
  WorkflowStepExecuteEvent,
  WorkflowUnpublishedEvent,
} from './steps-from-apps';
import type {
  SubteamCreatedEvent,
  SubteamMembersChangedEvent,
  SubteamSelfAddedEvent,
  SubteamSelfRemovedEvent,
  SubteamUpdatedEvent,
} from './subteam';
import type {
  TeamAccessGrantedEvent,
  TeamAccessRevokedEvent,
  TeamDomainChangedEvent,
  TeamJoinEvent,
  TeamRenameEvent,
} from './team';
import type { TokensRevokedEvent } from './token';
import type { UserChangeEvent, UserHuddleChangedEvent, UserProfileChangedEvent, UserStatusChangedEvent } from './user';

export * from './app';
export * from './assistant';
export * from './call';
export * from './channel';
export * from './dnd';
export * from './email';
export * from './emoji';
export * from './file';
export * from './function';
export * from './grid-migration';
export * from './group';
export * from './im';
export * from './invite';
export * from './link-shared';
export * from './member';
export * from './message';
export * from './message-metadata';
export * from './pin';
export * from './reaction';
export * from './shared-channel';
export * from './star';
export * from './steps-from-apps';
export * from './subteam';
export * from './team';
export * from './token';
export * from './user';

/**
 * All known event types in Slack's Events API
 * Please refer to https://docs.slack.dev/reference/events for more details
 * This is a discriminated union. The discriminant is the `type` property.
 */
export type SlackEvent =
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
  | AllMessageEvents // includes the generic message event as well as subtypes
  | AllMessageMetadataEvents // includes all metadata-related events
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
  | TeamDomainChangedEvent
  | TeamJoinEvent
  | TeamRenameEvent
  | TokensRevokedEvent
  // TODO: url_verification event is missing, but maybe we don't need it?
  // NOTE: url_verification does not use the envelope, but it's also not interesting for an app developer. it's omitted.
  | UserChangeEvent
  | UserHuddleChangedEvent
  | UserProfileChangedEvent
  | UserStatusChangedEvent
  | WorkflowDeletedEvent
  | WorkflowPublishedEvent
  | WorkflowUnpublishedEvent
  | WorkflowStepDeletedEvent
  | WorkflowStepExecuteEvent;
