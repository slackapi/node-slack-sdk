# Interface: ConversationsExternalInvitePermissionsSetArguments

## Extends

- `Channel`.`Required`\<`TargetTeam`\>.`TokenOverridable`

## Properties

### action

```ts
action: "downgrade" | "upgrade";
```

#### Description

The type of action be taken: `upgrade` or `downgrade`.

#### Defined in

[packages/web-api/src/types/request/conversations.ts:84](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/conversations.ts#L84)

***

### channel

```ts
channel: string;
```

#### Description

ID of conversation.

#### Inherited from

`Channel.channel`

#### Defined in

[packages/web-api/src/types/request/conversations.ts:14](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/conversations.ts#L14)

***

### target\_team

```ts
target_team: string;
```

#### Description

The team or enterprise id of the other party.

#### Inherited from

`Required.target_team`

#### Defined in

[packages/web-api/src/types/request/common.ts:69](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L69)

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
