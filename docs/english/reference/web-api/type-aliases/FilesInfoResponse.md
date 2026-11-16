[@slack/web-api](../index.md) / FilesInfoResponse

# Type Alias: FilesInfoResponse

```ts
type FilesInfoResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/FilesInfoResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/FilesInfoResponse.ts#L11)

## Type Declaration

### comments?

```ts
comments?: Comment[];
```

### content?

```ts
content?: string;
```

### content\_highlight\_css?

```ts
content_highlight_css?: string;
```

### content\_highlight\_html?

```ts
content_highlight_html?: string;
```

### content\_highlight\_html\_truncated?

```ts
content_highlight_html_truncated?: boolean;
```

### error?

```ts
error?: string;
```

### file?

```ts
file?: File;
```

### is\_truncated?

```ts
is_truncated?: boolean;
```

### needed?

```ts
needed?: string;
```

### ok?

```ts
ok?: boolean;
```

### paging?

```ts
paging?: Paging;
```

### provided?

```ts
provided?: string;
```

### response\_metadata?

```ts
response_metadata?: ResponseMetadata;
```

### warning?

```ts
warning?: string;
```
