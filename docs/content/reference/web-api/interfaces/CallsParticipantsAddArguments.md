# Interface: CallsParticipantsAddArguments

## Extends

- `ID`.`Users`.`TokenOverridable`

## Properties

### id

```ts
id: string;
```

#### Description

`id` returned when registering the call using the `calls.add` method.

#### Inherited from

`ID.id`

#### Defined in

[packages/web-api/src/types/request/calls.ts:6](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/calls.ts#L6)

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

***

### users

```ts
users: CallUser[];
```

#### Description

The list of users to add/remove to/from the Call.

#### See

[Using the Calls API: a note on Users](https://api.slack.com/apis/calls#users).

#### Inherited from

`Users.users`

#### Defined in

[packages/web-api/src/types/request/calls.ts:13](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/calls.ts#L13)
