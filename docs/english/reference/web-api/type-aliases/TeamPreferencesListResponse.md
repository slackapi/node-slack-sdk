[@slack/web-api](../index.md) / TeamPreferencesListResponse

# Type Alias: TeamPreferencesListResponse

```ts
type TeamPreferencesListResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/TeamPreferencesListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/TeamPreferencesListResponse.ts#L11)

## Type Declaration

### allow\_message\_deletion?

```ts
optional allow_message_deletion: boolean;
```

### disable\_file\_uploads?

```ts
optional disable_file_uploads: string;
```

### display\_real\_names?

```ts
optional display_real_names: boolean;
```

### error?

```ts
optional error: string;
```

### msg\_edit\_window\_mins?

```ts
optional msg_edit_window_mins: number;
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

### who\_can\_post\_general?

```ts
optional who_can_post_general: string;
```
