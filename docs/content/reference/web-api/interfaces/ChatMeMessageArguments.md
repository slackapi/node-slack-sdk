# Interface: ChatMeMessageArguments

## Extends

- `ChannelAndText`.`TokenOverridable`

## Properties

### channel

```ts
channel: string;
```

#### Description

Channel ID for the message.

#### Inherited from

`ChannelAndText.channel`

#### Defined in

[packages/web-api/src/types/request/chat.ts:19](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/chat.ts#L19)

***

### text

```ts
text: string;
```

#### Description

Text of the message. If used in conjunction with `blocks` or `attachments`, `text` will be used
as fallback text for notifications only.

#### Inherited from

`ChannelAndText.text`

#### Defined in

[packages/web-api/src/types/request/chat.ts:53](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/chat.ts#L53)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L43)
