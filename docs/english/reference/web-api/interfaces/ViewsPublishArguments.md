[@slack/web-api](../index.md) / ViewsPublishArguments

# Interface: ViewsPublishArguments

Defined in: [packages/web-api/src/types/request/views.ts:40](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/views.ts#L40)

## Extends

- `BaseViewsArguments`
- `TokenOverridable`
- `ViewHash`

## Properties

### hash?

```ts
hash?: string;
```

Defined in: [packages/web-api/src/types/request/views.ts:36](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/views.ts#L36)

#### Description

A string that represents view state to protect against possible race conditions.

#### See

[Avoiding race conditions when using views](https://docs.slack.dev/surfaces/modals#handling_race_conditions).

#### Inherited from

`ViewHash.hash`

***

### token?

```ts
token?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

`TokenOverridable.token`

***

### user\_id

```ts
user_id: string;
```

Defined in: [packages/web-api/src/types/request/views.ts:42](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/views.ts#L42)

#### Description

ID of the user you want publish a view to.

***

### view

```ts
view: View;
```

Defined in: [packages/web-api/src/types/request/views.ts:7](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/views.ts#L7)

#### Description

A [view payload](https://docs.slack.dev/surfaces/modals).

#### Inherited from

`BaseViewsArguments.view`
