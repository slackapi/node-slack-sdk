# Class: ConsoleLogger

Default logger which logs to stdout and stderr

## Implements

- [`Logger`](../interfaces/Logger.md)

## Constructors

### new ConsoleLogger()

```ts
new ConsoleLogger(): ConsoleLogger
```

#### Returns

[`ConsoleLogger`](ConsoleLogger.md)

#### Defined in

[index.ts:90](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/logger/src/index.ts#L90)

## Methods

### debug()

```ts
debug(...msg): void
```

Log a debug message

#### Parameters

• ...**msg**: `any`[]

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`debug`](../interfaces/Logger.md#debug)

#### Defined in

[index.ts:117](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/logger/src/index.ts#L117)

***

### error()

```ts
error(...msg): void
```

Log an error message

#### Parameters

• ...**msg**: `any`[]

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`error`](../interfaces/Logger.md#error)

#### Defined in

[index.ts:147](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/logger/src/index.ts#L147)

***

### getLevel()

```ts
getLevel(): LogLevel
```

Return the current LogLevel.

#### Returns

[`LogLevel`](../enumerations/LogLevel.md)

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`getLevel`](../interfaces/Logger.md#getlevel)

#### Defined in

[index.ts:95](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/logger/src/index.ts#L95)

***

### info()

```ts
info(...msg): void
```

Log an info message

#### Parameters

• ...**msg**: `any`[]

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`info`](../interfaces/Logger.md#info)

#### Defined in

[index.ts:127](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/logger/src/index.ts#L127)

***

### setLevel()

```ts
setLevel(level): void
```

Sets the instance's log level so that only messages which are equal or more severe are output to the console.

#### Parameters

• **level**: [`LogLevel`](../enumerations/LogLevel.md)

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`setLevel`](../interfaces/Logger.md#setlevel)

#### Defined in

[index.ts:102](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/logger/src/index.ts#L102)

***

### setName()

```ts
setName(name): void
```

Set the instance's name, which will appear on each log line before the message.

#### Parameters

• **name**: `string`

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`setName`](../interfaces/Logger.md#setname)

#### Defined in

[index.ts:109](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/logger/src/index.ts#L109)

***

### warn()

```ts
warn(...msg): void
```

Log a warning message

#### Parameters

• ...**msg**: `any`[]

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`warn`](../interfaces/Logger.md#warn)

#### Defined in

[index.ts:137](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/logger/src/index.ts#L137)
