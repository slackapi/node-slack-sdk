[@slack/web-api](../index.md) / FilesListArguments

# Interface: FilesListArguments

Defined in: [src/types/request/files.ts:104](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L104)

## Extends

- `TokenOverridable`.`TraditionalPagingEnabled`.`OptionalTeamAssignable`

## Properties

### channel?

```ts
optional channel: string;
```

Defined in: [src/types/request/files.ts:106](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L106)

#### Description

Filter files appearing in a specific channel, indicated by its ID.

***

### count?

```ts
optional count: number;
```

Defined in: [src/types/request/common.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L33)

#### Description

Number of items to return per page. Defaults to `20`

#### Inherited from

```ts
TraditionalPagingEnabled.count
```

***

### page?

```ts
optional page: number;
```

Defined in: [src/types/request/common.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L35)

#### Description

Page number of results to return. Defaults to `1`.

#### Inherited from

```ts
TraditionalPagingEnabled.page
```

***

### show\_files\_hidden\_by\_limit?

```ts
optional show_files_hidden_by_limit: boolean;
```

Defined in: [src/types/request/files.ts:111](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L111)

#### Description

Show truncated file info for files hidden due to being too old, and the team who owns the file
being over the file limit.

***

### team\_id?

```ts
optional team_id: string;
```

Defined in: [src/types/request/common.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L70)

#### Description

If using an org token, `team_id` is required.

#### Inherited from

```ts
OptionalTeamAssignable.team_id
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

### ts\_from?

```ts
optional ts_from: string;
```

Defined in: [src/types/request/files.ts:113](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L113)

#### Description

Filter files created after this timestamp (inclusive).

***

### ts\_to?

```ts
optional ts_to: string;
```

Defined in: [src/types/request/files.ts:115](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L115)

#### Description

Filter files created before this timestamp (inclusive).

***

### types?

```ts
optional types: string;
```

Defined in: [src/types/request/files.ts:121](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L121)

#### Description

Filter files by type. Pass multiple values for `types` argument by comma-seperating the values.
The default value is `all`, which does not filter the list.
Available types are `all`, `spaces`, `snippets`, `images`, `gdocs`, `zips` and `pdfs`.

***

### user?

```ts
optional user: string;
```

Defined in: [src/types/request/files.ts:123](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L123)

#### Description

Filter files created by a single user.
