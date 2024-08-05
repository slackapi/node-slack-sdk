# Interface: ConversationsMarkArguments

## Extends

- `Message`.`TokenOverridable`

## Properties

### channel

```ts
channel: string;
```

#### Description

ID of conversation.

#### Inherited from

`Message.channel`

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

### ts

```ts
ts: string;
```

#### Description

Unique identifier of message.

#### Inherited from

`Message.ts`

#### Defined in

[packages/web-api/src/types/request/conversations.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L39)
