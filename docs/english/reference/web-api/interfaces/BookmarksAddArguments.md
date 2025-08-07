[@slack/web-api](../index.md) / BookmarksAddArguments

# Interface: BookmarksAddArguments

Defined in: [src/types/request/bookmarks.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L16)

## Extends

- `ChannelID`.`BookmarkFields`.`TokenOverridable`

## Properties

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

```ts
BookmarkFields.emoji
```

***

### entity\_id?

```ts
optional entity_id: string;
```

Defined in: [src/types/request/bookmarks.ts:20](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L20)

#### Description

ID of the entity being bookmarked. Only applies to message and file types.

***

### link

```ts
link: string;
```

Defined in: [src/types/request/bookmarks.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L10)

#### Description

Link to bookmark.

#### Inherited from

```ts
BookmarkFields.link
```

***

### parent\_id?

```ts
optional parent_id: string;
```

Defined in: [src/types/request/bookmarks.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L22)

#### Description

ID of this bookmark's parent.

***

### title

```ts
title: string;
```

Defined in: [src/types/request/bookmarks.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L8)

#### Description

Title for the bookmark.

#### Inherited from

```ts
BookmarkFields.title
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

### type

```ts
type: "link";
```

Defined in: [src/types/request/bookmarks.ts:18](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L18)

#### Description

Type of the bookmark. Only `link` is supported at the moment.
