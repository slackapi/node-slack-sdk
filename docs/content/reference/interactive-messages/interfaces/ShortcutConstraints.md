# Interface: ShortcutConstraints

Constraints on when to call an shortcut handler.

## Properties

### callbackId?

```ts
optional callbackId: string | RegExp;
```

A string or RegExp to match against the `callback_id`

#### Defined in

[adapter.ts:715](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/interactive-messages/src/adapter.ts#L715)

***

### type?

```ts
optional type: "shortcut";
```

Valid type includes shortcut

#### Defined in

[adapter.ts:720](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/interactive-messages/src/adapter.ts#L720)
