# Interface: CallsEndArguments

## Extends

- `ID`.`TokenOverridable`

## Properties

### duration?

```ts
optional duration: number;
```

#### Description

Call duration in seconds.

#### Defined in

[packages/web-api/src/types/request/calls.ts:50](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/calls.ts#L50)

***

### id

```ts
id: string;
```

#### Description

`id` returned when registering the call using the `calls.add` method.

#### Inherited from

`ID.id`

#### Defined in

[packages/web-api/src/types/request/calls.ts:6](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/calls.ts#L6)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L43)
