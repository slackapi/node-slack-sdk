[@slack/types](../index.md) / AppRequestedEvent

# Interface: AppRequestedEvent

Defined in: [events/app.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L6)

## Properties

### app\_request

```ts
app_request: object;
```

Defined in: [events/app.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L8)

#### app

```ts
app: object;
```

##### app.additional\_info

```ts
additional_info: string;
```

##### app.app\_directory\_url

```ts
app_directory_url: string;
```

##### app.app\_homepage\_url

```ts
app_homepage_url: string;
```

##### app.description

```ts
description: string;
```

##### app.help\_url

```ts
help_url: string;
```

##### app.icons?

```ts
optional icons: object;
```

##### app.icons.image\_1024?

```ts
optional image_1024: string;
```

##### app.icons.image\_128?

```ts
optional image_128: string;
```

##### app.icons.image\_192?

```ts
optional image_192: string;
```

##### app.icons.image\_32?

```ts
optional image_32: string;
```

##### app.icons.image\_36?

```ts
optional image_36: string;
```

##### app.icons.image\_48?

```ts
optional image_48: string;
```

##### app.icons.image\_512?

```ts
optional image_512: string;
```

##### app.icons.image\_64?

```ts
optional image_64: string;
```

##### app.icons.image\_72?

```ts
optional image_72: string;
```

##### app.icons.image\_96?

```ts
optional image_96: string;
```

##### app.icons.image\_original?

```ts
optional image_original: string;
```

##### app.id

```ts
id: string;
```

##### app.is\_app\_directory\_approved

```ts
is_app_directory_approved: boolean;
```

##### app.is\_granular\_bot\_app

```ts
is_granular_bot_app: boolean;
```

##### app.is\_internal

```ts
is_internal: boolean;
```

##### app.name

```ts
name: string;
```

##### app.privacy\_policy\_url

```ts
privacy_policy_url: string;
```

#### id

```ts
id: string;
```

***

### date\_created

```ts
date_created: number;
```

Defined in: [events/app.ts:64](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L64)

***

### is\_user\_app\_collaborator

```ts
is_user_app_collaborator: boolean;
```

Defined in: [events/app.ts:46](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L46)

***

### message

```ts
message: string;
```

Defined in: [events/app.ts:63](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L63)

***

### previous\_resolution

```ts
previous_resolution: 
  | null
  | {
  scopes: {
     description: string;
     is_dangerous: boolean;
     name: string;
     token_type: null | "user" | "bot" | "app";
  };
  status: "approved" | "restricted";
};
```

Defined in: [events/app.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L37)

***

### scopes

```ts
scopes: object;
```

Defined in: [events/app.ts:57](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L57)

#### description

```ts
description: string;
```

#### is\_dangerous

```ts
is_dangerous: boolean;
```

#### name

```ts
name: string;
```

#### token\_type

```ts
token_type: null | "user" | "bot" | "app";
```

***

### team

```ts
team: object;
```

Defined in: [events/app.ts:52](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L52)

#### domain

```ts
domain: string;
```

#### id

```ts
id: string;
```

#### name

```ts
name: string;
```

***

### type

```ts
type: "app_requested";
```

Defined in: [events/app.ts:7](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L7)

***

### user

```ts
user: object;
```

Defined in: [events/app.ts:47](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L47)

#### email

```ts
email: string;
```

#### id

```ts
id: string;
```

#### name

```ts
name: string;
```
