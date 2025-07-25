[@slack/web-api](../index.md) / CallsUpdateArguments

# Interface: CallsUpdateArguments

Defined in: [src/types/request/calls.ts:57](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L57)

## Extends

- `ID`.`Partial`\<`CallDetails`\>.`TokenOverridable`

## Properties

### desktop\_app\_join\_url?

```ts
optional desktop_app_join_url: string;
```

Defined in: [src/types/request/calls.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L22)

#### Description

When supplied, available Slack clients will attempt to directly launch the 3rd-party Call
with this URL.

#### Inherited from

```ts
Partial.desktop_app_join_url
```

***

### id

```ts
id: string;
```

Defined in: [src/types/request/calls.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L6)

#### Description

`id` returned when registering the call using the `calls.add` method.

#### Inherited from

```ts
ID.id
```

***

### join\_url?

```ts
optional join_url: string;
```

Defined in: [src/types/request/calls.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L17)

#### Description

The URL required for a client to join the Call.

#### Inherited from

```ts
Partial.join_url
```

***

### title?

```ts
optional title: string;
```

Defined in: [src/types/request/calls.ts:24](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L24)

#### Description

The name of the Call.

#### Inherited from

```ts
Partial.title
```

***

### token?

```ts
optional token: string;
```

Defined in: [src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```
