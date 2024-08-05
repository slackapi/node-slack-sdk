# Interface: RichTextUserMention

## Description

A user mention element for use in a rich text message.

## Extends

- [`RichTextStyleable`](RichTextStyleable.md)

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

[`RichTextStyleable`](RichTextStyleable.md).[`style`](RichTextStyleable.md#style)

#### Defined in

[block-kit/extensions.ts:86](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/extensions.ts#L86)

***

### type

```ts
type: "user";
```

#### Description

The type of element. In this case `type` is always `user`.

#### Defined in

[block-kit/block-elements.ts:922](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/block-elements.ts#L922)

***

### user\_id

```ts
user_id: string;
```

#### Description

The encoded user ID, e.g. U1234ABCD.

#### Defined in

[block-kit/block-elements.ts:926](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/block-elements.ts#L926)
