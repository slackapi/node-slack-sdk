# Type Alias: ConversationsOpenArguments

```ts
type ConversationsOpenArguments: Channel | Users & TokenOverridable & object;
```

## Type declaration

### prevent\_creation?

```ts
optional prevent_creation: boolean;
```

#### Description

Do not create a direct message or multi-person direct message.
This is used to see if there is an existing dm or mpdm.

### return\_im?

```ts
optional return_im: boolean;
```

#### Description

Indicates you want the full IM channel definition in the response.

## Defined in

[packages/web-api/src/types/request/conversations.ts:152](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L152)
