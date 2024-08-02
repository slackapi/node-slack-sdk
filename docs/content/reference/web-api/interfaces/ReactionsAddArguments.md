# Interface: ReactionsAddArguments

## Extends

- `MessageArgument`.`TokenOverridable`.`ReactionName`

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

[packages/web-api/src/types/request/common.ts:98](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L98)

***

### name

```ts
name: string;
```

#### Description

Reaction (emoji) name.

#### Inherited from

`ReactionName.name`

#### Defined in

[packages/web-api/src/types/request/reactions.ts:18](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/reactions.ts#L18)

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

[packages/web-api/src/types/request/common.ts:100](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L100)

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
