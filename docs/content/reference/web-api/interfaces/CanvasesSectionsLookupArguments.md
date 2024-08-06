# Interface: CanvasesSectionsLookupArguments

## Extends

- `CanvasID`.`TokenOverridable`

## Properties

### canvas\_id

```ts
canvas_id: string;
```

#### Description

Encoded ID of the canvas.

#### Inherited from

`CanvasID.canvas_id`

#### Defined in

[packages/web-api/src/types/request/canvas.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/canvas.ts#L6)

***

### criteria

```ts
criteria: Criteria;
```

#### Description

Filtering criteria.

#### Defined in

[packages/web-api/src/types/request/canvas.ts:73](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/canvas.ts#L73)

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
