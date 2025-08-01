[@slack/web-api](../index.md) / AdminAuthPolicyRemoveEntitiesArguments

# Interface: AdminAuthPolicyRemoveEntitiesArguments

Defined in: [src/types/request/admin/auth.ts:27](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/auth.ts#L27)

## Extends

- `EntityIDs`.`EntityType`.`PolicyName`.`TokenOverridable`

## Properties

### entity\_ids

```ts
entity_ids: string[];
```

Defined in: [src/types/request/admin/auth.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/auth.ts#L5)

#### Description

Encoded IDs of the entities interacting with.

#### Inherited from

```ts
EntityIDs.entity_ids
```

***

### entity\_type

```ts
entity_type: "USER";
```

Defined in: [src/types/request/admin/auth.ts:9](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/auth.ts#L9)

#### Description

The type of entity interacting with the policy.

#### Inherited from

```ts
EntityType.entity_type
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
