[@slack/web-api](../index.md) / SlackListsCreateArguments

# Interface: SlackListsCreateArguments

Defined in: [packages/web-api/src/types/request/slackLists.ts:370](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L370)

## Extends

- `TokenOverridable`

## Properties

### copy\_from\_list\_id?

```ts
optional copy_from_list_id: string;
```

Defined in: [packages/web-api/src/types/request/slackLists.ts:390](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L390)

#### Description

ID of the List to copy.

***

### description\_blocks?

```ts
optional description_blocks: RichTextBlock[];
```

Defined in: [packages/web-api/src/types/request/slackLists.ts:379](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L379)

#### Description

A rich text description of the List.

***

### include\_copied\_list\_records?

```ts
optional include_copied_list_records: boolean;
```

Defined in: [packages/web-api/src/types/request/slackLists.ts:395](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L395)

#### Description

Boolean indicating whether to include records when a List is copied.

***

### name

```ts
name: string;
```

Defined in: [packages/web-api/src/types/request/slackLists.ts:374](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L374)

#### Description

Name of the List.

***

### schema?

```ts
optional schema: SlackListsSchemaColumn[];
```

Defined in: [packages/web-api/src/types/request/slackLists.ts:385](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L385)

#### Description

Column definition for the List.

#### See

[https://docs.slack.dev/reference/methods/slackLists.create#schema-definition](https://docs.slack.dev/reference/methods/slackLists.create#schema-definition)

***

### todo\_mode?

```ts
optional todo_mode: boolean;
```

Defined in: [packages/web-api/src/types/request/slackLists.ts:400](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L400)

#### Description

Boolean indicating whether the List should be used to track todo tasks.

***

### token?

```ts
optional token: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```
