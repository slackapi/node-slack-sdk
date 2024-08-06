# Interface: RetryOptions

Options to create retry policies. Extends from https://github.com/tim-kos/node-retry.

## Extends

- `OperationOptions`

## Properties

### factor?

```ts
optional factor: number;
```

The exponential factor to use.

#### Default

```ts
2
```

#### Inherited from

`OperationOptions.factor`

#### Defined in

packages/web-api/node\_modules/@types/retry/index.d.ts:125

***

### forever?

```ts
optional forever: boolean;
```

Whether to retry forever.

#### Default

```ts
false
```

#### Inherited from

`OperationOptions.forever`

#### Defined in

packages/web-api/node\_modules/@types/retry/index.d.ts:88

***

### maxRetryTime?

```ts
optional maxRetryTime: number;
```

The maximum time (in milliseconds) that the retried operation is allowed to run.

#### Default

```ts
Infinity
```

#### Inherited from

`OperationOptions.maxRetryTime`

#### Defined in

packages/web-api/node\_modules/@types/retry/index.d.ts:98

***

### maxTimeout?

```ts
optional maxTimeout: number;
```

The maximum number of milliseconds between two retries.

#### Default

```ts
Infinity
```

#### Inherited from

`OperationOptions.maxTimeout`

#### Defined in

packages/web-api/node\_modules/@types/retry/index.d.ts:135

***

### minTimeout?

```ts
optional minTimeout: number;
```

The number of milliseconds before starting the first retry.

#### Default

```ts
1000
```

#### Inherited from

`OperationOptions.minTimeout`

#### Defined in

packages/web-api/node\_modules/@types/retry/index.d.ts:130

***

### randomize?

```ts
optional randomize: boolean;
```

Randomizes the timeouts by multiplying a factor between 1-2.

#### Default

```ts
false
```

#### Inherited from

`OperationOptions.randomize`

#### Defined in

packages/web-api/node\_modules/@types/retry/index.d.ts:140

***

### retries?

```ts
optional retries: number;
```

The maximum amount of times to retry the operation.

#### Default

```ts
10
```

#### Inherited from

`OperationOptions.retries`

#### Defined in

packages/web-api/node\_modules/@types/retry/index.d.ts:109

***

### unref?

```ts
optional unref: boolean;
```

Whether to [unref](https://nodejs.org/api/timers.html#timers_unref) the setTimeout's.

#### Default

```ts
false
```

#### Inherited from

`OperationOptions.unref`

#### Defined in

packages/web-api/node\_modules/@types/retry/index.d.ts:93
