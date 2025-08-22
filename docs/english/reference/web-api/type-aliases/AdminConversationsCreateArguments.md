[@slack/web-api](../index.md) / AdminConversationsCreateArguments

# Type Alias: AdminConversationsCreateArguments

```ts
type AdminConversationsCreateArguments = TokenOverridable & WorkspaceAccess & object;
```

Defined in: [src/types/request/admin/conversations.ts:85](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L85)

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
