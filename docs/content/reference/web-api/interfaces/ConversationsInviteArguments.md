# Interface: ConversationsInviteArguments

## Extends

- `Channel`.`Users`.`TokenOverridable`

## Properties

### channel

```ts
channel: string;
```

#### Description

ID of conversation.

#### Inherited from

`Channel.channel`

#### Defined in

[packages/web-api/src/types/request/conversations.ts:14](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/conversations.ts#L14)

***

### force?

```ts
optional force: boolean;
```

#### Description

When set to `true` and multiple user IDs are provided, continue inviting the valid ones while
disregarding invalid IDs. Defaults to `false`.

#### Defined in

[packages/web-api/src/types/request/conversations.ts:105](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/conversations.ts#L105)

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

***

### users

```ts
users: string;
```

#### Description

A comma separated list of user IDs. Up to 1000 users may be listed.

#### Inherited from

`Users.users`

#### Defined in

[packages/web-api/src/types/request/conversations.ts:48](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/conversations.ts#L48)
