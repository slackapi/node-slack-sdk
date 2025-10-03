[@slack/web-api](../index.md) / BookmarksEditArguments

# Interface: BookmarksEditArguments

Defined in: [src/types/request/bookmarks.ts:25](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L25)

## Extends

- `ChannelID`.`ID`.`Partial`\<`BookmarkFields`\>.`TokenOverridable`

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

### emoji?

```ts
optional emoji: string;
```

Defined in: [src/types/request/bookmarks.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L12)

#### Description

Emoji tag to apply to the bookmark.

#### Inherited from

[`BookmarksAddArguments`](BookmarksAddArguments.md).[`emoji`](BookmarksAddArguments.md#emoji)

***

### link?

```ts
optional link: string;
```

Defined in: [src/types/request/bookmarks.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L10)

#### Description

Link to bookmark.

#### Inherited from

[`BookmarksAddArguments`](BookmarksAddArguments.md).[`link`](BookmarksAddArguments.md#link)

***

### title?

```ts
optional title: string;
```

Defined in: [src/types/request/bookmarks.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L8)

#### Description

Title for the bookmark.

#### Inherited from

[`BookmarksAddArguments`](BookmarksAddArguments.md).[`title`](BookmarksAddArguments.md#title)

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
