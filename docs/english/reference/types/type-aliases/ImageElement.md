[@slack/types](../index.md) / ImageElement

# Type Alias: ImageElement

```ts
type ImageElement = object & 
  | UrlImageObject
  | SlackFileImageObject;
```

Defined in: [block-kit/block-elements.ts:169](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L169)

## Type declaration

### alt\_text

```ts
alt_text: string;
```

#### Description

A plain-text summary of the image. This should not contain any markup.

### type

```ts
type: "image";
```

#### Description

The type of element. In this case `type` is always `image`.

## Description

Displays an image as part of a larger block of content. Use this `image` block if you want a block with
only an image in it.

## See

[Image element reference](https://docs.slack.dev/reference/block-kit/block-elements/image-element).
