# Interface: WebClientOptions

## Properties

### agent?

```ts
optional agent: Agent;
```

#### Defined in

[packages/web-api/src/WebClient.ts:68](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/WebClient.ts#L68)

***

### attachOriginalToWebAPIRequestError?

```ts
optional attachOriginalToWebAPIRequestError: boolean;
```

Indicates whether to attach the original error to a Web API request error.
When set to true, the original error object will be attached to the Web API request error.

#### Default

```ts
true
```

#### Defined in

[packages/web-api/src/WebClient.ts:80](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/WebClient.ts#L80)

***

### headers?

```ts
optional headers: Record<string, string>;
```

#### Defined in

[packages/web-api/src/WebClient.ts:72](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/WebClient.ts#L72)

***

### logLevel?

```ts
optional logLevel: LogLevel;
```

#### Defined in

[packages/web-api/src/WebClient.ts:65](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/WebClient.ts#L65)

***

### logger?

```ts
optional logger: Logger;
```

#### Defined in

[packages/web-api/src/WebClient.ts:64](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/WebClient.ts#L64)

***

### maxRequestConcurrency?

```ts
optional maxRequestConcurrency: number;
```

#### Defined in

[packages/web-api/src/WebClient.ts:66](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/WebClient.ts#L66)

***

### rejectRateLimitedCalls?

```ts
optional rejectRateLimitedCalls: boolean;
```

#### Defined in

[packages/web-api/src/WebClient.ts:71](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/WebClient.ts#L71)

***

### retryConfig?

```ts
optional retryConfig: RetryOptions;
```

#### Defined in

[packages/web-api/src/WebClient.ts:67](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/WebClient.ts#L67)

***

### slackApiUrl?

```ts
optional slackApiUrl: string;
```

#### Defined in

[packages/web-api/src/WebClient.ts:63](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/WebClient.ts#L63)

***

### teamId?

```ts
optional teamId: string;
```

#### Defined in

[packages/web-api/src/WebClient.ts:73](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/WebClient.ts#L73)

***

### timeout?

```ts
optional timeout: number;
```

#### Defined in

[packages/web-api/src/WebClient.ts:70](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/WebClient.ts#L70)

***

### tls?

```ts
optional tls: TLSOptions;
```

#### Defined in

[packages/web-api/src/WebClient.ts:69](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/WebClient.ts#L69)
