[@slack/web-api](../index.md) / UsersProfileGetArguments

# Interface: UsersProfileGetArguments

Defined in: [src/types/request/users.ts:66](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L66)

## Extends

- `TokenOverridable`

## Properties

### include\_labels?

```ts
optional include_labels: boolean;
```

Defined in: [src/types/request/users.ts:71](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L71)

#### Description

Include labels for each ID in custom profile fields.
Using this parameter will heavily rate-limit your requests and is not recommended. Defaults to `false`.

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

### user?

```ts
optional user: string;
```

Defined in: [src/types/request/users.ts:73](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L73)

#### Description

User to retrieve profile info for.
