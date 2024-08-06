# Interface: ChatDeleteArguments

## Extends

- `ChannelAndTS`.`AsUser`.`TokenOverridable`

## Properties

### as\_user?

```ts
optional as_user: boolean;
```

#### Description

Pass `true` to act as the authed user with [`chat:write:user` scope](https://api.slack.com/scopes/chat:write:user).
Bot users in this context are considered authed users. If unused or `false`, the message will be acted upon with
[`chat:write:bot` scope](https://api.slack.com/scopes/chat:write:bot).

#### Inherited from

`AsUser.as_user`

#### Defined in

[packages/web-api/src/types/request/chat.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L35)

***

### channel

```ts
channel: string;
```

#### Description

Channel ID for the message.

#### Inherited from

`ChannelAndTS.channel`

#### Defined in

[packages/web-api/src/types/request/chat.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L19)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

***

### ts

```ts
ts: string;
```

#### Description

Timestamp of the message.

#### Inherited from

`ChannelAndTS.ts`

#### Defined in

[packages/web-api/src/types/request/chat.ts:23](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L23)
