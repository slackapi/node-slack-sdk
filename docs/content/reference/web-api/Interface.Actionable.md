# Interface: ~~Actionable~~

## Deprecated

[Action](Interface.Action.md) aliased to [Actionable](Interface.Actionable.md) in order to name the mixins in this file consistently.

## Extends

- [`Action`](Interface.Action.md)

## Extended by

- [`Button`](Interface.Button.md)
- [`Checkboxes`](Interface.Checkboxes.md)
- [`Datepicker`](Interface.Datepicker.md)
- [`DateTimepicker`](Interface.DateTimepicker.md)
- [`EmailInput`](Interface.EmailInput.md)
- [`FileInput`](Interface.FileInput.md)
- [`UsersSelect`](Interface.UsersSelect.md)
- [`MultiUsersSelect`](Interface.MultiUsersSelect.md)
- [`StaticSelect`](Interface.StaticSelect.md)
- [`MultiStaticSelect`](Interface.MultiStaticSelect.md)
- [`ConversationsSelect`](Interface.ConversationsSelect.md)
- [`MultiConversationsSelect`](Interface.MultiConversationsSelect.md)
- [`ChannelsSelect`](Interface.ChannelsSelect.md)
- [`MultiChannelsSelect`](Interface.MultiChannelsSelect.md)
- [`ExternalSelect`](Interface.ExternalSelect.md)
- [`MultiExternalSelect`](Interface.MultiExternalSelect.md)
- [`NumberInput`](Interface.NumberInput.md)
- [`Overflow`](Interface.Overflow.md)
- [`PlainTextInput`](Interface.PlainTextInput.md)
- [`RadioButtons`](Interface.RadioButtons.md)
- [`Timepicker`](Interface.Timepicker.md)
- [`URLInput`](Interface.URLInput.md)
- [`RichTextInput`](Interface.RichTextInput.md)

## Properties

### ~~action\_id?~~

```ts
optional action_id: string;
```

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Inherited from

[`Action`](Interface.Action.md).[`action_id`](Interface.Action.md#action_id)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:12

***

### ~~type~~

```ts
type: string;
```

#### Inherited from

[`Action`](Interface.Action.md).[`type`](Interface.Action.md#type)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:6
