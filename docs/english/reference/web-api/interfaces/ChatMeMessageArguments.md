[@slack/web-api](../index.md) / ChatMeMessageArguments

# Interface: ChatMeMessageArguments

Defined in: [packages/web-api/src/types/request/chat.ts:193](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L193)

## Extends

- `ChannelAndText`.`TokenOverridable`

## Properties

### channel

```ts
channel: string;
```

Defined in: [packages/web-api/src/types/request/chat.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L22)

#### Description

Channel ID for the message.

#### Inherited from

```ts
ChannelAndText.channel
```

***

### text

```ts
text: string;
```

Defined in: [packages/web-api/src/types/request/chat.ts:56](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L56)

#### Description

Text of the message. If used in conjunction with `blocks` or `attachments`, `text` will be used
as fallback text for notifications only.

#### Inherited from

```ts
ChannelAndText.text
```

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
