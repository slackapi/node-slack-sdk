[@slack/web-api](../index.md) / Method

# Type Alias: Method()\<MethodArguments, MethodResult\>

```ts
type Method<MethodArguments, MethodResult> = (options?) => Promise<MethodResult>;
```

Defined in: [src/methods.ts:527](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/methods.ts#L527)

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
