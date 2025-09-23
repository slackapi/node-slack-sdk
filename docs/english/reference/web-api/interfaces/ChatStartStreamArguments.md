[@slack/web-api](../index.md) / ChatStartStreamArguments

# Interface: ChatStartStreamArguments

Defined in: [src/types/request/chat.ts:221](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L221)

## Extends

- `TokenOverridable`.`Channel`.`Partial`\<`ThreadTS`\>.`Partial`\<`MarkdownText`\>.`Unfurls`

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
Channel.channel
```

***

### markdown\_text?

```ts
optional markdown_text: string;
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
Partial.markdown_text
```

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: [src/types/request/chat.ts:90](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L90)

#### Description

Provide another message's `ts` value to post this message in a thread. Avoid using a reply's `ts`
value; use its parent's value instead.

#### Inherited from

```ts
Partial.thread_ts
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

### unfurl\_links?

```ts
optional unfurl_links: boolean;
```

Defined in: [src/types/request/chat.ts:152](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L152)

#### Description

Pass `true` to enable unfurling of primarily text-based content.

#### Inherited from

```ts
Unfurls.unfurl_links
```

***

### unfurl\_media?

```ts
optional unfurl_media: boolean;
```

Defined in: [src/types/request/chat.ts:154](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L154)

#### Description

Pass `false` to disable unfurling of media content.

#### Inherited from

```ts
Unfurls.unfurl_media
```
