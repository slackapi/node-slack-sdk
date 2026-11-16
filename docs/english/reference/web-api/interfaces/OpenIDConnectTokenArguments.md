[@slack/web-api](../index.md) / OpenIDConnectTokenArguments

# Interface: OpenIDConnectTokenArguments

Defined in: [packages/web-api/src/types/request/openid.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/openid.ts#L6)

## Extends

- `OAuthCredentials`
- `OAuthGrantRefresh`

## Properties

### client\_id

```ts
client_id: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:138](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L138)

#### Description

Issued when you created your application.

#### Inherited from

`OAuthCredentials.client_id`

***

### client\_secret

```ts
client_secret: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:140](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L140)

#### Description

Issued when you created your application.

#### Inherited from

`OAuthCredentials.client_secret`

***

### code?

```ts
code?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:142](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L142)

#### Description

The `code` parameter returned via the OAuth callback.

#### Inherited from

`OAuthCredentials.code`

***

### grant\_type?

```ts
grant_type?: "authorization_code" | "refresh_token";
```

Defined in: [packages/web-api/src/types/request/common.ts:152](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L152)

#### Description

The `grant_type` param as described in the OAuth spec.

#### Inherited from

`OAuthGrantRefresh.grant_type`

***

### redirect\_uri?

```ts
redirect_uri?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:147](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L147)

#### Description

While optional, it is _required_ if your app passed it as a parameter to the OpenID/OAuth flow's
first step and must match the originally submitted URI.

#### Inherited from

`OAuthCredentials.redirect_uri`

***

### refresh\_token?

```ts
refresh_token?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:154](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L154)

#### Description

The `refresh_token` param as described in the OAuth spec.

#### Inherited from

`OAuthGrantRefresh.refresh_token`
