[@slack/oauth](../index.md) / Installation

# Interface: Installation\<AuthVersion, IsEnterpriseInstall\>

Defined in: [src/installation.ts:31](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L31)

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

### AuthVersion

`AuthVersion` *extends* `"v1"` \| `"v2"` = `"v1"` \| `"v2"`

### IsEnterpriseInstall

`IsEnterpriseInstall` *extends* `boolean` = `boolean`

## Properties

### appId?

```ts
optional appId: AuthVersion extends "v2" ? string : undefined;
```

Defined in: [src/installation.ts:80](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L80)

The App ID, which does not vary per installation. Left as undefined when not returned from fetch.

***

### authVersion?

```ts
optional authVersion: AuthVersion;
```

Defined in: [src/installation.ts:95](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L95)

The version of Slack's auth flow that produced this installation. Synthesized as `v2` when not present.

***

### bot?

```ts
optional bot: object;
```

Defined in: [src/installation.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L61)

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

***

### enterprise

```ts
enterprise: IsEnterpriseInstall extends true ? EnterpriseInfo : undefined | EnterpriseInfo;
```

Defined in: [src/installation.ts:51](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L51)

When the installation is an enterprise install or when the installation occurs on the org to acquire `admin` scope,
the name and ID of the enterprise org.

***

### enterpriseUrl?

```ts
optional enterpriseUrl: AuthVersion extends "v2" ? string : undefined;
```

Defined in: [src/installation.ts:89](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L89)

When the installation is an enterprise org install, the URL of the landing page for all workspaces in the org.
Left as undefined when not returned from fetch.

***

### incomingWebhook?

```ts
optional incomingWebhook: object;
```

Defined in: [src/installation.ts:69](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L69)

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

***

### isEnterpriseInstall?

```ts
optional isEnterpriseInstall: IsEnterpriseInstall;
```

Defined in: [src/installation.ts:92](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L92)

Whether the installation was performed on an enterprise org. Synthesized as `false` when not present.

***

### metadata?

```ts
optional metadata: string;
```

Defined in: [src/installation.ts:98](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L98)

A string value that can be held in the state parameter in the OAuth flow.

***

### team

```ts
team: IsEnterpriseInstall extends true ? undefined : object;
```

Defined in: [src/installation.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L39)

TODO: when performing a “single workspace” install with the admin scope on the enterprise,
is the team property returned from oauth.access?

***

### tokenType?

```ts
optional tokenType: "bot";
```

Defined in: [src/installation.ts:83](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L83)

When the installation contains a bot user, the token type. Left as undefined when not returned from fetch.

***

### user

```ts
user: object;
```

Defined in: [src/installation.ts:53](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation.ts#L53)

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
