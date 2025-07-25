[@slack/web-api](../index.md) / InviteRequestedEvent

# Interface: InviteRequestedEvent

Defined in: node\_modules/@slack/types/dist/events/invite.d.ts:1

## Properties

### invite\_request

```ts
invite_request: object;
```

Defined in: node\_modules/@slack/types/dist/events/invite.d.ts:3

#### channel\_ids

```ts
channel_ids: string[];
```

#### date\_created

```ts
date_created: number;
```

#### date\_expire

```ts
date_expire: number;
```

#### email

```ts
email: string;
```

#### id

```ts
id: string;
```

#### invite\_type

```ts
invite_type: "restricted" | "ultra_restricted" | "full_member";
```

#### real\_name

```ts
real_name: string;
```

#### request\_reason

```ts
request_reason: string;
```

#### requester\_ids

```ts
requester_ids: string[];
```

#### team

```ts
team: object;
```

##### team.domain

```ts
domain: string;
```

##### team.id

```ts
id: string;
```

##### team.name

```ts
name: string;
```

***

### type

```ts
type: "invite_requested";
```

Defined in: node\_modules/@slack/types/dist/events/invite.d.ts:2
