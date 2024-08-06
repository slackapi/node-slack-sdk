# Interface: Dispatchable

## Extended by

- [`EmailInput`](Interface.EmailInput.md)
- [`NumberInput`](Interface.NumberInput.md)
- [`PlainTextInput`](Interface.PlainTextInput.md)
- [`URLInput`](Interface.URLInput.md)
- [`RichTextInput`](Interface.RichTextInput.md)

## Properties

### dispatch\_action\_config?

```ts
optional dispatch_action_config: DispatchActionConfig;
```

#### Description

A [DispatchActionConfig](Interface.DispatchActionConfig.md) object that determines when during text input the element returns a
[`block_actions` payload](https://api.slack.com/reference/interaction-payloads/block-actions).

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:43
