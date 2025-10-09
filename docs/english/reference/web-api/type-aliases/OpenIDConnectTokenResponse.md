[@slack/web-api](../index.md) / OpenIDConnectTokenResponse

# Type Alias: OpenIDConnectTokenResponse

```ts
type OpenIDConnectTokenResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/OpenIDConnectTokenResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/OpenIDConnectTokenResponse.ts#L11)

## Type Declaration

### access\_token?

```ts
optional access_token: string;
```

### error?

```ts
optional error: string;
```

### expires\_in?

```ts
optional expires_in: number;
```

### id\_token?

```ts
optional id_token: string;
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

### token\_type?

```ts
optional token_type: string;
```

### warning?

```ts
optional warning: string;
```
