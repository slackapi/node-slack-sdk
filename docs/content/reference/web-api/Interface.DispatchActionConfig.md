# Interface: DispatchActionConfig

## Description

Defines when a [PlainTextElement](Interface.PlainTextElement.md) will return a [`block_actions` interaction payload](https://api.slack.com/reference/interaction-payloads/block-actions).

## See

[`block_actions` interaction payload](https://api.slack.com/reference/interaction-payloads/block-actions).

## Properties

### trigger\_actions\_on?

```ts
optional trigger_actions_on: ("on_enter_pressed" | "on_character_entered")[];
```

#### Description

An array of interaction types that you would like to receive a
[`block_actions` payload](https://api.slack.com/reference/interaction-payloads/block-actions) for. Should be
one or both of:
  `on_enter_pressed` — payload is dispatched when user presses the enter key while the input is in focus. Hint
  text will appear underneath the input explaining to the user to press enter to submit.
  `on_character_entered` — payload is dispatched when a character is entered (or removed) in the input.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:54
