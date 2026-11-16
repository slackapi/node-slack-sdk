[@slack/web-api](../index.md) / RichTextStyleable

# Interface: RichTextStyleable

Defined in: packages/types/dist/block-kit/extensions.d.ts:71

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
style?: object;
```

Defined in: packages/types/dist/block-kit/extensions.d.ts:75

#### bold?

```ts
bold?: boolean;
```

##### Description

When `true`, boldens the text in this element. Defaults to `false`.

#### code?

```ts
code?: boolean;
```

##### Description

When `true`, the text is preformatted in an inline code style. Defaults to `false.

#### italic?

```ts
italic?: boolean;
```

##### Description

When `true`, italicizes the text in this element. Defaults to `false`.

#### strike?

```ts
strike?: boolean;
```

##### Description

When `true`, strikes through the text in this element. Defaults to `false`.

#### underline?

```ts
underline?: boolean;
```

##### Description

When `true`, underlines the text in this element. Defaults to `false`.

#### Description

A limited style object for styling rich text `text` elements.
