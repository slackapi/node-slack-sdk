[@slack/web-api](../index.md) / ConversationsLeaveArguments

# Interface: ConversationsLeaveArguments

Defined in: [src/types/request/conversations.ts:134](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L134)

## Extends

- `Channel`.`TokenOverridable`

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
