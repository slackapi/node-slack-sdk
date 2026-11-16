[@slack/web-api](../index.md) / SlackbotSkillsLibraryAddArguments

# Interface: SlackbotSkillsLibraryAddArguments

Defined in: [packages/web-api/src/types/request/slackbot.ts:54](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L54)

## Extends

- `TokenOverridable`

## Properties

### skill\_id

```ts
skill_id: string;
```

Defined in: [packages/web-api/src/types/request/slackbot.ts:56](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L56)

#### Description

Skill to turn on for the caller.

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
