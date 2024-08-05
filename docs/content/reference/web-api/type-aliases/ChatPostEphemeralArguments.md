# Type Alias: ChatPostEphemeralArguments

```ts
type ChatPostEphemeralArguments: TokenOverridable & MessageContents & object & Authorship & Parse & LinkNames & Partial<ThreadTS>;
```

## Type declaration

### user

```ts
user: string;
```

#### Description

`id` of the user who will receive the ephemeral message.
The user should be in the channel specified by the `channel` argument.

## Defined in

[packages/web-api/src/types/request/chat.ts:161](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/chat.ts#L161)
