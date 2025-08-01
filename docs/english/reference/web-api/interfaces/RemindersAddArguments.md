[@slack/web-api](../index.md) / RemindersAddArguments

# Interface: RemindersAddArguments

Defined in: [src/types/request/reminders.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/reminders.ts#L17)

## Extends

- `TokenOverridable`.`OptionalTeamAssignable`

## Properties

### recurrence?

```ts
optional recurrence: ReminderRecurrence;
```

Defined in: [src/types/request/reminders.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/reminders.ts#L37)

#### Description

Specify the repeating behavior of a reminder. If you set the sub-property `frequency` to `weekly`,
you must also set the `weekdays` array to specify which days of the week to recur on.

***

### team\_id?

```ts
optional team_id: string;
```

Defined in: [src/types/request/common.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L70)

#### Description

If using an org token, `team_id` is required.

#### Inherited from

```ts
OptionalTeamAssignable.team_id
```

***

### text

```ts
text: string;
```

Defined in: [src/types/request/reminders.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/reminders.ts#L19)

#### Description

The content of the reminder.

***

### time

```ts
time: string | number;
```

Defined in: [src/types/request/reminders.ts:26](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/reminders.ts#L26)

#### Description

When this reminder should happen, one of:
- the Unix timestamp (up to five years from now),
- the number of seconds until the reminder (if within 24 hours), or
- a natural language description (Ex. "in 15 minutes," or "every Thursday").

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

***

### ~~user?~~

```ts
optional user: string;
```

Defined in: [src/types/request/reminders.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/reminders.ts#L32)

#### Description

No longer supported - reminders cannot be set for other users.

#### Deprecated

#### See

[Changes to \`reminders.\*\` APIs announcement](https://docs.slack.dev/changelog/2023-07-its-later-already-for-stars-and-reminders).
