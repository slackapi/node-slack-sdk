# Interface: CallsInfoArguments

## Extends

- `ID`.`TokenOverridable`

## Properties

### id

```ts
id: string;
```

#### Description

`id` returned when registering the call using the `calls.add` method.

#### Inherited from

`ID.id`

#### Defined in

[packages/web-api/src/types/request/calls.ts:6](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/calls.ts#L6)

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
