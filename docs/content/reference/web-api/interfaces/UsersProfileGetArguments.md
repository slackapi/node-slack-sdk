# Interface: UsersProfileGetArguments

## Extends

- `TokenOverridable`

## Properties

### include\_labels?

```ts
optional include_labels: boolean;
```

#### Description

Include labels for each ID in custom profile fields.
Using this parameter will heavily rate-limit your requests and is not recommended. Defaults to `false`.

#### Defined in

[packages/web-api/src/types/request/users.ts:68](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L68)

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

***

### user?

```ts
optional user: string;
```

#### Description

User to retrieve profile info for.

#### Defined in

[packages/web-api/src/types/request/users.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L70)
