# Interface: AdminBarriersCreateArguments

## Extends

- `TokenOverridable`

## Extended by

- [`AdminBarriersUpdateArguments`](AdminBarriersUpdateArguments.md)

## Properties

### barriered\_from\_usergroup\_ids

```ts
barriered_from_usergroup_ids: string[];
```

#### Description

A list of [IDP Groups](https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org) IDs ti associate with the barrier.

#### Defined in

[packages/web-api/src/types/request/admin/barriers.ts:13](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/admin/barriers.ts#L13)

***

### primary\_usergroup\_id

```ts
primary_usergroup_id: string;
```

#### Description

The ID of the primary [IDP Group](https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org).

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

`TokenOverridable.token`

#### Defined in

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L43)
