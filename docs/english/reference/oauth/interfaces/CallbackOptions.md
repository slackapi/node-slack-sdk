[@slack/oauth](../index.md) / CallbackOptions

# Interface: CallbackOptions

Defined in: [src/callback-options.ts:7](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/callback-options.ts#L7)

## Properties

### afterInstallation()?

```ts
optional afterInstallation: (installation, options, callbackReq, callbackRes) => Promise<boolean>;
```

Defined in: [src/callback-options.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/callback-options.ts#L33)

An additional logic to run right after executing the Slack app installation with the given OAuth code parameter.

When this method returns false, the InstallProvider skips storing the installation in database.
You can set false when your app needs to cancel the installation (you can call auth.revoke API method for it)
and then, the app needs to display an error page to the installing user.

Also, when returning false, this method is responsible to call callbackRes#end() method
to build complete HTTP response for end-users.

#### Parameters

##### installation

[`Installation`](Installation.md)\<`"v1"` \| `"v2"`, `boolean`\> | [`OrgInstallation`](../type-aliases/OrgInstallation.md)

##### options

[`InstallURLOptions`](InstallURLOptions.md)

##### callbackReq

`IncomingMessage`

##### callbackRes

`ServerResponse`

#### Returns

`Promise`\<`boolean`\>

***

### beforeInstallation()?

```ts
optional beforeInstallation: (options, callbackReq, callbackRes) => Promise<boolean>;
```

Defined in: [src/callback-options.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/callback-options.ts#L17)

An additional logic to run right before executing the Slack app installation with the given OAuth code parameter.

When this method returns false, the InstallProvider skips the installation.
You can set false when the visiting user is not eligible to proceed with the Slack app installation flow.

Also, when returning false, this method is responsible for calling the callbackRes#end() method
to build a complete HTTP response for end-users.

#### Parameters

##### options

[`InstallURLOptions`](InstallURLOptions.md)

##### callbackReq

`IncomingMessage`

##### callbackRes

`ServerResponse`

#### Returns

`Promise`\<`boolean`\>

***

### failure()?

```ts
optional failure: (error, options, callbackReq, callbackRes) => void;
```

Defined in: [src/callback-options.ts:63](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/callback-options.ts#L63)

#### Parameters

##### error

[`CodedError`](CodedError.md)

##### options

[`InstallURLOptions`](InstallURLOptions.md)

##### callbackReq

`IncomingMessage`

##### callbackRes

`ServerResponse`

#### Returns

`void`

***

### failureAsync()?

```ts
optional failureAsync: (error, options, callbackReq, callbackRes) => Promise<void>;
```

Defined in: [src/callback-options.ts:72](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/callback-options.ts#L72)

#### Parameters

##### error

[`CodedError`](CodedError.md)

##### options

[`InstallURLOptions`](InstallURLOptions.md)

##### callbackReq

`IncomingMessage`

##### callbackRes

`ServerResponse`

#### Returns

`Promise`\<`void`\>

***

### success()?

```ts
optional success: (installation, options, callbackReq, callbackRes) => void;
```

Defined in: [src/callback-options.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/callback-options.ts#L43)

#### Parameters

##### installation

[`Installation`](Installation.md)\<`"v1"` \| `"v2"`, `boolean`\> | [`OrgInstallation`](../type-aliases/OrgInstallation.md)

##### options

[`InstallURLOptions`](InstallURLOptions.md)

##### callbackReq

`IncomingMessage`

##### callbackRes

`ServerResponse`

#### Returns

`void`

***

### successAsync()?

```ts
optional successAsync: (installation, options, callbackReq, callbackRes) => Promise<void>;
```

Defined in: [src/callback-options.ts:52](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/callback-options.ts#L52)

#### Parameters

##### installation

[`Installation`](Installation.md)\<`"v1"` \| `"v2"`, `boolean`\> | [`OrgInstallation`](../type-aliases/OrgInstallation.md)

##### options

[`InstallURLOptions`](InstallURLOptions.md)

##### callbackReq

`IncomingMessage`

##### callbackRes

`ServerResponse`

#### Returns

`Promise`\<`void`\>
