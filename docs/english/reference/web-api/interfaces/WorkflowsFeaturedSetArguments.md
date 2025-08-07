[@slack/web-api](../index.md) / WorkflowsFeaturedSetArguments

# Interface: WorkflowsFeaturedSetArguments

Defined in: [src/types/request/workflows.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L39)

## Extends

- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [src/types/request/workflows.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L43)

#### Description

Channel to set featured workflow in.

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

Defined in: [src/types/request/workflows.ts:48](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L48)

#### Description

Comma-separated array of trigger IDs that will replace any existing featured workflows in the channel; max 15

#### Example

```ts
["Ft012345", "Ft012346"]
```
