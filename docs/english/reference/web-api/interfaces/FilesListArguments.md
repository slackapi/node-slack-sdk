[@slack/web-api](../index.md) / FilesListArguments

# Interface: FilesListArguments

Defined in: [packages/web-api/src/types/request/files.ts:111](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L111)

## Extends

- `TokenOverridable`
- `TraditionalPagingEnabled`
- `OptionalTeamAssignable`

## Properties

### channel?

```ts
channel?: string;
```

Defined in: [packages/web-api/src/types/request/files.ts:113](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L113)

#### Description

Filter files appearing in a specific channel, indicated by its ID.

***

### count?

```ts
count?: number;
```

Defined in: [packages/web-api/src/types/request/common.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L33)

#### Description

Number of items to return per page. Defaults to `20`

#### Inherited from

`TraditionalPagingEnabled.count`

***

### page?

```ts
page?: number;
```

Defined in: [packages/web-api/src/types/request/common.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L35)

#### Description

Page number of results to return. Defaults to `1`.

#### Inherited from

`TraditionalPagingEnabled.page`

***

### show\_files\_hidden\_by\_limit?

```ts
show_files_hidden_by_limit?: boolean;
```

Defined in: [packages/web-api/src/types/request/files.ts:118](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L118)

#### Description

Show truncated file info for files hidden due to being too old, and the team who owns the file
being over the file limit.

***

### team\_id?

```ts
team_id?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L70)

#### Description

If using an org token, `team_id` is required.

#### Inherited from

`OptionalTeamAssignable.team_id`

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

### ts\_from?

```ts
ts_from?: string;
```

Defined in: [packages/web-api/src/types/request/files.ts:120](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L120)

#### Description

Filter files created after this timestamp (inclusive).

***

### ts\_to?

```ts
ts_to?: string;
```

Defined in: [packages/web-api/src/types/request/files.ts:122](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L122)

#### Description

Filter files created before this timestamp (inclusive).

***

### types?

```ts
types?: string;
```

Defined in: [packages/web-api/src/types/request/files.ts:128](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L128)

#### Description

Filter files by type. Pass multiple values for `types` argument by comma-seperating the values.
The default value is `all`, which does not filter the list.
Available types are `all`, `spaces`, `snippets`, `images`, `gdocs`, `zips` and `pdfs`.

***

### user?

```ts
user?: string;
```

Defined in: [packages/web-api/src/types/request/files.ts:130](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L130)

#### Description

Filter files created by a single user.
