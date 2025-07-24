[@slack/web-api](../index.md) / SearchMessagesArguments

# Interface: SearchMessagesArguments

Defined in: [src/types/request/search.ts:20](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/search.ts#L20)

## Extends

- `TokenOverridable`.`TraditionalPagingEnabled`.`Searchable`

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

### highlight?

```ts
optional highlight: boolean;
```

Defined in: [src/types/request/search.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/search.ts#L10)

#### Description

Set to `true` to enable query highlight markers. Defaults to `false`.

#### See

[\`search.messages\` Usage info](https://docs.slack.dev/reference/methods/search.messages) for details.

#### Inherited from

```ts
Searchable.highlight
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

### query

```ts
query: string;
```

Defined in: [src/types/request/search.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/search.ts#L5)

#### Description

Search query.

#### Inherited from

```ts
Searchable.query
```

***

### sort?

```ts
optional sort: "score" | "timestamp";
```

Defined in: [src/types/request/search.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/search.ts#L12)

#### Description

Return matches sorted by either `score` or `timestamp`. Defaults to `score`.

#### Inherited from

```ts
Searchable.sort
```

***

### sort\_dir?

```ts
optional sort_dir: "asc" | "desc";
```

Defined in: [src/types/request/common.ts:130](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L130)

#### Description

Change sort direction to ascending (`asc`) or descending (`desc`). Defaults to `desc`.

#### Inherited from

```ts
Searchable.sort_dir
```

***

### team\_id?

```ts
optional team_id: string;
```

Defined in: [src/types/request/common.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L70)

#### Description

If using an org token, `team_id` is required.

#### Inherited from

```ts
Searchable.team_id
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
