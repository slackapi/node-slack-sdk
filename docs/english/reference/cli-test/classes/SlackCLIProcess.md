[@slack/cli-test](../index.md) / SlackCLIProcess

# Class: SlackCLIProcess

Defined in: [cli/cli-process.ts:49](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/cli-process.ts#L49)

## Constructors

### Constructor

```ts
new SlackCLIProcess(
   command, 
   globalOptions?, 
   commandOptions?): SlackCLIProcess;
```

Defined in: [cli/cli-process.ts:65](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/cli-process.ts#L65)

#### Parameters

##### command

`string`[]

##### globalOptions?

`SlackCLIGlobalOptions`

##### commandOptions?

`SlackCLICommandOptions`

#### Returns

`SlackCLIProcess`

## Properties

### command

```ts
command: string[];
```

Defined in: [cli/cli-process.ts:53](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/cli-process.ts#L53)

#### Description

The CLI command to invoke

***

### commandOptions

```ts
commandOptions: undefined | SlackCLICommandOptions;
```

Defined in: [cli/cli-process.ts:63](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/cli-process.ts#L63)

#### Description

The CLI command-specific options to pass to the command

***

### globalOptions

```ts
globalOptions: undefined | SlackCLIGlobalOptions;
```

Defined in: [cli/cli-process.ts:58](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/cli-process.ts#L58)

#### Description

The global CLI options to pass to the command

## Methods

### execAsync()

```ts
execAsync(shellOpts?): Promise<ShellProcess>;
```

Defined in: [cli/cli-process.ts:81](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/cli-process.ts#L81)

#### Parameters

##### shellOpts?

`Partial`\<`SpawnOptionsWithoutStdio`\>

#### Returns

`Promise`\<`ShellProcess`\>

#### Description

Executes the command asynchronously, returning the process details once the process finishes executing

***

### execAsyncUntilOutputPresent()

```ts
execAsyncUntilOutputPresent(output, shellOpts?): Promise<ShellProcess>;
```

Defined in: [cli/cli-process.ts:92](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/cli-process.ts#L92)

#### Parameters

##### output

`string`

##### shellOpts?

`Partial`\<`SpawnOptionsWithoutStdio`\>

#### Returns

`Promise`\<`ShellProcess`\>

#### Description

Executes the command asynchronously, returning the process details once the process finishes executing

***

### execSync()

```ts
execSync(shellOpts?): string;
```

Defined in: [cli/cli-process.ts:108](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/cli-process.ts#L108)

#### Parameters

##### shellOpts?

`Partial`\<`SpawnOptionsWithoutStdio`\>

#### Returns

`string`

#### Description

Executes the command synchronously, returning the process standard output
