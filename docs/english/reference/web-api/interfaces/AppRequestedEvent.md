[@slack/web-api](../index.md) / AppRequestedEvent

# Interface: AppRequestedEvent

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:5

## Properties

### app\_request

```ts
app_request: object;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:7

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

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:63

***

### is\_user\_app\_collaborator

```ts
is_user_app_collaborator: boolean;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:45

***

### message

```ts
message: string;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:62

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

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:36

***

### scopes

```ts
scopes: object;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:56

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

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:51

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

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:6

***

### user

```ts
user: object;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:46

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
