[@slack/webhook](../index.md) / IncomingWebhookSendArguments

# Interface: IncomingWebhookSendArguments

Defined in: [packages/webhook/src/IncomingWebhook.ts:127](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L127)

## Extends

- [`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md)

## Properties

### agent?

```ts
optional agent: Agent;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:122](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L122)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`agent`](IncomingWebhookDefaultArguments.md#agent)

***

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:128](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L128)

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:129](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L129)

***

### channel?

```ts
optional channel: string;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:119](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L119)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`channel`](IncomingWebhookDefaultArguments.md#channel)

***

### icon\_emoji?

```ts
optional icon_emoji: string;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:117](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L117)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`icon_emoji`](IncomingWebhookDefaultArguments.md#icon_emoji)

***

### icon\_url?

```ts
optional icon_url: string;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:118](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L118)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`icon_url`](IncomingWebhookDefaultArguments.md#icon_url)

***

### link\_names?

```ts
optional link_names: boolean;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:121](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L121)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`link_names`](IncomingWebhookDefaultArguments.md#link_names)

***

### metadata?

```ts
optional metadata: object;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:132](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L132)

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

Defined in: [packages/webhook/src/IncomingWebhook.ts:123](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L123)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`retryConfig`](IncomingWebhookDefaultArguments.md#retryconfig)

***

### text?

```ts
optional text: string;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:120](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L120)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`text`](IncomingWebhookDefaultArguments.md#text)

***

### timeout?

```ts
optional timeout: number;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:124](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L124)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`timeout`](IncomingWebhookDefaultArguments.md#timeout)

***

### unfurl\_links?

```ts
optional unfurl_links: boolean;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:130](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L130)

***

### unfurl\_media?

```ts
optional unfurl_media: boolean;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:131](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L131)

***

### username?

```ts
optional username: string;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:116](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L116)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`username`](IncomingWebhookDefaultArguments.md#username)
