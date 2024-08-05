# Interface: OAuthAccessArguments

## Extends

- `OAuthCredentials`

## Properties

### client\_id

```ts
client_id: string;
```

#### Description

Issued when you created your application.

#### Inherited from

`OAuthCredentials.client_id`

#### Defined in

[packages/web-api/src/types/request/common.ts:125](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L125)

***

### client\_secret

```ts
client_secret: string;
```

#### Description

Issued when you created your application.

#### Inherited from

`OAuthCredentials.client_secret`

#### Defined in

[packages/web-api/src/types/request/common.ts:127](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L127)

***

### code?

```ts
optional code: string;
```

#### Description

The `code` parameter returned via the OAuth callback.

#### Inherited from

`OAuthCredentials.code`

#### Defined in

[packages/web-api/src/types/request/common.ts:129](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L129)

***

### redirect\_uri?

```ts
optional redirect_uri: string;
```

#### Description

While optional, it is _required_ if your app passed it as a parameter to the OpenID/OAuth flow's
first step and must match the originally submitted URI.

#### Inherited from

`OAuthCredentials.redirect_uri`

#### Defined in

[packages/web-api/src/types/request/common.ts:134](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L134)

***

### single\_channel?

```ts
optional single_channel: boolean;
```

#### Description

Request the user to add your app only to a single channel. Only valid with a [legacy workspace app](https://api.slack.com/legacy-workspace-apps). Defaults to `false`.

#### Defined in

[packages/web-api/src/types/request/oauth.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/oauth.ts#L6)
