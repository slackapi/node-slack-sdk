[@slack/web-api](../index.md) / SlackListsUpdateArguments

# Interface: SlackListsUpdateArguments

Defined in: [src/types/request/slackLists.ts:533](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L533)

## Extends

- `TokenOverridable`

## Properties

### description\_blocks?

```ts
optional description_blocks: RichTextBlock[];
```

Defined in: [src/types/request/slackLists.ts:547](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L547)

#### Description

A rich text description of the List.

***

### id

```ts
id: string;
```

Defined in: [src/types/request/slackLists.ts:537](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L537)

#### Description

Encoded ID of the List.

***

### name?

```ts
optional name: string;
```

Defined in: [src/types/request/slackLists.ts:542](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L542)

#### Description

Name of the List.

***

### todo\_mode?

```ts
optional todo_mode: boolean;
```

Defined in: [src/types/request/slackLists.ts:552](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/slackLists.ts#L552)

#### Description

Boolean indicating whether the List should be used to track todo tasks.

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
