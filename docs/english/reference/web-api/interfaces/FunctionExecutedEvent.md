[@slack/web-api](../index.md) / FunctionExecutedEvent

# Interface: FunctionExecutedEvent

Defined in: node\_modules/@slack/types/dist/events/function.d.ts:11

## Properties

### bot\_access\_token

```ts
bot_access_token: string;
```

Defined in: node\_modules/@slack/types/dist/events/function.d.ts:30

***

### event\_ts

```ts
event_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/function.d.ts:29

***

### function

```ts
function: object;
```

Defined in: node\_modules/@slack/types/dist/events/function.d.ts:13

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

Defined in: node\_modules/@slack/types/dist/events/function.d.ts:27

***

### inputs

```ts
inputs: FunctionInputs;
```

Defined in: node\_modules/@slack/types/dist/events/function.d.ts:26

***

### type

```ts
type: "function_executed";
```

Defined in: node\_modules/@slack/types/dist/events/function.d.ts:12

***

### workflow\_execution\_id

```ts
workflow_execution_id: string;
```

Defined in: node\_modules/@slack/types/dist/events/function.d.ts:28
