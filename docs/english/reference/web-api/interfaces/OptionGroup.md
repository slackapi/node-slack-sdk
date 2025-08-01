[@slack/web-api](../index.md) / OptionGroup

# Interface: OptionGroup

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:104

## Description

Defines a way to group options in a select or multi-select menu.

## See

[Option group object reference](https://api.slack.com/reference/block-kit/composition-objects#option_group).

## Properties

### label

```ts
label: PlainTextElement;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:109

#### Description

A [PlainTextElement](PlainTextElement.md) text object that defines the label shown above this group of options.
Maximum length for the `text` in this field is 75 characters.

***

### options

```ts
options: Option[];
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:113

#### Description

An array of [Option](../type-aliases/Option.md) that belong to this specific group. Maximum of 100 items.
