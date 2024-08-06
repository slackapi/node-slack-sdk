# Class: ConsoleLogger

Default logger which logs to stdout and stderr

## Implements

- [`Logger`](Interface.Logger.md)

## Constructors

### new ConsoleLogger()

```ts
new ConsoleLogger(): ConsoleLogger
```

#### Returns

[`ConsoleLogger`](Class.ConsoleLogger.md)

#### Defined in

[index.ts:90](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L90)

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

[`Logger`](Interface.Logger.md).[`debug`](Interface.Logger.md#debug)

#### Defined in

[index.ts:117](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L117)

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

[`Logger`](Interface.Logger.md).[`error`](Interface.Logger.md#error)

#### Defined in

[index.ts:147](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L147)

***

### getLevel()

```ts
getLevel(): LogLevel
```

Return the current LogLevel.

#### Returns

[`LogLevel`](Enumeration.LogLevel.md)

#### Implementation of

[`Logger`](Interface.Logger.md).[`getLevel`](Interface.Logger.md#getlevel)

#### Defined in

[index.ts:95](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L95)

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

[`Logger`](Interface.Logger.md).[`info`](Interface.Logger.md#info)

#### Defined in

[index.ts:127](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L127)

***

### setLevel()

```ts
setLevel(level): void
```

Sets the instance's log level so that only messages which are equal or more severe are output to the console.

#### Parameters

• **level**: [`LogLevel`](Enumeration.LogLevel.md)

#### Returns

`void`

#### Implementation of

[`Logger`](Interface.Logger.md).[`setLevel`](Interface.Logger.md#setlevel)

#### Defined in

[index.ts:102](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L102)

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

[`Logger`](Interface.Logger.md).[`setName`](Interface.Logger.md#setname)

#### Defined in

[index.ts:109](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L109)

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

[`Logger`](Interface.Logger.md).[`warn`](Interface.Logger.md#warn)

#### Defined in

[index.ts:137](https://github.com/slackapi/node-slack-sdk/blob/main/packages/logger/src/index.ts#L137)
