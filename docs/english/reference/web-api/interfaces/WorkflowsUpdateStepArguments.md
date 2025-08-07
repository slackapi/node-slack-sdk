[@slack/web-api](../index.md) / WorkflowsUpdateStepArguments

# Interface: WorkflowsUpdateStepArguments

Defined in: [src/types/request/workflows.ts:67](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L67)

## Extends

- `TokenOverridable`

## Properties

### inputs?

```ts
optional inputs: object;
```

Defined in: [src/types/request/workflows.ts:71](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L71)

#### Index Signature

```ts
[name: string]: object
```

***

### outputs?

```ts
optional outputs: object[];
```

Defined in: [src/types/request/workflows.ts:82](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L82)

#### label

```ts
label: string;
```

#### name

```ts
name: string;
```

#### type

```ts
type: string;
```

***

### step\_image\_url?

```ts
optional step_image_url: string;
```

Defined in: [src/types/request/workflows.ts:69](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L69)

***

### step\_name?

```ts
optional step_name: string;
```

Defined in: [src/types/request/workflows.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L70)

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

### workflow\_step\_edit\_id

```ts
workflow_step_edit_id: string;
```

Defined in: [src/types/request/workflows.ts:68](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L68)
