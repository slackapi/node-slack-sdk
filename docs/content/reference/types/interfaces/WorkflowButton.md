[@slack/types](../index.md) / WorkflowButton

# Interface: WorkflowButton

Defined in: [block-kit/block-elements.ts:627](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L627)

## Description

Allows users to run a [link trigger](https://tools.slack.dev/deno-slack-sdk/guides/creating-link-triggers/#workflow_buttons) with customizable inputs.

## See

[Workflow button element reference](https://docs.slack.dev/reference/block-kit/block-elements/workflow-button-element).

## Extends

- [`Confirmable`](Confirmable.md)

## Properties

### accessibility\_label?

```ts
optional accessibility_label: string;
```

Defined in: [block-kit/block-elements.ts:681](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L681)

#### Description

A label for longer descriptive text about a button element. This label will be read out by screen
readers instead of the button `text` object. Maximum length for this field is 75 characters.

***

### confirm?

```ts
optional confirm: ConfirmationDialog;
```

Defined in: [block-kit/extensions.ts:25](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L25)

#### Description

A [Confirm](Confirm.md) object that defines an optional confirmation dialog after the element is interacted
with.

#### Inherited from

[`Confirmable`](Confirmable.md).[`confirm`](Confirmable.md#confirm)

***

### style?

```ts
optional style: ColorScheme;
```

Defined in: [block-kit/block-elements.ts:676](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L676)

#### Description

Decorates buttons with alternative visual color schemes. Use this option with restraint.
`primary` gives buttons a green outline and text, ideal for affirmation or confirmation actions. `primary` should
only be used for one button within a set.
`danger` gives buttons a red outline and text, and should be used when the action is destructive. Use `danger` even
more sparingly than primary.
If you don't include this field, the default button style will be used.

***

### text

```ts
text: PlainTextElement;
```

Defined in: [block-kit/block-elements.ts:636](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L636)

#### Description

A [PlainTextElement](PlainTextElement.md) that defines the button's text. `text` may truncate with ~30 characters.
Maximum length for the `text` in this field is 75 characters.

***

### type

```ts
type: "workflow_button";
```

Defined in: [block-kit/block-elements.ts:631](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L631)

#### Description

The type of element. In this case `type` is always `workflow_button`.

***

### workflow

```ts
workflow: object;
```

Defined in: [block-kit/block-elements.ts:640](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L640)

#### trigger

```ts
trigger: object;
```

##### Description

Properties of the [link trigger](https://tools.slack.dev/deno-slack-sdk/guides/creating-link-triggers/#workflow_buttons)
that will be invoked via this button.

##### trigger.customizable\_input\_parameters?

```ts
optional customizable_input_parameters: object[];
```

###### Description

List of customizable input parameters and their values. Should match input parameters specified on
the provided trigger.

##### trigger.url

```ts
url: string;
```

###### Description

The trigger URL of the [link trigger](https://tools.slack.dev/deno-slack-sdk/guides/creating-link-triggers/#workflow_buttons)

#### Description

A workflow object that contains details about the workflow that will run when the button is clicked.
