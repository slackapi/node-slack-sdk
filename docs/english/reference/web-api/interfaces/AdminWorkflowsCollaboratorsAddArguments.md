[@slack/web-api](../index.md) / AdminWorkflowsCollaboratorsAddArguments

# Interface: AdminWorkflowsCollaboratorsAddArguments

Defined in: [src/types/request/admin/workflows.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/workflows.ts#L16)

## Extends

- `CollaboratorIDs`.`WorkflowIDs`.`TokenOverridable`

## Properties

### collaborator\_ids

```ts
collaborator_ids: [string, ...string[]];
```

Defined in: [src/types/request/admin/workflows.ts:7](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/workflows.ts#L7)

#### Description

Array of collaborators (encoded user IDs) - maximum of 50 items.

#### Inherited from

```ts
CollaboratorIDs.collaborator_ids
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
