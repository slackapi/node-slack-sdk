# Type Alias: ConversationsInviteSharedArguments

```ts
type ConversationsInviteSharedArguments: Channel & TokenOverridable & Emails | UserIDs & object;
```

## Type declaration

### external\_limited?

```ts
optional external_limited: boolean;
```

#### Description

Whether invite is to an external limited member. Defaults to `true`.

## Defined in

[packages/web-api/src/types/request/conversations.ts:109](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/conversations.ts#L109)
