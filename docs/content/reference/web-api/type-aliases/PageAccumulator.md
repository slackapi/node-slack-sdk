# Type Alias: PageAccumulator\<R\>

```ts
type PageAccumulator<R>: R extends (accumulator, page, index) => infer A ? A : never;
```

## Type Parameters

• **R** *extends* [`PageReducer`](../interfaces/PageReducer.md)

## Defined in

[packages/web-api/src/WebClient.ts:117](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L117)
