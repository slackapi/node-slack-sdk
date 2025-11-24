[@slack/types](../index.md) / KnownBlock

# Type Alias: KnownBlock

```ts
type KnownBlock = 
  | ActionsBlock
  | ContextBlock
  | ContextActionsBlock
  | DividerBlock
  | FileBlock
  | HeaderBlock
  | ImageBlock
  | InputBlock
  | MarkdownBlock
  | RichTextBlock
  | SectionBlock
  | TableBlock
  | VideoBlock;
```

Defined in: [block-kit/blocks.ts:54](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L54)

A helper union type of all known Blocks, as listed out on the
[Blocks reference](https://docs.slack.dev/reference/block-kit/blocks).
