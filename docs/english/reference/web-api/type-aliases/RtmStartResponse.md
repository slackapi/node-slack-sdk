[@slack/web-api](../index.md) / RtmStartResponse

# Type Alias: RtmStartResponse

```ts
type RtmStartResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/RtmStartResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/RtmStartResponse.ts#L11)

## Type Declaration

### accept\_tos\_url?

```ts
accept_tos_url?: string;
```

### bots?

```ts
bots?: Bot[];
```

### cache\_ts?

```ts
cache_ts?: number;
```

### cache\_ts\_version?

```ts
cache_ts_version?: string;
```

### cache\_version?

```ts
cache_version?: string;
```

### can\_manage\_shared\_channels?

```ts
can_manage_shared_channels?: boolean;
```

### channels?

```ts
channels?: Channel[];
```

### dnd?

```ts
dnd?: Dnd;
```

### error?

```ts
error?: string;
```

### groups?

```ts
groups?: Group[];
```

### ims?

```ts
ims?: Im[];
```

### is\_europe?

```ts
is_europe?: boolean;
```

### latest\_event\_ts?

```ts
latest_event_ts?: string;
```

### links?

```ts
links?: Links;
```

### mobile\_app\_requires\_upgrade?

```ts
mobile_app_requires_upgrade?: boolean;
```

### needed?

```ts
needed?: string;
```

### non\_threadable\_channels?

```ts
non_threadable_channels?: string[];
```

### ok?

```ts
ok?: boolean;
```

### provided?

```ts
provided?: string;
```

### read\_only\_channels?

```ts
read_only_channels?: string[];
```

### response\_metadata?

```ts
response_metadata?: ResponseMetadata;
```

### self?

```ts
self?: Self;
```

### subteams?

```ts
subteams?: Subteams;
```

### team?

```ts
team?: Team;
```

### thread\_only\_channels?

```ts
thread_only_channels?: string[];
```

### url?

```ts
url?: string;
```

### users?

```ts
users?: User[];
```
