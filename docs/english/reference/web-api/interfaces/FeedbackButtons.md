[@slack/web-api](../index.md) / FeedbackButtons

# Interface: FeedbackButtons

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:119

## Description

Buttons to indicate positive or negative feedback.

## Extends

- [`Actionable`](Actionable.md)

## Properties

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

### negative\_button

```ts
negative_button: object;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:145

#### accessibility\_label?

```ts
optional accessibility_label: string;
```

##### Description

A label for longer descriptive text about a button element. This label will be read out by screen readers instead of the button `text` object. Maximum length for this field is 75 characters.

#### text

```ts
text: PlainTextElement;
```

##### Description

Defines an object containing some text.

##### See

[Text object reference](https://docs.slack.dev/reference/block-kit/composition-objects/text-object).

#### value

```ts
value: string;
```

##### Description

The negative feedback button value.

#### Description

A button to indicate negative feedback.

***

### positive\_button

```ts
positive_button: object;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:127

#### accessibility\_label?

```ts
optional accessibility_label: string;
```

##### Description

A label for longer descriptive text about a button element. This label will be read out by screen readers instead of the button `text` object. Maximum length for this field is 75 characters.

#### text

```ts
text: PlainTextElement;
```

##### Description

Defines an object containing some text.

##### See

[Text object reference](https://docs.slack.dev/reference/block-kit/composition-objects/text-object).

#### value

```ts
value: string;
```

##### Description

The positive feedback button value.

#### Description

A button to indicate positive feedback.

***

### type

```ts
type: "feedback_buttons";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:123

#### Description

The type of block. For a feedback buttons block, `type` is always `feedback_buttons`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
