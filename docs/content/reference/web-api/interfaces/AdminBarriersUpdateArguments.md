# Interface: AdminBarriersUpdateArguments

## Extends

- [`AdminBarriersCreateArguments`](AdminBarriersCreateArguments.md).`BarrierID`

## Properties

### barrier\_id

```ts
barrier_id: string;
```

#### Description

The ID of the barrier.

#### Inherited from

`BarrierID.barrier_id`

#### Defined in

[packages/web-api/src/types/request/admin/barriers.ts:7](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/admin/barriers.ts#L7)

***

### barriered\_from\_usergroup\_ids

```ts
barriered_from_usergroup_ids: string[];
```

#### Description

A list of [IDP Groups](https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org) IDs ti associate with the barrier.

#### Inherited from

[`AdminBarriersCreateArguments`](AdminBarriersCreateArguments.md).[`barriered_from_usergroup_ids`](AdminBarriersCreateArguments.md#barriered_from_usergroup_ids)

#### Defined in

[packages/web-api/src/types/request/admin/barriers.ts:13](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/admin/barriers.ts#L13)

***

### primary\_usergroup\_id

```ts
primary_usergroup_id: string;
```

#### Description

The ID of the primary [IDP Group](https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org).

#### Inherited from

[`AdminBarriersCreateArguments`](AdminBarriersCreateArguments.md).[`primary_usergroup_id`](AdminBarriersCreateArguments.md#primary_usergroup_id)

#### Defined in

[packages/web-api/src/types/request/admin/barriers.ts:15](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/admin/barriers.ts#L15)

***

### restricted\_subjects

```ts
restricted_subjects: ["im", "mpim", "call"];
```

#### Description

What kind of interactions are blocked by this barrier?
Currently you must provide all three: `im`, `mpim`, `call`.

#### Inherited from

[`AdminBarriersCreateArguments`](AdminBarriersCreateArguments.md).[`restricted_subjects`](AdminBarriersCreateArguments.md#restricted_subjects)

#### Defined in

[packages/web-api/src/types/request/admin/barriers.ts:20](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/admin/barriers.ts#L20)

***

### token?

```ts
optional token: string;
```

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

[`AdminBarriersCreateArguments`](AdminBarriersCreateArguments.md).[`token`](AdminBarriersCreateArguments.md#token)

#### Defined in

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L43)
