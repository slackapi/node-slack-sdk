# Interface: ChatGetPermalinkArguments

## Extends

- `ChannelAndMessageTS`.`TokenOverridable`

## Properties

### channel

```ts
channel: string;
```

#### Description

Channel ID for the message.

#### Inherited from

`ChannelAndMessageTS.channel`

#### Defined in

[packages/web-api/src/types/request/chat.ts:19](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/chat.ts#L19)

***

### message\_ts

```ts
message_ts: string;
```

#### Description

Timestamp of the message.

#### Inherited from

`ChannelAndMessageTS.message_ts`

#### Defined in

[packages/web-api/src/types/request/chat.ts:27](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/chat.ts#L27)

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
