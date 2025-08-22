/**
 * @description Application-specific data to attach to Slack message.
 * @see {@link https://docs.slack.dev/messaging/message-metadata Using Metadata}
 * @see {@link https://docs.slack.dev/messaging/message-metadata Metadata Payload Structure}
 */
export interface EventMetadata {
  /**
   * @description A human readable alphanumeric string representing your application's metadata event.
   * The value of this field may appear in the UI to developers.
   */
  event_type: string;
  /**
   * @description A free-form object containing whatever data your application wishes to attach to messages.
   */
  event_payload: {
    [key: string]: string | number | boolean | MessageMetadataEventPayloadObject | MessageMetadataEventPayloadObject[];
  };
}

export interface MessageMetadataEventPayloadObject {
  [key: string]: string | number | boolean;
}

/**
 * @description An array of entities.
 */
export interface EntitiesMetadata {
  entities: EntityMetadata[];
}

/**
 * @description Metadata that represents an entity.
 */
export interface EntityMetadata {
  /**
   * @description Entity type. Accepted values: ["slack#/entities/task", "slack#/entities/file"]
   */
  entity_type: string;
  /**
   * @description Schema for the given entity type.
   */
  entity_payload: object;
}
