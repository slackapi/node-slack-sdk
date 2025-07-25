[@slack/web-api](../index.md) / PinsRemoveArguments

# Interface: PinsRemoveArguments

Defined in: [src/types/request/pins.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/pins.ts#L11)

## Extends

- `MessageArgument`.`TokenOverridable`

## Properties

### channel

```ts
channel: string;
```

Defined in: [src/types/request/common.ts:111](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L111)

#### Description

Channel where the message was posted.

#### Inherited from

```ts
MessageArgument.channel
```

***

### timestamp

```ts
timestamp: string;
```

Defined in: [src/types/request/common.ts:113](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L113)

#### Description

Timestamp of the message.

#### Inherited from

```ts
MessageArgument.timestamp
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
