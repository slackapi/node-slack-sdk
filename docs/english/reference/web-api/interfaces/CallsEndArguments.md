[@slack/web-api](../index.md) / CallsEndArguments

# Interface: CallsEndArguments

Defined in: [packages/web-api/src/types/request/calls.ts:48](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L48)

## Extends

- `ID`
- `TokenOverridable`

## Properties

### duration?

```ts
duration?: number;
```

Defined in: [packages/web-api/src/types/request/calls.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L50)

#### Description

Call duration in seconds.

***

### id

```ts
id: string;
```

Defined in: [packages/web-api/src/types/request/calls.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L6)

#### Description

`id` returned when registering the call using the `calls.add` method.

#### Inherited from

`ID.id`

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
