# Interface: AdminWorkflowsCollaboratorsRemoveArguments

## Extends

- `CollaboratorIDs`.`WorkflowIDs`.`TokenOverridable`

## Properties

### collaborator\_ids

```ts
collaborator_ids: [string, ...string[]];
```

#### Description

Array of collaborators (encoded user IDs) - maximum of 50 items.

#### Inherited from

`CollaboratorIDs.collaborator_ids`

#### Defined in

[packages/web-api/src/types/request/admin/workflows.ts:7](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/workflows.ts#L7)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

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

[packages/web-api/src/types/request/admin/workflows.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/workflows.ts#L12)
