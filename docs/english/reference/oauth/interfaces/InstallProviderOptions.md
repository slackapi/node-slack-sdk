[@slack/oauth](../index.md) / InstallProviderOptions

# Interface: InstallProviderOptions

Defined in: [packages/oauth/src/install-provider-options.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L8)

## Properties

### authorizationUrl?

```ts
authorizationUrl?: string;
```

Defined in: [packages/oauth/src/install-provider-options.ts:27](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L27)

The slack.com authorize URL

***

### authVersion?

```ts
authVersion?: "v1" | "v2";
```

Defined in: [packages/oauth/src/install-provider-options.ts:78](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L78)

The default is "v2" (a.k.a. Granular Bot Permissions), different from "v1" (a.k.a. "Classic Apps").
More details here:
- https://medium.com/slack-developer-blog/more-precision-less-restrictions-a3550006f9c3
- https://docs.slack.dev/legacy/legacy-app-migration/migrating-classic-apps

***

### clientId

```ts
clientId: string;
```

Defined in: [packages/oauth/src/install-provider-options.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L12)

Client ID, which can be found under the Basic Information section of your application on https://api.slack.com/apps

***

### clientOptions?

```ts
clientOptions?: Omit<WebClientOptions, "logLevel" | "logger">;
```

Defined in: [packages/oauth/src/install-provider-options.ts:98](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L98)

The customization options for WebClient

***

### clientSecret

```ts
clientSecret: string;
```

Defined in: [packages/oauth/src/install-provider-options.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L17)

Client Secret, which can be found under the Basic Information section of your application on https://api.slack.com/apps

***

### directInstall?

```ts
directInstall?: boolean;
```

Defined in: [packages/oauth/src/install-provider-options.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L70)

The install path web page rendering will be skipped if true (default: false)

***

### installationStore?

```ts
installationStore?: InstallationStore;
```

Defined in: [packages/oauth/src/install-provider-options.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L22)

Manages installation data, which can be called by both the OAuth flow and authorize() in event handling

***

### installUrlOptions?

```ts
installUrlOptions?: InstallURLOptions;
```

Defined in: [packages/oauth/src/install-provider-options.ts:83](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L83)

The initialization options for the OAuth flow

***

### legacyStateVerification?

```ts
legacyStateVerification?: boolean;
```

Defined in: [packages/oauth/src/install-provider-options.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L50)

handleCallback() skips checking browser cookies if true (default: false)
Enabling this option is not recommended.
This is supposed to be used only for backward-compatibility with v2.4 and olders.

***

### logger?

```ts
logger?: Logger;
```

Defined in: [packages/oauth/src/install-provider-options.ts:88](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L88)

@slack/logger logging used in this class

***

### logLevel?

```ts
logLevel?: LogLevel;
```

Defined in: [packages/oauth/src/install-provider-options.ts:93](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L93)

@slack/logger logging level used in this class

***

### renderHtmlForInstallPath?

```ts
renderHtmlForInstallPath?: (url) => string;
```

Defined in: [packages/oauth/src/install-provider-options.ts:65](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L65)

The function for rendering the web page for the install path URL

#### Parameters

##### url

`string`

#### Returns

`string`

***

### stateCookieExpirationSeconds?

```ts
stateCookieExpirationSeconds?: number;
```

Defined in: [packages/oauth/src/install-provider-options.ts:60](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L60)

The expiration time in seconds for the state parameter value stored via cookies

***

### stateCookieName?

```ts
stateCookieName?: string;
```

Defined in: [packages/oauth/src/install-provider-options.ts:55](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L55)

The cookie name used for setting state parameter value in cookies

***

### stateSecret?

```ts
stateSecret?: string;
```

Defined in: [packages/oauth/src/install-provider-options.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L38)

The secret value used for generating the state parameter value

***

### stateStore?

```ts
stateStore?: StateStore;
```

Defined in: [packages/oauth/src/install-provider-options.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L33)

Stores state issued to authorization server
and verifies the value returned at redirection during OAuth flow to prevent CSRF

***

### stateVerification?

```ts
stateVerification?: boolean;
```

Defined in: [packages/oauth/src/install-provider-options.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L43)

handleCallback() verifies the state parameter if true (default: true)
