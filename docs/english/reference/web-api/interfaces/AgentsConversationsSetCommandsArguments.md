[@slack/web-api](../index.md) / AgentsConversationsSetCommandsArguments

# Interface: AgentsConversationsSetCommandsArguments

Defined in: [packages/web-api/src/types/request/agents.ts:89](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L89)

## Extends

- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:91](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L91)

#### Description

ID of the code channel to register commands for.

***

### commands

```ts
commands: object[];
```

Defined in: [packages/web-api/src/types/request/agents.ts:96](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L96)

#### argument\_hint?

```ts
optional argument_hint?: string;
```

##### Description

Hint describing the command's arguments, shown in the typeahead.

#### description?

```ts
optional description?: string;
```

##### Description

Short description of what the command does.

#### name

```ts
name: string;
```

##### Description

Command name, without a leading slash. 1-31 characters, unique within the set.

#### should\_escape?

```ts
optional should_escape?: boolean;
```

##### Description

When true, channel, user, and link references in the command's text are escaped/parsed before
being sent to the agent app, matching the slash-command `should_escape` behavior. Absent is treated as false.

#### Description

Full set of commands to register for the calling agent in this channel, replacing that agent's
previously registered set. Pass an empty array to clear the agent's commands. At most 10 commands may exist across all agents in the channel; names must be unique within the set and must not collide with builtin Slack commands.

***

### token?

```ts
optional token?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```
