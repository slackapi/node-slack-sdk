[@slack/oauth](../index.md) / OAuthV2Response

# Interface: OAuthV2Response

Defined in: [src/install-provider.ts:764](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L764)

## Extends

- `WebAPICallResult`

## Properties

### access\_token?

```ts
optional access_token: string;
```

Defined in: [src/install-provider.ts:776](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L776)

***

### app\_id

```ts
app_id: string;
```

Defined in: [src/install-provider.ts:765](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L765)

***

### authed\_user

```ts
authed_user: object;
```

Defined in: [src/install-provider.ts:766](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L766)

#### access\_token?

```ts
optional access_token: string;
```

#### expires\_in?

```ts
optional expires_in: number;
```

#### id

```ts
id: string;
```

#### refresh\_token?

```ts
optional refresh_token: string;
```

#### scope?

```ts
optional scope: string;
```

#### token\_type?

```ts
optional token_type: string;
```

***

### bot\_user\_id?

```ts
optional bot_user_id: string;
```

Defined in: [src/install-provider.ts:779](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L779)

***

### enterprise

```ts
enterprise: 
  | null
  | {
  id: string;
  name: string;
};
```

Defined in: [src/install-provider.ts:781](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L781)

***

### error?

```ts
optional error: string;
```

Defined in: node\_modules/@slack/web-api/dist/WebClient.d.ts:64

#### Inherited from

```ts
WebAPICallResult.error
```

***

### expires\_in?

```ts
optional expires_in: number;
```

Defined in: [src/install-provider.ts:778](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L778)

***

### incoming\_webhook?

```ts
optional incoming_webhook: object;
```

Defined in: [src/install-provider.ts:783](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L783)

#### channel

```ts
channel: string;
```

#### channel\_id

```ts
channel_id: string;
```

#### configuration\_url

```ts
configuration_url: string;
```

#### url

```ts
url: string;
```

***

### is\_enterprise\_install

```ts
is_enterprise_install: boolean;
```

Defined in: [src/install-provider.ts:782](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L782)

***

### ok

```ts
ok: boolean;
```

Defined in: node\_modules/@slack/web-api/dist/WebClient.d.ts:63

#### Inherited from

```ts
WebAPICallResult.ok
```

***

### refresh\_token?

```ts
optional refresh_token: string;
```

Defined in: [src/install-provider.ts:777](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L777)

***

### response\_metadata?

```ts
optional response_metadata: object;
```

Defined in: node\_modules/@slack/web-api/dist/WebClient.d.ts:65

#### acceptedScopes?

```ts
optional acceptedScopes: string[];
```

#### messages?

```ts
optional messages: string[];
```

#### next\_cursor?

```ts
optional next_cursor: string;
```

#### retryAfter?

```ts
optional retryAfter: number;
```

#### scopes?

```ts
optional scopes: string[];
```

#### warnings?

```ts
optional warnings: string[];
```

#### Inherited from

```ts
WebAPICallResult.response_metadata
```

***

### scope?

```ts
optional scope: string;
```

Defined in: [src/install-provider.ts:774](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L774)

***

### team

```ts
team: 
  | null
  | {
  id: string;
  name: string;
};
```

Defined in: [src/install-provider.ts:780](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L780)

***

### token\_type?

```ts
optional token_type: "bot";
```

Defined in: [src/install-provider.ts:775](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L775)
