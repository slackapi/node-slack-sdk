# Class: SlackCLIProcess

## Constructors

### new SlackCLIProcess()

```ts
new SlackCLIProcess(
   command, 
   globalOptions?, 
   commandOptions?): SlackCLIProcess
```

#### Parameters

• **command**: `string`

• **globalOptions?**: `SlackCLIGlobalOptions`

• **commandOptions?**: `SlackCLICommandOptions`

#### Returns

[`SlackCLIProcess`](SlackCLIProcess.md)

#### Defined in

[cli/cli-process.ts:64](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/cli-process.ts#L64)

## Properties

### command

```ts
command: string;
```

#### Description

The CLI command to invoke

#### Defined in

[cli/cli-process.ts:52](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/cli-process.ts#L52)

***

### commandOptions

```ts
commandOptions: undefined | SlackCLICommandOptions;
```

#### Description

The CLI command-specific options to pass to the command

#### Defined in

[cli/cli-process.ts:62](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/cli-process.ts#L62)

***

### globalOptions

```ts
globalOptions: undefined | SlackCLIGlobalOptions;
```

#### Description

The global CLI options to pass to the command

#### Defined in

[cli/cli-process.ts:57](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/cli-process.ts#L57)

## Methods

### execAsync()

```ts
execAsync(shellOpts?): Promise<ShellProcess>
```

#### Parameters

• **shellOpts?**: `Partial`\<`SpawnOptionsWithoutStdio`\>

#### Returns

`Promise`\<`ShellProcess`\>

#### Description

Executes the command asynchronously, returning the process details once the process finishes executing

#### Defined in

[cli/cli-process.ts:76](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/cli-process.ts#L76)

***

### execAsyncUntilOutputPresent()

```ts
execAsyncUntilOutputPresent(output, shellOpts?): Promise<ShellProcess>
```

#### Parameters

• **output**: `string`

• **shellOpts?**: `Partial`\<`SpawnOptionsWithoutStdio`\>

#### Returns

`Promise`\<`ShellProcess`\>

#### Description

Executes the command asynchronously, returning the process details once the process finishes executing

#### Defined in

[cli/cli-process.ts:86](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/cli-process.ts#L86)

***

### execSync()

```ts
execSync(shellOpts?): string
```

#### Parameters

• **shellOpts?**: `Partial`\<`SpawnOptionsWithoutStdio`\>

#### Returns

`string`

#### Description

Executes the command synchronously, returning the process standard output

#### Defined in

[cli/cli-process.ts:99](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/cli-process.ts#L99)
