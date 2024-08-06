# Interface: RichTextTeamMention

## Description

A workspace or team mention element for use in a rich text message.

## Extends

- [`RichTextStyleable`](Interface.RichTextStyleable.md)

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

#### Inherited from

[`RichTextStyleable`](Interface.RichTextStyleable.md).[`style`](Interface.RichTextStyleable.md#style)

#### Defined in

[block-kit/extensions.ts:86](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L86)

***

### team\_id

```ts
team_id: string;
```

#### Description

The encoded team ID, e.g. T1234ABCD.

#### Defined in

[block-kit/block-elements.ts:898](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L898)

***

### type

```ts
type: "team";
```

#### Description

The type of element. In this case `type` is always `team`.

#### Defined in

[block-kit/block-elements.ts:894](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L894)
