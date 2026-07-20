[@slack/webhook](../index.md) / IncomingWebhookSendArguments

# Interface: IncomingWebhookSendArguments

Defined in: [packages/webhook/src/IncomingWebhook.ts:164](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L164)

## Extends

- [`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md)

## Properties

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:165](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L165)

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:166](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L166)

***

### channel?

```ts
optional channel: string;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:156](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L156)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`channel`](IncomingWebhookDefaultArguments.md#channel)

***

### fetch?

```ts
optional fetch: FetchFunction;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:159](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L159)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`fetch`](IncomingWebhookDefaultArguments.md#fetch)

***

### icon\_emoji?

```ts
optional icon_emoji: string;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:154](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L154)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`icon_emoji`](IncomingWebhookDefaultArguments.md#icon_emoji)

***

### icon\_url?

```ts
optional icon_url: string;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:155](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L155)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`icon_url`](IncomingWebhookDefaultArguments.md#icon_url)

***

### link\_names?

```ts
optional link_names: boolean;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:158](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L158)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`link_names`](IncomingWebhookDefaultArguments.md#link_names)

***

### metadata?

```ts
optional metadata: object;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:169](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L169)

#### event\_payload

```ts
event_payload: Record<string, any>;
```

#### event\_type

```ts
event_type: string;
```

***

### retryConfig?

```ts
optional retryConfig: RetryOptions;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:161](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L161)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`retryConfig`](IncomingWebhookDefaultArguments.md#retryconfig)

***

### text?

```ts
optional text: string;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:157](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L157)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`text`](IncomingWebhookDefaultArguments.md#text)

***

### timeout?

```ts
optional timeout: number;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:160](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L160)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`timeout`](IncomingWebhookDefaultArguments.md#timeout)

***

### unfurl\_links?

```ts
optional unfurl_links: boolean;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:167](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L167)

***

### unfurl\_media?

```ts
optional unfurl_media: boolean;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:168](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L168)

***

### username?

```ts
optional username: string;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:153](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L153)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`username`](IncomingWebhookDefaultArguments.md#username)
