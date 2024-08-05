# Interface: OptionsConstraints

Constraints on when to call an options handler.

## Properties

### actionId?

```ts
optional actionId: string | RegExp;
```

A string or RegExp to match against the `action_id`

#### Defined in

[adapter.ts:740](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L740)

***

### blockId?

```ts
optional blockId: string | RegExp;
```

A string or RegExp to match against the `block_id`

#### Defined in

[adapter.ts:735](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L735)

***

### callbackId?

```ts
optional callbackId: string | RegExp;
```

A string or RegExp to match against the `callback_id`

#### Defined in

[adapter.ts:730](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L730)

***

### within

```ts
within: "block_actions" | "interactive_message" | "dialog";
```

The source of options request.

#### Defined in

[adapter.ts:745](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L745)
