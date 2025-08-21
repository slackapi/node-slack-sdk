[@slack/web-api](../index.md) / ChatPostEphemeralArguments

# Type Alias: ChatPostEphemeralArguments

```ts
type ChatPostEphemeralArguments = TokenOverridable & MessageContents & object & Authorship & Parse & LinkNames & Partial<ThreadTS>;
```

Defined in: [src/types/request/chat.ts:172](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L172)

## Type declaration

### user

```ts
user: string;
```

#### Description

`id` of the user who will receive the ephemeral message.
The user should be in the channel specified by the `channel` argument.
