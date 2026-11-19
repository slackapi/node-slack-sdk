[@slack/web-api](../index.md) / SearchFilesArguments

# Interface: SearchFilesArguments

Defined in: [packages/web-api/src/types/request/search.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/search.ts#L28)

## Extends

- `TokenOverridable`
- `TraditionalPagingEnabled`
- `Searchable`

## Properties

### count?

```ts
count?: number;
```

Defined in: [packages/web-api/src/types/request/common.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L33)

#### Description

Number of items to return per page. Defaults to `20`

#### Inherited from

`TraditionalPagingEnabled.count`

***

### highlight?

```ts
highlight?: boolean;
```

Defined in: [packages/web-api/src/types/request/search.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/search.ts#L10)

#### Description

Set to `true` to enable query highlight markers. Defaults to `false`.

#### See

[\`search.messages\` Usage info](https://docs.slack.dev/reference/methods/search.messages) for details.

#### Inherited from

`Searchable.highlight`

***

### page?

```ts
page?: number;
```

Defined in: [packages/web-api/src/types/request/common.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L35)

#### Description

Page number of results to return. Defaults to `1`.

#### Inherited from

`TraditionalPagingEnabled.page`

***

### query

```ts
query: string;
```

Defined in: [packages/web-api/src/types/request/search.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/search.ts#L5)

#### Description

Search query.

#### Inherited from

`Searchable.query`

***

### sort?

```ts
sort?: "score" | "timestamp";
```

Defined in: [packages/web-api/src/types/request/search.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/search.ts#L12)

#### Description

Return matches sorted by either `score` or `timestamp`. Defaults to `score`.

#### Inherited from

`Searchable.sort`

***

### sort\_dir?

```ts
sort_dir?: "asc" | "desc";
```

Defined in: [packages/web-api/src/types/request/common.ts:130](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L130)

#### Description

Change sort direction to ascending (`asc`) or descending (`desc`). Defaults to `desc`.

#### Inherited from

`Searchable.sort_dir`

***

### team\_id?

```ts
team_id?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L70)

#### Description

If using an org token, `team_id` is required.

#### Inherited from

`Searchable.team_id`

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
