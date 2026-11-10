[@slack/web-api](../index.md) / Dialog

# ~~Interface: Dialog~~

Defined in: packages/types/dist/dialog.d.ts:5

Reusable shapes for argument values

## Deprecated

Dialogs are a deprecated surface in Slack. For more details on how to upgrade, check out our [Upgrading outmoded dialogs to modals guide](https://docs.slack.dev/block-kit/upgrading-outmoded-dialogs-to-modals). This will be removed in the next major version.

## Properties

### ~~callback\_id~~

```ts
callback_id: string;
```

Defined in: packages/types/dist/dialog.d.ts:7

***

### ~~elements~~

```ts
elements: object[];
```

Defined in: packages/types/dist/dialog.d.ts:8

#### ~~data\_source?~~

```ts
data_source?: "channels" | "users" | "conversations" | "external";
```

#### ~~hint?~~

```ts
hint?: string;
```

#### ~~label~~

```ts
label: string;
```

#### ~~max\_length?~~

```ts
max_length?: number;
```

#### ~~min\_length?~~

```ts
min_length?: number;
```

#### ~~min\_query\_length?~~

```ts
min_query_length?: number;
```

#### ~~name~~

```ts
name: string;
```

#### ~~option\_groups?~~

```ts
option_groups?: object[];
```

#### ~~optional?~~

```ts
optional?: boolean;
```

#### ~~options?~~

```ts
options?: SelectOption[];
```

#### ~~placeholder?~~

```ts
placeholder?: string;
```

#### ~~selected\_options?~~

```ts
selected_options?: SelectOption[];
```

#### ~~subtype?~~

```ts
subtype?: "number" | "url" | "email" | "tel";
```

#### ~~type~~

```ts
type: "text" | "textarea" | "select";
```

#### ~~value?~~

```ts
value?: string;
```

***

### ~~notify\_on\_cancel?~~

```ts
notify_on_cancel?: boolean;
```

Defined in: packages/types/dist/dialog.d.ts:29

***

### ~~state?~~

```ts
state?: string;
```

Defined in: packages/types/dist/dialog.d.ts:30

***

### ~~submit\_label?~~

```ts
submit_label?: string;
```

Defined in: packages/types/dist/dialog.d.ts:28

***

### ~~title~~

```ts
title: string;
```

Defined in: packages/types/dist/dialog.d.ts:6
