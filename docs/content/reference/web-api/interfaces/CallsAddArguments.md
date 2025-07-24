[@slack/web-api](../index.md) / CallsAddArguments

# Interface: CallsAddArguments

Defined in: [src/types/request/calls.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L28)

## Extends

- `Partial`\<`Users`\>.`CallDetails`.`TokenOverridable`

## Properties

### created\_by?

```ts
optional created_by: string;
```

Defined in: [src/types/request/calls.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L37)

#### Description

ID of the user who created this Call. When this method is called with a user token,
this field is optional and defaults to the authed user of the token. Otherwise, the field is required.

***

### date\_start?

```ts
optional date_start: number;
```

Defined in: [src/types/request/calls.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L39)

#### Description

Unix timestamp of the call start time.

***

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
CallDetails.desktop_app_join_url
```

***

### external\_display\_id?

```ts
optional external_display_id: string;
```

Defined in: [src/types/request/calls.ts:44](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L44)

#### Description

An optional, human-readable ID supplied by the 3rd-party Call provider.
If supplied, this ID will be displayed in the Call object.

***

### external\_unique\_id

```ts
external_unique_id: string;
```

Defined in: [src/types/request/calls.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L32)

#### Description

An ID supplied by the 3rd-party Call provider. It must be unique across all Calls from that service.

***

### join\_url

```ts
join_url: string;
```

Defined in: [src/types/request/calls.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L17)

#### Description

The URL required for a client to join the Call.

#### Inherited from

```ts
CallDetails.join_url
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
CallDetails.title
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

***

### users?

```ts
optional users: CallUser[];
```

Defined in: [src/types/request/calls.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L13)

#### Description

The list of users to add/remove to/from the Call.

#### See

[Using the Calls API: a note on Users](https://docs.slack.dev/apis/web-api/using-the-calls-api).

#### Inherited from

```ts
Partial.users
```
