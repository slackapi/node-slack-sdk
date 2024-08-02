# Type Alias: ConversationsAcceptSharedInviteArguments

```ts
type ConversationsAcceptSharedInviteArguments: TokenOverridable & OptionalTeamAssignable & ChannelID | InviteID & IsPrivate & object;
```

## Type declaration

### channel\_name

```ts
channel_name: string;
```

#### Description

Name of the channel. If the channel does not exist already in your workspace,
this name is the one that the channel will take.

### free\_trial\_accepted?

```ts
optional free_trial_accepted: boolean;
```

#### Description

Whether you'd like to use your workspace's free trial to begin using Slack Connect.

## Defined in

[packages/web-api/src/types/request/conversations.ts:51](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/conversations.ts#L51)
