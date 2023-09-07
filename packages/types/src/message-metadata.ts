/**
 * @description Application-specific data to attach to Slack message.
 * @see {@link https://api.slack.com/metadata/using Using Metadata}
 * @see {@link https://api.slack.com/reference/metadata#payload_structure Metadata Payload Structure}
 */
export interface MessageMetadata {
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
  }
}

export interface MessageMetadataEventPayloadObject {
  [key: string]: string | number | boolean
}
