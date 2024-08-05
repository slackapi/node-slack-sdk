# Interface: StateStore

Generates state parameter value in the OAuth flow.
While the state parameter value works for the CSRF protection purpose,
it can transfer the given InstallURLOptions value to the Redirect URL handler
(Redirect URL: the default path is "/slack/oauth_redirect")

## Properties

### generateStateParam()

```ts
generateStateParam: (installOptions, now) => Promise<string>;
```

Generates a valid state parameter value, which can be decoded as a StateObj object
by the verifyStateParam() method. This value may be stored on the server-side with expiration.
The InstallProvider verifies if this value is set in the installer's browser session.

#### Parameters

• **installOptions**: [`InstallURLOptions`](InstallURLOptions.md)

• **now**: `Date`

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/oauth/src/state-stores/interface.ts:33](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/oauth/src/state-stores/interface.ts#L33)

***

### verifyStateParam()

```ts
verifyStateParam: (now, state) => Promise<InstallURLOptions>;
```

Verifies the given state string value by trying to decode the value and
build the passed InstallURLOptions object from the data.
This method verifies if the state value is not too old to detect replay attacks.
If the value is invalid, this method can throw InvalidStateError exception.

#### Parameters

• **now**: `Date`

• **state**: `string`

#### Returns

`Promise`\<[`InstallURLOptions`](InstallURLOptions.md)\>

#### Defined in

[packages/oauth/src/state-stores/interface.ts:41](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/oauth/src/state-stores/interface.ts#L41)
