[@slack/web-api](../index.md) / CallsParticipantsAddArguments

# Interface: CallsParticipantsAddArguments

Defined in: [src/types/request/calls.ts:60](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L60)

## Extends

- `ID`.`Users`.`TokenOverridable`

## Properties

### id

```ts
id: string;
```

Defined in: [src/types/request/calls.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L6)

#### Description

`id` returned when registering the call using the `calls.add` method.

#### Inherited from

```ts
ID.id
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

***

### users

```ts
users: CallUser[];
```

Defined in: [src/types/request/calls.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L13)

#### Description

The list of users to add/remove to/from the Call.

#### See

[Using the Calls API: a note on Users](https://docs.slack.dev/apis/web-api/using-the-calls-api).

#### Inherited from

```ts
Users.users
```
