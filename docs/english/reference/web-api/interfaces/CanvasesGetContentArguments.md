[@slack/web-api](../index.md) / CanvasesGetContentArguments

# Interface: CanvasesGetContentArguments

Defined in: [packages/web-api/src/types/request/canvas.ts:93](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/canvas.ts#L93)

## Extends

- `CanvasID`.`TokenOverridable`

## Properties

### canvas\_id

```ts
canvas_id: string;
```

Defined in: [packages/web-api/src/types/request/canvas.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/canvas.ts#L6)

#### Description

Encoded ID of the canvas.

#### Inherited from

```ts
CanvasID.canvas_id
```

***

### content\_type?

```ts
optional content_type?: "markdown" | "html";
```

Defined in: [packages/web-api/src/types/request/canvas.ts:95](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/canvas.ts#L95)

#### Description

Format in which to return the canvas content. Defaults to markdown.

***

### token?

```ts
optional token?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```
