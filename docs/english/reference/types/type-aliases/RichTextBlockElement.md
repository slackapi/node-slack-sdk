[@slack/types](../index.md) / RichTextBlockElement

# Type Alias: RichTextBlockElement

```ts
type RichTextBlockElement = 
  | RichTextSection
  | RichTextList
  | RichTextQuote
  | RichTextPreformatted;
```

Defined in: [block-kit/blocks.ts:300](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L300)

A helper union type of all Block Elements that can be used in a [RichTextBlock](../interfaces/RichTextBlock.md).

## See

[Rich text block reference](https://docs.slack.dev/reference/block-kit/blocks/rich-text-block).
