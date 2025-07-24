[@slack/web-api](../index.md) / UsersProfileSetArguments

# Interface: UsersProfileSetArguments

Defined in: [src/types/request/users.ts:76](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L76)

## Extends

- `TokenOverridable`

## Properties

### name?

```ts
optional name: string;
```

Defined in: [src/types/request/users.ts:90](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L90)

#### Description

Name of a single profile field to set. If both `name` and `profile` are set, `name` takes precedence.

#### See

[\`users.profile.set\` Profile fields usage info](https://docs.slack.dev/reference/methods/users.profile.set#profile-fields).

***

### profile?

```ts
optional profile: Record<string, unknown>;
```

Defined in: [src/types/request/users.ts:83](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L83)

#### Description

Sets profile fields using a single argument.
Collection of key:value pairs presented.
At most 50 fields may be set. Each field name is limited to 255 characters.

#### See

[\`users.profile.set\` Profile fields usage info](https://docs.slack.dev/reference/methods/users.profile.set#profile-fields).

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

### user?

```ts
optional user: string;
```

Defined in: [src/types/request/users.ts:85](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L85)

#### Description

ID of user to change. This argument may only be specified by admins on paid teams.

***

### value?

```ts
optional value: string;
```

Defined in: [src/types/request/users.ts:95](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L95)

#### Description

Value to set for the profile field specified by `name`. Usable only if profile is not passed.

#### See

[\`users.profile.set\` Profile fields usage info](https://docs.slack.dev/reference/methods/users.profile.set#profile-fields).
