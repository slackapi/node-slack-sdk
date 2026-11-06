[@slack/web-api](../index.md) / ConversationsHistoryArguments

# Interface: ConversationsHistoryArguments

Defined in: [packages/web-api/src/types/request/conversations.ts:93](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L93)

## Extends

- `Channel`
- `IncludeAllMetadata`
- `TokenOverridable`
- `CursorPaginationEnabled`
- `TimelinePaginationEnabled`

## Properties

### channel

```ts
channel: string;
```

Defined in: [packages/web-api/src/types/request/conversations.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L15)

#### Description

ID of conversation.

#### Inherited from

`Channel.channel`

***

### cursor?

```ts
cursor?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L16)

#### Description

Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute
returned by a previous request's `response_metadata`.
Default value fetches the first "page" of the collection.

#### See

[pagination](https://docs.slack.dev/apis/web-api/pagination) for more detail.

#### Inherited from

`CursorPaginationEnabled.cursor`

***

### include\_all\_metadata?

```ts
include_all_metadata?: boolean;
```

Defined in: [packages/web-api/src/types/request/conversations.ts:24](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L24)

#### Description

Return all metadata associated with messages. Defaults to `false`.

#### Inherited from

`IncludeAllMetadata.include_all_metadata`

***

### inclusive?

```ts
inclusive?: boolean;
```

Defined in: [packages/web-api/src/types/request/common.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L28)

#### Description

Include messages with `oldest` or `latest` timestamps in results.
Ignored unless either timestamp is specified. Defaults to `false`.

#### Inherited from

`TimelinePaginationEnabled.inclusive`

***

### latest?

```ts
latest?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:23](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L23)

#### Description

Only messages before this Unix timestamp will be included in results.

#### Inherited from

`TimelinePaginationEnabled.latest`

***

### limit?

```ts
limit?: number;
```

Defined in: [packages/web-api/src/types/request/common.ts:9](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L9)

#### Description

The maximum number of items to return. Fewer than the requested number of items may be returned,
even if the end of the list hasn't been reached. Must be an integer with a max value of `999`. Default is `100`.

#### Inherited from

`CursorPaginationEnabled.limit`

***

### oldest?

```ts
oldest?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L21)

#### Description

Only messages after this Unix timestamp will be included in results.

#### Inherited from

`TimelinePaginationEnabled.oldest`

***

### token?

```ts
token?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

`TokenOverridable.token`
