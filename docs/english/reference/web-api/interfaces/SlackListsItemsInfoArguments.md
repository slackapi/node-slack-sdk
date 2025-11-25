[@slack/web-api](../index.md) / SlackListsItemsInfoArguments

# Interface: SlackListsItemsInfoArguments

Defined in: [src/types/request/slackLists.ts:479](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L479)

## Extends

- `TokenOverridable`

## Properties

### id

```ts
id: string;
```

Defined in: [src/types/request/slackLists.ts:488](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L488)

#### Description

ID of item to delete.

***

### include\_is\_subscribed?

```ts
optional include_is_subscribed: boolean;
```

Defined in: [src/types/request/slackLists.ts:493](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L493)

#### Description

Set to true to include is_subscribed data for the returned List row.

***

### list\_id

```ts
list_id: string;
```

Defined in: [src/types/request/slackLists.ts:483](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L483)

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
