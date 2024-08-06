# Interface: SearchAllArguments

## Extends

- `TokenOverridable`.`TraditionalPagingEnabled`.`Searchable`

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

### highlight?

```ts
optional highlight: boolean;
```

#### Description

Set to `true` to enable query highlight markers. Defaults to `false`.

#### See

[`search.messages` Usage info](https://api.slack.com/methods/search.messages#markdown) for details.

#### Inherited from

`Searchable.highlight`

#### Defined in

[packages/web-api/src/types/request/search.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/search.ts#L10)

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

### query

```ts
query: string;
```

#### Description

Search query.

#### Inherited from

`Searchable.query`

#### Defined in

[packages/web-api/src/types/request/search.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/search.ts#L5)

***

### sort?

```ts
optional sort: "score" | "timestamp";
```

#### Description

Return matches sorted by either `score` or `timestamp`. Defaults to `score`.

#### Inherited from

`Searchable.sort`

#### Defined in

[packages/web-api/src/types/request/search.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/search.ts#L12)

***

### sort\_dir?

```ts
optional sort_dir: "asc" | "desc";
```

#### Description

Change sort direction to ascending (`asc`) or descending (`desc`). Defaults to `desc`.

#### Inherited from

`Searchable.sort_dir`

#### Defined in

[packages/web-api/src/types/request/common.ts:117](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L117)

***

### team\_id?

```ts
optional team_id: string;
```

#### Description

If using an org token, `team_id` is required.

#### Inherited from

`Searchable.team_id`

#### Defined in

[packages/web-api/src/types/request/common.ts:65](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L65)

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
