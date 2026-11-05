[@slack/types](../index.md) / URLSourceElement

# Interface: URLSourceElement

Defined in: [block-kit/block-elements.ts:724](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L724)

## Description

A URL source element that displays a URL source for referencing within a task card block.

## See

[https://docs.slack.dev/reference/block-kit/block-elements/url-source-element](https://docs.slack.dev/reference/block-kit/block-elements/url-source-element)

## Properties

### text

```ts
text: string;
```

Defined in: [block-kit/block-elements.ts:738](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L738)

#### Description

Display text for the URL.

***

### type

```ts
type: "url";
```

Defined in: [block-kit/block-elements.ts:728](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L728)

#### Description

The type of element. In this case `type` is always `url`.

***

### url

```ts
url: string;
```

Defined in: [block-kit/block-elements.ts:733](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L733)

#### Description

The URL type source.
