[@slack/web-api](../index.md) / OauthAccessResponse

# Type Alias: OauthAccessResponse

```ts
type OauthAccessResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/OauthAccessResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/OauthAccessResponse.ts#L11)

## Type Declaration

### access\_token?

```ts
access_token?: string;
```

### authorizing\_user?

```ts
authorizing_user?: User;
```

### bot?

```ts
bot?: Bot;
```

### enterprise\_id?

```ts
enterprise_id?: string;
```

### error?

```ts
error?: string;
```

### incoming\_webhook?

```ts
incoming_webhook?: IncomingWebhook;
```

### installer\_user?

```ts
installer_user?: User;
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

### scope?

```ts
scope?: string;
```

### scopes?

```ts
scopes?: Scopes;
```

### team\_id?

```ts
team_id?: string;
```

### team\_name?

```ts
team_name?: string;
```

### token\_type?

```ts
token_type?: string;
```

### user\_id?

```ts
user_id?: string;
```

### warning?

```ts
warning?: string;
```
