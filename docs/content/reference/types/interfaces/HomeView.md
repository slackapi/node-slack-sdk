# Interface: HomeView

## Extends

- `BaseView`

## Properties

### blocks

```ts
blocks: AnyBlock[];
```

#### Description

An array of [AnyBlock](../type-aliases/AnyBlock.md) that defines the content of the view. Max of 100 blocks.

#### Inherited from

`BaseView.blocks`

#### Defined in

[views.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L6)

***

### callback\_id?

```ts
optional callback_id: string;
```

#### Description

An identifier to recognize interactions and submissions of this particular view. Don't use this to
store sensitive information (use `private_metadata` instead). Maximum length of 255 characters.

#### See

[Handling and responding to interactions](https://api.slack.com/surfaces/modals#interactions).

#### Inherited from

`BaseView.callback_id`

#### Defined in

[views.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L19)

***

### external\_id?

```ts
optional external_id: string;
```

#### Description

A custom identifier that must be unique for all views on a per-team basis.

#### Inherited from

`BaseView.external_id`

#### Defined in

[views.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L21)

***

### private\_metadata?

```ts
optional private_metadata: string;
```

#### Description

String that will be sent to your app in
[`view_submission`](https://api.slack.com/reference/interaction-payloads/views#view_submission) and
[`block_actions`](https://api.slack.com/reference/interaction-payloads/block-actions) events.
Maximum length of 3000 characters.

#### Inherited from

`BaseView.private_metadata`

#### Defined in

[views.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L13)

***

### type

```ts
type: "home";
```

#### Description

The type of view. Set to `home` for Home tabs.

#### Defined in

[views.ts:27](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L27)
