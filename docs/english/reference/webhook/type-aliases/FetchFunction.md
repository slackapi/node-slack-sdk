[@slack/webhook](../index.md) / FetchFunction

# Type Alias: FetchFunction

```ts
type FetchFunction = (url, init?) => Promise<FetchResponse>;
```

Defined in: [packages/webhook/src/IncomingWebhook.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/IncomingWebhook.ts#L33)

## Parameters

### url

`string` \| `URL`

### init?

`FetchRequestInit`

## Returns

`Promise`\<`FetchResponse`\>
