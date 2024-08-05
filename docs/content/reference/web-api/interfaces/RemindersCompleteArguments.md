# Interface: RemindersCompleteArguments

## Extends

- `TokenOverridable`.`OptionalTeamAssignable`

## Properties

### reminder

```ts
reminder: string;
```

#### Description

The ID of the reminder to be marked as complete.

#### Defined in

[packages/web-api/src/types/request/reminders.ts:42](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/reminders.ts#L42)

***

### team\_id?

```ts
optional team_id: string;
```

#### Description

If using an org token, `team_id` is required.

#### Inherited from

`OptionalTeamAssignable.team_id`

#### Defined in

[packages/web-api/src/types/request/common.ts:65](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L65)

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
