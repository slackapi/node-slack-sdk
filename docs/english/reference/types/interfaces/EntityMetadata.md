[@slack/types](../index.md) / EntityMetadata

# Interface: EntityMetadata

Defined in: [message-metadata.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L37)

## Description

Metadata that represents a work object entity.

## Properties

### app\_unfurl\_url?

```ts
optional app_unfurl_url: string;
```

Defined in: [message-metadata.ts:68](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L68)

#### Description

The exact URL posted in the source message. Required in metadata passed to `chat.unfurl`.

***

### entity\_payload

```ts
entity_payload: object;
```

Defined in: [message-metadata.ts:45](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L45)

#### actions?

```ts
optional actions: object;
```

##### actions.overflow\_actions?

```ts
optional overflow_actions: EntityActionButton[];
```

##### actions.primary\_actions?

```ts
optional primary_actions: EntityActionButton[];
```

#### attributes

```ts
attributes: EntityAttributes;
```

#### custom\_fields?

```ts
optional custom_fields: EntityCustomField[];
```

#### display\_order?

```ts
optional display_order: string[];
```

#### fields?

```ts
optional fields: 
  | ContentItemEntityFields
  | FileEntityFields
  | IncidentEntityFields
  | TaskEntityFields;
```

#### slack\_file?

```ts
optional slack_file: FileEntitySlackFile;
```

#### Description

Schema for the given entity type.

***

### entity\_type

```ts
entity_type: string;
```

Defined in: [message-metadata.ts:41](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L41)

#### Description

Entity type.

***

### external\_ref

```ts
external_ref: ExternalRef;
```

Defined in: [message-metadata.ts:59](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L59)

#### Description

Reference (and optional type) used to identify an entity within the developer's system.

***

### url

```ts
url: string;
```

Defined in: [message-metadata.ts:63](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L63)

#### Description

URL used to identify an entity within the developer's system.
