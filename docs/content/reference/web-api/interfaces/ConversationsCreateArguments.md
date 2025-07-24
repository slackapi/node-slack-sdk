[@slack/web-api](../index.md) / ConversationsCreateArguments

# Interface: ConversationsCreateArguments

Defined in: [src/types/request/conversations.ts:75](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L75)

## Extends

- `IsPrivate`.`TokenOverridable`.`OptionalTeamAssignable`

## Properties

### is\_private?

```ts
optional is_private: boolean;
```

Defined in: [src/types/request/conversations.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L32)

#### Description

Whether the channel should be private.

#### Inherited from

```ts
IsPrivate.is_private
```

***

### name

```ts
name: string;
```

Defined in: [src/types/request/conversations.ts:77](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L77)

#### Description

Name of the public or private channel to create.

***

### team\_id?

```ts
optional team_id: string;
```

Defined in: [src/types/request/common.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L70)

#### Description

If using an org token, `team_id` is required.

#### Inherited from

```ts
OptionalTeamAssignable.team_id
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
