# Interface: Logger

Interface for objects where objects in this package's logs can be sent (can be used as `logger` option).

## Methods

### debug()

```ts
debug(...msg): void
```

Output debug message

#### Parameters

• ...**msg**: `any`[]

any data to log

#### Returns

`void`

#### Defined in

[index.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L22)

***

### error()

```ts
error(...msg): void
```

Output error message

#### Parameters

• ...**msg**: `any`[]

any data to log

#### Returns

`void`

#### Defined in

[index.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L43)

***

### getLevel()

```ts
getLevel(): LogLevel
```

Return the current LogLevel.

#### Returns

[`LogLevel`](../enumerations/LogLevel.md)

#### Defined in

[index.ts:55](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L55)

***

### info()

```ts
info(...msg): void
```

Output info message

#### Parameters

• ...**msg**: `any`[]

any data to log

#### Returns

`void`

#### Defined in

[index.ts:29](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L29)

***

### setLevel()

```ts
setLevel(level): void
```

This disables all logging below the given level, so that after a log.setLevel("warn") call log.warn("something")
or log.error("something") will output messages, but log.info("something") will not.

#### Parameters

• **level**: [`LogLevel`](../enumerations/LogLevel.md)

as a string, like 'error' (case-insensitive)

#### Returns

`void`

#### Defined in

[index.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L50)

***

### setName()

```ts
setName(name): void
```

This allows the instance to be named so that they can easily be filtered when many loggers are sending output
to the same destination.

#### Parameters

• **name**: `string`

as a string, will be output with every log after the level

#### Returns

`void`

#### Defined in

[index.ts:62](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L62)

***

### warn()

```ts
warn(...msg): void
```

Output warn message

#### Parameters

• ...**msg**: `any`[]

any data to log

#### Returns

`void`

#### Defined in

[index.ts:36](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L36)
