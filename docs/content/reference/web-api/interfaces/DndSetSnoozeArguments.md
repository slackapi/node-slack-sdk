[@slack/web-api](../index.md) / DndSetSnoozeArguments

# Interface: DndSetSnoozeArguments

Defined in: [src/types/request/dnd.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/dnd.ts#L17)

## Extends

- `TokenOverridable`

## Properties

### num\_minutes

```ts
num_minutes: number;
```

Defined in: [src/types/request/dnd.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/dnd.ts#L19)

#### Description

Number of minutes, from now, to snooze until.

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
