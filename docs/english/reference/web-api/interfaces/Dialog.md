[@slack/web-api](../index.md) / Dialog

# ~~Interface: Dialog~~

Defined in: node\_modules/@slack/types/dist/dialog.d.ts:5

Reusable shapes for argument values

## Deprecated

Dialogs are a deprecated surface in Slack. For more details on how to upgrade, check out our [Upgrading outmoded dialogs to modals guide](https://api.slack.com/block-kit/dialogs-to-modals). This will be removed in the next major version.

## Properties

### ~~callback\_id~~

```ts
callback_id: string;
```

Defined in: node\_modules/@slack/types/dist/dialog.d.ts:7

***

### ~~elements~~

```ts
elements: object[];
```

Defined in: node\_modules/@slack/types/dist/dialog.d.ts:8

#### ~~data\_source?~~

```ts
optional data_source: "channels" | "users" | "conversations" | "external";
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

Defined in: node\_modules/@slack/types/dist/dialog.d.ts:29

***

### ~~state?~~

```ts
optional state: string;
```

Defined in: node\_modules/@slack/types/dist/dialog.d.ts:30

***

### ~~submit\_label?~~

```ts
optional submit_label: string;
```

Defined in: node\_modules/@slack/types/dist/dialog.d.ts:28

***

### ~~title~~

```ts
title: string;
```

Defined in: node\_modules/@slack/types/dist/dialog.d.ts:6
