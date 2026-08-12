---
"@slack/web-api": minor
---

chore(web-api): regenerate Web API response types from latest samples

Regenerate `packages/web-api/src/types/response` from the current `java-slack-sdk` samples, picking up new stable response properties (e.g. `warning` fields, `Channel.properties`) and one new method type. Also fixes `scripts/generate-web-api-types.sh` to run `lint:fix` from the repo root (Biome), since the per-package `lint:fix` script no longer exists.
