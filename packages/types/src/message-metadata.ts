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

export interface MessageMetadataEventPayloadObject {
  [key: string]: string | number | boolean;
}

/**
 * @description Metadata that represents an entity.
 */
export interface EntityMetadata {
  /**
   * @description Entity type.
   */
  entity_type: string;
  /**
   * @description Schema for the given entity type.
   */
  entity_payload: object;
  /**
   * @description Reference (and optional type) used to identify an entity within the developer's system.
   */
  external_ref: {
    id: string;
    type?: string;
  };
  /**
   * @description URL used to identify an entity within the developer's system.
   */
  url: string;
}
