# Variable: shell

```ts
const shell: object;
```

## Type declaration

### assembleShellEnv()

```ts
assembleShellEnv: () => Record<string, undefined | string>;
```

#### Returns

`Record`\<`string`, `undefined` \| `string`\>

### checkIfFinished()

```ts
checkIfFinished: (proc) => Promise<void>;
```

Logic to wait for child process to finish executing
- Check if the close event was emitted, else wait for 1 sec
- Error out if > 30 sec

#### Parameters

• **proc**: `ShellProcess`

#### Returns

`Promise`\<`void`\>

### kill()

```ts
kill: (proc) => Promise<boolean>;
```

#### Parameters

• **proc**: `ShellProcess`

#### Returns

`Promise`\<`boolean`\>

### removeANSIcolors()

```ts
removeANSIcolors: (text) => string;
```

Remove all the ANSI color and style encoding

#### Parameters

• **text**: `string`

string

#### Returns

`string`

### runCommandSync()

```ts
runCommandSync: (command, shellOpts?) => string;
```

#### Parameters

• **command**: `string`

cli command

• **shellOpts?**: `Partial`\<`SpawnOptionsWithoutStdio`\>

various shell spawning options available to customize

#### Returns

`string`

command stdout

### sleep()

```ts
sleep: (timeout) => Promise<void>;
```

Sleep function used to wait for cli to finish executing

#### Parameters

• **timeout**: `number` = `1000`

#### Returns

`Promise`\<`void`\>

### spawnProcess()

```ts
spawnProcess: (command, shellOpts?) => ShellProcess;
```

#### Parameters

• **command**: `string`

The command to run, e.g. `echo "hi"`

• **shellOpts?**: `Partial`\<`SpawnOptionsWithoutStdio`\>

Options to customize shell execution

#### Returns

`ShellProcess`

command output

### waitForOutput()

```ts
waitForOutput: (expString, proc) => Promise<void>;
```

Wait for output

#### Parameters

• **expString**: `string`

expected string

• **proc**: `ShellProcess`

#### Returns

`Promise`\<`void`\>

## Defined in

[cli/shell.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/shell.ts#L10)
