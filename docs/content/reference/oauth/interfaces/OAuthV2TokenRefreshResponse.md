[@slack/oauth](../index.md) / OAuthV2TokenRefreshResponse

# Interface: OAuthV2TokenRefreshResponse

Defined in: [src/install-provider.ts:791](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L791)

## Extends

- `WebAPICallResult`

## Properties

### access\_token

```ts
access_token: string;
```

Defined in: [src/install-provider.ts:795](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L795)

***

### app\_id

```ts
app_id: string;
```

Defined in: [src/install-provider.ts:792](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L792)

***

### bot\_user\_id?

```ts
optional bot_user_id: string;
```

Defined in: [src/install-provider.ts:798](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L798)

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

Defined in: [src/install-provider.ts:800](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L800)

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

### expires\_in

```ts
expires_in: number;
```

Defined in: [src/install-provider.ts:797](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L797)

***

### is\_enterprise\_install

```ts
is_enterprise_install: boolean;
```

Defined in: [src/install-provider.ts:801](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L801)

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

### refresh\_token

```ts
refresh_token: string;
```

Defined in: [src/install-provider.ts:796](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L796)

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

### scope

```ts
scope: string;
```

Defined in: [src/install-provider.ts:793](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L793)

***

### team

```ts
team: object;
```

Defined in: [src/install-provider.ts:799](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L799)

#### id

```ts
id: string;
```

#### name

```ts
name: string;
```

***

### token\_type

```ts
token_type: "bot" | "user";
```

Defined in: [src/install-provider.ts:794](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider.ts#L794)
