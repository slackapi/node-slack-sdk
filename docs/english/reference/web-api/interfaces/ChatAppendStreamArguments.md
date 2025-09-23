[@slack/web-api](../index.md) / ChatAppendStreamArguments

# Interface: ChatAppendStreamArguments

Defined in: [src/types/request/chat.ts:157](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L157)

## Extends

- `TokenOverridable`.`ChannelAndTS`.`MarkdownText`

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
ChannelAndTS.channel
```

***

### markdown\_text

```ts
markdown_text: string;
```

Defined in: [src/types/request/chat.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L61)

#### Description

Accepts message text formatted in markdown. This argument should not be used in conjunction with `blocks` or `text`. Limit this field to 12,000 characters.

#### Example

```ts
**This is bold text**
```

#### Inherited from

```ts
MarkdownText.markdown_text
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
