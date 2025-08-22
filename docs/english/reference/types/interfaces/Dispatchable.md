[@slack/types](../index.md) / Dispatchable

# Interface: Dispatchable

Defined in: [block-kit/extensions.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L28)

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

Defined in: [block-kit/extensions.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L33)

#### Description

A [DispatchActionConfig](DispatchActionConfig.md) object that determines when during text input the element returns a
[\`block\_actions\` payload](https://docs.slack.dev/reference/interaction-payloads/block_actions-payload).
