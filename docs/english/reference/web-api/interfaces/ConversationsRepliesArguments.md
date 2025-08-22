[@slack/web-api](../index.md) / ConversationsRepliesArguments

# Interface: ConversationsRepliesArguments

Defined in: [src/types/request/conversations.ts:187](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L187)

## Extends

- `MessageSpecifier`.`IncludeAllMetadata`.`TokenOverridable`.`CursorPaginationEnabled`.`TimelinePaginationEnabled`

## Properties

### channel

```ts
channel: string;
```

Defined in: [src/types/request/conversations.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L15)

#### Description

ID of conversation.

#### Inherited from

```ts
MessageSpecifier.channel
```

***

### cursor?

```ts
optional cursor: string;
```

Defined in: [src/types/request/common.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L16)

#### Description

Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute
returned by a previous request's `response_metadata`.
Default value fetches the first "page" of the collection.

#### See

[pagination](https://docs.slack.dev/apis/web-api/pagination) for more detail.

#### Inherited from

```ts
CursorPaginationEnabled.cursor
```

***

### include\_all\_metadata?

```ts
optional include_all_metadata: boolean;
```

Defined in: [src/types/request/conversations.ts:24](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L24)

#### Description

Return all metadata associated with messages. Defaults to `false`.

#### Inherited from

```ts
IncludeAllMetadata.include_all_metadata
```

***

### inclusive?

```ts
optional inclusive: boolean;
```

Defined in: [src/types/request/common.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L28)

#### Description

Include messages with `oldest` or `latest` timestamps in results.
Ignored unless either timestamp is specified. Defaults to `false`.

#### Inherited from

```ts
TimelinePaginationEnabled.inclusive
```

***

### latest?

```ts
optional latest: string;
```

Defined in: [src/types/request/common.ts:23](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L23)

#### Description

Only messages before this Unix timestamp will be included in results.

#### Inherited from

```ts
TimelinePaginationEnabled.latest
```

***

### limit?

```ts
optional limit: number;
```

Defined in: [src/types/request/common.ts:9](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L9)

#### Description

The maximum number of items to return. Fewer than the requested number of items may be returned,
even if the end of the list hasn't been reached. Must be an integer with a max value of `999`. Default is `100`.

#### Inherited from

```ts
CursorPaginationEnabled.limit
```

***

### oldest?

```ts
optional oldest: string;
```

Defined in: [src/types/request/common.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L21)

#### Description

Only messages after this Unix timestamp will be included in results.

#### Inherited from

```ts
TimelinePaginationEnabled.oldest
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

Defined in: [src/types/request/conversations.ts:36](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L36)

#### Description

Unique identifier of message.

#### Inherited from

```ts
MessageSpecifier.ts
```
