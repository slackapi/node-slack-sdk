[@slack/web-api](../index.md) / SlackListsAccessSetArguments

# Interface: SlackListsAccessSetArguments

Defined in: [src/types/request/slackLists.ts:347](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L347)

## Extends

- `TokenOverridable`

## Properties

### access\_level

```ts
access_level: string;
```

Defined in: [src/types/request/slackLists.ts:356](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L356)

#### Description

Desired level of access.

***

### channel\_ids?

```ts
optional channel_ids: string[];
```

Defined in: [src/types/request/slackLists.ts:361](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L361)

#### Description

List of channels you wish to update access for. Can only be used if user_ids is not provided.

***

### list\_id

```ts
list_id: string;
```

Defined in: [src/types/request/slackLists.ts:351](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L351)

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

Defined in: [src/types/request/slackLists.ts:366](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L366)

#### Description

List of users you wish to update access for. Can only be used if channel_ids is not provided.
