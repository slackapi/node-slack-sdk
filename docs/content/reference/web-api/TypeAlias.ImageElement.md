# Type Alias: ImageElement

```ts
type ImageElement: object & UrlImageObject | SlackFileImageObject;
```

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

[Image element reference](https://api.slack.com/reference/block-kit/block-elements#image).

## Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:143
