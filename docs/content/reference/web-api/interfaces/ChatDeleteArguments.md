[@slack/web-api](../index.md) / ChatDeleteArguments

# Interface: ChatDeleteArguments

Defined in: [src/types/request/chat.ts:149](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L149)

## Extends

- `ChannelAndTS`.`AsUser`.`TokenOverridable`

## Properties

### as\_user?

```ts
optional as_user: boolean;
```

Defined in: [src/types/request/chat.ts:36](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L36)

#### Description

Pass `true` to act as the authed user with [\`chat:write:user\` scope](https://docs.slack.dev/reference/scopes/chat.write).
Bot users in this context are considered authed users. If unused or `false`, the message will be acted upon with
[\`chat:write:bot\` scope](https://docs.slack.dev/reference/scopes/chat.write).

#### Inherited from

```ts
AsUser.as_user
```

***

### channel

```ts
channel: string;
```

Defined in: [src/types/request/chat.ts:20](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L20)

#### Description

Channel ID for the message.

#### Inherited from

```ts
ChannelAndTS.channel
```

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

### ts

```ts
ts: string;
```

Defined in: [src/types/request/chat.ts:24](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L24)

#### Description

Timestamp of the message.

#### Inherited from

```ts
ChannelAndTS.ts
```
