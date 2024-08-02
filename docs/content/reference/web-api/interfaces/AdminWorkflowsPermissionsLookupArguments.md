# Interface: AdminWorkflowsPermissionsLookupArguments

## Extends

- `WorkflowIDs`.`TokenOverridable`

## Properties

### max\_workflow\_triggers?

```ts
optional max_workflow_triggers: number;
```

#### Description

Maximum number of triggers to fetch for each workflow when determining overall run permissions.
Defaults to `100`. Maximum of `1000`.

#### Defined in

[packages/web-api/src/types/request/admin/workflows.ts:27](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/workflows.ts#L27)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L43)

***

### workflow\_ids

```ts
workflow_ids: [string, ...string[]];
```

#### Description

Array of workflow IDs - maximum of 50 items.

#### Inherited from

`WorkflowIDs.workflow_ids`

#### Defined in

[packages/web-api/src/types/request/admin/workflows.ts:12](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/workflows.ts#L12)
