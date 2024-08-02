# Interface: VerifyRequestSignatureParams

Parameters for calling [verifyRequestSignature](../functions/verifyRequestSignature.md).

## Properties

### body

```ts
body: string;
```

Full, raw body string.

#### Defined in

[packages/events-api/src/http-handler.ts:280](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/events-api/src/http-handler.ts#L280)

***

### requestSignature

```ts
requestSignature: string;
```

Signature from the `X-Slack-Signature` header.

#### Defined in

[packages/events-api/src/http-handler.ts:270](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/events-api/src/http-handler.ts#L270)

***

### requestTimestamp

```ts
requestTimestamp: number;
```

Timestamp from the `X-Slack-Request-Timestamp` header.

#### Defined in

[packages/events-api/src/http-handler.ts:275](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/events-api/src/http-handler.ts#L275)

***

### signingSecret

```ts
signingSecret: string;
```

The signing secret used to verify request signature.

#### Defined in

[packages/events-api/src/http-handler.ts:265](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/events-api/src/http-handler.ts#L265)
