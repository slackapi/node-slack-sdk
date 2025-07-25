[@slack/oauth](../index.md) / InstallProvider

# Class: InstallProvider

Defined in: [src/install-provider.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L32)

InstallProvider Class. Refer to InsallProviderOptions interface for the details of constructor arguments.

## Constructors

### Constructor

```ts
new InstallProvider(__namedParameters): InstallProvider;
```

Defined in: [src/install-provider.ts:87](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L87)

#### Parameters

##### \_\_namedParameters

[`InstallProviderOptions`](../interfaces/InstallProviderOptions.md)

#### Returns

`InstallProvider`

## Properties

### installationStore

```ts
installationStore: InstallationStore;
```

Defined in: [src/install-provider.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L38)

***

### stateStore?

```ts
optional stateStore: StateStore;
```

Defined in: [src/install-provider.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L35)

## Methods

### authorize()

```ts
authorize(source): Promise<AuthorizeResult>;
```

Defined in: [src/install-provider.ts:177](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L177)

Fetches data from the installationStore

#### Parameters

##### source

[`InstallationQuery`](../interfaces/InstallationQuery.md)\<`boolean`\>

#### Returns

`Promise`\<[`AuthorizeResult`](../interfaces/AuthorizeResult.md)\>

***

### generateInstallUrl()

```ts
generateInstallUrl(
   options, 
   stateVerification, 
state?): Promise<string>;
```

Defined in: [src/install-provider.ts:415](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L415)

Returns a URL that is suitable for including in an Add to Slack button
Uses stateStore to generate a value for the state query param.

#### Parameters

##### options

[`InstallURLOptions`](../interfaces/InstallURLOptions.md)

##### stateVerification

`boolean` = `true`

##### state?

`string`

#### Returns

`Promise`\<`string`\>

***

### handleCallback()

```ts
handleCallback(
   req, 
   res, 
   options?, 
installOptions?): Promise<void>;
```

Defined in: [src/install-provider.ts:485](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L485)

This method handles the incoming request to the callback URL.
It can be used as a RequestListener in almost any HTTP server
framework.

Verifies the state using the stateStore, exchanges the grant in the
query params for an access token, and stores token and associated data
in the installationStore.

#### Parameters

##### req

`IncomingMessage`

##### res

`ServerResponse`

##### options?

[`CallbackOptions`](../interfaces/CallbackOptions.md)

##### installOptions?

[`InstallURLOptions`](../interfaces/InstallURLOptions.md)

#### Returns

`Promise`\<`void`\>

***

### handleInstallPath()

```ts
handleInstallPath(
   req, 
   res, 
   options?, 
installOptions?): Promise<void>;
```

Defined in: [src/install-provider.ts:330](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L330)

Handles the install path (the default is /slack/install) requests from an app installer.

#### Parameters

##### req

`IncomingMessage`

##### res

`ServerResponse`

##### options?

[`InstallPathOptions`](../interfaces/InstallPathOptions.md)

##### installOptions?

[`InstallURLOptions`](../interfaces/InstallURLOptions.md)

#### Returns

`Promise`\<`void`\>
