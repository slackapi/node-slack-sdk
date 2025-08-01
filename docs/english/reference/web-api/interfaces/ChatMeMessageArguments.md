[@slack/web-api](../index.md) / ChatMeMessageArguments

# Interface: ChatMeMessageArguments

Defined in: [src/types/request/chat.ts:161](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L161)

## Extends

- `ChannelAndText`.`TokenOverridable`

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
ChannelAndText.channel
```

***

### text

```ts
text: string;
```

Defined in: [src/types/request/chat.ts:54](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L54)

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

Defined in: [src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```
