[@slack/web-api](../index.md) / MrkdwnElement

# Interface: MrkdwnElement

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:143

## Description

Defines an object containing some text.

## See

[Text object reference](https://api.slack.com/reference/block-kit/composition-objects#text).

## Properties

### text

```ts
text: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:152

#### Description

The text for the block. This field accepts any of the standard text formatting markup.
The minimum length is 1 and maximum length is 3000 characters.

***

### type

```ts
type: "mrkdwn";
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:147

#### Description

The formatting to use for this text object.

***

### verbatim?

```ts
optional verbatim: boolean;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:159

#### Description

When set to `false` (as is default) URLs will be auto-converted into links, conversation names will
be link-ified, and certain mentions will be [automatically parsed](https://api.slack.com/reference/surfaces/formatting#automatic-parsing).
Using a value of `true` will skip any preprocessing of this nature, although you can still include
[manual parsing strings](https://api.slack.com/reference/surfaces/formatting#advanced).
