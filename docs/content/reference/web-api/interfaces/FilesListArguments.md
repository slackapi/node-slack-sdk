# Interface: FilesListArguments

## Extends

- `TokenOverridable`.`TraditionalPagingEnabled`.`OptionalTeamAssignable`

## Properties

### channel?

```ts
optional channel: string;
```

#### Description

Filter files appearing in a specific channel, indicated by its ID.

#### Defined in

[packages/web-api/src/types/request/files.ts:92](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/files.ts#L92)

***

### count?

```ts
optional count: number;
```

#### Description

Number of items to return per page. Defaults to `20`

#### Inherited from

`TraditionalPagingEnabled.count`

#### Defined in

[packages/web-api/src/types/request/common.ts:33](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L33)

***

### page?

```ts
optional page: number;
```

#### Description

Page number of results to return. Defaults to `1`.

#### Inherited from

`TraditionalPagingEnabled.page`

#### Defined in

[packages/web-api/src/types/request/common.ts:35](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L35)

***

### show\_files\_hidden\_by\_limit?

```ts
optional show_files_hidden_by_limit: boolean;
```

#### Description

Show truncated file info for files hidden due to being too old, and the team who owns the file
being over the file limit.

#### Defined in

[packages/web-api/src/types/request/files.ts:97](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/files.ts#L97)

***

### team\_id?

```ts
optional team_id: string;
```

#### Description

If using an org token, `team_id` is required.

#### Inherited from

`OptionalTeamAssignable.team_id`

#### Defined in

[packages/web-api/src/types/request/common.ts:65](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L65)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L43)

***

### ts\_from?

```ts
optional ts_from: string;
```

#### Description

Filter files created after this timestamp (inclusive).

#### Defined in

[packages/web-api/src/types/request/files.ts:99](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/files.ts#L99)

***

### ts\_to?

```ts
optional ts_to: string;
```

#### Description

Filter files created before this timestamp (inclusive).

#### Defined in

[packages/web-api/src/types/request/files.ts:101](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/files.ts#L101)

***

### types?

```ts
optional types: string;
```

#### Description

Filter files by type. Pass multiple values for `types` argument by comma-seperating the values.
The default value is `all`, which does not filter the list.
Available types are `all`, `spaces`, `snippets`, `images`, `gdocs`, `zips` and `pdfs`.

#### Defined in

[packages/web-api/src/types/request/files.ts:107](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/files.ts#L107)

***

### user?

```ts
optional user: string;
```

#### Description

Filter files created by a single user.

#### Defined in

[packages/web-api/src/types/request/files.ts:109](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/files.ts#L109)
