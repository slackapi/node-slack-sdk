[@slack/web-api](../index.md) / FilesInfoArguments

# Interface: FilesInfoArguments

Defined in: [src/types/request/files.ts:98](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L98)

## Extends

- `FileArgument`.`TokenOverridable`.`CursorPaginationEnabled`.`TraditionalPagingEnabled`

## Properties

### count?

```ts
optional count: number;
```

Defined in: [src/types/request/common.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L33)

#### Description

Number of items to return per page. Defaults to `20`

#### Inherited from

```ts
TraditionalPagingEnabled.count
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

### file

```ts
file: string;
```

Defined in: [src/types/request/files.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L14)

#### Description

Encoded file ID.

#### Inherited from

```ts
FileArgument.file
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

### page?

```ts
optional page: number;
```

Defined in: [src/types/request/common.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L35)

#### Description

Page number of results to return. Defaults to `1`.

#### Inherited from

```ts
TraditionalPagingEnabled.page
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
