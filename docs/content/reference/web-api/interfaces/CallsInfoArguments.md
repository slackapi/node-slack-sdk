[@slack/web-api](../index.md) / CallsInfoArguments

# Interface: CallsInfoArguments

Defined in: [src/types/request/calls.ts:54](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L54)

## Extends

- `ID`.`TokenOverridable`

## Properties

### id

```ts
id: string;
```

Defined in: [src/types/request/calls.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L6)

#### Description

`id` returned when registering the call using the `calls.add` method.

#### Inherited from

```ts
ID.id
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
