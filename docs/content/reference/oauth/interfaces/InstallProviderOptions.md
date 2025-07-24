[@slack/oauth](../index.md) / InstallProviderOptions

# Interface: InstallProviderOptions

Defined in: [src/install-provider-options.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L8)

## Properties

### authorizationUrl?

```ts
optional authorizationUrl: string;
```

Defined in: [src/install-provider-options.ts:27](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L27)

The slack.com authorize URL

***

### authVersion?

```ts
optional authVersion: "v1" | "v2";
```

Defined in: [src/install-provider-options.ts:78](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L78)

The default is "v2" (a.k.a. Granular Bot Permissions), different from "v1" (a.k.a. "Classic Apps").
More details here:
- https://medium.com/slack-developer-blog/more-precision-less-restrictions-a3550006f9c3
- https://docs.slack.dev/legacy/legacy-app-migration/migrating-classic-apps

***

### clientId

```ts
clientId: string;
```

Defined in: [src/install-provider-options.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L12)

Client ID, which can be found under the Basic Information section of your application on https://api.slack.com/apps

***

### clientOptions?

```ts
optional clientOptions: Omit<WebClientOptions, "logLevel" | "logger">;
```

Defined in: [src/install-provider-options.ts:98](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L98)

The customization options for WebClient

***

### clientSecret

```ts
clientSecret: string;
```

Defined in: [src/install-provider-options.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L17)

Client Secret, which can be found under the Basic Information section of your application on https://api.slack.com/apps

***

### directInstall?

```ts
optional directInstall: boolean;
```

Defined in: [src/install-provider-options.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L70)

The install path web page rendering will be skipped if true (default: false)

***

### installationStore?

```ts
optional installationStore: InstallationStore;
```

Defined in: [src/install-provider-options.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L22)

Manages installation data, which can be called by both the OAuth flow and authorize() in event handling

***

### installUrlOptions?

```ts
optional installUrlOptions: InstallURLOptions;
```

Defined in: [src/install-provider-options.ts:83](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L83)

The initialization options for the OAuth flow

***

### legacyStateVerification?

```ts
optional legacyStateVerification: boolean;
```

Defined in: [src/install-provider-options.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L50)

handleCallback() skips checking browser cookies if true (default: false)
Enabling this option is not recommended.
This is supposed to be used only for backward-compatibility with v2.4 and olders.

***

### logger?

```ts
optional logger: Logger;
```

Defined in: [src/install-provider-options.ts:88](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L88)

@slack/logger logging used in this class

***

### logLevel?

```ts
optional logLevel: LogLevel;
```

Defined in: [src/install-provider-options.ts:93](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L93)

@slack/logger logging level used in this class

***

### renderHtmlForInstallPath()?

```ts
optional renderHtmlForInstallPath: (url) => string;
```

Defined in: [src/install-provider-options.ts:65](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L65)

The function for rendering the web page for the install path URL

#### Parameters

##### url

`string`

#### Returns

`string`

***

### stateCookieExpirationSeconds?

```ts
optional stateCookieExpirationSeconds: number;
```

Defined in: [src/install-provider-options.ts:60](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L60)

The expiration time in seconds for the state parameter value stored via cookies

***

### stateCookieName?

```ts
optional stateCookieName: string;
```

Defined in: [src/install-provider-options.ts:55](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L55)

The cookie name used for setting state parameter value in cookies

***

### stateSecret?

```ts
optional stateSecret: string;
```

Defined in: [src/install-provider-options.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L38)

The secret value used for generating the state parameter value

***

### stateStore?

```ts
optional stateStore: StateStore;
```

Defined in: [src/install-provider-options.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L33)

Stores state issued to authorization server
and verifies the value returned at redirection during OAuth flow to prevent CSRF

***

### stateVerification?

```ts
optional stateVerification: boolean;
```

Defined in: [src/install-provider-options.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L43)

handleCallback() verifies the state parameter if true (default: true)
