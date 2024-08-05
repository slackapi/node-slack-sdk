# Interface: CanvasesAccessSetArguments

## Extends

- `CanvasID`.`Partial`\<`ChannelIDs`\>.`TokenOverridable`.`Partial`\<`UserIDs`\>

## Properties

### access\_level

```ts
access_level: "read" | "write";
```

#### Description

Desired level of access.

#### Defined in

[packages/web-api/src/types/request/canvas.ts:59](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/canvas.ts#L59)

***

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

### channel\_ids?

```ts
optional channel_ids: [string, ...string[]];
```

#### Description

An array of channel IDs (must include at least one ID).

#### Inherited from

`Partial.channel_ids`

#### Defined in

[packages/web-api/src/types/request/common.ts:76](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L76)

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

### user\_ids?

```ts
optional user_ids: [string, ...string[]];
```

#### Description

List of encoded user IDs.

#### Inherited from

`Partial.user_ids`

#### Defined in

[packages/web-api/src/types/request/common.ts:83](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L83)
