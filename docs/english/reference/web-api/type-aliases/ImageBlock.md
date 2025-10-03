[@slack/web-api](../index.md) / ImageBlock

# Type Alias: ImageBlock

```ts
type ImageBlock = object & Block & 
  | UrlImageObject
  | SlackFileImageObject;
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:136

## Type Declaration

### alt\_text

```ts
alt_text: string;
```

#### Description

A plain-text summary of the image. This should not contain any markup.
Maximum length for this field is 2000 characters.

### title?

```ts
optional title: PlainTextElement;
```

#### Description

An optional title for the image in the form of a [PlainTextElement](../interfaces/PlainTextElement.md) object.
Maximum length for the text in this field is 2000 characters.

### type

```ts
type: "image";
```

#### Description

The type of block. For an image block, `type` is always `image`.

## Description

Displays an image. A simple image block, designed to make those cat photos really pop.

## See

[Image block reference](https://docs.slack.dev/reference/block-kit/blocks/image-block).
