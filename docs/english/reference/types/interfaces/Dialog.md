[@slack/types](../index.md) / Dialog

# Interface: ~~Dialog~~

Defined in: [dialog.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/dialog.ts#L5)

Reusable shapes for argument values

## Deprecated

Dialogs are a deprecated surface in Slack. For more details on how to upgrade, check out our [Upgrading outmoded dialogs to modals guide](https://docs.slack.dev/block-kit/upgrading-outmoded-dialogs-to-modals). This will be removed in the next major version.

## Properties

### ~~callback\_id~~

```ts
callback_id: string;
```

Defined in: [dialog.ts:7](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/dialog.ts#L7)

***

### ~~elements~~

```ts
elements: object[];
```

Defined in: [dialog.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/dialog.ts#L8)

#### ~~data\_source?~~

```ts
optional data_source: "users" | "channels" | "conversations" | "external";
```

#### ~~hint?~~

```ts
optional hint: string;
```

#### ~~label~~

```ts
label: string;
```

#### ~~max\_length?~~

```ts
optional max_length: number;
```

#### ~~min\_length?~~

```ts
optional min_length: number;
```

#### ~~min\_query\_length?~~

```ts
optional min_query_length: number;
```

#### ~~name~~

```ts
name: string;
```

#### ~~option\_groups?~~

```ts
optional option_groups: object[];
```

#### ~~optional?~~

```ts
optional optional: boolean;
```

#### ~~options?~~

```ts
optional options: SelectOption[];
```

#### ~~placeholder?~~

```ts
optional placeholder: string;
```

#### ~~selected\_options?~~

```ts
optional selected_options: SelectOption[];
```

#### ~~subtype?~~

```ts
optional subtype: "number" | "email" | "tel" | "url";
```

#### ~~type~~

```ts
type: "text" | "textarea" | "select";
```

#### ~~value?~~

```ts
optional value: string;
```

***

### ~~notify\_on\_cancel?~~

```ts
optional notify_on_cancel: boolean;
```

Defined in: [dialog.ts:31](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/dialog.ts#L31)

***

### ~~state?~~

```ts
optional state: string;
```

Defined in: [dialog.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/dialog.ts#L32)

***

### ~~submit\_label?~~

```ts
optional submit_label: string;
```

Defined in: [dialog.ts:30](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/dialog.ts#L30)

***

### ~~title~~

```ts
title: string;
```

Defined in: [dialog.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/dialog.ts#L6)
