# Interface: CanvasesEditArguments

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

[packages/web-api/src/types/request/canvas.ts:6](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/canvas.ts#L6)

***

### changes

```ts
changes: [Change, ...Change[]];
```

#### Description

List of changes to apply to the canvas.

#### Defined in

[packages/web-api/src/types/request/canvas.ts:82](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/canvas.ts#L82)

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
