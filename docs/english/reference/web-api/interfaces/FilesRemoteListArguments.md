[@slack/web-api](../index.md) / FilesRemoteListArguments

# Interface: FilesRemoteListArguments

Defined in: [src/types/request/files.ts:221](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L221)

## Extends

- `TokenOverridable`.`CursorPaginationEnabled`

## Properties

### channel?

```ts
optional channel: string;
```

Defined in: [src/types/request/files.ts:223](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L223)

#### Description

Filter files appearing in a specific channel, indicated by its ID.

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

### ts\_from?

```ts
optional ts_from: string;
```

Defined in: [src/types/request/files.ts:225](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L225)

#### Description

Filter files created after this timestamp (inclusive).

***

### ts\_to?

```ts
optional ts_to: string;
```

Defined in: [src/types/request/files.ts:227](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L227)

#### Description

Filter files created before this timestamp (inclusive).
