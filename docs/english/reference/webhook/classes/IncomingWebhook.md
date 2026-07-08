[@slack/webhook](../index.md) / IncomingWebhook

# Class: IncomingWebhook

Defined in: [packages/webhook/src/IncomingWebhook.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L14)

A client for Slack's Incoming Webhooks

## Constructors

### Constructor

```ts
new IncomingWebhook(url, defaults?): IncomingWebhook;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L35)

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

Defined in: [packages/webhook/src/IncomingWebhook.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L70)

Send a notification to a conversation

#### Parameters

##### message

the message (a simple string, or an object describing the message)

`string` | [`IncomingWebhookSendArguments`](../interfaces/IncomingWebhookSendArguments.md)

#### Returns

`Promise`\<[`IncomingWebhookResult`](../interfaces/IncomingWebhookResult.md)\>
