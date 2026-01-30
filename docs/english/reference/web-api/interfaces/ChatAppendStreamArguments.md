[@slack/web-api](../index.md) / ChatAppendStreamArguments

# Interface: ChatAppendStreamArguments

Defined in: [packages/web-api/src/types/request/chat.ts:171](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L171)

## Extends

- `TokenOverridable`.`ChannelAndTS`.`MarkdownText`

## Properties

### channel

```ts
channel: string;
```

Defined in: [packages/web-api/src/types/request/chat.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L21)

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

Defined in: [packages/web-api/src/types/request/chat.ts:62](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L62)

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

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

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

Defined in: [packages/web-api/src/types/request/chat.ts:25](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L25)

#### Description

Timestamp of the message.

#### Inherited from

```ts
ChannelAndTS.ts
```
