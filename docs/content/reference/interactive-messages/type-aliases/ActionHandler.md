# Type Alias: ActionHandler()

```ts
type ActionHandler: (payload, respond) => any | Promise<any> | undefined;
```

## Parameters

• **payload**: `any`

an object describing the
  [block actions](https://api.slack.com/messaging/interactivity/enabling#understanding-payloads)
  [button press](https://api.slack.com/docs/message-buttons#responding_to_message_actions),
  [menu selection](https://api.slack.com/docs/message-menus#request_url_response), or
  [dialog submission](https://api.slack.com/dialogs#evaluating_submission_responses).

• **respond**: [`Respond`](Respond.md)

When the action is a button press or menu selection, this function is used to update the message
  where the action occurred or create new messages in the same conversation. When the action is a dialog submission,
  this function is used to create new messages in the conversation where the dialog was triggered.

## Returns

`any` \| `Promise`\<`any`\> \| `undefined`

When the action is a button press or a menu selection, this object is a replacement
  [message](https://api.slack.com/docs/interactive-message-field-guide#top-level_message_fields) for the message in
  which the action occurred. It may also be a Promise for a message, and if so and the Promise takes longer than the
  `syncResponseTimeout` to complete, the message is sent over the `response_url`. The message may also be a new
  message in the same conversation by setting `replace_original: false`. When the action is a dialog submission,
  this object is a list of [validation errors](https://api.slack.com/dialogs#input_validation). It may also be a
  Promise for a list of validation errors, and if so and the Promise takes longer than the `syncResponseTimeout` to
  complete, Slack will display an error to the user. If there is no return value, then button presses and menu
  selections do not update the message and dialog submissions will validate and dismiss.

## Defined in

[adapter.ts:813](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L813)
