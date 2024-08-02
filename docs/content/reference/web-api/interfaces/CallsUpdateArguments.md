# Interface: CallsUpdateArguments

## Extends

- `ID`.`Partial`\<`CallDetails`\>.`TokenOverridable`

## Properties

### desktop\_app\_join\_url?

```ts
optional desktop_app_join_url: string;
```

#### Description

When supplied, available Slack clients will attempt to directly launch the 3rd-party Call
with this URL.

#### Inherited from

`Partial.desktop_app_join_url`

#### Defined in

[packages/web-api/src/types/request/calls.ts:22](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/calls.ts#L22)

***

### id

```ts
id: string;
```

#### Description

`id` returned when registering the call using the `calls.add` method.

#### Inherited from

`ID.id`

#### Defined in

[packages/web-api/src/types/request/calls.ts:6](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/calls.ts#L6)

***

### join\_url?

```ts
optional join_url: string;
```

#### Description

The URL required for a client to join the Call.

#### Inherited from

`Partial.join_url`

#### Defined in

[packages/web-api/src/types/request/calls.ts:17](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/calls.ts#L17)

***

### title?

```ts
optional title: string;
```

#### Description

The name of the Call.

#### Inherited from

`Partial.title`

#### Defined in

[packages/web-api/src/types/request/calls.ts:24](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/calls.ts#L24)

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
