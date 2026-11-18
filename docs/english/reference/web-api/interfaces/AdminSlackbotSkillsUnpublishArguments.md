[@slack/web-api](../index.md) / AdminSlackbotSkillsUnpublishArguments

# Interface: AdminSlackbotSkillsUnpublishArguments

Defined in: [packages/web-api/src/types/request/admin/slackbot.ts:66](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/slackbot.ts#L66)

## Extends

- `TokenOverridable`

## Properties

### skill\_ids

```ts
skill_ids: string[];
```

Defined in: [packages/web-api/src/types/request/admin/slackbot.ts:68](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/slackbot.ts#L68)

#### Description

One to 50 skill IDs. Successful items are not rolled back if other items fail.

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
