# Interface: WorkflowsUpdateStepArguments

## Extends

- `TokenOverridable`

## Properties

### inputs?

```ts
optional inputs: object;
```

#### Index Signature

 \[`name`: `string`\]: `object`

#### Defined in

[packages/web-api/src/types/request/workflows.ts:23](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L23)

***

### outputs?

```ts
optional outputs: object[];
```

#### Defined in

[packages/web-api/src/types/request/workflows.ts:34](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L34)

***

### step\_image\_url?

```ts
optional step_image_url: string;
```

#### Defined in

[packages/web-api/src/types/request/workflows.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L21)

***

### step\_name?

```ts
optional step_name: string;
```

#### Defined in

[packages/web-api/src/types/request/workflows.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L22)

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

### workflow\_step\_edit\_id

```ts
workflow_step_edit_id: string;
```

#### Defined in

[packages/web-api/src/types/request/workflows.ts:20](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L20)
