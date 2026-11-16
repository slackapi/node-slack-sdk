[@slack/web-api](../index.md) / SlackbotSkillsCreateArguments

# Interface: SlackbotSkillsCreateArguments

Defined in: [packages/web-api/src/types/request/slackbot.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L6)

## Extends

- `TokenOverridable`

## Properties

### canvas\_id?

```ts
canvas_id?: string;
```

Defined in: [packages/web-api/src/types/request/slackbot.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L12)

#### Description

Canvas the caller owns to turn into a skill. Send exactly one of `instructions` or `canvas_id`.

***

### category?

```ts
category?: 
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

Defined in: [packages/web-api/src/types/request/slackbot.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L16)

#### Description

One of the skill categories.

***

### description?

```ts
description?: string;
```

Defined in: [packages/web-api/src/types/request/slackbot.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L14)

#### Description

When Slackbot should use the skill. Max 400 characters.

***

### display\_name

```ts
display_name: string;
```

Defined in: [packages/web-api/src/types/request/slackbot.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L8)

#### Description

Human-readable label. Max 255 characters; not unique.

***

### example\_prompt?

```ts
example_prompt?: string;
```

Defined in: [packages/web-api/src/types/request/slackbot.ts:30](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L30)

#### Description

Max 200 characters. May contain `{skill}`, which becomes the skill mention.

***

### instructions?

```ts
instructions?: string;
```

Defined in: [packages/web-api/src/types/request/slackbot.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L10)

#### Description

Markdown body of the skill. Send exactly one of `instructions` or `canvas_id`.

***

### mcp\_servers?

```ts
mcp_servers?: object[];
```

Defined in: [packages/web-api/src/types/request/slackbot.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackbot.ts#L35)

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

Apps the skill needs, capped at the caller's MCP server limit. Declaring an app doesn't grant
access to it.

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
