# Interface: ~~Action~~

## Deprecated

[Action](Action.md) aliased to [Actionable](Actionable.md) in order to name the mixins in this file consistently.

## Extended by

- [`Actionable`](Actionable.md)

## Properties

### ~~action\_id?~~

```ts
optional action_id: string;
```

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Defined in

[block-kit/extensions.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L15)

***

### ~~type~~

```ts
type: string;
```

#### Defined in

[block-kit/extensions.ts:9](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L9)
