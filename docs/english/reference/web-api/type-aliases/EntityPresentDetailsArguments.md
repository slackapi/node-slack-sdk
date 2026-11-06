[@slack/web-api](../index.md) / EntityPresentDetailsArguments

# Type Alias: EntityPresentDetailsArguments

```ts
type EntityPresentDetailsArguments = TokenOverridable & object;
```

Defined in: [packages/web-api/src/types/request/entity.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/entity.ts#L5)

## Type Declaration

### error?

```ts
error?: object;
```

#### Description

Error response preventing flexpane data from being returned.

#### error.actions?

```ts
actions?: EntityActionButton[];
```

##### Description

Set of action buttons to be shown in case of a specific error.

#### error.custom\_message?

```ts
custom_message?: string;
```

##### Description

If status is 'custom', you can use this field to provide a message to the client.

#### error.custom\_title?

```ts
custom_title?: string;
```

##### Description

If status is 'custom', you can use this field to provide a title to the client.

#### error.message\_format?

```ts
message_format?: string;
```

##### Description

String format, eg. 'markdown'.

#### error.status

```ts
status: string;
```

##### Description

Error status indicating why the entity could not be presented.

### metadata?

```ts
metadata?: EntityMetadata;
```

#### Description

Entity metadata to be presented in the flexpane.

### trigger\_id

```ts
trigger_id: string;
```

#### Description

A reference to the original user action that initated the request.

### user\_auth\_required?

```ts
user_auth_required?: boolean;
```

#### Description

Set user_auth_required to true to indicate that the user must authenticate to view the full
 flexpane data. Defaults to false.

### user\_auth\_url?

```ts
user_auth_url?: string;
```

#### Description

A custom URL to which users are directed for authentication if required.
Example: "https://example.com/onboarding?user_id=xxx"
