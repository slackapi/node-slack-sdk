[@slack/web-api](../index.md) / EntityCustomField

# Interface: EntityCustomField

Defined in: packages/types/dist/message-metadata.d.ts:236

## Properties

### alt\_text?

```ts
optional alt_text: string;
```

Defined in: packages/types/dist/message-metadata.d.ts:247

***

### boolean?

```ts
optional boolean: 
  | EntityBooleanCheckboxField
  | EntityBooleanTextField;
```

Defined in: packages/types/dist/message-metadata.d.ts:253

***

### edit?

```ts
optional edit: EntityEditSupport;
```

Defined in: packages/types/dist/message-metadata.d.ts:249

***

### entity\_ref?

```ts
optional entity_ref: EntityRefField;
```

Defined in: packages/types/dist/message-metadata.d.ts:252

***

### format?

```ts
optional format: string;
```

Defined in: packages/types/dist/message-metadata.d.ts:244

***

### icon?

```ts
optional icon: EntityIconField;
```

Defined in: packages/types/dist/message-metadata.d.ts:242

***

### image\_url?

```ts
optional image_url: string;
```

Defined in: packages/types/dist/message-metadata.d.ts:245

***

### item\_type?

```ts
optional item_type: string;
```

Defined in: packages/types/dist/message-metadata.d.ts:250

***

### key

```ts
key: string;
```

Defined in: packages/types/dist/message-metadata.d.ts:238

***

### label

```ts
label: string;
```

Defined in: packages/types/dist/message-metadata.d.ts:237

***

### link?

```ts
optional link: string;
```

Defined in: packages/types/dist/message-metadata.d.ts:241

***

### long?

```ts
optional long: boolean;
```

Defined in: packages/types/dist/message-metadata.d.ts:243

***

### slack\_file?

```ts
optional slack_file: SlackFile;
```

Defined in: packages/types/dist/message-metadata.d.ts:246

***

### tag\_color?

```ts
optional tag_color: string;
```

Defined in: packages/types/dist/message-metadata.d.ts:248

***

### type

```ts
type: string;
```

Defined in: packages/types/dist/message-metadata.d.ts:239

***

### user?

```ts
optional user: 
  | EntityUserIDField
  | EntityUserField;
```

Defined in: packages/types/dist/message-metadata.d.ts:251

***

### value?

```ts
optional value: string | number | EntityArrayItemField[];
```

Defined in: packages/types/dist/message-metadata.d.ts:240
