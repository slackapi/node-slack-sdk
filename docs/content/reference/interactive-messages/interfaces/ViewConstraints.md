# Interface: ViewConstraints

Constraints on when to call a view submission or view closed handler.

## Properties

### callbackId?

```ts
optional callbackId: string | RegExp;
```

A string or RegExp to match against the `callback_id`

#### Defined in

[adapter.ts:755](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L755)

***

### externalId?

```ts
optional externalId: string | RegExp;
```

A string to match against the `external_id`

#### Defined in

[adapter.ts:760](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L760)

***

### viewId?

```ts
optional viewId: string;
```

A string to match against the `view_id`

#### Defined in

[adapter.ts:765](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L765)
