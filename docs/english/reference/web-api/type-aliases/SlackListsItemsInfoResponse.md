[@slack/web-api](../index.md) / SlackListsItemsInfoResponse

# Type Alias: SlackListsItemsInfoResponse

```ts
type SlackListsItemsInfoResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/SlackListsItemsInfoResponse.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/SlackListsItemsInfoResponse.ts#L4)

## Type Declaration

### error?

```ts
optional error: string;
```

### list?

```ts
optional list: SlackList;
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

### record?

```ts
optional record: SlackListsItemWithSubscription;
```

### subtasks?

```ts
optional subtasks: SlackListsItem[];
```
