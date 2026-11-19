[@slack/web-api](../index.md) / AdminSlackbotSkillsSetAutoEnabledArguments

# Interface: AdminSlackbotSkillsSetAutoEnabledArguments

Defined in: [packages/web-api/src/types/request/admin/slackbot.ts:53](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/slackbot.ts#L53)

## Extends

- `TokenOverridable`

## Properties

### permission\_type

```ts
permission_type: "everyone" | "named_entities" | "no_one";
```

Defined in: [packages/web-api/src/types/request/admin/slackbot.ts:57](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/slackbot.ts#L57)

#### Description

Deployment audience.

***

### skill\_id

```ts
skill_id: string;
```

Defined in: [packages/web-api/src/types/request/admin/slackbot.ts:55](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/slackbot.ts#L55)

#### Description

Canvas skill to deploy.

***

### token?

```ts
token?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

`TokenOverridable.token`

***

### usergroup\_ids?

```ts
usergroup_ids?: string[];
```

Defined in: [packages/web-api/src/types/request/admin/slackbot.ts:62](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/slackbot.ts#L62)

#### Description

One to 100 user groups for named_entities. Duplicates count toward the input limit and are stored
once. Omit for other permission types.
