# Interface: ConversationsRepliesArguments

## Extends

- `Message`.`IncludeAllMetadata`.`TokenOverridable`.`CursorPaginationEnabled`.`TimelinePaginationEnabled`

## Properties

### channel

```ts
channel: string;
```

#### Description

ID of conversation.

#### Inherited from

`Message.channel`

#### Defined in

[packages/web-api/src/types/request/conversations.ts:14](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/conversations.ts#L14)

***

### cursor?

```ts
optional cursor: string;
```

#### Description

Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute
returned by a previous request's `response_metadata`.
Default value fetches the first "page" of the collection.

#### See

[pagination](https://api.slack.com/docs/pagination) for more detail.

#### Inherited from

`CursorPaginationEnabled.cursor`

#### Defined in

[packages/web-api/src/types/request/common.ts:16](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L16)

***

### include\_all\_metadata?

```ts
optional include_all_metadata: boolean;
```

#### Description

Return all metadata associated with messages. Defaults to `false`.

#### Inherited from

`IncludeAllMetadata.include_all_metadata`

#### Defined in

[packages/web-api/src/types/request/conversations.ts:27](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/conversations.ts#L27)

***

### inclusive?

```ts
optional inclusive: boolean;
```

#### Description

Include messages with `oldest` or `latest` timestamps in results.
Ignored unless either timestamp is specified. Defaults to `false`.

#### Inherited from

`TimelinePaginationEnabled.inclusive`

#### Defined in

[packages/web-api/src/types/request/common.ts:28](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L28)

***

### latest?

```ts
optional latest: string;
```

#### Description

Only messages before this Unix timestamp will be included in results.

#### Inherited from

`TimelinePaginationEnabled.latest`

#### Defined in

[packages/web-api/src/types/request/common.ts:23](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L23)

***

### limit?

```ts
optional limit: number;
```

#### Description

The maximum number of items to return. Fewer than the requested number of items may be returned,
even if the end of the list hasn't been reached. Must be an integer with a max value of `999`. Default is `100`.

#### Inherited from

`CursorPaginationEnabled.limit`

#### Defined in

[packages/web-api/src/types/request/common.ts:9](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L9)

***

### oldest?

```ts
optional oldest: string;
```

#### Description

Only messages after this Unix timestamp will be included in results.

#### Inherited from

`TimelinePaginationEnabled.oldest`

#### Defined in

[packages/web-api/src/types/request/common.ts:21](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L21)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L43)

***

### ts

```ts
ts: string;
```

#### Description

Unique identifier of message.

#### Inherited from

`Message.ts`

#### Defined in

[packages/web-api/src/types/request/conversations.ts:39](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/conversations.ts#L39)
