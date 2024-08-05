# Interface: AdminConversationsLookupArguments

## Extends

- `TeamIDs`.`TokenOverridable`.`CursorPaginationEnabled`

## Properties

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

### last\_message\_activity\_before

```ts
last_message_activity_before: number;
```

#### Description

UNIX timestamp to filter by public channels where the most recent message
was sent before this parameter.

#### Defined in

[packages/web-api/src/types/request/admin/conversations.ts:126](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L126)

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

### max\_member\_count?

```ts
optional max_member_count: number;
```

#### Description

Filter by public channels with member count equal to or less than the specified number.

#### Defined in

[packages/web-api/src/types/request/admin/conversations.ts:128](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L128)

***

### team\_ids

```ts
team_ids: [string, ...string[]];
```

#### Description

A list of team IDs to filter by (must include at least one ID).

#### Inherited from

`TeamIDs.team_ids`

#### Defined in

[packages/web-api/src/types/request/admin/conversations.ts:25](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L25)

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
