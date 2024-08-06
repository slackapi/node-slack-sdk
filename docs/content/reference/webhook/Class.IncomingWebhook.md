# Class: IncomingWebhook

A client for Slack's Incoming Webhooks

## Constructors

### new IncomingWebhook()

```ts
new IncomingWebhook(url, defaults): IncomingWebhook
```

#### Parameters

• **url**: `string`

• **defaults**: [`IncomingWebhookDefaultArguments`](Interface.IncomingWebhookDefaultArguments.md) = `...`

#### Returns

[`IncomingWebhook`](Class.IncomingWebhook.md)

#### Defined in

[IncomingWebhook.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L28)

## Methods

### send()

```ts
send(message): Promise<IncomingWebhookResult>
```

Send a notification to a conversation

#### Parameters

• **message**: `string` \| [`IncomingWebhookSendArguments`](Interface.IncomingWebhookSendArguments.md)

the message (a simple string, or an object describing the message)

#### Returns

`Promise`\<[`IncomingWebhookResult`](Interface.IncomingWebhookResult.md)\>

#### Defined in

[IncomingWebhook.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L61)
