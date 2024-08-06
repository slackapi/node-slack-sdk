# Interface: AdminAuthPolicyRemoveEntitiesArguments

## Extends

- `EntityIDs`.`EntityType`.`PolicyName`.`TokenOverridable`

## Properties

### entity\_ids

```ts
entity_ids: string[];
```

#### Description

Encoded IDs of the entities interacting with.

#### Inherited from

`EntityIDs.entity_ids`

#### Defined in

[packages/web-api/src/types/request/admin/auth.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/auth.ts#L5)

***

### entity\_type

```ts
entity_type: "USER";
```

#### Description

The type of entity interacting with the policy.

#### Inherited from

`EntityType.entity_type`

#### Defined in

[packages/web-api/src/types/request/admin/auth.ts:9](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/auth.ts#L9)

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
