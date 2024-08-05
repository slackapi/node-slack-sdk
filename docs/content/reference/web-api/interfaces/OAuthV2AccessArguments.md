# Interface: OAuthV2AccessArguments

## Extends

- `OAuthCredentials`.`OAuthGrantRefresh`

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

[packages/web-api/src/types/request/common.ts:125](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L125)

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

[packages/web-api/src/types/request/common.ts:127](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L127)

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

[packages/web-api/src/types/request/common.ts:129](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L129)

***

### grant\_type?

```ts
optional grant_type: "authorization_code" | "refresh_token";
```

#### Description

The `grant_type` param as described in the OAuth spec.

#### Inherited from

`OAuthGrantRefresh.grant_type`

#### Defined in

[packages/web-api/src/types/request/common.ts:139](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L139)

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

[packages/web-api/src/types/request/common.ts:134](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L134)

***

### refresh\_token?

```ts
optional refresh_token: string;
```

#### Description

The `refresh_token` param as described in the OAuth spec.

#### Inherited from

`OAuthGrantRefresh.refresh_token`

#### Defined in

[packages/web-api/src/types/request/common.ts:141](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L141)
