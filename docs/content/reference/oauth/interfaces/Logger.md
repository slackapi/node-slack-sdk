[@slack/oauth](../index.md) / Logger

# Interface: Logger

Defined in: node\_modules/@slack/logger/dist/index.d.ts:13

Interface for objects where objects in this package's logs can be sent (can be used as `logger` option).

## Methods

### debug()

```ts
debug(...msg): void;
```

Defined in: node\_modules/@slack/logger/dist/index.d.ts:18

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

Defined in: node\_modules/@slack/logger/dist/index.d.ts:33

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

Defined in: node\_modules/@slack/logger/dist/index.d.ts:43

Return the current LogLevel.

#### Returns

[`LogLevel`](../enumerations/LogLevel.md)

***

### info()

```ts
info(...msg): void;
```

Defined in: node\_modules/@slack/logger/dist/index.d.ts:23

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

Defined in: node\_modules/@slack/logger/dist/index.d.ts:39

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

Defined in: node\_modules/@slack/logger/dist/index.d.ts:49

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

Defined in: node\_modules/@slack/logger/dist/index.d.ts:28

Output warn message

#### Parameters

##### msg

...`any`[]

any data to log

#### Returns

`void`
