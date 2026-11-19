[@slack/web-api](../index.md) / RemindersListResponse

# Type Alias: RemindersListResponse

```ts
type RemindersListResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/RemindersListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/RemindersListResponse.ts#L11)

## Type Declaration

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

### reminders?

```ts
reminders?: Reminder[];
```
