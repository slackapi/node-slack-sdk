# AGENTS.md — @slack/web-api

Instructions for AI coding agents working on this package.

## Package Overview

The core Slack Web API client. Wraps every Slack API method with typed request arguments and response types, automatic retries, rate limiting, cursor pagination, and streaming support.

## Architecture

`src/WebClient.ts` extends the `Methods` class (`src/methods.ts`) which defines all API method bindings. Key internals:

- **Axios** for HTTP requests
- **p-queue** for request concurrency control
- **p-retry** for automatic retries with backoff
- **ChatStreamer** (`src/ChatStreamer.ts`) for streaming support via `chatStream()`
- Built-in cursor pagination via `paginate()`

## Critical Rules

1. **Never manually edit `src/types/response/*.ts`** — these are auto-generated. Look for the "DO NOT EDIT" banner.
2. **Request types ARE manually maintained** — `src/types/request/` is hand-written code.
3. **Use Biome**, not ESLint/Prettier — config is in `biome.json` at repo root.
4. **Response type imports use individual files**, not the barrel — e.g., `import type { ChatPostMessageResponse } from './types/response/ChatPostMessageResponse'`.
5. **Request type imports use the barrel** — `import type { ChatPostMessageArguments } from './types/request'`.

## Adding a New Slack API Method

### Step 1: Look Up the API Method Documentation

Reference: `https://docs.slack.dev/reference/methods/{method.name}`

### Step 2: Generate Response Types

```bash
bash scripts/generate-web-api-types.sh
```

This clones `slackapi/java-slack-sdk`, reads JSON response samples, and generates `*Response.ts` files into `src/types/response/`. Prerequisites: Ruby and npm.

If the JSON sample doesn't exist yet in `java-slack-sdk`, the maintainers need to add it there first.

### Step 3: Add Request Argument Types

File: `src/types/request/<namespace>.ts`

Create an interface for the method's arguments. Reuse mixins from `src/types/request/common.ts`:

| Mixin | Purpose |
|-------|---------|
| `TokenOverridable` | Optional `token` override |
| `CursorPaginationEnabled` | `cursor` + `limit` pagination |
| `TimelinePaginationEnabled` | `oldest` + `latest` + `inclusive` pagination |
| `TraditionalPagingEnabled` | `count` + `page` pagination |
| `OptionalTeamAssignable` | Optional `team_id` |
| `LocaleAware` | Optional `include_locale` |

Also reuse namespace-specific mixins from the same file (e.g., `Channel`, `ChannelAndTS`, `AsUser` in `chat.ts`).

### Step 4: Export Request Types

File: `src/types/request/index.ts`

Add the new type to the appropriate export block.

### Step 5: Add Method Binding

File: `src/methods.ts`

1. Import the argument type from `./types/request` (barrel).
2. Import the response type from `./types/response/<ResponseName>` (individual file).
3. Add a binding in the appropriate namespace object of the `Methods` class:

```typescript
/**
 * @description Description of the method.
 * @see {@link https://docs.slack.dev/reference/methods/namespace.methodName `namespace.methodName` API reference}.
 */
methodName: bindApiCall<MethodNameArguments, MethodNameResponse>(this, 'namespace.methodName'),
```

Use `bindApiCallWithOptionalArgument` instead when **all** arguments are optional.

### Step 6: Add Type Tests

File: `test/types/methods/<namespace>.test-d.ts`

Add sad path (`expectError`) and happy path (`expectAssignable`) tests:

```typescript
// namespace.methodName
// -- sad path
expectError(web.namespace.methodName()); // lacking argument
expectError(web.namespace.methodName({})); // empty argument

// -- happy path
expectAssignable<Parameters<typeof web.namespace.methodName>>([
  { /* required fields */ },
]);
```

### Checklist

- [ ] Looked up method docs at `https://docs.slack.dev/reference/methods/{method.name}`
- [ ] Generated response types via `scripts/generate-web-api-types.sh` (or created manually if unavailable)
- [ ] Added request argument type in `src/types/request/<namespace>.ts`
- [ ] Exported new request type from `src/types/request/index.ts`
- [ ] Imported argument + response types in `src/methods.ts`
- [ ] Added method binding with `bindApiCall` in appropriate namespace
- [ ] Added sad/happy path type tests in `test/types/methods/<namespace>.test-d.ts`
- [ ] Verified: `npm test --workspace=packages/web-api`

## Code Generation

`scripts/generate-web-api-types.sh` (run from repo root):

1. Clones or pulls `slackapi/java-slack-sdk` into `tmp/`
2. Runs `npm install` in `scripts/` for quicktype
3. Executes `scripts/code_generator.rb`
4. Runs `npm run lint:fix` on generated output

Biome overrides exist for generated response types (`noBannedTypes: off`, `noExplicitAny: off`).

## Naming Conventions

- Request types: `{Namespace}{Action}Arguments` (e.g., `ChatPostMessageArguments`)
- Response types: `{Namespace}{Action}Response` (e.g., `ChatPostMessageResponse`)
- Method names: camelCase matching the API (e.g., `chat.postMessage` -> `postMessage`)

## Testing

```bash
npm test --workspace=packages/web-api         # all tests
npm run test:unit --workspace=packages/web-api # unit only
npm run test:types --workspace=packages/web-api # tsd only
```

- **Unit tests**: `*.test.{ts,js}` using `node:test` + `node:assert/strict`
- **Type tests**: `*.test-d.ts` using tsd
- **Coverage**: `--experimental-test-coverage`, outputs `lcov.info` at package root
