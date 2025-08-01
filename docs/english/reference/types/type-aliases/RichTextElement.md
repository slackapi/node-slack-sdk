[@slack/types](../index.md) / RichTextElement

# Type Alias: RichTextElement

```ts
type RichTextElement = 
  | RichTextBroadcastMention
  | RichTextColor
  | RichTextChannelMention
  | RichTextDate
  | RichTextEmoji
  | RichTextLink
  | RichTextTeamMention
  | RichTextText
  | RichTextUserMention
  | RichTextUsergroupMention;
```

Defined in: [block-kit/block-elements.ts:875](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L875)

## Description

Union of rich text sub-elements for use within rich text blocks.
