[@slack/web-api](../index.md) / WebClientOptions

# Interface: WebClientOptions

Defined in: [packages/web-api/src/WebClient.ts:42](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L42)

## Properties

### allowAbsoluteUrls?

```ts
allowAbsoluteUrls?: boolean;
```

Defined in: [packages/web-api/src/WebClient.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L70)

Determines if a dynamic method name being an absolute URL overrides the configured slackApiUrl.
When set to false, the URL used in Slack API requests will always begin with the slackApiUrl.

See [https://docs.slack.dev/tools/node-slack-sdk/web-api/#call-a-method](https://docs.slack.dev/tools/node-slack-sdk/web-api/#call-a-method) for more details.

#### Default

```ts
true
```

***

### fetch?

```ts
fetch?: FetchFunction;
```

Defined in: [packages/web-api/src/WebClient.ts:58](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L58)

A custom `fetch` implementation conforming to the WHATWG Fetch standard.
Defaults to `globalThis.fetch`. Use this to configure proxies, TLS, or other transport-level behavior.

***

### headers?

```ts
headers?: Record<string, string>;
```

Defined in: [packages/web-api/src/WebClient.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L61)

***

### logger?

```ts
logger?: Logger;
```

Defined in: [packages/web-api/src/WebClient.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L50)

***

### logLevel?

```ts
logLevel?: LogLevel;
```

Defined in: [packages/web-api/src/WebClient.ts:51](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L51)

***

### maxRequestConcurrency?

```ts
maxRequestConcurrency?: number;
```

Defined in: [packages/web-api/src/WebClient.ts:52](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L52)

***

### rejectRateLimitedCalls?

```ts
rejectRateLimitedCalls?: boolean;
```

Defined in: [packages/web-api/src/WebClient.ts:60](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L60)

***

### retryConfig?

```ts
retryConfig?: RetryOptions;
```

Defined in: [packages/web-api/src/WebClient.ts:53](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L53)

***

### slackApiUrl?

```ts
slackApiUrl?: string;
```

Defined in: [packages/web-api/src/WebClient.ts:49](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L49)

The base URL requests are sent to. Often unchanged, but might be set for testing techniques.

See [https://docs.slack.dev/tools/node-slack-sdk/web-api/#custom-api-url](https://docs.slack.dev/tools/node-slack-sdk/web-api/#custom-api-url) for more information.

#### Default

```ts
https://slack.com/api/
```

***

### teamId?

```ts
teamId?: string;
```

Defined in: [packages/web-api/src/WebClient.ts:62](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L62)

***

### timeout?

```ts
timeout?: number;
```

Defined in: [packages/web-api/src/WebClient.ts:59](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L59)
