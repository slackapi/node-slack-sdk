[@slack/web-api](../index.md) / TeamBillableInfoResponse

# Type Alias: TeamBillableInfoResponse

```ts
type TeamBillableInfoResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/TeamBillableInfoResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/TeamBillableInfoResponse.ts#L11)

## Type declaration

### billable\_info?

```ts
optional billable_info: object;
```

#### Index Signature

```ts
[key: string]: BillableInfo
```

### error?

```ts
optional error: string;
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
