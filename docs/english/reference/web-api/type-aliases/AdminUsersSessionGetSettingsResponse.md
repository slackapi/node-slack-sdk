[@slack/web-api](../index.md) / AdminUsersSessionGetSettingsResponse

# Type Alias: AdminUsersSessionGetSettingsResponse

```ts
type AdminUsersSessionGetSettingsResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/AdminUsersSessionGetSettingsResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminUsersSessionGetSettingsResponse.ts#L11)

## Type Declaration

### error?

```ts
error?: string;
```

### needed?

```ts
needed?: string;
```

### no\_settings\_applied?

```ts
no_settings_applied?: string[];
```

### ok?

```ts
ok?: boolean;
```

### provided?

```ts
provided?: string;
```

### session\_settings?

```ts
session_settings?: SessionSetting[];
```

### warning?

```ts
warning?: string;
```
