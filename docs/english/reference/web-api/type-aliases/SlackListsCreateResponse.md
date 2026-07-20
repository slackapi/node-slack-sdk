[@slack/web-api](../index.md) / SlackListsCreateResponse

# Type Alias: SlackListsCreateResponse

```ts
type SlackListsCreateResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/SlackListsCreateResponse.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/SlackListsCreateResponse.ts#L4)

## Type Declaration

### error?

```ts
optional error: string;
```

### list\_id?

```ts
optional list_id: string;
```

### list\_metadata?

```ts
optional list_metadata: object;
```

#### list\_metadata.schema?

```ts
optional schema: SlackListsSchemaColumnResponse[];
```

#### list\_metadata.subtask\_schema?

```ts
optional subtask_schema: SlackListsSchemaColumnResponse[];
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
