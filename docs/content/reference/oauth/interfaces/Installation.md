# Interface: Installation\<AuthVersion, IsEnterpriseInstall\>

An individual installation of the Slack app.

This interface creates a representation for installations that normalizes the responses from OAuth grant exchanges
across auth versions (responses from the Web API methods `oauth.v2.access` and `oauth.access`). It describes some of
these differences using the `AuthVersion` generic placeholder type.

This interface also represents both installations which occur on individual Slack workspaces and on Slack enterprise
organizations. The `IsEnterpriseInstall` generic placeholder type is used to describe some of those differences.

This representation is designed to be used both when producing data that should be stored by an InstallationStore,
and when consuming data that is fetched from an InstallationStore. Most often, InstallationStore implementations
are a database. If you are going to implement an InstallationStore, it's advised that you **store as much of the
data in these objects as possible so that you can return as much as possible inside `fetchInstallation()`**.

A few properties are synthesized with a default value if they are not present when returned from
`fetchInstallation()`. These properties are optional in the interface so that stored installations from previous
versions of this library (from before those properties were introduced) continue to work without requiring a breaking
change. However the synthesized default values are not always perfect and are based on some assumptions, so this is
why it's recommended to store as much of that data as possible in any InstallationStore.

Some of the properties (e.g. `team.name`) can change between when the installation occurred and when it is fetched
from the InstallationStore. This can be seen as a reason not to store those properties. In most workspaces these
properties rarely change, and for most Slack apps having a slightly out of date value has no impact. However if your
app uses these values in a way where it must be up to date, it's recommended to implement a caching strategy in the
InstallationStore to fetch the latest data from the Web API (using methods such as `auth.test`, `teams.info`, etc.)
as often as it makes sense for your Slack app.

TODO: IsEnterpriseInstall is always false when AuthVersion is v1

## Type Parameters

• **AuthVersion** *extends* `"v1"` \| `"v2"` = `"v1"` \| `"v2"`

• **IsEnterpriseInstall** *extends* `boolean` = `boolean`

## Properties

### appId?

```ts
optional appId: AuthVersion extends "v2" ? string : undefined;
```

The App ID, which does not vary per installation. Left as undefined when not returned from fetch.

#### Defined in

[packages/oauth/src/installation.ts:76](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L76)

***

### authVersion?

```ts
optional authVersion: AuthVersion;
```

The version of Slack's auth flow that produced this installation. Synthesized as `v2` when not present.

#### Defined in

[packages/oauth/src/installation.ts:91](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L91)

***

### bot?

```ts
optional bot: object;
```

#### expiresAt?

```ts
optional expiresAt: number;
```

#### id

```ts
id: string;
```

#### refreshToken?

```ts
optional refreshToken: string;
```

#### scopes

```ts
scopes: string[];
```

#### token

```ts
token: string;
```

#### userId

```ts
userId: string;
```

#### Defined in

[packages/oauth/src/installation.ts:57](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L57)

***

### enterprise

```ts
enterprise: IsEnterpriseInstall extends true ? EnterpriseInfo : undefined | EnterpriseInfo;
```

When the installation is an enterprise install or when the installation occurs on the org to acquire `admin` scope,
the name and ID of the enterprise org.

#### Defined in

[packages/oauth/src/installation.ts:47](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L47)

***

### enterpriseUrl?

```ts
optional enterpriseUrl: AuthVersion extends "v2" ? string : undefined;
```

When the installation is an enterprise org install, the URL of the landing page for all workspaces in the org.
Left as undefined when not returned from fetch.

#### Defined in

[packages/oauth/src/installation.ts:85](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L85)

***

### incomingWebhook?

```ts
optional incomingWebhook: object;
```

#### channel?

```ts
optional channel: string;
```

Left as undefined when not returned from fetch.

#### channelId?

```ts
optional channelId: string;
```

Left as undefined when not returned from fetch.

#### configurationUrl?

```ts
optional configurationUrl: string;
```

Left as undefined when not returned from fetch.

#### url

```ts
url: string;
```

#### Defined in

[packages/oauth/src/installation.ts:65](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L65)

***

### isEnterpriseInstall?

```ts
optional isEnterpriseInstall: IsEnterpriseInstall;
```

Whether the installation was performed on an enterprise org. Synthesized as `false` when not present.

#### Defined in

[packages/oauth/src/installation.ts:88](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L88)

***

### metadata?

```ts
optional metadata: string;
```

A string value that can be held in the state parameter in the OAuth flow.

#### Defined in

[packages/oauth/src/installation.ts:94](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L94)

***

### team

```ts
team: IsEnterpriseInstall extends true ? undefined : object;
```

TODO: when performing a “single workspace” install with the admin scope on the enterprise,
is the team property returned from oauth.access?

#### Defined in

[packages/oauth/src/installation.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L37)

***

### tokenType?

```ts
optional tokenType: "bot";
```

When the installation contains a bot user, the token type. Left as undefined when not returned from fetch.

#### Defined in

[packages/oauth/src/installation.ts:79](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L79)

***

### user

```ts
user: object;
```

#### expiresAt?

```ts
optional expiresAt: AuthVersion extends "v1" ? never : undefined | number;
```

#### id

```ts
id: string;
```

#### refreshToken?

```ts
optional refreshToken: AuthVersion extends "v1" ? never : undefined | string;
```

#### scopes

```ts
scopes: AuthVersion extends "v1" ? string[] : undefined | string[];
```

#### token

```ts
token: AuthVersion extends "v1" ? string : undefined | string;
```

#### Defined in

[packages/oauth/src/installation.ts:49](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L49)
