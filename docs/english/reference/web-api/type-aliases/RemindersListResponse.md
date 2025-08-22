[@slack/web-api](../index.md) / RemindersListResponse

# Type Alias: RemindersListResponse

```ts
type RemindersListResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/RemindersListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/RemindersListResponse.ts#L11)

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

### reminders?

```ts
optional reminders: Reminder[];
```
