[@slack/web-api](../index.md) / WorkflowsFeaturedListArguments

# Interface: WorkflowsFeaturedListArguments

Defined in: [src/types/request/workflows.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L17)

## Extends

- `TokenOverridable`

## Properties

### channel\_ids

```ts
channel_ids: string[];
```

Defined in: [src/types/request/workflows.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L22)

#### Description

Comma-separated array of channel IDs to list featured workflows for.

#### Example

```ts
["C012345678", "C987654321"]
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
