[@slack/web-api](../index.md) / ConversationsRenameArguments

# Interface: ConversationsRenameArguments

Defined in: [src/types/request/conversations.ts:181](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L181)

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

### name

```ts
name: string;
```

Defined in: [src/types/request/conversations.ts:183](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L183)

#### Description

New name for conversation.

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
