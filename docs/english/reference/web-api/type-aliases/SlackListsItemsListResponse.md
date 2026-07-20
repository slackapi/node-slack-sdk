[@slack/web-api](../index.md) / SlackListsItemsListResponse

# Type Alias: SlackListsItemsListResponse

```ts
type SlackListsItemsListResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/SlackListsItemsListResponse.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/SlackListsItemsListResponse.ts#L4)

## Type Declaration

### error?

```ts
optional error: string;
```

### items?

```ts
optional items: SlackListsItem[];
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
optional response_metadata: object;
```

#### response\_metadata.next\_cursor?

```ts
optional next_cursor: string;
```
