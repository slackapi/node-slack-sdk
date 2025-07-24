[@slack/web-api](../index.md) / UsersConversationsArguments

# Interface: UsersConversationsArguments

Defined in: [src/types/request/users.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L11)

## Extends

- `TokenOverridable`.`CursorPaginationEnabled`.`OptionalTeamAssignable`

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

### exclude\_archived?

```ts
optional exclude_archived: boolean;
```

Defined in: [src/types/request/users.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L13)

#### Description

Set to `true` to exclude archived channels from the list. Default is `false`.

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

### team\_id?

```ts
optional team_id: string;
```

Defined in: [src/types/request/common.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L70)

#### Description

If using an org token, `team_id` is required.

#### Inherited from

```ts
OptionalTeamAssignable.team_id
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

### types?

```ts
optional types: string;
```

Defined in: [src/types/request/users.ts:18](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L18)

#### Description

Mix and match channel types by providing a comma-separated list of any combination of
`public_channel`, `private_channel`, `mpim` and `im`. Defaults to `public_channel`.

***

### user?

```ts
optional user: string;
```

Defined in: [src/types/request/users.ts:23](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L23)

#### Description

Browse conversations by a specific user ID's membership.
Non-public channels are restricted to those where the calling user shares membership.
