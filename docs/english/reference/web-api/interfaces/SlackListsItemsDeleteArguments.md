[@slack/web-api](../index.md) / SlackListsItemsDeleteArguments

# Interface: SlackListsItemsDeleteArguments

Defined in: [packages/web-api/src/types/request/slackLists.ts:453](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L453)

## Extends

- `TokenOverridable`

## Properties

### id

```ts
id: string;
```

Defined in: [packages/web-api/src/types/request/slackLists.ts:462](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L462)

#### Description

ID of item to delete.

***

### list\_id

```ts
list_id: string;
```

Defined in: [packages/web-api/src/types/request/slackLists.ts:457](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L457)

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
