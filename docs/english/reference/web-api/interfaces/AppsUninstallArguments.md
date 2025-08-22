[@slack/web-api](../index.md) / AppsUninstallArguments

# Interface: AppsUninstallArguments

Defined in: [src/types/request/apps.ts:36](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L36)

## Extends

- `Pick`\<`OAuthCredentials`, `"client_id"` \| `"client_secret"`\>.`TokenOverridable`

## Properties

### client\_id

```ts
client_id: string;
```

Defined in: [src/types/request/common.ts:138](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L138)

#### Description

Issued when you created your application.

#### Inherited from

[`OAuthAccessArguments`](OAuthAccessArguments.md).[`client_id`](OAuthAccessArguments.md#client_id)

***

### client\_secret

```ts
client_secret: string;
```

Defined in: [src/types/request/common.ts:140](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L140)

#### Description

Issued when you created your application.

#### Inherited from

[`OAuthAccessArguments`](OAuthAccessArguments.md).[`client_secret`](OAuthAccessArguments.md#client_secret)

***

### token?

```ts
optional token: string;
```

Defined in: [src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```
