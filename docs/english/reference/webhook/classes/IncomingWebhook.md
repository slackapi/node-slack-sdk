[@slack/webhook](../index.md) / IncomingWebhook

# Class: IncomingWebhook

Defined in: [src/IncomingWebhook.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L12)

A client for Slack's Incoming Webhooks

## Constructors

### Constructor

```ts
new IncomingWebhook(url, defaults): IncomingWebhook;
```

Defined in: [src/IncomingWebhook.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L28)

#### Parameters

##### url

`string`

##### defaults

[`IncomingWebhookDefaultArguments`](../interfaces/IncomingWebhookDefaultArguments.md) = `...`

#### Returns

`IncomingWebhook`

## Methods

### send()

```ts
send(message): Promise<IncomingWebhookResult>;
```

Defined in: [src/IncomingWebhook.ts:60](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L60)

Send a notification to a conversation

#### Parameters

##### message

the message (a simple string, or an object describing the message)

`string` | [`IncomingWebhookSendArguments`](../interfaces/IncomingWebhookSendArguments.md)

#### Returns

`Promise`\<[`IncomingWebhookResult`](../interfaces/IncomingWebhookResult.md)\>
