# Interface: ViewsPublishArguments

## Extends

- `BaseViewsArguments`.`TokenOverridable`.`ViewHash`

## Properties

### hash?

```ts
optional hash: string;
```

#### Description

A string that represents view state to protect against possible race conditions.

#### See

[Avoiding race conditions when using views](https://api.slack.com/surfaces/modals#handling_race_conditions).

#### Inherited from

`ViewHash.hash`

#### Defined in

[packages/web-api/src/types/request/views.ts:36](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/views.ts#L36)

***

### token?

```ts
optional token: string;
```

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

`TokenOverridable.token`

#### Defined in

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

***

### user\_id

```ts
user_id: string;
```

#### Description

ID of the user you want publish a view to.

#### Defined in

[packages/web-api/src/types/request/views.ts:42](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/views.ts#L42)

***

### view

```ts
view: View;
```

#### Description

A [view payload](https://api.slack.com/reference/surfaces/views).

#### Inherited from

`BaseViewsArguments.view`

#### Defined in

[packages/web-api/src/types/request/views.ts:7](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/views.ts#L7)
