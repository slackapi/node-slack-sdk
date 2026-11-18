[@slack/web-api](../index.md) / ConversationsInfoArguments

# Interface: ConversationsInfoArguments

Defined in: [packages/web-api/src/types/request/conversations.ts:101](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L101)

## Extends

- `Channel`
- `TokenOverridable`
- `LocaleAware`

## Properties

### channel

```ts
channel: string;
```

Defined in: [packages/web-api/src/types/request/conversations.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L15)

#### Description

ID of conversation.

#### Inherited from

`Channel.channel`

***

### include\_locale?

```ts
include_locale?: boolean;
```

Defined in: [packages/web-api/src/types/request/common.ts:51](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L51)

#### Description

Set this to `true` to receive the locale with the response.

#### Inherited from

`LocaleAware.include_locale`

***

### include\_num\_members?

```ts
include_num_members?: boolean;
```

Defined in: [packages/web-api/src/types/request/conversations.ts:105](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L105)

#### Description

Set to `true` to include the member count for the specified conversation. Defaults to `false`.

***

### token?

```ts
token?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

`TokenOverridable.token`
