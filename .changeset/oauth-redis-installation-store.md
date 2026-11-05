---
"@slack/oauth": minor
---

feat(oauth): add `RedisInstallationStore`, which saves installations in Redis with the client your app already uses, such as `ioredis`, `redis` (node-redis) or `@upstash/redis`. Each user's token is saved on its own, so an authorization with only user scopes never replaces the bot token, and a token refresh saves only the token that changed.

```js
import { InstallProvider, RedisInstallationStore } from '@slack/oauth';
import Redis from 'ioredis';

const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: process.env.SLACK_STATE_SECRET,
  installationStore: new RedisInstallationStore({
    client: new Redis(process.env.REDIS_URL),
    clientId: process.env.SLACK_CLIENT_ID,
  }),
});
```
