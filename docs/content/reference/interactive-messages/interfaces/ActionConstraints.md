# Interface: ActionConstraints

Constraints on when to call an action handler.

## Properties

### actionId?

```ts
optional actionId: string | RegExp;
```

A string or RegExp to match against the `action_id`

#### Defined in

[adapter.ts:693](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/interactive-messages/src/adapter.ts#L693)

***

### blockId?

```ts
optional blockId: string | RegExp;
```

A string or RegExp to match against the `block_id`

#### Defined in

[adapter.ts:688](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/interactive-messages/src/adapter.ts#L688)

***

### callbackId?

```ts
optional callbackId: string | RegExp;
```

A string or RegExp to match against the `callback_id`

#### Defined in

[adapter.ts:683](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/interactive-messages/src/adapter.ts#L683)

***

### type?

```ts
optional type: string;
```

Valid types include all
[actions block elements](https://api.slack.com/reference/messaging/interactive-components),
`select` only for menu selections, or `dialog_submission` only for dialog submissions

#### Defined in

[adapter.ts:700](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/interactive-messages/src/adapter.ts#L700)

***

### unfurl?

```ts
optional unfurl: boolean;
```

When `true` only match actions from an unfurl

#### Defined in

[adapter.ts:705](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/interactive-messages/src/adapter.ts#L705)
