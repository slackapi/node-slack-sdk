# Interface: RichTextStyleable

## Description

For use styling Rich Text sub-elements.

## Extended by

- [`RichTextBroadcastMention`](Interface.RichTextBroadcastMention.md)
- [`RichTextColor`](Interface.RichTextColor.md)
- [`RichTextChannelMention`](Interface.RichTextChannelMention.md)
- [`RichTextDate`](Interface.RichTextDate.md)
- [`RichTextEmoji`](Interface.RichTextEmoji.md)
- [`RichTextLink`](Interface.RichTextLink.md)
- [`RichTextTeamMention`](Interface.RichTextTeamMention.md)
- [`RichTextText`](Interface.RichTextText.md)
- [`RichTextUserMention`](Interface.RichTextUserMention.md)
- [`RichTextUsergroupMention`](Interface.RichTextUsergroupMention.md)

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
