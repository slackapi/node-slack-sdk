[@slack/web-api](../index.md) / retryPolicies

# Variable: retryPolicies

```ts
const retryPolicies: object;
```

Defined in: [packages/web-api/src/retry-policies.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/retry-policies.ts#L35)

## Type Declaration

### fiveRetriesInFiveMinutes

```ts
fiveRetriesInFiveMinutes: RetryOptions;
```

Short & sweet, five retries in five minutes and then bail.

### rapidRetryPolicy

```ts
rapidRetryPolicy: RetryOptions;
```

This policy is just to keep the tests running fast.

### tenRetriesInAboutThirtyMinutes

```ts
tenRetriesInAboutThirtyMinutes: RetryOptions;
```

The default retry policy. Retry up to 10 times, over the span of about 30 minutes. It's not exact because
randomization has been added to prevent a stampeding herd problem (if all instances in your application are retrying
a request at the exact same intervals, they are more likely to cause failures for each other).
