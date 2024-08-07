# Variable: SlackCLI

```ts
const SlackCLI: object;
```

Set of functions to spawn and interact with Slack Platform CLI processes and commands

## Type declaration

### app

```ts
app: object;
```

### app.delete()

```ts
delete: (args) => Promise<string> = del;
```

`slack app delete`

#### Parameters

• **args**: `ProjectCommandArguments`

#### Returns

`Promise`\<`string`\>

command output

### app.install()

```ts
install: (args) => Promise<string>;
```

`slack app install`

#### Parameters

• **args**: `ProjectCommandArguments`

#### Returns

`Promise`\<`string`\>

command output

### app.list()

```ts
list: (args) => Promise<string>;
```

`slack app list`

#### Parameters

• **args**: `ProjectCommandArguments`

#### Returns

`Promise`\<`string`\>

command output

### auth

```ts
auth: object;
```

### auth.loginChallengeExchange()

```ts
loginChallengeExchange: (args) => Promise<string>;
```

#### Parameters

• **args**: `SlackCLIHostTargetOptions` & `object`

#### Returns

`Promise`\<`string`\>

### auth.loginNoPrompt()

```ts
loginNoPrompt: (args?) => Promise<object>;
```

`slack login --no-prompt`; initiates a CLI login flow. The `authTicketSlashCommand` returned should be entered
 into the Slack client, and the challenge code retrieved and fed into the `loginChallengeExchange` method to
 complete the CLI login flow.

#### Parameters

• **args?**: `SlackCLIHostTargetOptions`

#### Returns

`Promise`\<`object`\>

##### authTicket

```ts
authTicket: string;
```

An auth ticket is a A UUID sequence granted by Slack to a CLI auth requestor.
That ticket must then be submitted via slash command by a user logged in to Slack and permissions accepted to be
granted a token for use. This `authTicket` is included in the `authTicketSlashCommand`.

##### authTicketSlashCommand

```ts
authTicketSlashCommand: string;
```

###### Description

Slash command that a Slack client user must enter into the message composer in order to initiate
login flow.

###### Example

```ts
`/slackauthticket MTMxNjgxMDUtYTYwOC00NzRhLWE3M2YtMjVmZTQyMjc1MDg4`
```

##### output

```ts
output: string;
```

###### Description

Command output

### auth.logout()

```ts
logout: (args?) => Promise<string>;
```

#### Parameters

• **args?**: Omit\<SlackCLIGlobalOptions, "team"\> & (Pick\<SlackCLIGlobalOptions, "team"\> \| \{ all?: boolean \| undefined; \})

#### Returns

`Promise`\<`string`\>

command output

### collaborator

```ts
collaborator: object;
```

### collaborator.add()

```ts
add: (args) => Promise<string>;
```

`slack collaborators add`

#### Parameters

• **args**: `ProjectCommandArguments` & `CollaboratorEmail`

#### Returns

`Promise`\<`string`\>

command output

### collaborator.list()

```ts
list: (args) => Promise<string>;
```

`slack collaborators list`

#### Parameters

• **args**: `ProjectCommandArguments`

#### Returns

`Promise`\<`string`\>

command output

### collaborator.remove()

```ts
remove: (args) => Promise<string>;
```

`slack collaborators remove`

#### Parameters

• **args**: `ProjectCommandArguments` & `CollaboratorEmail`

#### Returns

`Promise`\<`string`\>

command output

### create()

```ts
create: (args) => Promise<string>;
```

`slack create`

#### Parameters

• **args**: `ProjectCommandArguments` & `object`

#### Returns

`Promise`\<`string`\>

command output

### env

```ts
env: object;
```

### env.add()

```ts
add: (args) => Promise<string>;
```

`slack env add`

#### Parameters

• **args**: `ProjectCommandArguments` & `EnvCommandArguments`

#### Returns

`Promise`\<`string`\>

command output

### env.list()

```ts
list: (args) => Promise<string>;
```

`slack env list`

#### Parameters

• **args**: `ProjectCommandArguments`

#### Returns

`Promise`\<`string`\>

command output

### env.remove()

```ts
remove: (args) => Promise<string>;
```

`slack env remove`

#### Parameters

• **args**: `ProjectCommandArguments` & `Pick`\<`EnvCommandArguments`, `"secretKey"`\>

#### Returns

`Promise`\<`string`\>

command output

### externalAuth

```ts
externalAuth: object;
```

### externalAuth.add()

```ts
add: (args) => Promise<string>;
```

`slack external-auth add`

#### Parameters

• **args**: `ProjectCommandArguments` & `Pick`\<`ExternalAuthCommandArguments`, `"provider"`\>

#### Returns

`Promise`\<`string`\>

command output

### externalAuth.addSecret()

```ts
addSecret: (args) => Promise<string>;
```

`slack external-auth add-secret`

#### Parameters

• **args**: `ProjectCommandArguments` & `Omit`\<`ExternalAuthCommandArguments`, `"all"`\>

#### Returns

`Promise`\<`string`\>

command output

### externalAuth.remove()

