[@slack/web-api](../index.md) / BlocksValidateArguments

# Type Alias: BlocksValidateArguments

```ts
type BlocksValidateArguments = OptionalArgument<{
  blocks?: (KnownBlock | Block)[];
  message?: {
     attachments?: MessageAttachment[];
     blocks?: (KnownBlock | Block)[];
  };
  view?: View;
}>;
```

Defined in: [packages/web-api/src/types/request/blocks.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/blocks.ts#L6)
