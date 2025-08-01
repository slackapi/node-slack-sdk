[@slack/web-api](../index.md) / ChatScheduledMessagesListArguments

# Type Alias: ChatScheduledMessagesListArguments

```ts
type ChatScheduledMessagesListArguments = OptionalArgument<TokenOverridable & CursorPaginationEnabled & OptionalTeamAssignable & Pick<TimelinePaginationEnabled, "latest" | "oldest"> & Partial<Channel>>;
```

Defined in: [src/types/request/chat.ts:202](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L202)
