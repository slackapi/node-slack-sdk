[@slack/web-api](../index.md) / SlackListsItemsUpdateArguments

# Interface: SlackListsItemsUpdateArguments

Defined in: [src/types/request/slackLists.ts:520](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L520)

## Extends

- `TokenOverridable`

## Properties

### cells

```ts
cells: SlackListsItemCellUpdate[];
```

Defined in: [src/types/request/slackLists.ts:529](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L529)

#### Description

Cells to update. Each cell includes the row_id, column_id, and field value.

***

### list\_id

```ts
list_id: string;
```

Defined in: [src/types/request/slackLists.ts:524](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L524)

#### Description

Encoded ID of the List.

***

### token?

```ts
optional token: string;
```

Defined in: [src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```
