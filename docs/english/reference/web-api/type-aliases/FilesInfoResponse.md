[@slack/web-api](../index.md) / FilesInfoResponse

# Type Alias: FilesInfoResponse

```ts
type FilesInfoResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/FilesInfoResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/FilesInfoResponse.ts#L11)

## Type declaration

### comments?

```ts
optional comments: Comment[];
```

### content?

```ts
optional content: string;
```

### content\_highlight\_css?

```ts
optional content_highlight_css: string;
```

### content\_highlight\_html?

```ts
optional content_highlight_html: string;
```

### content\_highlight\_html\_truncated?

```ts
optional content_highlight_html_truncated: boolean;
```

### error?

```ts
optional error: string;
```

### file?

```ts
optional file: File;
```

### is\_truncated?

```ts
optional is_truncated: boolean;
```

### needed?

```ts
optional needed: string;
```

### ok?

```ts
optional ok: boolean;
```

### paging?

```ts
optional paging: Paging;
```

### provided?

```ts
optional provided: string;
```
