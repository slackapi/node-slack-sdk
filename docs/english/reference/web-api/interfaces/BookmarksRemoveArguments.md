[@slack/web-api](../index.md) / BookmarksRemoveArguments

# Interface: BookmarksRemoveArguments

Defined in: [src/types/request/bookmarks.ts:31](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L31)

## Extends

- `ChannelID`.`ID`.`TokenOverridable`

## Properties

### bookmark\_id

```ts
bookmark_id: string;
```

Defined in: [src/types/request/bookmarks.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L4)

#### Inherited from

```ts
ID.bookmark_id
```

***

### channel\_id

```ts
channel_id: string;
```

Defined in: [src/types/request/common.ts:85](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L85)

#### Description

Encoded channel ID.

#### Inherited from

```ts
ChannelID.channel_id
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
