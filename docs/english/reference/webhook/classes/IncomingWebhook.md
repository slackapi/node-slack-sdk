[@slack/webhook](../index.md) / IncomingWebhook

# Class: IncomingWebhook

Defined in: [packages/webhook/src/IncomingWebhook.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L38)

A client for Slack's Incoming Webhooks

## Constructors

### Constructor

```ts
new IncomingWebhook(url, defaults?): IncomingWebhook;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:71](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L71)

#### Parameters

##### url

`string`

##### defaults?

[`IncomingWebhookDefaultArguments`](../interfaces/IncomingWebhookDefaultArguments.md) = `...`

#### Returns

`IncomingWebhook`

## Methods

### send()

```ts
send(message): Promise<IncomingWebhookResult>;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:108](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L108)

Send a notification to a conversation

#### Parameters

##### message

  \| `string`
  \| [`IncomingWebhookSendArguments`](../interfaces/IncomingWebhookSendArguments.md)

the message (a simple string, or an object describing the message)

#### Returns

`Promise`\<[`IncomingWebhookResult`](../interfaces/IncomingWebhookResult.md)\>
