[@slack/logger](../index.md) / Logger

# Interface: Logger

Defined in: [index.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L14)

Interface for objects where objects in this package's logs can be sent (can be used as `logger` option).

## Methods

### debug()

```ts
debug(...msg): void;
```

Defined in: [index.ts:20](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L20)

Output debug message

#### Parameters

##### msg

...`any`[]

any data to log

#### Returns

`void`

***

### error()

```ts
error(...msg): void;
```

Defined in: [index.ts:41](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L41)

Output error message

#### Parameters

##### msg

...`any`[]

any data to log

#### Returns

`void`

***

### getLevel()

```ts
getLevel(): LogLevel;
```

Defined in: [index.ts:53](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L53)

Return the current LogLevel.

#### Returns

[`LogLevel`](../enumerations/LogLevel.md)

***

### info()

```ts
info(...msg): void;
```

Defined in: [index.ts:27](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L27)

Output info message

#### Parameters

##### msg

...`any`[]

any data to log

#### Returns

`void`

***

### setLevel()

```ts
setLevel(level): void;
```

Defined in: [index.ts:48](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L48)

This disables all logging below the given level, so that after a log.setLevel("warn") call log.warn("something")
or log.error("something") will output messages, but log.info("something") will not.

#### Parameters

##### level

[`LogLevel`](../enumerations/LogLevel.md)

as a string, like 'error' (case-insensitive)

#### Returns

`void`

***

### setName()

```ts
setName(name): void;
```

Defined in: [index.ts:60](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L60)

This allows the instance to be named so that they can easily be filtered when many loggers are sending output
to the same destination.

#### Parameters

##### name

`string`

as a string, will be output with every log after the level

#### Returns

`void`

***

### warn()

```ts
warn(...msg): void;
```

Defined in: [index.ts:34](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L34)

Output warn message

#### Parameters

##### msg

...`any`[]

any data to log

#### Returns

`void`
