# Interface: AdminAuthPolicyGetEntitiesArguments

## Extends

- `Partial`\<`EntityType`\>.`PolicyName`.`TokenOverridable`.`CursorPaginationEnabled`

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

### entity\_type?

```ts
optional entity_type: "USER";
```

#### Description

The type of entity interacting with the policy.

#### Inherited from

`Partial.entity_type`

#### Defined in

[packages/web-api/src/types/request/admin/auth.ts:9](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/auth.ts#L9)

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

### policy\_name

```ts
policy_name: "email_password";
```

#### Description

The name of the policy.

#### Inherited from

`PolicyName.policy_name`

#### Defined in

[packages/web-api/src/types/request/admin/auth.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/auth.ts#L13)

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
