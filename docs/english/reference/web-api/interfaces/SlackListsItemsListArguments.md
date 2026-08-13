[@slack/web-api](../index.md) / SlackListsItemsListArguments

# Interface: SlackListsItemsListArguments

Defined in: [packages/web-api/src/types/request/slackLists.ts:497](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L497)

## Extends

- `TokenOverridable`

## Properties

### archived?

```ts
optional archived: boolean;
```

Defined in: [packages/web-api/src/types/request/slackLists.ts:516](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L516)

#### Description

Boolean indicating whether archived items or normal items should be returned.

***

### cursor?

```ts
optional cursor: string;
```

Defined in: [packages/web-api/src/types/request/slackLists.ts:511](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L511)

#### Description

Next cursor for pagination.

***

### limit?

```ts
optional limit: number;
```

Defined in: [packages/web-api/src/types/request/slackLists.ts:506](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L506)

#### Description

The maximum number of records to return.

***

### list\_id

```ts
list_id: string;
```

Defined in: [packages/web-api/src/types/request/slackLists.ts:501](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L501)

#### Description

Encoded ID of the List.

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
