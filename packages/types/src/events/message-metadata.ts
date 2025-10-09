import type { EventMessageMetadata } from '../message-metadata';

export type AllMessageMetadataEvents =
  | MessageMetadataDeletedEvent
  | MessageMetadataPostedEvent
  | MessageMetadataUpdatedEvent;

export interface MessageMetadataPostedEvent {
  type: 'message_metadata_posted';
  app_id: string;
  bot_id?: string;
  user_id: string;
  team_id: string;
  channel_id: string;
  metadata: EventMessageMetadata;
  message_ts: string;
  event_ts: string;
}

export interface MessageMetadataUpdatedEvent {
  type: 'message_metadata_updated';
  channel_id: string;
  event_ts: string;
  previous_metadata: EventMessageMetadata;
  app_id: string;
  bot_id?: string;
  user_id: string;
  team_id: string;
  message_ts: string;
  metadata: EventMessageMetadata;
}

export interface MessageMetadataDeletedEvent {
  type: 'message_metadata_deleted';
  channel_id: string;
  event_ts: string;
  previous_metadata: EventMessageMetadata;
  app_id: string;
  bot_id?: string;
  user_id: string;
  team_id: string;
  message_ts: string;
  deleted_ts: string;
}
