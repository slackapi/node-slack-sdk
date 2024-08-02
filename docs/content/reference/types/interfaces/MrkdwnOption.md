# Interface: MrkdwnOption

## Extends

- `OptionDescriptor`

## Properties

### description?

```ts
optional description: PlainTextElement;
```

#### Description

A [PlainTextElement](PlainTextElement.md) that defines a line of descriptive text shown below the `text` field.
Maximum length for the `text` within this field is 75 characters.

#### Inherited from

`OptionDescriptor.description`

#### Defined in

[block-kit/composition-objects.ts:85](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/composition-objects.ts#L85)

***

### text

```ts
text: MrkdwnElement;
```

#### Description

A [MrkdwnElement](MrkdwnElement.md) that defines the text shown in the option on the menu. To be used with
radio buttons and checkboxes. Maximum length for the `text` in this field is 75 characters.

#### Defined in

[block-kit/composition-objects.ts:93](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/composition-objects.ts#L93)

***

### url?

```ts
optional url: string;
```

#### Description

Only available in overflow menus! A URL to load in the user's browser when the option is clicked.
Maximum length for this field is 3000 characters.

#### Inherited from

`OptionDescriptor.url`

#### Defined in

[block-kit/composition-objects.ts:80](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/composition-objects.ts#L80)

***

### value?

```ts
optional value: string;
```

#### Description

A unique string value that will be passed to your app when this option is chosen.
Maximum length for this field is 75 characters.

#### Inherited from

`OptionDescriptor.value`

#### Defined in

[block-kit/composition-objects.ts:75](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/composition-objects.ts#L75)
