[@slack/types](../index.md) / HomeView

# Interface: HomeView

Defined in: [views.ts:25](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L25)

## Extends

- `BaseView`

## Properties

### blocks

```ts
blocks: AnyBlock[];
```

Defined in: [views.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L6)

#### Description

An array of [AnyBlock](../type-aliases/AnyBlock.md) that defines the content of the view. Max of 100 blocks.

#### Inherited from

```ts
BaseView.blocks
```

***

### callback\_id?

```ts
optional callback_id: string;
```

Defined in: [views.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L19)

#### Description

An identifier to recognize interactions and submissions of this particular view. Don't use this to
store sensitive information (use `private_metadata` instead). Maximum length of 255 characters.

#### See

[Handling and responding to interactions](https://docs.slack.dev/surfaces/modals#interactions).

#### Inherited from

```ts
BaseView.callback_id
```

***

### external\_id?

```ts
optional external_id: string;
```

Defined in: [views.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L21)

#### Description

A custom identifier that must be unique for all views on a per-team basis.

#### Inherited from

```ts
BaseView.external_id
```

***

### private\_metadata?

```ts
optional private_metadata: string;
```

Defined in: [views.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L13)

#### Description

String that will be sent to your app in
[\`view\_submission\`](https://docs.slack.dev/reference/interaction-payloads/view-interactions-payload#view_submission) and
[\`block\_actions\`](https://docs.slack.dev/reference/interaction-payloads/block_actions-payload) events.
Maximum length of 3000 characters.

#### Inherited from

```ts
BaseView.private_metadata
```

***

### type

```ts
type: "home";
```

Defined in: [views.ts:27](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L27)

#### Description

The type of view. Set to `home` for Home tabs.
