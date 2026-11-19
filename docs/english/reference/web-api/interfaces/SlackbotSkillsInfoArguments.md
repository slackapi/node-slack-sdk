[@slack/web-api](../index.md) / SlackbotSkillsInfoArguments

# Interface: SlackbotSkillsInfoArguments

Defined in: [packages/web-api/src/types/request/slackbot.ts:48](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L48)

## Extends

- `TokenOverridable`

## Properties

### skill\_id

```ts
skill_id: string;
```

Defined in: [packages/web-api/src/types/request/slackbot.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L50)

#### Description

Skill to fetch: a canvas file ID or a `builtin:` reference.

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
