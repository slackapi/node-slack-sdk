# Type Alias: ChatUnfurlArguments

```ts
type ChatUnfurlArguments: object & UnfurlTarget & TokenOverridable & object;
```

## Type declaration

### unfurls

```ts
unfurls: LinkUnfurls;
```

#### Description

URL-encoded JSON map with keys set to URLs featured in the the message, pointing to their unfurl
blocks or message attachments.

## Type declaration

### user\_auth\_blocks?

```ts
optional user_auth_blocks: (KnownBlock | Block)[];
```

#### Description

Provide a JSON based array of structured blocks presented as URL-encoded string to send as an
ephemeral message to the user as invitation to authenticate further and enable full unfurling behavior.

### user\_auth\_message?

```ts
optional user_auth_message: string;
```

#### Description

Provide a simply-formatted string to send as an ephemeral message to the user as invitation to
authenticate further and enable full unfurling behavior. Provides two buttons, Not now or Never ask me again.

### user\_auth\_required?

```ts
optional user_auth_required: boolean;
```

#### Description

Set to `true` to indicate the user must install your Slack app to trigger unfurls for this domain.
Defaults to `false`.

### user\_auth\_url?

```ts
optional user_auth_url: string;
```

#### Description

Send users to this custom URL where they will complete authentication in your app to fully trigger
unfurling. Value should be properly URL-encoded.

## Defined in

[packages/web-api/src/types/request/chat.ts:201](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L201)
