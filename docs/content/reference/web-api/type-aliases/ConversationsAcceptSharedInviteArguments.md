[@slack/web-api](../index.md) / ConversationsAcceptSharedInviteArguments

# Type Alias: ConversationsAcceptSharedInviteArguments

```ts
type ConversationsAcceptSharedInviteArguments = TokenOverridable & OptionalTeamAssignable & ChannelID | InviteID & IsPrivate & object;
```

Defined in: [src/types/request/conversations.ts:52](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L52)

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
