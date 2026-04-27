[@slack/web-api](../index.md) / SlackListsItemsCreateArguments

# Interface: SlackListsItemsCreateArguments

Defined in: [packages/web-api/src/types/request/slackLists.ts:430](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L430)

## Extends

- `TokenOverridable`

## Properties

### duplicated\_item\_id?

```ts
optional duplicated_item_id: string;
```

Defined in: [packages/web-api/src/types/request/slackLists.ts:439](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L439)

#### Description

ID of the record to make a copy of.

***

### initial\_fields?

```ts
optional initial_fields: SlackListsItemField[];
```

Defined in: [packages/web-api/src/types/request/slackLists.ts:449](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L449)

#### Description

Initial item data.

***

### list\_id

```ts
list_id: string;
```

Defined in: [packages/web-api/src/types/request/slackLists.ts:434](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L434)

#### Description

Encoded ID of the List.

***

### parent\_item\_id?

```ts
optional parent_item_id: string;
```

Defined in: [packages/web-api/src/types/request/slackLists.ts:444](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L444)

#### Description

ID of the parent record for this subtask.

***

### token?

```ts
optional token: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```
