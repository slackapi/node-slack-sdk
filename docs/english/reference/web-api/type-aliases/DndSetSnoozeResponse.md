[@slack/web-api](../index.md) / DndSetSnoozeResponse

# Type Alias: DndSetSnoozeResponse

```ts
type DndSetSnoozeResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/DndSetSnoozeResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/DndSetSnoozeResponse.ts#L11)

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

### snooze\_enabled?

```ts
optional snooze_enabled: boolean;
```

### snooze\_endtime?

```ts
optional snooze_endtime: number;
```

### snooze\_is\_indefinite?

```ts
optional snooze_is_indefinite: boolean;
```

### snooze\_remaining?

```ts
optional snooze_remaining: number;
```
