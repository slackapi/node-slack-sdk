# Interface: ConversationsKickArguments

## Extends

- `Channel`.`TokenOverridable`

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

[packages/web-api/src/types/request/conversations.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L14)

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

### user

```ts
user: string;
```

#### Defined in

[packages/web-api/src/types/request/conversations.ts:119](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L119)
