[@slack/web-api](../index.md) / SlackbotSkillsUpdateArguments

# Interface: SlackbotSkillsUpdateArguments

Defined in: [packages/web-api/src/types/request/slackbot.ts:99](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L99)

## Extends

- `TokenOverridable`

## Properties

### category?

```ts
category?: 
  | ""
  | "communication"
  | "customer_support"
  | "data_and_analytics"
  | "engineering"
  | "other"
  | "product_management"
  | "productivity"
  | "professional_development"
  | "project_management"
  | "sales"
  | "system"
  | "team_management";
```

Defined in: [packages/web-api/src/types/request/slackbot.ts:109](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L109)

#### Description

One of the skill categories. Send an empty string to clear.

***

### description?

```ts
description?: string;
```

Defined in: [packages/web-api/src/types/request/slackbot.ts:107](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L107)

#### Description

When Slackbot should use the skill. Max 400 characters. Send an empty string to clear.

***

### display\_name?

```ts
display_name?: string;
```

Defined in: [packages/web-api/src/types/request/slackbot.ts:103](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L103)

#### Description

Human-readable label. Max 255 characters.

***

### example\_prompt?

```ts
example_prompt?: string;
```

Defined in: [packages/web-api/src/types/request/slackbot.ts:124](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L124)

#### Description

Max 200 characters. May contain `{skill}`. Send an empty string to clear.

***

### instructions?

```ts
instructions?: string;
```

Defined in: [packages/web-api/src/types/request/slackbot.ts:105](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L105)

#### Description

Markdown that replaces the whole document.

***

### mcp\_servers?

```ts
mcp_servers?: object[];
```

Defined in: [packages/web-api/src/types/request/slackbot.ts:126](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L126)

#### app\_id?

```ts
app_id?: string;
```

#### server\_id?

```ts
server_id?: string;
```

#### service\_type

```ts
service_type: string;
```

#### Description

Apps the skill needs. Replaces the whole list; send `[]` to clear.

***

### skill\_id

```ts
skill_id: string;
```

Defined in: [packages/web-api/src/types/request/slackbot.ts:101](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L101)

#### Description

Skill to change.

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
