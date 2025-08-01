[@slack/web-api](../index.md) / OpenIDConnectTokenArguments

# Interface: OpenIDConnectTokenArguments

Defined in: [src/types/request/openid.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/openid.ts#L6)

## Extends

- `OAuthCredentials`.`OAuthGrantRefresh`

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

### grant\_type?

```ts
optional grant_type: "authorization_code" | "refresh_token";
```

Defined in: [src/types/request/common.ts:152](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L152)

#### Description

The `grant_type` param as described in the OAuth spec.

#### Inherited from

```ts
OAuthGrantRefresh.grant_type
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

### refresh\_token?

```ts
optional refresh_token: string;
```

Defined in: [src/types/request/common.ts:154](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L154)

#### Description

The `refresh_token` param as described in the OAuth spec.

#### Inherited from

```ts
OAuthGrantRefresh.refresh_token
```
