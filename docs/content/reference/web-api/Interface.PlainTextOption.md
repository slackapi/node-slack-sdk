# Interface: PlainTextOption

## Extends

- `OptionDescriptor`

## Properties

### description?

```ts
optional description: PlainTextElement;
```

#### Description

A [PlainTextElement](Interface.PlainTextElement.md) that defines a line of descriptive text shown below the `text` field.
Maximum length for the `text` within this field is 75 characters.

#### Inherited from

`OptionDescriptor.description`

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:71

***

### text

```ts
text: PlainTextElement;
```

#### Description

A [PlainTextElement](Interface.PlainTextElement.md) that defines the text shown in the option on the menu. To be used with
overflow, select and multi-select menus. Maximum length for the `text` in this field is 75 characters.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:85

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

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:66

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

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:61
