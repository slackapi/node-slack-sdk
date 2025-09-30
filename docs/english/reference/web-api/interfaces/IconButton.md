[@slack/web-api](../index.md) / IconButton

# Interface: IconButton

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:186

## Description

An icon button to perform actions.

## Extends

- [`Actionable`](Actionable.md).[`Confirmable`](Confirmable.md)

## Properties

### accessibility\_label?

```ts
optional accessibility_label: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:204

#### Description

A label for longer descriptive text about a button element. This label will be read out by screen readers instead of the button `text` object. Maximum length for this field is 75 characters.

***

### action\_id?

```ts
optional action_id: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:12

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://docs.slack.dev/interactivity/handling-user-interaction#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Inherited from

[`Actionable`](Actionable.md).[`action_id`](Actionable.md#action_id)

***

### confirm?

```ts
optional confirm: ConfirmationDialog;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:21

#### Description

A [Confirm](Confirm.md) object that defines an optional confirmation dialog after the element is interacted
with.

#### Inherited from

[`Confirmable`](Confirmable.md).[`confirm`](Confirmable.md#confirm)

***

### icon

```ts
icon: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:195

#### Description

The icon to show.

#### Example

```ts
trash
```

***

### text

```ts
text: PlainTextElement;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:200

#### Description

Defines an object containing some text.

#### See

[Text object reference](https://docs.slack.dev/reference/block-kit/composition-objects/text-object).

***

### type

```ts
type: "icon_button";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:190

#### Description

The type of element. In this case `type` is always `icon_button`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)

***

### value?

```ts
optional value: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:208

#### Description

The button value.

***

### visible\_to\_user\_ids?

```ts
optional visible_to_user_ids: string[];
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:212

#### Description

User IDs for which the icon appears.
