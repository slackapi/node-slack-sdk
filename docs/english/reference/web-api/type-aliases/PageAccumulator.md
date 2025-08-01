[@slack/web-api](../index.md) / PageAccumulator

# Type Alias: PageAccumulator\<R\>

```ts
type PageAccumulator<R> = R extends (accumulator, page, index) => infer A ? A : never;
```

Defined in: [src/WebClient.ts:158](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/WebClient.ts#L158)

## Type Parameters

### R

`R` *extends* [`PageReducer`](PageReducer.md)
