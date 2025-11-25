[@slack/web-api](../index.md) / SlackListsDownloadStartArguments

# Interface: SlackListsDownloadStartArguments

Defined in: [src/types/request/slackLists.ts:417](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L417)

## Extends

- `TokenOverridable`

## Properties

### include\_archived?

```ts
optional include_archived: boolean;
```

Defined in: [src/types/request/slackLists.ts:426](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L426)

#### Description

Boolean indicating whether to include archived items.

***

### list\_id

```ts
list_id: string;
```

Defined in: [src/types/request/slackLists.ts:421](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L421)

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
