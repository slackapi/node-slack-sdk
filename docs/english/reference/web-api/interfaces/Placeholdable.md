[@slack/web-api](../index.md) / Placeholdable

# Interface: Placeholdable

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:44

## Extended by

- [`Datepicker`](Datepicker.md)
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
- [`Timepicker`](Timepicker.md)
- [`URLInput`](URLInput.md)
- [`RichTextInput`](RichTextInput.md)

## Properties

### placeholder?

```ts
optional placeholder: PlainTextElement;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:49

#### Description

A [PlainTextElement](PlainTextElement.md) object that defines the placeholder text shown on the element. Maximum
length for the `text` field in this object is 150 characters.
