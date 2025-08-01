[@slack/web-api](../index.md) / AdminBarriersCreateArguments

# Interface: AdminBarriersCreateArguments

Defined in: [src/types/request/admin/barriers.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/barriers.ts#L11)

## Extends

- `TokenOverridable`

## Extended by

- [`AdminBarriersUpdateArguments`](AdminBarriersUpdateArguments.md)

## Properties

### barriered\_from\_usergroup\_ids

```ts
barriered_from_usergroup_ids: string[];
```

Defined in: [src/types/request/admin/barriers.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/barriers.ts#L13)

#### Description

A list of [IDP Groups](https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org) IDs ti associate with the barrier.

***

### primary\_usergroup\_id

```ts
primary_usergroup_id: string;
```

Defined in: [src/types/request/admin/barriers.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/barriers.ts#L15)

#### Description

The ID of the primary [IDP Group](https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org).

***

### restricted\_subjects

```ts
restricted_subjects: ["im", "mpim", "call"];
```

Defined in: [src/types/request/admin/barriers.ts:20](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/barriers.ts#L20)

#### Description

What kind of interactions are blocked by this barrier?
Currently you must provide all three: `im`, `mpim`, `call`.

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
