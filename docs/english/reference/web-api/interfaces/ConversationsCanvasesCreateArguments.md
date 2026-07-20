[@slack/web-api](../index.md) / ConversationsCanvasesCreateArguments

# Interface: ConversationsCanvasesCreateArguments

Defined in: [packages/web-api/src/types/request/canvas.ts:93](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/canvas.ts#L93)

## Extends

- `ChannelID`.`TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:85](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L85)

#### Description

Encoded channel ID.

#### Inherited from

```ts
ChannelID.channel_id
```

***

### document\_content?

```ts
optional document_content: DocumentContent;
```

Defined in: [packages/web-api/src/types/request/canvas.ts:95](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/canvas.ts#L95)

#### Description

Structure describing the type and contents of the Canvas being created.

***

### title?

```ts
optional title: string;
```

Defined in: [packages/web-api/src/types/request/canvas.ts:97](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/canvas.ts#L97)

#### Description

Title of the newly created canvas.

***

### token?

```ts
optional token: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```
