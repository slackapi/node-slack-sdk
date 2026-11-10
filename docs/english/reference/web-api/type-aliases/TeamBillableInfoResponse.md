[@slack/web-api](../index.md) / TeamBillableInfoResponse

# Type Alias: TeamBillableInfoResponse

```ts
type TeamBillableInfoResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/TeamBillableInfoResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/TeamBillableInfoResponse.ts#L11)

## Type Declaration

### billable\_info?

```ts
billable_info?: object;
```

#### Index Signature

```ts
[key: string]: BillableInfo
```

### error?

```ts
error?: string;
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

### warning?

```ts
warning?: string;
```
