# Type Alias: TeamBillableInfoResponse

```ts
type TeamBillableInfoResponse: WebAPICallResult & object;
```

## Type declaration

### billable\_info?

```ts
optional billable_info: object;
```

#### Index Signature

 \[`key`: `string`\]: `BillableInfo`

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

## Defined in

[packages/web-api/src/types/response/TeamBillableInfoResponse.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/TeamBillableInfoResponse.ts#L12)
