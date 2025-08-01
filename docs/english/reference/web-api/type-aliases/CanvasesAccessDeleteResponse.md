[@slack/web-api](../index.md) / CanvasesAccessDeleteResponse

# Type Alias: CanvasesAccessDeleteResponse

```ts
type CanvasesAccessDeleteResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/CanvasesAccessDeleteResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/CanvasesAccessDeleteResponse.ts#L11)

## Type declaration

### error?

```ts
optional error: string;
```

### failed\_to\_update\_channel\_ids?

```ts
optional failed_to_update_channel_ids: string[];
```

### failed\_to\_update\_user\_ids?

```ts
optional failed_to_update_user_ids: string[];
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

### response\_metadata?

```ts
optional response_metadata: ResponseMetadata;
```
