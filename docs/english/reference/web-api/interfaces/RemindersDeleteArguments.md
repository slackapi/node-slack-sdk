[@slack/web-api](../index.md) / RemindersDeleteArguments

# Interface: RemindersDeleteArguments

Defined in: [src/types/request/reminders.ts:45](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/reminders.ts#L45)

## Extends

- `TokenOverridable`.`OptionalTeamAssignable`

## Properties

### reminder

```ts
reminder: string;
```

Defined in: [src/types/request/reminders.ts:47](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/reminders.ts#L47)

#### Description

The ID of the reminder to delete.

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
