[@slack/web-api](../index.md) / SlackbotSkillsLibraryRemoveArguments

# Interface: SlackbotSkillsLibraryRemoveArguments

Defined in: [packages/web-api/src/types/request/slackbot.ts:60](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L60)

## Extends

- `TokenOverridable`

## Properties

### skill\_id

```ts
skill_id: string;
```

Defined in: [packages/web-api/src/types/request/slackbot.ts:62](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L62)

#### Description

Skill to turn off for the caller.

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
