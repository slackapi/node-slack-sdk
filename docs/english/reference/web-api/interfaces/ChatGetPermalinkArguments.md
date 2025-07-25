[@slack/web-api](../index.md) / ChatGetPermalinkArguments

# Interface: ChatGetPermalinkArguments

Defined in: [src/types/request/chat.ts:158](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L158)

## Extends

- `ChannelAndMessageTS`.`TokenOverridable`

## Properties

### channel

```ts
channel: string;
```

Defined in: [src/types/request/chat.ts:20](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L20)

#### Description

Channel ID for the message.

#### Inherited from

```ts
ChannelAndMessageTS.channel
```

***

### message\_ts

```ts
message_ts: string;
```

Defined in: [src/types/request/chat.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L28)

#### Description

Timestamp of the message.

#### Inherited from

```ts
ChannelAndMessageTS.message_ts
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
