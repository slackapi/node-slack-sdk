[@slack/web-api](../index.md) / AppsIconSetArguments

# Interface: AppsIconSetArguments

Defined in: [packages/web-api/src/types/request/apps.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L17)

## Extends

- `AppID`
- `TokenOverridable`

## Properties

### app\_id

```ts
app_id: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:101](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L101)

#### Description

The ID of the app.

#### Inherited from

`AppID.app_id`

***

### file?

```ts
file?: Buffer<ArrayBufferLike>;
```

Defined in: [packages/web-api/src/types/request/apps.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L19)

#### Description

File contents via `multipart/form-data`.

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

***

### url?

```ts
url?: string;
```

Defined in: [packages/web-api/src/types/request/apps.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L21)

#### Description

URL of a publicly hosted image.
