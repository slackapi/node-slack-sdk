# Type Alias: RtmStartResponse

```ts
type RtmStartResponse: WebAPICallResult & object;
```

## Type declaration

### accept\_tos\_url?

```ts
optional accept_tos_url: string;
```

### bots?

```ts
optional bots: Bot[];
```

### cache\_ts?

```ts
optional cache_ts: number;
```

### cache\_ts\_version?

```ts
optional cache_ts_version: string;
```

### cache\_version?

```ts
optional cache_version: string;
```

### can\_manage\_shared\_channels?

```ts
optional can_manage_shared_channels: boolean;
```

### channels?

```ts
optional channels: Channel[];
```

### dnd?

```ts
optional dnd: Dnd;
```

### error?

```ts
optional error: string;
```

### groups?

```ts
optional groups: Group[];
```

### ims?

```ts
optional ims: Im[];
```

### is\_europe?

```ts
optional is_europe: boolean;
```

### latest\_event\_ts?

```ts
optional latest_event_ts: string;
```

### links?

```ts
optional links: Links;
```

### mobile\_app\_requires\_upgrade?

```ts
optional mobile_app_requires_upgrade: boolean;
```

### needed?

```ts
optional needed: string;
```

### non\_threadable\_channels?

```ts
optional non_threadable_channels: string[];
```

### ok?

```ts
optional ok: boolean;
```

### provided?

```ts
optional provided: string;
```

### read\_only\_channels?

```ts
optional read_only_channels: string[];
```

### response\_metadata?

```ts
optional response_metadata: ResponseMetadata;
```

### self?

```ts
optional self: Self;
```

### subteams?

```ts
optional subteams: Subteams;
```

### team?

```ts
optional team: Team;
```

### thread\_only\_channels?

```ts
optional thread_only_channels: string[];
```

### url?

```ts
optional url: string;
```

### users?

```ts
optional users: User[];
```

## Defined in

[packages/web-api/src/types/response/RtmStartResponse.ts:12](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/response/RtmStartResponse.ts#L12)
