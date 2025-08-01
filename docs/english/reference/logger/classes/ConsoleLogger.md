[@slack/logger](../index.md) / ConsoleLogger

# Class: ConsoleLogger

Defined in: [index.ts:66](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L66)

Default logger which logs to stdout and stderr

## Implements

- [`Logger`](../interfaces/Logger.md)

## Constructors

### Constructor

```ts
new ConsoleLogger(): ConsoleLogger;
```

Defined in: [index.ts:88](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L88)

#### Returns

`ConsoleLogger`

## Methods

### debug()

```ts
debug(...msg): void;
```

Defined in: [index.ts:115](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L115)

Log a debug message

#### Parameters

##### msg

...`any`[]

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`debug`](../interfaces/Logger.md#debug)

***

### error()

```ts
error(...msg): void;
```

Defined in: [index.ts:145](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L145)

Log an error message

#### Parameters

##### msg

...`any`[]

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`error`](../interfaces/Logger.md#error)

***

### getLevel()

```ts
getLevel(): LogLevel;
```

Defined in: [index.ts:93](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L93)

Return the current LogLevel.

#### Returns

[`LogLevel`](../enumerations/LogLevel.md)

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`getLevel`](../interfaces/Logger.md#getlevel)

***

### info()

```ts
info(...msg): void;
```

Defined in: [index.ts:125](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L125)

Log an info message

#### Parameters

##### msg

...`any`[]

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`info`](../interfaces/Logger.md#info)

***

### setLevel()

```ts
setLevel(level): void;
```

Defined in: [index.ts:100](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L100)

Sets the instance's log level so that only messages which are equal or more severe are output to the console.

#### Parameters

##### level

[`LogLevel`](../enumerations/LogLevel.md)

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`setLevel`](../interfaces/Logger.md#setlevel)

***

### setName()

```ts
setName(name): void;
```

Defined in: [index.ts:107](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L107)

Set the instance's name, which will appear on each log line before the message.

#### Parameters

##### name

`string`

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`setName`](../interfaces/Logger.md#setname)

***

### warn()

```ts
warn(...msg): void;
```

Defined in: [index.ts:135](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L135)

Log a warning message

#### Parameters

##### msg

...`any`[]

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`warn`](../interfaces/Logger.md#warn)
