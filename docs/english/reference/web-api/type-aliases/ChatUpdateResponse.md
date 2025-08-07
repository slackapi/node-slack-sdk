[@slack/web-api](../index.md) / ChatUpdateResponse

# Type Alias: ChatUpdateResponse

```ts
type ChatUpdateResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/ChatUpdateResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/ChatUpdateResponse.ts#L11)

## Type declaration

### channel?

```ts
optional channel: string;
```

### error?

```ts
optional error: string;
```

### message?

```ts
optional message: Message;
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

### text?

```ts
optional text: string;
```

### ts?

```ts
optional ts: string;
```
