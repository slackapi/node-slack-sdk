# Interface: ConversationsMembersArguments

## Extends

- `Channel`.`TokenOverridable`.`CursorPaginationEnabled`

## Properties

### channel

```ts
channel: string;
```

#### Description

ID of conversation.

#### Inherited from

`Channel.channel`

#### Defined in

[packages/web-api/src/types/request/conversations.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L14)

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
