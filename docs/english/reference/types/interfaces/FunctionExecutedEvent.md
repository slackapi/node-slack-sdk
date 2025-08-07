[@slack/types](../index.md) / FunctionExecutedEvent

# Interface: FunctionExecutedEvent

Defined in: [events/function.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/function.ts#L13)

## Properties

### bot\_access\_token

```ts
bot_access_token: string;
```

Defined in: [events/function.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/function.ts#L32)

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/function.ts:31](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/function.ts#L31)

***

### function

```ts
function: object;
```

Defined in: [events/function.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/function.ts#L15)

#### app\_id

```ts
app_id: string;
```

#### callback\_id

```ts
callback_id: string;
```

#### date\_created

```ts
date_created: number;
```

#### date\_deleted

```ts
date_deleted: number;
```

#### date\_updated

```ts
date_updated: number;
```

#### description?

```ts
optional description: string;
```

#### id

```ts
id: string;
```

#### input\_parameters

```ts
input_parameters: FunctionParams[];
```

#### output\_parameters

```ts
output_parameters: FunctionParams[];
```

#### title

```ts
title: string;
```

#### type

```ts
type: string;
```

***

### function\_execution\_id

```ts
function_execution_id: string;
```

Defined in: [events/function.ts:29](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/function.ts#L29)

***

### inputs

```ts
inputs: FunctionInputs;
```

Defined in: [events/function.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/function.ts#L28)

***

### type

```ts
type: "function_executed";
```

Defined in: [events/function.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/function.ts#L14)

***

### workflow\_execution\_id

```ts
workflow_execution_id: string;
```

Defined in: [events/function.ts:30](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/function.ts#L30)
