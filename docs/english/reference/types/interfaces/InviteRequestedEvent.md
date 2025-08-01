[@slack/types](../index.md) / InviteRequestedEvent

# Interface: InviteRequestedEvent

Defined in: [events/invite.ts:1](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/invite.ts#L1)

## Properties

### invite\_request

```ts
invite_request: object;
```

Defined in: [events/invite.ts:3](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/invite.ts#L3)

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

Defined in: [events/invite.ts:2](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/invite.ts#L2)
