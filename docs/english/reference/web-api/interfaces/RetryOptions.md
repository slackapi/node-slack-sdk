[@slack/web-api](../index.md) / RetryOptions

# Interface: RetryOptions

Defined in: [packages/web-api/src/retry-policies.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/retry-policies.ts#L6)

Options to create retry policies. Extends from https://github.com/tim-kos/node-retry.

## Extends

- `WrapOptions`

## Properties

### factor?

```ts
optional factor?: number;
```

Defined in: packages/web-api/node\_modules/@types/retry/index.d.ts:119

The exponential factor to use.

#### Default

```ts
2
```

#### Inherited from

```ts
WrapOptions.factor
```

***

### forever?

```ts
optional forever?: boolean;
```

Defined in: packages/web-api/node\_modules/@types/retry/index.d.ts:82

Whether to retry forever.

#### Default

```ts
false
```

#### Inherited from

```ts
WrapOptions.forever
```

***

### maxRetryTime?

```ts
optional maxRetryTime?: number;
```

Defined in: packages/web-api/node\_modules/@types/retry/index.d.ts:92

The maximum time (in milliseconds) that the retried operation is allowed to run.

#### Default

```ts
Infinity
```

#### Inherited from

```ts
WrapOptions.maxRetryTime
```

***

### maxTimeout?

```ts
optional maxTimeout?: number;
```

Defined in: packages/web-api/node\_modules/@types/retry/index.d.ts:129

The maximum number of milliseconds between two retries.

#### Default

```ts
Infinity
```

#### Inherited from

```ts
WrapOptions.maxTimeout
```

***

### minTimeout?

```ts
optional minTimeout?: number;
```

Defined in: packages/web-api/node\_modules/@types/retry/index.d.ts:124

The number of milliseconds before starting the first retry.

#### Default

```ts
1000
```

#### Inherited from

```ts
WrapOptions.minTimeout
```

***

### randomize?

```ts
optional randomize?: boolean;
```

Defined in: packages/web-api/node\_modules/@types/retry/index.d.ts:134

Randomizes the timeouts by multiplying a factor between 1-2.

#### Default

```ts
false
```

#### Inherited from

```ts
WrapOptions.randomize
```

***

### retries?

```ts
optional retries?: number;
```

Defined in: packages/web-api/node\_modules/@types/retry/index.d.ts:103

The maximum amount of times to retry the operation.

#### Default

```ts
10
```

#### Inherited from

```ts
WrapOptions.retries
```

***

### unref?

```ts
optional unref?: boolean;
```

Defined in: packages/web-api/node\_modules/@types/retry/index.d.ts:87

Whether to [unref](https://nodejs.org/api/timers.html#timers_unref) the setTimeout's.

#### Default

```ts
false
```

#### Inherited from

```ts
WrapOptions.unref
```
