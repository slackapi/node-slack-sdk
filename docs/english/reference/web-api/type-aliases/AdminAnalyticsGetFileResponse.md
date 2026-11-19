[@slack/web-api](../index.md) / AdminAnalyticsGetFileResponse

# Type Alias: AdminAnalyticsGetFileResponse

```ts
type AdminAnalyticsGetFileResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/AdminAnalyticsGetFileResponse.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminAnalyticsGetFileResponse.ts#L4)

## Type Declaration

### error?

```ts
error?: string;
```

### file\_data?

```ts
file_data?: (
  | AdminAnalyticsMemberDetails
  | AdminAnalyticsPublicChannelDetails
  | AdminAnalyticsPublicChannelMetadataDetails)[];
```

### needed?

```ts
needed?: string;
```

### ok?

```ts
ok?: boolean;
```

### provided?

```ts
provided?: string;
```

### response\_metadata?

```ts
response_metadata?: ResponseMetadata;
```
