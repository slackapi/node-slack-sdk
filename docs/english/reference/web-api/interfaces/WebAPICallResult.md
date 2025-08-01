[@slack/web-api](../index.md) / WebAPICallResult

# Interface: WebAPICallResult

Defined in: [src/WebClient.ts:136](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L136)

## Properties

### error?

```ts
optional error: string;
```

Defined in: [src/WebClient.ts:138](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L138)

***

### ok

```ts
ok: boolean;
```

Defined in: [src/WebClient.ts:137](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L137)

***

### response\_metadata?

```ts
optional response_metadata: object;
```

Defined in: [src/WebClient.ts:139](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L139)

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
