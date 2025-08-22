[@slack/web-api](../index.md) / RetryOptions

# Interface: RetryOptions

Defined in: [src/retry-policies.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/retry-policies.ts#L6)

Options to create retry policies. Extends from https://github.com/tim-kos/node-retry.

## Extends

- `OperationOptions`

## Properties

### factor?

```ts
optional factor: number;
```

Defined in: node\_modules/@types/retry/index.d.ts:125

The exponential factor to use.

#### Default

```ts
2
```

#### Inherited from

```ts
OperationOptions.factor
```

***

### forever?

```ts
optional forever: boolean;
```

Defined in: node\_modules/@types/retry/index.d.ts:88

Whether to retry forever.

#### Default

```ts
false
```

#### Inherited from

```ts
OperationOptions.forever
```

***

### maxRetryTime?

```ts
optional maxRetryTime: number;
```

Defined in: node\_modules/@types/retry/index.d.ts:98

The maximum time (in milliseconds) that the retried operation is allowed to run.

#### Default

```ts
Infinity
```

#### Inherited from

```ts
OperationOptions.maxRetryTime
```

***

### maxTimeout?

```ts
optional maxTimeout: number;
```

Defined in: node\_modules/@types/retry/index.d.ts:135

The maximum number of milliseconds between two retries.

#### Default

```ts
Infinity
```

#### Inherited from

```ts
OperationOptions.maxTimeout
```

***

### minTimeout?

```ts
optional minTimeout: number;
```

Defined in: node\_modules/@types/retry/index.d.ts:130

The number of milliseconds before starting the first retry.

#### Default

```ts
1000
```

#### Inherited from

```ts
OperationOptions.minTimeout
```

***

### randomize?

```ts
optional randomize: boolean;
```

Defined in: node\_modules/@types/retry/index.d.ts:140

Randomizes the timeouts by multiplying a factor between 1-2.

#### Default

```ts
false
```

#### Inherited from

```ts
OperationOptions.randomize
```

***

### retries?

```ts
optional retries: number;
```

Defined in: node\_modules/@types/retry/index.d.ts:109

The maximum amount of times to retry the operation.

#### Default

```ts
10
```

#### Inherited from

```ts
OperationOptions.retries
```

***

### unref?

```ts
optional unref: boolean;
```

Defined in: node\_modules/@types/retry/index.d.ts:93

Whether to [unref](https://nodejs.org/api/timers.html#timers_unref) the setTimeout's.

#### Default

```ts
false
```

#### Inherited from

```ts
OperationOptions.unref
```
