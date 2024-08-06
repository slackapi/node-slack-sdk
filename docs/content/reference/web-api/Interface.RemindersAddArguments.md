# Interface: RemindersAddArguments

## Extends

- `TokenOverridable`.`OptionalTeamAssignable`

## Properties

### recurrence?

```ts
optional recurrence: ReminderRecurrence;
```

#### Description

Specify the repeating behavior of a reminder. If you set the sub-property `frequency` to `weekly`,
you must also set the `weekdays` array to specify which days of the week to recur on.

#### Defined in

[packages/web-api/src/types/request/reminders.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/reminders.ts#L37)

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

### text

```ts
text: string;
```

#### Description

The content of the reminder.

#### Defined in

[packages/web-api/src/types/request/reminders.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/reminders.ts#L19)

***

### time

```ts
time: string | number;
```

#### Description

When this reminder should happen, one of:
- the Unix timestamp (up to five years from now),
- the number of seconds until the reminder (if within 24 hours), or
- a natural language description (Ex. "in 15 minutes," or "every Thursday").

#### Defined in

[packages/web-api/src/types/request/reminders.ts:26](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/reminders.ts#L26)

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

### ~~user?~~

```ts
optional user: string;
```

#### Description

No longer supported - reminders cannot be set for other users.

#### Deprecated

#### See

[Changes to `reminders.*` APIs announcement](https://api.slack.com/changelog/2023-07-its-later-already-for-stars-and-reminders#what).

#### Defined in

[packages/web-api/src/types/request/reminders.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/reminders.ts#L32)
