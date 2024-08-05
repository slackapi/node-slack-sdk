# Type Alias: Respond()

```ts
type Respond: (message) => Promise<unknown>;
```

## Parameters

• **message**: `any`

a [message](https://api.slack.com/docs/interactive-message-field-guide#top-level_message_fields).
  Dialog submissions do not allow `replace_original: false` on this message.

## Returns

`Promise`\<`unknown`\>

there's no contract or interface for the resolution value, but this Promise will resolve when the HTTP
  response from the `response_url` request is complete and reject when there is an error.

## Defined in

[adapter.ts:789](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/interactive-messages/src/adapter.ts#L789)
