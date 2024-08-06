# Interface: MessageMetadata

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

#### Index Signature

 \[`key`: `string`\]: 
  \| `string`
  \| `number`
  \| `boolean`
  \| [`MessageMetadataEventPayloadObject`](Interface.MessageMetadataEventPayloadObject.md)
  \| [`MessageMetadataEventPayloadObject`](Interface.MessageMetadataEventPayloadObject.md)[]

#### Description

A free-form object containing whatever data your application wishes to attach to messages.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/message-metadata.d.ts:15

***

### event\_type

```ts
event_type: string;
```

#### Description

A human readable alphanumeric string representing your application's metadata event.
The value of this field may appear in the UI to developers.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/message-metadata.d.ts:11
