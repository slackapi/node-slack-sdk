[@slack/web-api](../index.md) / AppsManifestCreateResponse

# Type Alias: AppsManifestCreateResponse

```ts
type AppsManifestCreateResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/AppsManifestCreateResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AppsManifestCreateResponse.ts#L11)

## Type declaration

### app\_id?

```ts
optional app_id: string;
```

### credentials?

```ts
optional credentials: Credentials;
```

### error?

```ts
optional error: string;
```

### errors?

```ts
optional errors: Error[];
```

### needed?

```ts
optional needed: string;
```

### oauth\_authorize\_url?

```ts
optional oauth_authorize_url: string;
```

### ok?

```ts
optional ok: boolean;
```

### provided?

```ts
optional provided: string;
```

### response\_metadata?

```ts
optional response_metadata: ResponseMetadata;
```

### team\_domain?

```ts
optional team_domain: string;
```

### team\_id?

```ts
optional team_id: string;
```
