[@slack/types](../index.md) / Confirmable

# Interface: Confirmable

Defined in: [block-kit/extensions.ts:20](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L20)

## Extended by

- [`Button`](Button.md)
- [`Checkboxes`](Checkboxes.md)
- [`Datepicker`](Datepicker.md)
- [`DateTimepicker`](DateTimepicker.md)
- [`IconButton`](IconButton.md)
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
- [`Overflow`](Overflow.md)
- [`RadioButtons`](RadioButtons.md)
- [`Timepicker`](Timepicker.md)
- [`WorkflowButton`](WorkflowButton.md)

## Properties

### confirm?

```ts
optional confirm: ConfirmationDialog;
```

Defined in: [block-kit/extensions.ts:25](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L25)

#### Description

A [Confirm](Confirm.md) object that defines an optional confirmation dialog after the element is interacted
with.
