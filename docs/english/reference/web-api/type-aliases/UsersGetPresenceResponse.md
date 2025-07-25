[@slack/web-api](../index.md) / UsersGetPresenceResponse

# Type Alias: UsersGetPresenceResponse

```ts
type UsersGetPresenceResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/UsersGetPresenceResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/UsersGetPresenceResponse.ts#L11)

## Type declaration

### auto\_away?

```ts
optional auto_away: boolean;
```

### connection\_count?

```ts
optional connection_count: number;
```

### error?

```ts
optional error: string;
```

### last\_activity?

```ts
optional last_activity: number;
```

### manual\_away?

```ts
optional manual_away: boolean;
```

### needed?

```ts
optional needed: string;
```

### ok?

```ts
optional ok: boolean;
```

### online?

```ts
optional online: boolean;
```

### presence?

```ts
optional presence: string;
```

### provided?

```ts
optional provided: string;
```

### warning?

```ts
optional warning: string;
```
