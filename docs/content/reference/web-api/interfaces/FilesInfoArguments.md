# Interface: FilesInfoArguments

## Extends

- `FileArgument`.`TokenOverridable`.`CursorPaginationEnabled`.`TraditionalPagingEnabled`

## Properties

### count?

```ts
optional count: number;
```

#### Description

Number of items to return per page. Defaults to `20`

#### Inherited from

`TraditionalPagingEnabled.count`

#### Defined in

[packages/web-api/src/types/request/common.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L33)

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

[packages/web-api/src/types/request/common.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L16)

***

### file

```ts
file: string;
```

#### Description

Encoded file ID.

#### Inherited from

`FileArgument.file`

#### Defined in

[packages/web-api/src/types/request/files.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L13)

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

[packages/web-api/src/types/request/common.ts:9](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L9)

***

### page?

```ts
optional page: number;
```

#### Description

Page number of results to return. Defaults to `1`.

#### Inherited from

`TraditionalPagingEnabled.page`

#### Defined in

[packages/web-api/src/types/request/common.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L35)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)
