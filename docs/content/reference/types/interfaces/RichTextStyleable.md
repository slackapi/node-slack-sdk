# Interface: RichTextStyleable

## Description

For use styling Rich Text sub-elements.

## Extended by

- [`RichTextBroadcastMention`](RichTextBroadcastMention.md)
- [`RichTextColor`](RichTextColor.md)
- [`RichTextChannelMention`](RichTextChannelMention.md)
- [`RichTextDate`](RichTextDate.md)
- [`RichTextEmoji`](RichTextEmoji.md)
- [`RichTextLink`](RichTextLink.md)
- [`RichTextTeamMention`](RichTextTeamMention.md)
- [`RichTextText`](RichTextText.md)
- [`RichTextUserMention`](RichTextUserMention.md)
- [`RichTextUsergroupMention`](RichTextUsergroupMention.md)

## Properties

### style?

```ts
optional style: object;
```

#### bold?

```ts
optional bold: boolean;
```

##### Description

When `true`, boldens the text in this element. Defaults to `false`.

#### code?

```ts
optional code: boolean;
```

##### Description

When `true`, the text is preformatted in an inline code style. Defaults to `false.

#### italic?

```ts
optional italic: boolean;
```

##### Description

When `true`, italicizes the text in this element. Defaults to `false`.

#### strike?

```ts
optional strike: boolean;
```

##### Description

When `true`, strikes through the text in this element. Defaults to `false`.

#### Description

A limited style object for styling rich text `text` elements.

#### Defined in

[block-kit/extensions.ts:86](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L86)
