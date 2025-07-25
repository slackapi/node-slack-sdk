[@slack/web-api](../index.md) / CanvasesSectionsLookupArguments

# Interface: CanvasesSectionsLookupArguments

Defined in: [src/types/request/canvas.ts:77](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/canvas.ts#L77)

## Extends

- `CanvasID`.`TokenOverridable`

## Properties

### canvas\_id

```ts
canvas_id: string;
```

Defined in: [src/types/request/canvas.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/canvas.ts#L6)

#### Description

Encoded ID of the canvas.

#### Inherited from

```ts
CanvasID.canvas_id
```

***

### criteria

```ts
criteria: Criteria;
```

Defined in: [src/types/request/canvas.ts:79](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/canvas.ts#L79)

#### Description

Filtering criteria.

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
