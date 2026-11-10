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
hint?: PlainTextElement;
```

Defined in: [message-metadata.ts:115](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L115)

***

### number?

```ts
number?: object;
```

Defined in: [message-metadata.ts:124](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L124)

#### is\_decimal\_allowed?

```ts
is_decimal_allowed?: boolean;
```

#### max\_value?

```ts
max_value?: number;
```

#### min\_value?

```ts
min_value?: number;
```

***

### optional?

```ts
optional?: boolean;
```

Defined in: [message-metadata.ts:116](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L116)

***

### placeholder?

```ts
placeholder?: PlainTextElement;
```

Defined in: [message-metadata.ts:114](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L114)

***

### select?

```ts
select?: object;
```

Defined in: [message-metadata.ts:117](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L117)

#### current\_value?

```ts
current_value?: string;
```

#### current\_values?

```ts
current_values?: string[];
```

#### fetch\_options\_dynamically?

```ts
fetch_options_dynamically?: boolean;
```

#### min\_query\_length?

```ts
min_query_length?: number;
```

#### static\_options?

```ts
static_options?: Option[];
```

***

### text?

```ts
text?: object;
```

Defined in: [message-metadata.ts:129](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L129)

#### max\_length?

```ts
max_length?: number;
```

#### min\_length?

```ts
min_length?: number;
```
