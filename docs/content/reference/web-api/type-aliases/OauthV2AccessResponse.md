# Type Alias: OauthV2AccessResponse

```ts
type OauthV2AccessResponse: WebAPICallResult & object;
```

## Type declaration

### access\_token?

```ts
optional access_token: string;
```

### app\_id?

```ts
optional app_id: string;
```

### authed\_user?

```ts
optional authed_user: AuthedUser;
```

### bot\_user\_id?

```ts
optional bot_user_id: string;
```

### enterprise?

```ts
optional enterprise: Enterprise;
```

### error?

```ts
optional error: string;
```

### expires\_in?

```ts
optional expires_in: number;
```

### incoming\_webhook?

```ts
optional incoming_webhook: IncomingWebhook;
```

### is\_enterprise\_install?

```ts
optional is_enterprise_install: boolean;
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

### refresh\_token?

```ts
optional refresh_token: string;
```

### scope?

```ts
optional scope: string;
```

### team?

```ts
optional team: Enterprise;
```

### token\_type?

```ts
optional token_type: string;
```

### warning?

```ts
optional warning: string;
```

## Defined in

[packages/web-api/src/types/response/OauthV2AccessResponse.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/OauthV2AccessResponse.ts#L12)
