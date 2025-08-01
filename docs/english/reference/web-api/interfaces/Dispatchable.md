[@slack/web-api](../index.md) / Dispatchable

# Interface: Dispatchable

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:23

## Extended by

- [`EmailInput`](EmailInput.md)
- [`NumberInput`](NumberInput.md)
- [`PlainTextInput`](PlainTextInput.md)
- [`URLInput`](URLInput.md)
- [`RichTextInput`](RichTextInput.md)

## Properties

### dispatch\_action\_config?

```ts
optional dispatch_action_config: DispatchActionConfig;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:28

#### Description

A [DispatchActionConfig](DispatchActionConfig.md) object that determines when during text input the element returns a
[\`block\_actions\` payload](https://api.slack.com/reference/interaction-payloads/block-actions).
