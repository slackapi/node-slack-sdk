[@slack/web-api](../index.md) / OauthV2AccessResponse

# Type Alias: OauthV2AccessResponse

```ts
type OauthV2AccessResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/OauthV2AccessResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/OauthV2AccessResponse.ts#L11)

## Type Declaration

### access\_token?

```ts
access_token?: string;
```

### app\_id?

```ts
app_id?: string;
```

### authed\_user?

```ts
authed_user?: AuthedUser;
```

### bot\_user\_id?

```ts
bot_user_id?: string;
```

### enterprise?

```ts
enterprise?: Enterprise;
```

### error?

```ts
error?: string;
```

### expires\_in?

```ts
expires_in?: number;
```

### incoming\_webhook?

```ts
incoming_webhook?: IncomingWebhook;
```

### is\_enterprise\_install?

```ts
is_enterprise_install?: boolean;
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

### refresh\_token?

```ts
refresh_token?: string;
```

### scope?

```ts
scope?: string;
```

### team?

```ts
team?: Enterprise;
```

### token\_type?

```ts
token_type?: string;
```

### warning?

```ts
warning?: string;
```
