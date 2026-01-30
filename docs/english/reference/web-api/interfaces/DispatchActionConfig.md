[@slack/web-api](../index.md) / DispatchActionConfig

# Interface: DispatchActionConfig

Defined in: packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:52

## Description

Defines when a [PlainTextElement](PlainTextElement.md) will return a [\`block\_actions\` interaction payload](https://docs.slack.dev/reference/interaction-payloads/block_actions-payload).

## See

[\`block\_actions\` interaction payload](https://docs.slack.dev/reference/interaction-payloads/block_actions-payload).

## Properties

### trigger\_actions\_on?

```ts
optional trigger_actions_on: ("on_enter_pressed" | "on_character_entered")[];
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:61

#### Description

An array of interaction types that you would like to receive a
[\`block\_actions\` payload](https://docs.slack.dev/reference/interaction-payloads/block_actions-payload) for. Should be
one or both of:
  `on_enter_pressed` — payload is dispatched when user presses the enter key while the input is in focus. Hint
  text will appear underneath the input explaining to the user to press enter to submit.
  `on_character_entered` — payload is dispatched when a character is entered (or removed) in the input.
