import type { Option, PlainTextElement, SlackFile } from './block-kit/composition-objects';

/**
 * @description Application-specific event or entity data to attach to Slack message.
 * Provide 'event_type' and 'event_payload' to set event metadata, or use 'entities' to set work object entity metadata.
 * @see {@link https://docs.slack.dev/messaging/message-metadata Using Metadata}
 * @see {@link https://docs.slack.dev/messaging/message-metadata Metadata Payload Structure}
 */
export interface MessageMetadata {
  /**
   * @description A human readable alphanumeric string representing your application's metadata event.
   * The value of this field may appear in the UI to developers.
   */
  event_type?: string;
  /**
   * @description A free-form object containing whatever data your application wishes to attach to messages.
   */
  event_payload?: {
    [key: string]: string | number | boolean | MessageMetadataEventPayloadObject | MessageMetadataEventPayloadObject[];
  };

  /**
   * @description An array of work object entities.
   */
  entities?: EntityMetadata[];
}

// ------------------------------
// Event metadata
// ------------------------------

export interface EventMessageMetadata extends Omit<MessageMetadata, 'entities'> {}

export interface MessageMetadataEventPayloadObject {
  [key: string]: string | number | boolean;
}

export interface MessageMetadataEventPayloadAttributes {
  [key: string]: string | number | boolean | MessageMetadataEventPayloadAttributes;
}

// ------------------------------
// Work object metadata
// ------------------------------

/**
 * @description Metadata that represents a work object entity.
 */
export interface EntityMetadata {
  /**
   * @description Entity type.
   */
  entity_type: EntityType | string;
  /**
   * @description Schema for the given entity type.
   */
  entity_payload: {
    attributes: EntityAttributes;
    fields?: ContentItemEntityFields | FileEntityFields | IncidentEntityFields | TaskEntityFields;
    custom_fields?: EntityCustomField[];
    slack_file?: FileEntitySlackFile;
    display_order?: string[];
    actions?: {
      primary_actions?: EntityActionButton[];
      overflow_actions?: EntityActionButton[];
    };
  };
  /**
   * @description Reference (and optional type) used to identify an entity within the developer's system.
   */
  external_ref: ExternalRef;
  /**
   * @description URL used to identify an entity within the developer's system.
   */
  url: string;

  /**
   * @description The exact URL posted in the source message. Required in metadata passed to `chat.unfurl`.
   */
  app_unfurl_url?: string;
}

export interface ExternalRef {
  id: string;
  type?: string;
}

export enum EntityType {
  Task = 'slack#/entities/task',
  File = 'slack#/entities/file',
  Item = 'slack#/entities/item',
  Incident = 'slack#/entities/incident',
  ContentItem = 'slack#/entities/content_item',
}

export interface FileEntitySlackFile {
  id: string;
  type?: string;
}

export interface EntityAttributes {
  title: {
    text: string;
    edit?: EntityEditSupport;
  };
  display_type?: string;
  display_id?: string;
  product_icon?: EntityIconField;
  product_name?: string;
  locale?: string;
  full_size_preview?: EntityFullSizePreview;
  metadata_last_modified?: number;
}

export interface EntityIconField {
  alt_text: string;
  url?: string;
  slack_file?: {
    id?: string;
    url?: string;
  };
}

export interface EntityEditSupport {
  enabled: boolean;
  placeholder?: PlainTextElement;
  hint?: PlainTextElement;
  optional?: boolean;
  select?: {
    current_value?: string;
    current_values?: string[];
    static_options?: Option[];
    fetch_options_dynamically?: boolean;
    min_query_length?: number;
  };
  number?: {
    is_decimal_allowed?: boolean;
    min_value?: number;
    max_value?: number;
  };
  text?: {
    min_length?: number;
    max_length?: number;
  };
}

export interface EntityFullSizePreview {
  is_supported: boolean;
  preview_url?: string;
  mime_type?: string;
  error?: {
    code: string;
    message?: string;
  };
}

