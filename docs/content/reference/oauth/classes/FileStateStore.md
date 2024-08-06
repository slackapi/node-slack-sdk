# Class: FileStateStore

Generates state parameter value in the OAuth flow.
While the state parameter value works for the CSRF protection purpose,
it can transfer the given InstallURLOptions value to the Redirect URL handler
(Redirect URL: the default path is "/slack/oauth_redirect")

## Implements

- [`StateStore`](../interfaces/StateStore.md)

## Constructors

### new FileStateStore()

```ts
new FileStateStore(args): FileStateStore
```

#### Parameters

• **args**: [`FileStateStoreArgs`](../interfaces/FileStateStoreArgs.md)

#### Returns

[`FileStateStore`](FileStateStore.md)

#### Defined in

[packages/oauth/src/state-stores/file-state-store.ts:24](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/state-stores/file-state-store.ts#L24)

## Methods

### generateStateParam()

```ts
generateStateParam(installOptions, now): Promise<string>
```

Generates a valid state parameter value, which can be decoded as a StateObj object
by the verifyStateParam() method. This value may be stored on the server-side with expiration.
The InstallProvider verifies if this value is set in the installer's browser session.

#### Parameters

• **installOptions**: [`InstallURLOptions`](../interfaces/InstallURLOptions.md)

• **now**: `Date`

#### Returns

`Promise`\<`string`\>

#### Implementation of

[`StateStore`](../interfaces/StateStore.md).[`generateStateParam`](../interfaces/StateStore.md#generatestateparam)

#### Defined in

[packages/oauth/src/state-stores/file-state-store.ts:34](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/state-stores/file-state-store.ts#L34)

***

### verifyStateParam()

```ts
verifyStateParam(now, state): Promise<InstallURLOptions>
```

Verifies the given state string value by trying to decode the value and
build the passed InstallURLOptions object from the data.
This method verifies if the state value is not too old to detect replay attacks.
If the value is invalid, this method can throw InvalidStateError exception.

#### Parameters

• **now**: `Date`

• **state**: `string`

#### Returns

`Promise`\<[`InstallURLOptions`](../interfaces/InstallURLOptions.md)\>

#### Implementation of

[`StateStore`](../interfaces/StateStore.md).[`verifyStateParam`](../interfaces/StateStore.md#verifystateparam)

#### Defined in

[packages/oauth/src/state-stores/file-state-store.ts:48](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/state-stores/file-state-store.ts#L48)
