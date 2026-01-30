[@slack/web-api](../index.md) / Method

# Type Alias: Method()\<MethodArguments, MethodResult\>

```ts
type Method<MethodArguments, MethodResult> = (options?) => Promise<MethodResult>;
```

Defined in: [packages/web-api/src/methods.ts:559](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L559)

## Type Parameters

### MethodArguments

`MethodArguments`

### MethodResult

`MethodResult` *extends* [`WebAPICallResult`](../interfaces/WebAPICallResult.md) = [`WebAPICallResult`](../interfaces/WebAPICallResult.md)

## Parameters

### options?

`MethodArguments`

## Returns

`Promise`\<`MethodResult`\>
