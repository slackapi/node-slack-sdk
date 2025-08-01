[@slack/web-api](../index.md) / AdminBarriersDeleteArguments

# Interface: AdminBarriersDeleteArguments

Defined in: [src/types/request/admin/barriers.ts:24](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/barriers.ts#L24)

## Extends

- `BarrierID`.`TokenOverridable`

## Properties

### barrier\_id

```ts
barrier_id: string;
```

Defined in: [src/types/request/admin/barriers.ts:7](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/barriers.ts#L7)

#### Description

The ID of the barrier.

#### Inherited from

```ts
BarrierID.barrier_id
```

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
