# Interface: UsersProfileSetArguments

## Extends

- `TokenOverridable`

## Properties

### name?

```ts
optional name: string;
```

#### Description

Name of a single profile field to set. If both `name` and `profile` are set, `name` takes precedence.

#### See

[`users.profile.set` Profile fields usage info](https://api.slack.com/methods/users.profile.set#profile-fields).

#### Defined in

[packages/web-api/src/types/request/users.ts:87](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/users.ts#L87)

***

### profile?

```ts
optional profile: Record<string, unknown>;
```

#### Description

Sets profile fields using a single argument.
Collection of key:value pairs presented.
At most 50 fields may be set. Each field name is limited to 255 characters.

#### See

[`users.profile.set` Profile fields usage info](https://api.slack.com/methods/users.profile.set#profile-fields).

#### Defined in

[packages/web-api/src/types/request/users.ts:80](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/users.ts#L80)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L43)

***

### user?

```ts
optional user: string;
```

#### Description

ID of user to change. This argument may only be specified by admins on paid teams.

#### Defined in

[packages/web-api/src/types/request/users.ts:82](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/users.ts#L82)

***

### value?

```ts
optional value: string;
```

#### Description

Value to set for the profile field specified by `name`. Usable only if profile is not passed.

#### See

[`users.profile.set` Profile fields usage info](https://api.slack.com/methods/users.profile.set#profile-fields).

#### Defined in

[packages/web-api/src/types/request/users.ts:92](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/users.ts#L92)
