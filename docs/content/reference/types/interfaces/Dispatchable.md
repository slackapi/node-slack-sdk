# Interface: Dispatchable

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

#### Description

A [DispatchActionConfig](DispatchActionConfig.md) object that determines when during text input the element returns a
[`block_actions` payload](https://api.slack.com/reference/interaction-payloads/block-actions).

#### Defined in

[block-kit/extensions.ts:33](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/extensions.ts#L33)
