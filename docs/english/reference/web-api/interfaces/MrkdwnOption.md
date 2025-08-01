[@slack/web-api](../index.md) / MrkdwnOption

# Interface: MrkdwnOption

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:80

## Extends

- `OptionDescriptor`

## Properties

### description?

```ts
optional description: PlainTextElement;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:78

#### Description

A [PlainTextElement](PlainTextElement.md) that defines a line of descriptive text shown below the `text` field.
Maximum length for the `text` within this field is 75 characters.

#### Inherited from

```ts
OptionDescriptor.description
```

***

### text

```ts
text: MrkdwnElement;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:85

#### Description

A [MrkdwnElement](MrkdwnElement.md) that defines the text shown in the option on the menu. To be used with
radio buttons and checkboxes. Maximum length for the `text` in this field is 75 characters.

***

### url?

```ts
optional url: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:73

#### Description

Only available in overflow menus! A URL to load in the user's browser when the option is clicked.
Maximum length for this field is 3000 characters.

#### Inherited from

```ts
OptionDescriptor.url
```

***

### value?

```ts
optional value: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:68

#### Description

A unique string value that will be passed to your app when this option is chosen.
Maximum length for this field is 75 characters.

#### Inherited from

```ts
OptionDescriptor.value
```
