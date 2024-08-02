# Interface: BookmarksEditArguments

## Extends

- `Channel`.`ID`.`Partial`\<`BookmarkFields`\>.`TokenOverridable`

## Properties

### bookmark\_id

```ts
bookmark_id: string;
```

#### Inherited from

`ID.bookmark_id`

#### Defined in

[packages/web-api/src/types/request/bookmarks.ts:8](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/bookmarks.ts#L8)

***

### channel\_id

```ts
channel_id: string;
```

#### Description

Channel containing bookmark.

#### Inherited from

`Channel.channel_id`

#### Defined in

[packages/web-api/src/types/request/bookmarks.ts:5](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/bookmarks.ts#L5)

***

### emoji?

```ts
optional emoji: string;
```

#### Description

Emoji tag to apply to the bookmark.

#### Inherited from

`Partial.emoji`

#### Defined in

[packages/web-api/src/types/request/bookmarks.ts:16](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/bookmarks.ts#L16)

***

### link?

```ts
optional link: string;
```

#### Description

Link to bookmark.

#### Inherited from

`Partial.link`

#### Defined in

[packages/web-api/src/types/request/bookmarks.ts:14](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/bookmarks.ts#L14)

***

### title?

```ts
optional title: string;
```

#### Description

Title for the bookmark.

#### Inherited from

`Partial.title`

#### Defined in

[packages/web-api/src/types/request/bookmarks.ts:12](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/bookmarks.ts#L12)

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
