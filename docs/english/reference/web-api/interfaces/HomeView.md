[@slack/web-api](../index.md) / HomeView

# Interface: HomeView

Defined in: node\_modules/@slack/types/dist/views.d.ts:22

## Extends

- `BaseView`

## Properties

### blocks

```ts
blocks: AnyBlock[];
```

Defined in: node\_modules/@slack/types/dist/views.d.ts:5

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

Defined in: node\_modules/@slack/types/dist/views.d.ts:18

#### Description

An identifier to recognize interactions and submissions of this particular view. Don't use this to
store sensitive information (use `private_metadata` instead). Maximum length of 255 characters.

#### See

[Handling and responding to interactions](https://api.slack.com/surfaces/modals#interactions).

#### Inherited from

```ts
BaseView.callback_id
```

***

### external\_id?

```ts
optional external_id: string;
```

Defined in: node\_modules/@slack/types/dist/views.d.ts:20

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

Defined in: node\_modules/@slack/types/dist/views.d.ts:12

#### Description

String that will be sent to your app in
[\`view\_submission\`](https://api.slack.com/reference/interaction-payloads/views#view_submission) and
[\`block\_actions\`](https://api.slack.com/reference/interaction-payloads/block-actions) events.
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

Defined in: node\_modules/@slack/types/dist/views.d.ts:24

#### Description

The type of view. Set to `home` for Home tabs.
