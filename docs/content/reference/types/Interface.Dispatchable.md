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

[block-kit/extensions.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L33)
