[@slack/webhook](../index.md) / IncomingWebhookSendArguments

# Interface: IncomingWebhookSendArguments

Defined in: [src/IncomingWebhook.ts:111](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L111)

## Extends

- [`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md)

## Properties

### agent?

```ts
optional agent: Agent;
```

Defined in: [src/IncomingWebhook.ts:107](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L107)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`agent`](IncomingWebhookDefaultArguments.md#agent)

***

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: [src/IncomingWebhook.ts:112](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L112)

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: [src/IncomingWebhook.ts:113](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L113)

***

### channel?

```ts
optional channel: string;
```

Defined in: [src/IncomingWebhook.ts:104](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L104)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`channel`](IncomingWebhookDefaultArguments.md#channel)

***

### icon\_emoji?

```ts
optional icon_emoji: string;
```

Defined in: [src/IncomingWebhook.ts:102](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L102)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`icon_emoji`](IncomingWebhookDefaultArguments.md#icon_emoji)

***

### icon\_url?

```ts
optional icon_url: string;
```

Defined in: [src/IncomingWebhook.ts:103](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L103)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`icon_url`](IncomingWebhookDefaultArguments.md#icon_url)

***

### link\_names?

```ts
optional link_names: boolean;
```

Defined in: [src/IncomingWebhook.ts:106](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L106)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`link_names`](IncomingWebhookDefaultArguments.md#link_names)

***

### metadata?

```ts
optional metadata: object;
```

Defined in: [src/IncomingWebhook.ts:116](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L116)

#### event\_payload

```ts
event_payload: Record<string, any>;
```

#### event\_type

```ts
event_type: string;
```

***

### text?

```ts
optional text: string;
```

Defined in: [src/IncomingWebhook.ts:105](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L105)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`text`](IncomingWebhookDefaultArguments.md#text)

***

### timeout?

```ts
optional timeout: number;
```

Defined in: [src/IncomingWebhook.ts:108](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L108)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`timeout`](IncomingWebhookDefaultArguments.md#timeout)

***

### unfurl\_links?

```ts
optional unfurl_links: boolean;
```

Defined in: [src/IncomingWebhook.ts:114](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L114)

***

### unfurl\_media?

```ts
optional unfurl_media: boolean;
```

Defined in: [src/IncomingWebhook.ts:115](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L115)

***

### username?

```ts
optional username: string;
```

Defined in: [src/IncomingWebhook.ts:101](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L101)

#### Inherited from

[`IncomingWebhookDefaultArguments`](IncomingWebhookDefaultArguments.md).[`username`](IncomingWebhookDefaultArguments.md#username)
