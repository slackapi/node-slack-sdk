[@slack/web-api](../index.md) / RemindersInfoResponse

# Type Alias: RemindersInfoResponse

```ts
type RemindersInfoResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/RemindersInfoResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/RemindersInfoResponse.ts#L11)

## Type declaration

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

### reminder?

```ts
optional reminder: Reminder;
```
