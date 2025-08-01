[@slack/types](../index.md) / OptionGroup

# Interface: OptionGroup

Defined in: [block-kit/composition-objects.ts:115](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L115)

## Description

Defines a way to group options in a select or multi-select menu.

## See

[Option group object reference](https://docs.slack.dev/reference/block-kit/composition-objects/option-group-object).

## Properties

### label

```ts
label: PlainTextElement;
```

Defined in: [block-kit/composition-objects.ts:120](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L120)

#### Description

A [PlainTextElement](PlainTextElement.md) text object that defines the label shown above this group of options.
Maximum length for the `text` in this field is 75 characters.

***

### options

```ts
options: Option[];
```

Defined in: [block-kit/composition-objects.ts:124](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L124)

#### Description

An array of [Option](../type-aliases/Option.md) that belong to this specific group. Maximum of 100 items.
