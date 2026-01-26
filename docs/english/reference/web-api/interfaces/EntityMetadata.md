[@slack/web-api](../index.md) / EntityMetadata

# Interface: EntityMetadata

Defined in: node\_modules/@slack/types/dist/message-metadata.d.ts:26

## Description

Metadata that represents a work object entity.

## Properties

### app\_unfurl\_url?

```ts
optional app_unfurl_url: string;
```

Defined in: node\_modules/@slack/types/dist/message-metadata.d.ts:56

#### Description

The exact URL posted in the source message. Required in metadata passed to `chat.unfurl`.

***

### entity\_payload

```ts
entity_payload: object;
```

Defined in: node\_modules/@slack/types/dist/message-metadata.d.ts:34

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

Defined in: node\_modules/@slack/types/dist/message-metadata.d.ts:30

#### Description

Entity type.

***

### external\_ref

```ts
external_ref: ExternalRef;
```

Defined in: node\_modules/@slack/types/dist/message-metadata.d.ts:48

#### Description

Reference (and optional type) used to identify an entity within the developer's system.

***

### url

```ts
url: string;
```

Defined in: node\_modules/@slack/types/dist/message-metadata.d.ts:52

#### Description

URL used to identify an entity within the developer's system.
