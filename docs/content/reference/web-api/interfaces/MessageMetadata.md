[@slack/web-api](../index.md) / MessageMetadata

# Interface: MessageMetadata

Defined in: node\_modules/@slack/types/dist/message-metadata.d.ts:6

## Description

Application-specific data to attach to Slack message.

## See

 - [Using Metadata](https://api.slack.com/metadata/using)
 - [Metadata Payload Structure](https://api.slack.com/reference/metadata#payload_structure)

## Properties

### event\_payload

```ts
event_payload: object;
```

Defined in: node\_modules/@slack/types/dist/message-metadata.d.ts:15

#### Index Signature

```ts
[key: string]: 
  | string
  | number
  | boolean
  | MessageMetadataEventPayloadObject
  | MessageMetadataEventPayloadObject[]
```

#### Description

A free-form object containing whatever data your application wishes to attach to messages.

***

### event\_type

```ts
event_type: string;
```

Defined in: node\_modules/@slack/types/dist/message-metadata.d.ts:11

#### Description

A human readable alphanumeric string representing your application's metadata event.
The value of this field may appear in the UI to developers.
