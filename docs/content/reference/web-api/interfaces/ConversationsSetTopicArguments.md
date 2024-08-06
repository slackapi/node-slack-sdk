# Interface: ConversationsSetTopicArguments

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

### topic

```ts
topic: string;
```

#### Description

The new topic string. Does not support formatting or linkification.

#### Defined in

[packages/web-api/src/types/request/conversations.ts:181](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L181)
