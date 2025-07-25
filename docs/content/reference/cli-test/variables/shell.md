[@slack/cli-test](../index.md) / shell

# Variable: shell

```ts
const shell: object;
```

Defined in: [cli/shell.ts:9](https://github.com/slackapi/node-slack-sdk/blob/main/packages/cli-test/src/cli/shell.ts#L9)

## Type declaration

### assembleShellEnv()

```ts
assembleShellEnv: () => Record<string, string | undefined>;
```

#### Returns

`Record`\<`string`, `string` \| `undefined`\>

### checkIfFinished()

```ts
checkIfFinished: (proc) => Promise<void>;
```

Logic to wait for child process to finish executing
- Check if the close event was emitted, else wait for 1 sec
- Error out if > 30 sec

#### Parameters

##### proc

`ShellProcess`

#### Returns

`Promise`\<`void`\>

### kill()

```ts
kill: (proc) => Promise<boolean>;
```

#### Parameters

##### proc

`ShellProcess`

#### Returns

`Promise`\<`boolean`\>

### removeANSIcolors()

```ts
removeANSIcolors: (text) => string;
```

Remove all the ANSI color and style encoding

#### Parameters

##### text

`string`

string

#### Returns

`string`

### runCommandSync()

```ts
runCommandSync: (command, args, shellOpts?) => string;
```

Run shell command synchronously
- Execute child process with the command
- Wait for the command to complete and return the standard output

#### Parameters

##### command

`string`

The command to run, e.g. echo, cat, slack.exe

##### args

`string`[]

The arguments for the command, e.g. 'hi', '--skip-update'

##### shellOpts?

`Partial`\<`SpawnOptionsWithoutStdio`\>

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

##### timeout

`number` = `1000`

#### Returns

`Promise`\<`void`\>

### spawnProcess()

```ts
spawnProcess: (command, args, shellOpts?) => ShellProcess;
```

Spawns a shell command
- Start child process with the command
- Listen to data output events and collect them

#### Parameters

##### command

`string`

The command to run, e.g. echo, cat, slack.exe

##### args

`string`[]

The arguments for the command, e.g. 'hi', '--skip-update'

##### shellOpts?

`Partial`\<`SpawnOptionsWithoutStdio`\>

Options to customize shell execution

#### Returns

`ShellProcess`

command output

### waitForOutput()

```ts
waitForOutput: (expString, proc, opts?) => Promise<void>;
```

Wait for output

#### Parameters

##### expString

`string`

expected string

##### proc

`ShellProcess`

##### opts?

###### timeout?

`number`

**Description**

How long to wait for expected output in milliseconds. Defaults to 10 seconds.

#### Returns

`Promise`\<`void`\>
