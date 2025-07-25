[@slack/web-api](../index.md) / WebClientOptions

# Interface: WebClientOptions

Defined in: [src/WebClient.ts:79](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L79)

## Properties

### adapter?

```ts
optional adapter: AxiosAdapter;
```

Defined in: [src/WebClient.ts:126](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L126)

Custom functions for modifing and handling outgoing requests.
Useful if you would like to manage outgoing request with a custom http client.
See [Axios adapter documentation](https://github.com/axios/axios/blob/v1.x/README.md?plain=1#L586) for more information.

#### Default

```ts
undefined
```

***

### agent?

```ts
optional agent: Agent;
```

Defined in: [src/WebClient.ts:91](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L91)

***

### allowAbsoluteUrls?

```ts
optional allowAbsoluteUrls: boolean;
```

Defined in: [src/WebClient.ts:105](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L105)

Determines if a dynamic method name being an absolute URL overrides the configured slackApiUrl.
When set to false, the URL used in Slack API requests will always begin with the slackApiUrl.

See [https://tools.slack.dev/node-slack-sdk/web-api#call-a-method](https://tools.slack.dev/node-slack-sdk/web-api#call-a-method) for more details.
See [https://github.com/axios/axios?tab=readme-ov-file#request-config](https://github.com/axios/axios?tab=readme-ov-file#request-config) for more details.

#### Default

```ts
true
```

***

### attachOriginalToWebAPIRequestError?

```ts
optional attachOriginalToWebAPIRequestError: boolean;
```

Defined in: [src/WebClient.ts:112](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L112)

Indicates whether to attach the original error to a Web API request error.
When set to true, the original error object will be attached to the Web API request error.

#### Default

```ts
true
```

***

### headers?

```ts
optional headers: Record<string, string>;
```

Defined in: [src/WebClient.ts:95](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L95)

***

### logger?

```ts
optional logger: Logger;
```

Defined in: [src/WebClient.ts:87](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L87)

***

### logLevel?

```ts
optional logLevel: LogLevel;
```

Defined in: [src/WebClient.ts:88](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L88)

***

### maxRequestConcurrency?

```ts
optional maxRequestConcurrency: number;
```

Defined in: [src/WebClient.ts:89](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L89)

***

### rejectRateLimitedCalls?

```ts
optional rejectRateLimitedCalls: boolean;
```

Defined in: [src/WebClient.ts:94](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L94)

***

### requestInterceptor?

```ts
optional requestInterceptor: RequestInterceptor;
```

Defined in: [src/WebClient.ts:118](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L118)

Custom function to modify outgoing requests. See [Axios interceptor documentation](https://axios-http.com/docs/interceptors) for more details.

#### Default

```ts
undefined
```

***

### retryConfig?

```ts
optional retryConfig: RetryOptions;
```

Defined in: [src/WebClient.ts:90](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L90)

***

### slackApiUrl?

```ts
optional slackApiUrl: string;
```

Defined in: [src/WebClient.ts:86](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L86)

The base URL requests are sent to. Often unchanged, but might be set for testing techniques.

See [https://tools.slack.dev/node-slack-sdk/web-api/#custom-api-url](https://tools.slack.dev/node-slack-sdk/web-api/#custom-api-url) for more information.

#### Default

```ts
https://slack.com/api/
```

***

### teamId?

```ts
optional teamId: string;
```

Defined in: [src/WebClient.ts:96](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L96)

***

### timeout?

```ts
optional timeout: number;
```

Defined in: [src/WebClient.ts:93](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L93)

***

### tls?

```ts
optional tls: TLSOptions;
```

Defined in: [src/WebClient.ts:92](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L92)
