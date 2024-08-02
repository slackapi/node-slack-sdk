# Interface: OAuthV2ExchangeArguments

## Extends

- `Pick`\<`OAuthCredentials`, `"client_id"` \| `"client_secret"`\>

## Properties

### client\_id

```ts
client_id: string;
```

#### Description

Issued when you created your application.

#### Inherited from

`Pick.client_id`

#### Defined in

[packages/web-api/src/types/request/common.ts:125](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L125)

***

### client\_secret

```ts
client_secret: string;
```

#### Description

Issued when you created your application.

#### Inherited from

`Pick.client_secret`

#### Defined in

[packages/web-api/src/types/request/common.ts:127](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L127)

***

### token

```ts
token: string;
```

#### Description

The legacy xoxb or xoxp token being migrated.

#### Defined in

[packages/web-api/src/types/request/oauth.ts:13](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/oauth.ts#L13)
