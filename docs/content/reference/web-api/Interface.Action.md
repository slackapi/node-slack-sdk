# Interface: ~~Action~~

## Deprecated

[Action](Interface.Action.md) aliased to [Actionable](Interface.Actionable.md) in order to name the mixins in this file consistently.

## Extended by

- [`Actionable`](Interface.Actionable.md)

## Properties

### ~~action\_id?~~

```ts
optional action_id: string;
```

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:12

***

### ~~type~~

```ts
type: string;
```

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:6
