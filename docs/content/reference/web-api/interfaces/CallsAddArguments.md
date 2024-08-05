# Interface: CallsAddArguments

## Extends

- `Partial`\<`Users`\>.`CallDetails`.`TokenOverridable`

## Properties

### created\_by?

```ts
optional created_by: string;
```

#### Description

ID of the user who created this Call. When this method is called with a user token,
this field is optional and defaults to the authed user of the token. Otherwise, the field is required.

#### Defined in

[packages/web-api/src/types/request/calls.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L37)

***

### date\_start?

```ts
optional date_start: number;
```

#### Description

Unix timestamp of the call start time.

#### Defined in

[packages/web-api/src/types/request/calls.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L39)

***

### desktop\_app\_join\_url?

```ts
optional desktop_app_join_url: string;
```

#### Description

When supplied, available Slack clients will attempt to directly launch the 3rd-party Call
with this URL.

#### Inherited from

`CallDetails.desktop_app_join_url`

#### Defined in

[packages/web-api/src/types/request/calls.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L22)

***

### external\_display\_id?

```ts
optional external_display_id: string;
```

#### Description

An optional, human-readable ID supplied by the 3rd-party Call provider.
If supplied, this ID will be displayed in the Call object.

#### Defined in

[packages/web-api/src/types/request/calls.ts:44](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L44)

***

### external\_unique\_id

```ts
external_unique_id: string;
```

#### Description

An ID supplied by the 3rd-party Call provider. It must be unique across all Calls from that service.

#### Defined in

[packages/web-api/src/types/request/calls.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L32)

***

### join\_url

```ts
join_url: string;
```

#### Description

The URL required for a client to join the Call.

#### Inherited from

`CallDetails.join_url`

#### Defined in

[packages/web-api/src/types/request/calls.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L17)

***

### title?

```ts
optional title: string;
```

#### Description

The name of the Call.

#### Inherited from

`CallDetails.title`

#### Defined in

[packages/web-api/src/types/request/calls.ts:24](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L24)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

***

### users?

```ts
optional users: CallUser[];
```

#### Description

The list of users to add/remove to/from the Call.

#### See

[Using the Calls API: a note on Users](https://api.slack.com/apis/calls#users).

#### Inherited from

`Partial.users`

#### Defined in

[packages/web-api/src/types/request/calls.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/calls.ts#L13)
