# Interface: UsersSetPresenceArguments

## Extends

- `TokenOverridable`

## Properties

### presence

```ts
presence: "auto" | "away";
```

#### Description

Either `auto` or `away`.

#### Defined in

[packages/web-api/src/types/request/users.ts:60](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L60)

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
