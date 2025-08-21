[@slack/web-api](../index.md) / Action

# ~~Interface: Action~~

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:5

## Deprecated

Action aliased to [Actionable](Actionable.md) in order to name the mixins in this file consistently.

## Extended by

- [`Actionable`](Actionable.md)

## Properties

### ~~action\_id?~~

```ts
optional action_id: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:12

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

***

### ~~type~~

```ts
type: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:6
