[@slack/web-api](../index.md) / ConversationsInviteArguments

# Interface: ConversationsInviteArguments

Defined in: [src/types/request/conversations.ts:109](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L109)

## Extends

- `Channel`.`Users`.`TokenOverridable`

## Properties

### channel

```ts
channel: string;
```

Defined in: [src/types/request/conversations.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L15)

#### Description

ID of conversation.

#### Inherited from

```ts
Channel.channel
```

***

### force?

```ts
optional force: boolean;
```

Defined in: [src/types/request/conversations.ts:114](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L114)

#### Description

When set to `true` and multiple user IDs are provided, continue inviting the valid ones while
disregarding invalid IDs. Defaults to `false`.

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

### users

```ts
users: string;
```

Defined in: [src/types/request/conversations.ts:49](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L49)

#### Description

A comma separated list of user IDs. Up to 1000 users may be listed.

#### Inherited from

```ts
Users.users
```
