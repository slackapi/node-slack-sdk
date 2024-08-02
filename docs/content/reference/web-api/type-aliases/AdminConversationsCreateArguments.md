# Type Alias: AdminConversationsCreateArguments

```ts
type AdminConversationsCreateArguments: TokenOverridable & WorkspaceAccess & object;
```

## Type declaration

### description?

```ts
optional description: string;
```

#### Description

Description of the public or private channel to create.

### is\_private

```ts
is_private: boolean;
```

#### Description

When `true`, creates a private channel instead of a public channel.

### name

```ts
name: string;
```

#### Description

Name of the public or private channel to create.

## Defined in

[packages/web-api/src/types/request/admin/conversations.ts:81](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/conversations.ts#L81)
