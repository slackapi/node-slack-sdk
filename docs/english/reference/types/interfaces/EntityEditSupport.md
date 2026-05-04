[@slack/types](../index.md) / EntityEditSupport

# Interface: EntityEditSupport

Defined in: [message-metadata.ts:112](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L112)

## Properties

### enabled

```ts
enabled: boolean;
```

Defined in: [message-metadata.ts:113](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L113)

***

### hint?

```ts
optional hint: PlainTextElement;
```

Defined in: [message-metadata.ts:115](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L115)

***

### number?

```ts
optional number: object;
```

Defined in: [message-metadata.ts:124](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L124)

#### is\_decimal\_allowed?

```ts
optional is_decimal_allowed: boolean;
```

#### max\_value?

```ts
optional max_value: number;
```

#### min\_value?

```ts
optional min_value: number;
```

***

### optional?

```ts
optional optional: boolean;
```

Defined in: [message-metadata.ts:116](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L116)

***

### placeholder?

```ts
optional placeholder: PlainTextElement;
```

Defined in: [message-metadata.ts:114](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L114)

***

### select?

```ts
optional select: object;
```

Defined in: [message-metadata.ts:117](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L117)

#### current\_value?

```ts
optional current_value: string;
```

#### current\_values?

```ts
optional current_values: string[];
```

#### fetch\_options\_dynamically?

```ts
optional fetch_options_dynamically: boolean;
```

#### min\_query\_length?

```ts
optional min_query_length: number;
```

#### static\_options?

```ts
optional static_options: Option[];
```

***

### text?

```ts
optional text: object;
```

Defined in: [message-metadata.ts:129](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L129)

#### max\_length?

```ts
optional max_length: number;
```

#### min\_length?

```ts
optional min_length: number;
```
