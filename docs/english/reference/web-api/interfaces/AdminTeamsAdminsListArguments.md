[@slack/web-api](../index.md) / AdminTeamsAdminsListArguments

# Interface: AdminTeamsAdminsListArguments

Defined in: [src/types/request/admin/teams.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/teams.ts#L8)

## Extends

- `TeamID`.`TokenOverridable`.`CursorPaginationEnabled`

## Properties

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

### team\_id

```ts
team_id: string;
```

Defined in: [src/types/request/common.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L61)

#### Description

The encoded team ID.

#### Inherited from

```ts
TeamID.team_id
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
