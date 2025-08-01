[@slack/oauth](../index.md) / ClearStateStore

# Class: ClearStateStore

Defined in: [src/state-stores/clear-state-store.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/state-stores/clear-state-store.ts#L8)

Generates state parameter value in the OAuth flow.
While the state parameter value works for the CSRF protection purpose,
it can transfer the given InstallURLOptions value to the Redirect URL handler
(Redirect URL: the default path is "/slack/oauth_redirect")

## Implements

- [`StateStore`](../interfaces/StateStore.md)

## Constructors

### Constructor

```ts
new ClearStateStore(stateSecret, stateExpirationSeconds): ClearStateStore;
```

Defined in: [src/state-stores/clear-state-store.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/state-stores/clear-state-store.ts#L13)

#### Parameters

##### stateSecret

`string`

##### stateExpirationSeconds

`number` = `600`

#### Returns

`ClearStateStore`

## Methods

### generateStateParam()

```ts
generateStateParam(installOptions, now): Promise<string>;
```

Defined in: [src/state-stores/clear-state-store.ts:18](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/state-stores/clear-state-store.ts#L18)

Generates a valid state parameter value, which can be decoded as a StateObj object
by the verifyStateParam() method. This value may be stored on the server-side with expiration.
The InstallProvider verifies if this value is set in the installer's browser session.

#### Parameters

##### installOptions

[`InstallURLOptions`](../interfaces/InstallURLOptions.md)

##### now

`Date`

#### Returns

`Promise`\<`string`\>

#### Implementation of

[`StateStore`](../interfaces/StateStore.md).[`generateStateParam`](../interfaces/StateStore.md#generatestateparam)

***

### verifyStateParam()

```ts
verifyStateParam(now, state): Promise<InstallURLOptions>;
```

Defined in: [src/state-stores/clear-state-store.ts:27](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/state-stores/clear-state-store.ts#L27)

Verifies the given state string value by trying to decode the value and
build the passed InstallURLOptions object from the data.
This method verifies if the state value is not too old to detect replay attacks.
If the value is invalid, this method can throw InvalidStateError exception.

#### Parameters

##### now

`Date`

##### state

`string`

#### Returns

`Promise`\<[`InstallURLOptions`](../interfaces/InstallURLOptions.md)\>

#### Implementation of

[`StateStore`](../interfaces/StateStore.md).[`verifyStateParam`](../interfaces/StateStore.md#verifystateparam)
