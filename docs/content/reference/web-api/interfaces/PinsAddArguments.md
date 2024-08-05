# Interface: PinsAddArguments

## Extends

- `MessageArgument`.`TokenOverridable`

## Properties

### channel

```ts
channel: string;
```

#### Description

Channel where the message was posted.

#### Inherited from

`MessageArgument.channel`

#### Defined in

[packages/web-api/src/types/request/common.ts:98](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L98)

***

### timestamp

```ts
timestamp: string;
```

#### Description

Timestamp of the message.

#### Inherited from

`MessageArgument.timestamp`

#### Defined in

[packages/web-api/src/types/request/common.ts:100](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L100)

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