export interface FileEntityFields {
  preview?: EntityImageField;
  created_by?: EntityTypedField;
  date_created?: EntityTimestampField;
  date_updated?: EntityTimestampField;
  last_modified_by?: EntityTypedField;
  file_size?: EntityStringField;
  mime_type?: EntityStringField;
  full_size_preview?: EntityFullSizePreview;
}

export interface TaskEntityFields {
  description?: EntityStringField;
  created_by?: EntityTypedField;
  date_created?: EntityTimestampField;
  date_updated?: EntityTimestampField;
  assignee?: EntityTypedField;
  status?: EntityStringField;
  due_date?: EntityTypedField;
  priority?: EntityStringField;
}

export interface IncidentEntityFields {
  status?: EntityStringField;
  priority?: EntityStringField;
  urgency?: EntityStringField;
  created_by?: EntityTypedField;
  assigned_to?: EntityTypedField;
  date_created?: EntityTimestampField;
  date_updated?: EntityTimestampField;
  description?: EntityStringField;
  service?: EntityStringField;
}

export interface ContentItemEntityFields {
  preview?: EntityImageField;
  description?: EntityStringField;
  created_by?: EntityTypedField;
  date_created?: EntityTimestampField;
  date_updated?: EntityTimestampField;
  last_modified_by?: EntityTypedField;
}

export interface EntityArrayItemField extends Omit<EntityTypedField, 'type'> {
  type?: string;
}

export interface EntityTypedField {
  type: string;
  label?: string;
  value?: string | number;
  link?: string;
  icon?: EntityIconField;
  long?: boolean;
  format?: string;
  image_url?: string;
  slack_file?: SlackFile;
  alt_text?: string;
  edit?: EntityEditSupport;
  tag_color?: string;
  user?: EntityUserIDField | EntityUserField;
  entity_ref?: EntityRefField;
}

export interface EntityStringField {
  value: string;
  label?: string;
  format?: string;
  link?: string;
  icon?: EntityIconField;
  long?: boolean;
  type?: string;
  tag_color?: string;
  edit?: EntityEditSupport;
}

export interface EntityUserIDField {
  user_id: string;
}

export interface EntityUserField {
  text: string;
  url?: string;
  email?: string;
  icon?: EntityIconField;
}

export interface EntityRefField {
  entity_url: string;
  external_ref: ExternalRef;
  title: string;
  display_type?: string;
  icon?: EntityIconField;
}

export interface EntityTimestampField {
  value: number;
  label?: string;
  link?: string;
  icon?: EntityIconField;
  type?: string;
  edit?: EntityEditSupport;
}

export interface EntityImageField {
  alt_text: string;
  label?: string;
  image_url?: string;
  slack_file?: SlackFile;
  title?: string;
  type?: string;
}

export interface EntityCustomField {
  label: string;
  key: string;
  type: CustomFieldType | string;
  value?: string | number | EntityArrayItemField[];
  link?: string;
  icon?: EntityIconField;
  long?: boolean;
  format?: string;
  image_url?: string;
  slack_file?: SlackFile;
  alt_text?: string;
  tag_color?: string;
  edit?: EntityEditSupport;
  item_type?: string;
  user?: EntityUserIDField | EntityUserField;
  entity_ref?: EntityRefField;
}

export enum CustomFieldType {
  Integer = 'integer',
  String = 'string',
  Array = 'array',
  Date = 'slack#/types/date',
  Timestamp = 'slack#/types/timestamp',
  Image = 'slack#/types/image',
  ChannelId = 'slack#/types/channel_id',
  User = 'slack#/types/user',
  EntityRef = 'slack#/types/entity_ref',
}

export interface EntityActionButton {
  text: string;
  action_id: string;
  value?: string;
  style?: string;
  url?: string;
  accessibility_label?: string;
  processing_state?: {
    enabled: boolean;
    interstitial_text?: string;
  };
}
