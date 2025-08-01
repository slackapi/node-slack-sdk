[@slack/web-api](../index.md) / WorkflowsFeaturedRemoveArguments

# Interface: WorkflowsFeaturedRemoveArguments

Defined in: [src/types/request/workflows.ts:26](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L26)

## Extends

- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [src/types/request/workflows.ts:30](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L30)

#### Description

Channel to remove featured workflow from.

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

### trigger\_ids

```ts
trigger_ids: string[];
```

Defined in: [src/types/request/workflows.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L35)

#### Description

Comma-separated array of trigger IDs to remove; max 15

#### Example

```ts
["Ft012345", "Ft012346"]
```
