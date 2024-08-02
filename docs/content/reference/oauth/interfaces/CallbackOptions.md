# Interface: CallbackOptions

## Properties

### afterInstallation()?

```ts
optional afterInstallation: (installation, options, callbackReq, callbackRes) => Promise<boolean>;
```

An additional logic to run right after executing the Slack app installation with the given OAuth code parameter.

When this method returns false, the InstallProvider skips storing the installation in database.
You can set false when your app needs to cancel the installation (you can call auth.revoke API method for it)
and then, the app needs to display an error page to the installing user.

Also, when returning false, this method is responsible to call callbackRes#end() method
to build complete HTTP response for end-users.

#### Parameters

• **installation**: [`Installation`](Installation.md)\<`"v1"` \| `"v2"`, `boolean`\> \| [`OrgInstallation`](../type-aliases/OrgInstallation.md)

• **options**: [`InstallURLOptions`](InstallURLOptions.md)

• **callbackReq**: `IncomingMessage`

• **callbackRes**: `ServerResponse`

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/oauth/src/callback-options.ts:34](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/oauth/src/callback-options.ts#L34)

***

### beforeInstallation()?

```ts
optional beforeInstallation: (options, callbackReq, callbackRes) => Promise<boolean>;
```

An additional logic to run right before executing the Slack app installation with the given OAuth code parameter.

When this method returns false, the InstallProvider skips the installation.
You can set false when the visiting user is not eligible to proceed with the Slack app installation flow.

Also, when returning false, this method is responsible for calling the callbackRes#end() method
to build a complete HTTP response for end-users.

#### Parameters

• **options**: [`InstallURLOptions`](InstallURLOptions.md)

• **callbackReq**: `IncomingMessage`

• **callbackRes**: `ServerResponse`

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/oauth/src/callback-options.ts:18](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/oauth/src/callback-options.ts#L18)

***

### failure()?

```ts
optional failure: (error, options, callbackReq, callbackRes) => void;
```

#### Parameters

• **error**: [`CodedError`](CodedError.md)

• **options**: [`InstallURLOptions`](InstallURLOptions.md)

• **callbackReq**: `IncomingMessage`

• **callbackRes**: `ServerResponse`

#### Returns

`void`

#### Defined in

[packages/oauth/src/callback-options.ts:64](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/oauth/src/callback-options.ts#L64)

***

### failureAsync()?

```ts
optional failureAsync: (error, options, callbackReq, callbackRes) => Promise<void>;
```

#### Parameters

• **error**: [`CodedError`](CodedError.md)

• **options**: [`InstallURLOptions`](InstallURLOptions.md)

• **callbackReq**: `IncomingMessage`

• **callbackRes**: `ServerResponse`

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/oauth/src/callback-options.ts:73](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/oauth/src/callback-options.ts#L73)

***

### success()?

```ts
optional success: (installation, options, callbackReq, callbackRes) => void;
```

#### Parameters

• **installation**: [`Installation`](Installation.md)\<`"v1"` \| `"v2"`, `boolean`\> \| [`OrgInstallation`](../type-aliases/OrgInstallation.md)

• **options**: [`InstallURLOptions`](InstallURLOptions.md)

• **callbackReq**: `IncomingMessage`

• **callbackRes**: `ServerResponse`

#### Returns

`void`

#### Defined in

[packages/oauth/src/callback-options.ts:44](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/oauth/src/callback-options.ts#L44)

***

### successAsync()?

```ts
optional successAsync: (installation, options, callbackReq, callbackRes) => Promise<void>;
```

#### Parameters

• **installation**: [`Installation`](Installation.md)\<`"v1"` \| `"v2"`, `boolean`\> \| [`OrgInstallation`](../type-aliases/OrgInstallation.md)

• **options**: [`InstallURLOptions`](InstallURLOptions.md)

• **callbackReq**: `IncomingMessage`

• **callbackRes**: `ServerResponse`

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/oauth/src/callback-options.ts:53](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/oauth/src/callback-options.ts#L53)
