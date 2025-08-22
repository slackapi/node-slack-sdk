[@slack/web-api](../index.md) / CanvasesAccessDeleteArguments

# Interface: CanvasesAccessDeleteArguments

Defined in: [src/types/request/canvas.ts:54](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/canvas.ts#L54)

## Extends

- `CanvasID`.`Partial`\<`ChannelIDs`\>.`TokenOverridable`.`Partial`\<`UserIDs`\>

## Properties

### canvas\_id

```ts
canvas_id: string;
```

Defined in: [src/types/request/canvas.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/canvas.ts#L6)

#### Description

Encoded ID of the canvas.

#### Inherited from

```ts
CanvasID.canvas_id
```

***

### channel\_ids?

```ts
optional channel_ids: [string, ...string[]];
```

Defined in: [src/types/request/common.ts:81](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L81)

#### Description

An array of channel IDs (must include at least one ID).

#### Inherited from

[`AdminConversationsBulkArchiveArguments`](AdminConversationsBulkArchiveArguments.md).[`channel_ids`](AdminConversationsBulkArchiveArguments.md#channel_ids)

***

### token?

```ts
optional token: string;
```

Defined in: [src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```

***

### user\_ids?

```ts
optional user_ids: [string, ...string[]];
```

Defined in: [src/types/request/common.ts:92](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L92)

#### Description

List of encoded user IDs.

#### Inherited from

[`AdminConversationsInviteArguments`](AdminConversationsInviteArguments.md).[`user_ids`](AdminConversationsInviteArguments.md#user_ids)
