[@slack/web-api](../index.md) / AdminAnalyticsGetFileResponse

# Type Alias: AdminAnalyticsGetFileResponse

```ts
type AdminAnalyticsGetFileResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/AdminAnalyticsGetFileResponse.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminAnalyticsGetFileResponse.ts#L4)

## Type declaration

### error?

```ts
optional error: string;
```

### file\_data?

```ts
optional file_data: (
  | AdminAnalyticsMemberDetails
  | AdminAnalyticsPublicChannelDetails
  | AdminAnalyticsPublicChannelMetadataDetails)[];
```

### needed?

```ts
optional needed: string;
```

### ok?

```ts
optional ok: boolean;
```

### provided?

```ts
optional provided: string;
```

### response\_metadata?

```ts
optional response_metadata: ResponseMetadata;
```
