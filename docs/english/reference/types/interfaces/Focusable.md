[@slack/types](../index.md) / Focusable

# Interface: Focusable

Defined in: [block-kit/extensions.ts:36](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L36)

## Extended by

- [`Checkboxes`](Checkboxes.md)
- [`Datepicker`](Datepicker.md)
- [`DateTimepicker`](DateTimepicker.md)
- [`EmailInput`](EmailInput.md)
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
- [`PlainTextInput`](PlainTextInput.md)
- [`RadioButtons`](RadioButtons.md)
- [`Timepicker`](Timepicker.md)
- [`URLInput`](URLInput.md)
- [`RichTextInput`](RichTextInput.md)

## Properties

### focus\_on\_load?

```ts
optional focus_on_load: boolean;
```

Defined in: [block-kit/extensions.ts:42](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L42)

#### Description

Indicates whether the element will be set to auto focus within the
[\`view\` object](https://docs.slack.dev/surfaces/modals). Only one element can be set to `true`.
Defaults to `false`.
