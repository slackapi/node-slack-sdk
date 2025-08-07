[@slack/web-api](../index.md) / OAuthAccessArguments

# Interface: OAuthAccessArguments

Defined in: [src/types/request/oauth.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/oauth.ts#L4)

## Extends

- `OAuthCredentials`

## Properties

### client\_id

```ts
client_id: string;
```

Defined in: [src/types/request/common.ts:138](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L138)

#### Description

Issued when you created your application.

#### Inherited from

```ts
OAuthCredentials.client_id
```

***

### client\_secret

```ts
client_secret: string;
```

Defined in: [src/types/request/common.ts:140](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L140)

#### Description

Issued when you created your application.

#### Inherited from

```ts
OAuthCredentials.client_secret
```

***

### code?

```ts
optional code: string;
```

Defined in: [src/types/request/common.ts:142](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L142)

#### Description

The `code` parameter returned via the OAuth callback.

#### Inherited from

```ts
OAuthCredentials.code
```

***

### redirect\_uri?

```ts
optional redirect_uri: string;
```

Defined in: [src/types/request/common.ts:147](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L147)

#### Description

While optional, it is _required_ if your app passed it as a parameter to the OpenID/OAuth flow's
first step and must match the originally submitted URI.

#### Inherited from

```ts
OAuthCredentials.redirect_uri
```

***

### single\_channel?

```ts
optional single_channel: boolean;
```

Defined in: [src/types/request/oauth.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/oauth.ts#L6)

#### Description

Request the user to add your app only to a single channel. Only valid with a [legacy workspace app](https://docs.slack.dev/legacy/legacy-steps-from-apps). Defaults to `false`.
