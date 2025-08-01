[@slack/web-api](../index.md) / ConversationsInviteSharedArguments

# Type Alias: ConversationsInviteSharedArguments

```ts
type ConversationsInviteSharedArguments = Channel & TokenOverridable & Emails | UserIDs & object;
```

Defined in: [src/types/request/conversations.ts:118](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L118)

## Type declaration

### external\_limited?

```ts
optional external_limited: boolean;
```

#### Description

Whether invite is to an external limited member. Defaults to `true`.
