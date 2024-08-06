# Type Alias: OauthAccessResponse

```ts
type OauthAccessResponse: WebAPICallResult & object;
```

## Type declaration

### access\_token?

```ts
optional access_token: string;
```

### authorizing\_user?

```ts
optional authorizing_user: User;
```

### bot?

```ts
optional bot: Bot;
```

### enterprise\_id?

```ts
optional enterprise_id: string;
```

### error?

```ts
optional error: string;
```

### incoming\_webhook?

```ts
optional incoming_webhook: IncomingWebhook;
```

### installer\_user?

```ts
optional installer_user: User;
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

### scope?

```ts
optional scope: string;
```

### scopes?

```ts
optional scopes: Scopes;
```

### team\_id?

```ts
optional team_id: string;
```

### team\_name?

```ts
optional team_name: string;
```

### token\_type?

```ts
optional token_type: string;
```

### user\_id?

```ts
optional user_id: string;
```

### warning?

```ts
optional warning: string;
```

## Defined in

[packages/web-api/src/types/response/OauthAccessResponse.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/OauthAccessResponse.ts#L12)
