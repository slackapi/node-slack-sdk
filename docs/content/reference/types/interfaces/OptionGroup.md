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

A [PlainTextElement](PlainTextElement.md) text object that defines the label shown above this group of options.
Maximum length for the `text` in this field is 75 characters.

#### Defined in

[block-kit/composition-objects.ts:120](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/composition-objects.ts#L120)

***

### options

```ts
options: Option[];
```

#### Description

An array of [Option](../type-aliases/Option.md) that belong to this specific group. Maximum of 100 items.

#### Defined in

[block-kit/composition-objects.ts:124](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/composition-objects.ts#L124)
