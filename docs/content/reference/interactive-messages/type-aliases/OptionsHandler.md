# Type Alias: OptionsHandler()

```ts
type OptionsHandler: (payload) => any | Promise<any> | undefined;
```

## Parameters

• **payload**: `any`

an object describing
  [the state of the menu](https://api.slack.com/docs/message-menus#options_load_url)

## Returns

`any` \| `Promise`\<`any`\> \| `undefined`

an [options list](https://api.slack.com/docs/interactive-message-field-guide#option_fields) or
  [option groups list](https://api.slack.com/docs/interactive-message-field-guide#option_groups). When the menu is
  within an interactive message, (`within: 'interactive_message'`) the option keys are `text` and `value`. When the
  menu is within a dialog (`within: 'dialog'`) the option keys are `label` and `value`. When the menu is within a
  dialog (`within: 'block_actions'`) the option keys are a text block and `value`. This function may also return a
  Promise either of these values. If a Promise is returned and it does not complete within 3 seconds, Slack will
  display an error to the user. If there is no return value, then the user is shown an empty list of options.

## Defined in

[adapter.ts:835](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/interactive-messages/src/adapter.ts#L835)
