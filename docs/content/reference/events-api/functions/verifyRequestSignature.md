# Function: verifyRequestSignature()

```ts
function verifyRequestSignature(params): true
```

Verifies the signature of a request. Throws a [CodedError](../interfaces/CodedError.md) if the signature is invalid.

## Parameters

• **params**: [`VerifyRequestSignatureParams`](../interfaces/VerifyRequestSignatureParams.md)

See [VerifyRequestSignatureParams](../interfaces/VerifyRequestSignatureParams.md).

## Returns

`true`

`true` when the signature is valid.

## Remarks

See [Verifying requests from Slack](https://api.slack.com/docs/verifying-requests-from-slack#sdk_support) for more
information.

## Defined in

[packages/events-api/src/http-handler.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/events-api/src/http-handler.ts#L38)
