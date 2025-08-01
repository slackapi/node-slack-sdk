[@slack/web-api](../index.md) / UsersSetPresenceArguments

# Interface: UsersSetPresenceArguments

Defined in: [src/types/request/users.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L61)

## Extends

- `TokenOverridable`

## Properties

### presence

```ts
presence: "auto" | "away";
```

Defined in: [src/types/request/users.ts:63](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L63)

#### Description

Either `auto` or `away`.

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
