[@slack/web-api](../index.md) / AdminAuthPolicyGetEntitiesArguments

# Interface: AdminAuthPolicyGetEntitiesArguments

Defined in: [src/types/request/admin/auth.ts:20](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/auth.ts#L20)

## Extends

- `Partial`\<`EntityType`\>.`PolicyName`.`TokenOverridable`.`CursorPaginationEnabled`

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

### entity\_type?

```ts
optional entity_type: "USER";
```

Defined in: [src/types/request/admin/auth.ts:9](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/auth.ts#L9)

#### Description

The type of entity interacting with the policy.

#### Inherited from

[`AdminAuthPolicyAssignEntitiesArguments`](AdminAuthPolicyAssignEntitiesArguments.md).[`entity_type`](AdminAuthPolicyAssignEntitiesArguments.md#entity_type)

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

### policy\_name

```ts
policy_name: "email_password";
```

Defined in: [src/types/request/admin/auth.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/auth.ts#L13)

#### Description

The name of the policy.

#### Inherited from

```ts
PolicyName.policy_name
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
