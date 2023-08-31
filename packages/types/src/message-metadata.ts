export interface MessageMetadata {
  event_type: string;
  event_payload: {
    [key: string]: string | number | boolean | MessageMetadataEventPayloadObject | MessageMetadataEventPayloadObject[];
  }
}

export interface MessageMetadataEventPayloadObject {
  [key: string]: string | number | boolean
}
