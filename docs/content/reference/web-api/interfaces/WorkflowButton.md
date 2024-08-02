# Interface: WorkflowButton

## Description

Allows users to run a [link trigger](https://api.slack.com/automation/triggers/link#workflow_buttons) with customizable inputs.

## See

[Workflow button element reference](https://api.slack.com/reference/block-kit/block-elements#workflow_button).

## Extends

- [`Confirmable`](Confirmable.md)

## Properties

### accessibility\_label?

```ts
optional accessibility_label: string;
```

#### Description

A label for longer descriptive text about a button element. This label will be read out by screen
readers instead of the button `text` object. Maximum length for this field is 75 characters.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:630

***

### confirm?

```ts
optional confirm: ConfirmationDialog;
```

#### Description

A [Confirm](Confirm.md) object that defines an optional confirmation dialog after the element is interacted
with.

#### Inherited from

[`Confirmable`](Confirmable.md).[`confirm`](Confirmable.md#confirm)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:21

***

### style?

```ts
optional style: "danger" | "primary";
```

#### Description

Decorates buttons with alternative visual color schemes. Use this option with restraint.
`primary` gives buttons a green outline and text, ideal for affirmation or confirmation actions. `primary` should
only be used for one button within a set.
`danger` gives buttons a red outline and text, and should be used when the action is destructive. Use `danger` even
more sparingly than primary.
If you don't include this field, the default button style will be used.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:625

***

### text

```ts
text: PlainTextElement;
```

#### Description

A [PlainTextElement](PlainTextElement.md) that defines the button's text. `text` may truncate with ~30 characters.
Maximum length for the `text` in this field is 75 characters.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:585

***

### type

```ts
type: "workflow_button";
```

#### Description

The type of element. In this case `type` is always `workflow_button`.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:580

***

### workflow

```ts
workflow: object;
```

#### trigger

```ts
trigger: object;
```

##### Description

Properties of the [link trigger](https://api.slack.com/automation/triggers/link#workflow_buttons)
that will be invoked via this button.

#### trigger.customizable\_input\_parameters?

```ts
optional customizable_input_parameters: object[];
```

##### Description

List of customizable input parameters and their values. Should match input parameters specified on
the provided trigger.

#### trigger.url

```ts
url: string;
```

##### Description

The trigger URL of the [link trigger](https://api.slack.com/automation/triggers/link#workflow_buttons)

#### Description

A workflow object that contains details about the workflow that will run when the button is clicked.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:589
