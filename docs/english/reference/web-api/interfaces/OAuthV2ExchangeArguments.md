[@slack/web-api](../index.md) / OAuthV2ExchangeArguments

# Interface: OAuthV2ExchangeArguments

Defined in: [src/types/request/oauth.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/oauth.ts#L11)

## Extends

- `Pick`\<`OAuthCredentials`, `"client_id"` \| `"client_secret"`\>

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

### token

```ts
token: string;
```

Defined in: [src/types/request/oauth.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/oauth.ts#L13)

#### Description

The legacy xoxb or xoxp token being migrated.
