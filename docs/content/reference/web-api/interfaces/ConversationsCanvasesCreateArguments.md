# Interface: ConversationsCanvasesCreateArguments

## Extends

- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

#### Description

Channel ID of the channel to create a canvas in.

#### Defined in

[packages/web-api/src/types/request/canvas.ts:88](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/canvas.ts#L88)

***

### document\_content?

```ts
optional document_content: DocumentContent;
```

#### Description

Structure describing the type and contents of the Canvas being created.

#### Defined in

[packages/web-api/src/types/request/canvas.ts:90](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/canvas.ts#L90)

***

### token?

```ts
optional token: string;
```

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

`TokenOverridable.token`

#### Defined in

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)
