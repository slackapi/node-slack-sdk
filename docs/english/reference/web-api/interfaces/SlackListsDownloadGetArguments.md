[@slack/web-api](../index.md) / SlackListsDownloadGetArguments

# Interface: SlackListsDownloadGetArguments

Defined in: [src/types/request/slackLists.ts:404](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L404)

## Extends

- `TokenOverridable`

## Properties

### job\_id

```ts
job_id: string;
```

Defined in: [src/types/request/slackLists.ts:413](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L413)

#### Description

The ID of the recently started job to export the List.

***

### list\_id

```ts
list_id: string;
```

Defined in: [src/types/request/slackLists.ts:408](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L408)

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
