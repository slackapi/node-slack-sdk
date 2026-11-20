[@slack/web-api](../index.md) / AssistantSearchContextArguments

# Interface: AssistantSearchContextArguments

Defined in: [packages/web-api/src/types/request/assistant.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L5)

## Extends

- `TokenOverridable`
- `SortDir`

## Properties

### action\_token?

```ts
action_token?: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:9](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L9)

#### Description

Send `action_token` as received in a message event.

***

### after?

```ts
after?: number;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:27](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L27)

#### Description

UNIX timestamp filter. If present, filters for results after this date.

***

### before?

```ts
before?: number;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:25](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L25)

#### Description

UNIX timestamp filter. If present, filters for results before this date.

***

### channel\_types?

```ts
channel_types?: ("im" | "mpim" | "public_channel" | "private_channel")[];
```

Defined in: [packages/web-api/src/types/request/assistant.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L14)

#### Description

Mix and match channel types by providing a comma-separated list of any combination of
`public_channel`, `private_channel`, `mpim`, `im`.

***

### content\_types?

```ts
content_types?: ("channels" | "users" | "messages" | "files" | "enterprise")[];
```

Defined in: [packages/web-api/src/types/request/assistant.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L19)

#### Description

Content types to include, a comma-separated list of any combination of `messages`, `files`,
`enterprise`, `channels`, `users`.

***

### context\_channel\_id?

```ts
context_channel_id?: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:34](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L34)

#### Description

Context channel ID to support scoping the search when applicable.

***

### cursor?

```ts
cursor?: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L39)

#### Description

The cursor returned by the API. Leave this blank for the first request and use this to get the
next page of results.

***

### disable\_semantic\_search?

```ts
disable_semantic_search?: boolean;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:64](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L64)

#### Description

Whether to disable semantic search. When true, only keyword-based search is used. Defaults to
false.

***

### highlight?

```ts
highlight?: boolean;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:47](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L47)

#### Description

Whether to highlight the search query in the results. Defaults to false if unspecified.

***

### include\_archived\_channels?

```ts
include_archived_channels?: boolean;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:59](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L59)

#### Description

Whether to include archived channels in the search results.

***

### include\_bots?

```ts
include_bots?: boolean;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L21)

#### Description

Whether the results should include bots.

***

### include\_context\_messages?

```ts
include_context_messages?: boolean;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L32)

#### Description

Whether to include context messages surrounding the main message result. Defaults to false if
unspecified.

***

### include\_deleted\_users?

```ts
include_deleted_users?: boolean;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:23](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L23)

#### Description

Whether to include deleted users in the user search results. Defaults to false.

***

### include\_message\_blocks?

```ts
include_message_blocks?: boolean;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:45](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L45)

#### Description

Whether to return the message blocks in the response.

***

### limit?

```ts
limit?: number;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:41](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L41)

#### Description

Number of results to return, up to a max of 20. Defaults to 20.

***

### modifiers?

```ts
modifiers?: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:57](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L57)

#### Description

A string containing only modifiers in the format of `modifier:value`. Search results returned
will match the modifier value. For now modifiers only affect term clauses.

***

### query

```ts
query: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:7](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L7)

#### Description

User prompt or search query

***

### sort?

```ts
sort?: "score" | "timestamp";
```

Defined in: [packages/web-api/src/types/request/assistant.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L43)

#### Description

The field to sort the results by. Defaults to score. Can be one of: score, timestamp.

***

### sort\_dir?

```ts
sort_dir?: "asc" | "desc";
```

Defined in: [packages/web-api/src/types/request/common.ts:130](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L130)

#### Description

Change sort direction to ascending (`asc`) or descending (`desc`). Defaults to `desc`.

#### Inherited from

`SortDir.sort_dir`

***

### term\_clauses?

```ts
term_clauses?: string[];
```

Defined in: [packages/web-api/src/types/request/assistant.ts:52](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L52)

#### Description

A list of term clauses. A term clause is a string with search terms. Search results returned will
match every term clause specified (i.e., conjunctive normal form).

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
