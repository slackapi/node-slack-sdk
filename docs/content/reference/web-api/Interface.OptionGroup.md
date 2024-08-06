# Interface: OptionGroup

## Description

Defines a way to group options in a select or multi-select menu.

## See

[Option group object reference](https://api.slack.com/reference/block-kit/composition-objects#option_group).

## Properties

### label

```ts
label: PlainTextElement;
```

#### Description

A [PlainTextElement](Interface.PlainTextElement.md) text object that defines the label shown above this group of options.
Maximum length for the `text` in this field is 75 characters.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:102

***

### options

```ts
options: Option[];
```

#### Description

An array of [Option](TypeAlias.Option.md) that belong to this specific group. Maximum of 100 items.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:106
