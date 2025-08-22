[@slack/web-api](../index.md) / Actionable

# ~~Interface: Actionable~~

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:14

## Deprecated

[Action](Action.md) aliased to Actionable in order to name the mixins in this file consistently.

## Extends

- [`Action`](Action.md)

## Extended by

- [`Button`](Button.md)
- [`Checkboxes`](Checkboxes.md)
- [`Datepicker`](Datepicker.md)
- [`DateTimepicker`](DateTimepicker.md)
- [`EmailInput`](EmailInput.md)
- [`FileInput`](FileInput.md)
- [`UsersSelect`](UsersSelect.md)
- [`MultiUsersSelect`](MultiUsersSelect.md)
- [`StaticSelect`](StaticSelect.md)
- [`MultiStaticSelect`](MultiStaticSelect.md)
- [`ConversationsSelect`](ConversationsSelect.md)
- [`MultiConversationsSelect`](MultiConversationsSelect.md)
- [`ChannelsSelect`](ChannelsSelect.md)
- [`MultiChannelsSelect`](MultiChannelsSelect.md)
- [`ExternalSelect`](ExternalSelect.md)
- [`MultiExternalSelect`](MultiExternalSelect.md)
- [`NumberInput`](NumberInput.md)
- [`Overflow`](Overflow.md)
- [`PlainTextInput`](PlainTextInput.md)
- [`RadioButtons`](RadioButtons.md)
- [`Timepicker`](Timepicker.md)
- [`URLInput`](URLInput.md)
- [`RichTextInput`](RichTextInput.md)

## Properties

### ~~action\_id?~~

```ts
optional action_id: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:12

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Inherited from

[`Action`](Action.md).[`action_id`](Action.md#action_id)

***

### ~~type~~

```ts
type: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:6

#### Inherited from

[`Action`](Action.md).[`type`](Action.md#type)
