[@slack/web-api](../index.md) / AdminWorkflowsPermissionsLookupArguments

# Interface: AdminWorkflowsPermissionsLookupArguments

Defined in: [src/types/request/admin/workflows.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/workflows.ts#L22)

## Extends

- `WorkflowIDs`.`TokenOverridable`

## Properties

### max\_workflow\_triggers?

```ts
optional max_workflow_triggers: number;
```

Defined in: [src/types/request/admin/workflows.ts:27](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/workflows.ts#L27)

#### Description

Maximum number of triggers to fetch for each workflow when determining overall run permissions.
Defaults to `100`. Maximum of `1000`.

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

### workflow\_ids

```ts
workflow_ids: [string, ...string[]];
```

Defined in: [src/types/request/admin/workflows.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/workflows.ts#L12)

#### Description

Array of workflow IDs - maximum of 50 items.

#### Inherited from

```ts
WorkflowIDs.workflow_ids
```
