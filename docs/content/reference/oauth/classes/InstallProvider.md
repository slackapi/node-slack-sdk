# Class: InstallProvider

InstallProvider Class. Refer to InsallProviderOptions interface for the details of constructor arguments.

## Constructors

### new InstallProvider()

```ts
new InstallProvider(__namedParameters): InstallProvider
```

#### Parameters

• **\_\_namedParameters**: [`InstallProviderOptions`](../interfaces/InstallProviderOptions.md)

#### Returns

[`InstallProvider`](InstallProvider.md)

#### Defined in

[packages/oauth/src/install-provider.ts:87](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L87)

## Properties

### installationStore

```ts
installationStore: InstallationStore;
```

#### Defined in

[packages/oauth/src/install-provider.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L38)

***

### stateStore?

```ts
optional stateStore: StateStore;
```

#### Defined in

[packages/oauth/src/install-provider.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L35)

## Methods

### authorize()

```ts
authorize(source): Promise<AuthorizeResult>
```

Fetches data from the installationStore

#### Parameters

• **source**: [`InstallationQuery`](../interfaces/InstallationQuery.md)\<`boolean`\>

#### Returns

`Promise`\<[`AuthorizeResult`](../interfaces/AuthorizeResult.md)\>

#### Defined in

[packages/oauth/src/install-provider.ts:173](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L173)

***

### generateInstallUrl()

```ts
generateInstallUrl(
   options, 
   stateVerification, 
state?): Promise<string>
```

Returns a URL that is suitable for including in an Add to Slack button
Uses stateStore to generate a value for the state query param.

#### Parameters

• **options**: [`InstallURLOptions`](../interfaces/InstallURLOptions.md)

• **stateVerification**: `boolean` = `true`

• **state?**: `string`

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/oauth/src/install-provider.ts:408](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L408)

***

### handleCallback()

```ts
handleCallback(
   req, 
   res, 
   options?, 
installOptions?): Promise<void>
```

This method handles the incoming request to the callback URL.
It can be used as a RequestListener in almost any HTTP server
framework.

Verifies the state using the stateStore, exchanges the grant in the
query params for an access token, and stores token and associated data
in the installationStore.

#### Parameters

• **req**: `IncomingMessage`

• **res**: `ServerResponse`

• **options?**: [`CallbackOptions`](../interfaces/CallbackOptions.md)

• **installOptions?**: [`InstallURLOptions`](../interfaces/InstallURLOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/oauth/src/install-provider.ts:478](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L478)

***

### handleInstallPath()

```ts
handleInstallPath(
   req, 
   res, 
   options?, 
installOptions?): Promise<void>
```

Handles the install path (the default is /slack/install) requests from an app installer.

#### Parameters

• **req**: `IncomingMessage`

• **res**: `ServerResponse`

• **options?**: [`InstallPathOptions`](../interfaces/InstallPathOptions.md)

• **installOptions?**: [`InstallURLOptions`](../interfaces/InstallURLOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/oauth/src/install-provider.ts:324](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L324)
