[@slack/web-api](../index.md) / SlackListsAccessDeleteArguments

# Interface: SlackListsAccessDeleteArguments

Defined in: [src/types/request/slackLists.ts:329](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L329)

## Extends

- `TokenOverridable`

## Properties

### channel\_ids?

```ts
optional channel_ids: string[];
```

Defined in: [src/types/request/slackLists.ts:338](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L338)

#### Description

List of channels you wish to update access for. Can only be used if user_ids is not provided.

***

### list\_id

```ts
list_id: string;
```

Defined in: [src/types/request/slackLists.ts:333](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L333)

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

***

### user\_ids?

```ts
optional user_ids: string[];
```

Defined in: [src/types/request/slackLists.ts:343](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L343)

#### Description

List of users you wish to update access for. Can only be used if channel_ids is not provided.