```ts
remove: (args) => Promise<string>;
```

`slack external-auth remove`

#### Parameters

• **args**: `ProjectCommandArguments` & `Omit`\<`ExternalAuthCommandArguments`, `"secret"`\>

#### Returns

`Promise`\<`string`\>

command output

### externalAuth.selectAuth()

```ts
selectAuth: (args) => Promise<string>;
```

`slack external-auth select-auth`

#### Parameters

• **args**: `ProjectCommandArguments` & `Pick`\<`ExternalAuthCommandArguments`, `"provider"`\> & `object`

#### Returns

`Promise`\<`string`\>

command output

### function

```ts
function: object = func;
```

### function.access()

```ts
access: (args) => Promise<string>;
```

`slack function access`

#### Parameters

• **args**: `ProjectCommandArguments` & `FunctionAccessArguments`

#### Returns

`Promise`\<`string`\>

command output

### manifest

```ts
manifest: object;
```

### manifest.info()

```ts
info: (args) => Promise<string>;
```

`slack manifest info`

#### Parameters

• **args**: `ProjectCommandArguments` & `object`

#### Returns

`Promise`\<`string`\>

command output

### manifest.validate()

```ts
validate: (args) => Promise<string>;
```

`slack manifest validate`

#### Parameters

• **args**: `ProjectCommandArguments`

#### Returns

`Promise`\<`string`\>

command output

### platform

```ts
platform: object;
```

### platform.activity()

```ts
activity: (args) => Promise<string>;
```

`slack platform activity`

#### Parameters

• **args**: `ProjectCommandArguments` & `object`

#### Returns

`Promise`\<`string`\>

command output

### platform.activityTailStart()

```ts
activityTailStart: (args) => Promise<ShellProcess>;
```

`slack platform activity` but waits for a specified sequence then returns the shell
At the specific point where the sequence is found to continue with test

#### Parameters

• **args**: `ProjectCommandArguments` & `StringWaitArgument`

#### Returns

`Promise`\<`ShellProcess`\>

command output

### platform.activityTailStop()

```ts
activityTailStop: (args) => Promise<string>;
```

Waits for a specified string in the provided `activityTailStart` process output,
kills the process then returns the output

#### Parameters

• **args**: `StringWaitArgument` & `ProcessArgument`

#### Returns

`Promise`\<`string`\>

command output

### platform.deploy()

```ts
deploy: (args) => Promise<string>;
```

`slack deploy`

#### Parameters

• **args**: `ProjectCommandArguments` & `Omit`\<`RunDeployArguments`, `"cleanup"`\>

#### Returns

`Promise`\<`string`\>

command output

### platform.runStart()

```ts
runStart: (args) => Promise<ShellProcess>;
```

start `slack run`. `runStop` must be used to stop the `run` process returned by this method.

#### Parameters

• **args**: `ProjectCommandArguments` & `RunDeployArguments`

#### Returns

`Promise`\<`ShellProcess`\>

shell object to kill it explicitly in the test case via `runStop`

### platform.runStop()

```ts
runStop: (args) => Promise<void>;
```

stop `slack run`

#### Parameters

• **args**: `ProcessArgument` & `object`

#### Returns

`Promise`\<`void`\>

### stopSession()

```ts
stopSession: (args) => Promise<void>;
```

Delete app and Log out of current team session

#### Parameters

• **args**: `Partial`\<`ProjectCommandArguments`\> & `object`

#### Returns

`Promise`\<`void`\>

### trigger

```ts
trigger: object;
```

### trigger.access()

```ts
access: (args) => Promise<string>;
```

`slack trigger access`

#### Parameters

• **args**: `ProjectCommandArguments` & `TriggerAccessArguments`

#### Returns

`Promise`\<`string`\>

command output

### trigger.create()

```ts
create: (args) => Promise<string>;
```

`slack trigger create`

#### Parameters

• **args**: `ProjectCommandArguments` & `CreateArguments`

#### Returns

`Promise`\<`string`\>

command output

### trigger.delete()

```ts
delete: (args) => Promise<string> = del;
```

`slack trigger delete`

#### Parameters

• **args**: `ProjectCommandArguments` & `TriggerIdArgument`

#### Returns

`Promise`\<`string`\>

command output

### trigger.info()

```ts
info: (args) => Promise<string>;
```

`slack trigger info`

#### Parameters

• **args**: `ProjectCommandArguments` & `TriggerIdArgument`

#### Returns

`Promise`\<`string`\>

command output

### trigger.list()

```ts
list: (args) => Promise<string>;
```

`slack trigger list`

#### Parameters

• **args**: `ProjectCommandArguments` & `object`

#### Returns

`Promise`\<`string`\>

command output

### trigger.update()

```ts
update: (args) => Promise<string>;
```

`slack trigger update`

#### Parameters

• **args**: `ProjectCommandArguments` & `TriggerIdArgument` & `CreateFromFile` \| `Partial`\<`CreateFromArguments`\>

#### Returns

`Promise`\<`string`\>

command output

## Defined in

[cli/index.ts:20](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/index.ts#L20)
