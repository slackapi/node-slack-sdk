[@slack/web-api](../index.md) / UsersLookupByEmailArguments

# Interface: UsersLookupByEmailArguments

Defined in: [src/types/request/users.ts:48](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L48)

## Extends

- `Email`.`TokenOverridable`

## Properties

### email

```ts
email: string;
```

Defined in: [src/types/request/users.ts:7](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L7)

#### Description

An email address belonging to a user in the workspace

#### Inherited from

```ts
Email.email
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
