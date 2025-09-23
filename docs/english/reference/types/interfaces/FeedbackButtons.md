[@slack/types](../index.md) / FeedbackButtons

# Interface: FeedbackButtons

Defined in: [block-kit/block-elements.ts:144](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L144)

## Description

Buttons to indicate positive or negative feedback.

## Extends

- [`Actionable`](Actionable.md)

## Properties

### action\_id?

```ts
optional action_id: string;
```

Defined in: [block-kit/extensions.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L15)

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

Defined in: [block-kit/block-elements.ts:170](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L170)

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

Defined in: [block-kit/block-elements.ts:152](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L152)

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

Defined in: [block-kit/block-elements.ts:148](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L148)

#### Description

The type of block. For a feedback buttons block, `type` is always `feedback_buttons`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
