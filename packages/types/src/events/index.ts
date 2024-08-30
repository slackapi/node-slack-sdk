import {
  AppDeletedEvent,
  AppHomeOpenedEvent,
  AppInstalledEvent,
  AppMentionEvent,
  AppRateLimitedEvent,
  AppRequestedEvent,
  AppUninstalledEvent,
  AppUninstalledTeamEvent,
} from './app';
import { CallRejectedEvent } from './call';
import {
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
import { DNDUpdatedEvent, DNDUpdatedUserEvent } from './dnd';
import { EmailDomainChangedEvent } from './email';
import { EmojiChangedEvent } from './emoji';
import {
  FileChangeEvent,
  FileCommentDeletedEvent,
  FileCreatedEvent,
  FileDeletedEvent,
  FilePublicEvent,
  FileSharedEvent,
  FileUnsharedEvent,
} from './file';
import { FunctionExecutedEvent } from './function';
import { GridMigrationFinishedEvent, GridMigrationStartedEvent } from './grid-migration';
import {
  GroupArchiveEvent,
  GroupCloseEvent,
  GroupDeletedEvent,
  GroupHistoryChangedEvent,
  GroupLeftEvent,
  GroupOpenEvent,
  GroupRenameEvent,
  GroupUnarchiveEvent,
} from './group';
import { IMCloseEvent, IMCreatedEvent, IMHistoryChangedEvent, IMOpenEvent } from './im';
import { InviteRequestedEvent } from './invite';
import { LinkSharedEvent } from './link-shared';
import { MemberJoinedChannelEvent, MemberLeftChannelEvent } from './member';
import { AllMessageEvents } from './message';
import { AllMessageMetadataEvents } from './message-metadata';
import { PinAddedEvent, PinRemovedEvent } from './pin';
import { ReactionAddedEvent, ReactionRemovedEvent } from './reaction';
import {
  SharedChannelInviteAcceptedEvent,
  SharedChannelInviteApprovedEvent,
  SharedChannelInviteDeclinedEvent,
  SharedChannelInviteReceivedEvent,
  SharedChannelInviteRequestedEvent,
} from './shared-channel';
import { StarAddedEvent, StarRemovedEvent } from './star';
import {
  WorkflowDeletedEvent,
  WorkflowPublishedEvent,
  WorkflowStepDeletedEvent,
  WorkflowStepExecuteEvent,
  WorkflowUnpublishedEvent,
} from './steps-from-apps';
import {
  SubteamCreatedEvent,
  SubteamMembersChangedEvent,
  SubteamSelfAddedEvent,
  SubteamSelfRemovedEvent,
  SubteamUpdatedEvent,
} from './subteam';
import {
  TeamAccessGrantedEvent,
  TeamAccessRevokedEvent,
  TeamDomainChangedEvent,
  TeamJoinEvent,
  TeamRenameEvent,
} from './team';
import { TokensRevokedEvent } from './token';
import { UserChangeEvent, UserHuddleChangedEvent, UserProfileChangedEvent, UserStatusChangedEvent } from './user';

export type MessageEvent = AllMessageEvents;
export * from './app';
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
export * from './subteam';
export * from './team';
export * from './token';
export * from './user';
export * from './steps-from-apps';

/**
 * All known event types in Slack's Events API
 * Please refer to https://api.slack.com/events?filter=Events for more details
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
  // NOTE: url_verification does not use the envelope, but its also not interesting for an app developer. its omitted.
  | UserChangeEvent
  | UserHuddleChangedEvent
  | UserProfileChangedEvent
  | UserStatusChangedEvent
  | WorkflowDeletedEvent
  | WorkflowPublishedEvent
  | WorkflowUnpublishedEvent
  | WorkflowStepDeletedEvent
  | WorkflowStepExecuteEvent;
