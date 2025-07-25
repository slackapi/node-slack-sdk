[@slack/types](../index.md) / ActionsBlockElement

# Type Alias: ActionsBlockElement

```ts
type ActionsBlockElement = 
  | Button
  | Checkboxes
  | Datepicker
  | DateTimepicker
  | MultiSelect
  | Overflow
  | RadioButtons
  | Select
  | Timepicker
  | WorkflowButton
  | RichTextInput;
```

Defined in: [block-kit/blocks.ts:69](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L69)

A helper union type of all Block Elements that can be used in an [ActionsBlock](../interfaces/ActionsBlock.md).

## See

[Actions block reference](https://docs.slack.dev/reference/block-kit/blocks/actions-block).
