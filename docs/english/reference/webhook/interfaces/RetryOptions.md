[@slack/webhook](../index.md) / RetryOptions

# Interface: RetryOptions

Defined in: [packages/webhook/src/retry-policies.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/retry-policies.ts#L6)

Options to create retry policies. Extends from https://github.com/tim-kos/node-retry.

## Extends

- `WrapOptions`

## Properties

### factor?

```ts
factor?: number;
```

Defined in: packages/webhook/node\_modules/@types/retry/index.d.ts:119

The exponential factor to use.

#### Default

```ts
2
```

#### Inherited from

`WrapOptions.factor`

***

### forever?

```ts
forever?: boolean;
```

Defined in: packages/webhook/node\_modules/@types/retry/index.d.ts:82

Whether to retry forever.

#### Default

```ts
false
```

#### Inherited from

`WrapOptions.forever`

***

### maxRetryTime?

```ts
maxRetryTime?: number;
```

Defined in: packages/webhook/node\_modules/@types/retry/index.d.ts:92

The maximum time (in milliseconds) that the retried operation is allowed to run.

#### Default

```ts
Infinity
```

#### Inherited from

`WrapOptions.maxRetryTime`

***

### maxTimeout?

```ts
maxTimeout?: number;
```

Defined in: packages/webhook/node\_modules/@types/retry/index.d.ts:129

The maximum number of milliseconds between two retries.

#### Default

```ts
Infinity
```

#### Inherited from

`WrapOptions.maxTimeout`

***

### minTimeout?

```ts
minTimeout?: number;
```

Defined in: packages/webhook/node\_modules/@types/retry/index.d.ts:124

The number of milliseconds before starting the first retry.

#### Default

```ts
1000
```

#### Inherited from

`WrapOptions.minTimeout`

***

### randomize?

```ts
randomize?: boolean;
```

Defined in: packages/webhook/node\_modules/@types/retry/index.d.ts:134

Randomizes the timeouts by multiplying a factor between 1-2.

#### Default

```ts
false
```

#### Inherited from

`WrapOptions.randomize`

***

### retries?

```ts
retries?: number;
```

Defined in: packages/webhook/node\_modules/@types/retry/index.d.ts:103

The maximum amount of times to retry the operation.

#### Default

```ts
10
```

#### Inherited from

`WrapOptions.retries`

***

### unref?

```ts
unref?: boolean;
```

Defined in: packages/webhook/node\_modules/@types/retry/index.d.ts:87

Whether to [unref](https://nodejs.org/api/timers.html#timers_unref) the setTimeout's.

#### Default

```ts
false
```

#### Inherited from

`WrapOptions.unref`
