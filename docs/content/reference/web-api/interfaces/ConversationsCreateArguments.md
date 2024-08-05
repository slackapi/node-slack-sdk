# Interface: ConversationsCreateArguments

## Extends

- `IsPrivate`.`TokenOverridable`.`OptionalTeamAssignable`

## Properties

### is\_private?

```ts
optional is_private: boolean;
```

#### Description

Whether the channel should be private.

#### Inherited from

`IsPrivate.is_private`

#### Defined in

[packages/web-api/src/types/request/conversations.ts:35](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/conversations.ts#L35)

***

### name

```ts
name: string;
```

#### Description

Name of the public or private channel to create.

#### Defined in

[packages/web-api/src/types/request/conversations.ts:74](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/conversations.ts#L74)

***

### team\_id?

```ts
optional team_id: string;
```

#### Description

If using an org token, `team_id` is required.

#### Inherited from

`OptionalTeamAssignable.team_id`

#### Defined in

[packages/web-api/src/types/request/common.ts:65](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L65)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L43)
