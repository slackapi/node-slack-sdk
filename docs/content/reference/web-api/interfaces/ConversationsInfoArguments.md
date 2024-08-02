# Interface: ConversationsInfoArguments

## Extends

- `Channel`.`TokenOverridable`.`LocaleAware`

## Properties

### channel

```ts
channel: string;
```

#### Description

ID of conversation.

#### Inherited from

`Channel.channel`

#### Defined in

[packages/web-api/src/types/request/conversations.ts:14](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/conversations.ts#L14)

***

### include\_locale?

```ts
optional include_locale: boolean;
```

#### Description

Set this to `true` to receive the locale with the response.

#### Inherited from

`LocaleAware.include_locale`

#### Defined in

[packages/web-api/src/types/request/common.ts:51](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L51)

***

### include\_num\_members?

```ts
optional include_num_members: boolean;
```

#### Description

Set to `true` to include the member count for the specified conversation. Defaults to `false`.

#### Defined in

[packages/web-api/src/types/request/conversations.ts:96](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/conversations.ts#L96)

***

### token?

```ts
optional token: string;
```

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

`TokenOverridable.token`

#### Defined in

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L43)
