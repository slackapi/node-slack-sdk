[@slack/web-api](../index.md) / SlackListsItemsDeleteMultipleArguments

# Interface: SlackListsItemsDeleteMultipleArguments

Defined in: [src/types/request/slackLists.ts:466](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L466)

## Extends

- `TokenOverridable`

## Properties

### ids

```ts
ids: string[];
```

Defined in: [src/types/request/slackLists.ts:475](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L475)

#### Description

IDs of the items to delete.

***

### list\_id

```ts
list_id: string;
```

Defined in: [src/types/request/slackLists.ts:470](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L470)

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
