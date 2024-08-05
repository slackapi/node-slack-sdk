# Interface: BookmarksAddArguments

## Extends

- `Channel`.`BookmarkFields`.`TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

#### Description

Channel containing bookmark.

#### Inherited from

`Channel.channel_id`

#### Defined in

[packages/web-api/src/types/request/bookmarks.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L5)

***

### emoji?

```ts
optional emoji: string;
```

#### Description

Emoji tag to apply to the bookmark.

#### Inherited from

`BookmarkFields.emoji`

#### Defined in

[packages/web-api/src/types/request/bookmarks.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L16)

***

### entity\_id?

```ts
optional entity_id: string;
```

#### Description

ID of the entity being bookmarked. Only applies to message and file types.

#### Defined in

[packages/web-api/src/types/request/bookmarks.ts:24](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L24)

***

### link

```ts
link: string;
```

#### Description

Link to bookmark.

#### Inherited from

`BookmarkFields.link`

#### Defined in

[packages/web-api/src/types/request/bookmarks.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L14)

***

### parent\_id?

```ts
optional parent_id: string;
```

#### Description

ID of this bookmark's parent.

#### Defined in

[packages/web-api/src/types/request/bookmarks.ts:26](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L26)

***

### title

```ts
title: string;
```

#### Description

Title for the bookmark.

#### Inherited from

`BookmarkFields.title`

#### Defined in

[packages/web-api/src/types/request/bookmarks.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L12)

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

### type

```ts
type: "link";
```

#### Description

Type of the bookmark. Only `link` is supported at the moment.

#### Defined in

[packages/web-api/src/types/request/bookmarks.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/bookmarks.ts#L22)
