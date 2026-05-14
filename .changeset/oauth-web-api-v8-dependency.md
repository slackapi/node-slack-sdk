---
"@slack/oauth": major
---

Updated the internal `@slack/web-api` dependency from `^7` to `^8`. If you pass `clientOptions` to `InstallProvider`, the following options are no longer available:

- **`clientOptions.agent`** — Use `clientOptions.fetch` with a custom fetch implementation instead.
- **`clientOptions.tls`** — Configure TLS via `clientOptions.fetch` or the `NODE_EXTRA_CA_CERTS` environment variable.

```js
import { InstallProvider } from '@slack/oauth';
import { fetch, Agent } from 'undici';

const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'my-secret',
  clientOptions: {
    fetch: (url, init) => fetch(url, { ...init, dispatcher: new Agent({ connect: { ca: myCA } }) }),
  },
});
```

See the `@slack/web-api` v8 changelog for the full list of breaking changes that affect `clientOptions`.
