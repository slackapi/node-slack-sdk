[@slack/webhook](../index.md) / WebhookTrigger

# Class: WebhookTrigger

Defined in: [packages/webhook/src/WebhookTrigger.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/WebhookTrigger.ts#L14)

A client for Slack's Workflow Builder webhook triggers

## See

[https://slack.com/help/articles/360041352714-Build-a-workflow--Create-a-workflow-that-starts-outside-of-Slack](https://slack.com/help/articles/360041352714-Build-a-workflow--Create-a-workflow-that-starts-outside-of-Slack)

## Constructors

### Constructor

```ts
new WebhookTrigger(url, defaults?): WebhookTrigger;
```

Defined in: [packages/webhook/src/WebhookTrigger.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/WebhookTrigger.ts#L35)

#### Parameters

##### url

`string`

##### defaults?

[`WebhookTriggerDefaultArguments`](../interfaces/WebhookTriggerDefaultArguments.md) = `...`

#### Returns

`WebhookTrigger`

## Methods

### send()

```ts
send(payload?): Promise<WebhookTriggerResult>;
```

Defined in: [packages/webhook/src/WebhookTrigger.ts:69](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/WebhookTrigger.ts#L69)

Send a payload to the webhook trigger

#### Parameters

##### payload?

[`WebhookTriggerSendArguments`](../interfaces/WebhookTriggerSendArguments.md) = `{}`

arbitrary key-value data to send to the trigger

#### Returns

`Promise`\<[`WebhookTriggerResult`](../interfaces/WebhookTriggerResult.md)\>
