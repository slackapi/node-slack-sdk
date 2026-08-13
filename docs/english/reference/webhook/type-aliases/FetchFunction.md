[@slack/webhook](../index.md) / FetchFunction

# Type Alias: FetchFunction()

```ts
type FetchFunction = (url, init?) => Promise<FetchResponse>;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L32)

## Parameters

### url

`string` | `URL`

### init?

`FetchRequestInit`

## Returns

`Promise`\<`FetchResponse`\>
