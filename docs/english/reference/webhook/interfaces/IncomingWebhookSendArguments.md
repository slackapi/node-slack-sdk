[@slack/webhook](../index.md) / IncomingWebhookSendArguments

# Interface: IncomingWebhookSendArguments

Defined in: [packages/webhook/src/IncomingWebhook.ts:189](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L189)

## Extends

- [`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md)

## Properties

### attachments?

```ts
attachments?: MessageAttachment[];
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:190](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L190)

***

### blocks?

```ts
blocks?: (Block | KnownBlock)[];
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:191](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L191)

***

### channel?

```ts
channel?: string;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:179](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L179)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`channel`](IncomingWebhookDefaultArguments.md#channel)

***

### fetch?

```ts
fetch?: FetchFunction;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:182](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L182)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`fetch`](IncomingWebhookDefaultArguments.md#fetch)

***

### icon\_emoji?

```ts
icon_emoji?: string;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:177](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L177)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`icon_emoji`](IncomingWebhookDefaultArguments.md#icon_emoji)

***

### icon\_url?

```ts
icon_url?: string;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:178](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L178)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`icon_url`](IncomingWebhookDefaultArguments.md#icon_url)

***

### link\_names?

```ts
link_names?: boolean;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:181](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L181)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`link_names`](IncomingWebhookDefaultArguments.md#link_names)

***

### logger?

```ts
logger?: Logger;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:185](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L185)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`logger`](IncomingWebhookDefaultArguments.md#logger)

***

### logLevel?

```ts
logLevel?: LogLevel;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:186](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L186)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`logLevel`](IncomingWebhookDefaultArguments.md#loglevel)

***

### metadata?

```ts
metadata?: object;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:194](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L194)

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
retryConfig?: RetryOptions;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:184](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L184)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`retryConfig`](IncomingWebhookDefaultArguments.md#retryconfig)

***

### text?

```ts
text?: string;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:180](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L180)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`text`](IncomingWebhookDefaultArguments.md#text)

***

### timeout?

```ts
timeout?: number;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:183](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L183)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`timeout`](IncomingWebhookDefaultArguments.md#timeout)

***

### unfurl\_links?

```ts
unfurl_links?: boolean;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:192](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L192)

***

### unfurl\_media?

```ts
unfurl_media?: boolean;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:193](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L193)

***

### username?

```ts
username?: string;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:176](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L176)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`username`](IncomingWebhookDefaultArguments.md#username)
