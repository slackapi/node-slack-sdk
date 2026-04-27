# AGENTS.md — @slack/types

Instructions for AI coding agents working on this package.

## Package Overview

Shared TypeScript type definitions for the Slack platform. Provides Block Kit elements, composition objects, event types, views, message attachments, message metadata, chunk types, and other common structures used across `@slack/*` packages.

## Architecture

### Source Layout

```txt
src/
├── block-kit/                  # Block Kit UI framework types
│   ├── block-elements.ts       # Interactive elements (buttons, menus, inputs, etc.)
│   ├── blocks.ts               # Layout blocks (section, actions, context, etc.)
│   ├── composition-objects.ts  # Text objects, option objects, filter objects, etc.
│   └── extensions.ts           # Extended block types (e.g., for messages, modals)
├── common/                     # Shared small types
│   ├── bot-profile.ts          # Bot profile structure
│   └── status-emoji-display-info.ts
├── events/                     # Slack event type definitions
│   ├── index.ts                # Barrel export for all event types
│   └── *.ts                    # One file per event category (message, channel, user, etc.)
├── calls.ts                    # Slack Calls types
├── chunk.ts                    # Streaming chunk types
├── dialog.ts                   # Legacy dialog types
├── message-attachments.ts      # Message attachment types
├── message-metadata.ts         # Message metadata types
├── views.ts                    # Modal and Home tab view types
└── index.ts                    # Root barrel export
```

### Key Design Principles

- **Pure types** — this package contains only TypeScript type definitions (interfaces, type aliases, enums). No runtime code.
- **Barrel exports** — `src/index.ts` re-exports everything. Consumers import directly from `@slack/types`.
- **Discriminated unions** — Block Kit types use discriminated unions keyed on `type` (e.g., `KnownBlock`, `BlockElement`).

## Critical Rules

1. **All types are manually maintained** — there is no code generation in this package.
2. **Export everything from `src/index.ts`** — every public type must be reachable from the barrel.
3. **No runtime code** — this package must only contain type definitions, no JavaScript logic.

## Naming Conventions

- **Types/Interfaces**: PascalCase
- **Block types**: `{Kind}Block` (e.g., `SectionBlock`, `ActionsBlock`)
- **Element types**: `{Kind}Element` or `{Kind}Action` (e.g., `ButtonElement`, `StaticSelectAction`)
- **Event types**: `{Category}{Action}Event` (e.g., `MessageChangedEvent`, `ChannelCreatedEvent`)
- **Composition objects**: descriptive PascalCase (e.g., `PlainTextElement`, `MrkdwnElement`, `Option`, `ConfirmationDialog`)

## Adding New Types

### Adding a New Block Kit Element

1. Add the interface to the appropriate file in `src/block-kit/`:
   - **Layout blocks** → `blocks.ts`
   - **Interactive elements** → `block-elements.ts`
   - **Composition objects** → `composition-objects.ts`
   - **Message/modal extensions** → `extensions.ts`
2. Add the new type to the relevant discriminated union (e.g., `KnownBlock`, `BlockElement`).
3. Verify it is exported through `src/index.ts` (already covered if the file is re-exported).

### Adding a New Event Type

1. Find or create the appropriate category file in `src/events/` (e.g., `channel.ts`, `message.ts`).
2. Define the event interface following existing patterns in that file.
3. Export the new type from `src/events/index.ts`.

### Adding a New Top-Level Type Category

1. Create a new `.ts` file in `src/`.
2. Add the `export * from './<filename>'` line to `src/index.ts`.

## Testing

```bash
npm test --workspace=packages/types         # build + type tests
npm run test:types --workspace=packages/types # tsd only
```

- **Test framework**: tsd (type-level testing only)
- **Test files**: `test/*.test-d.ts`
- **No unit tests** — since there is no runtime code, only type-level tests are needed.

Use `expectType`, `expectAssignable`, `expectError`, and `expectNotAssignable` from tsd to validate type correctness.

## Common Pitfalls

- **Discriminated union membership** — when adding a new block or element type, forgetting to add it to the union type (e.g., `KnownBlock`) means it won't be recognized in typed arrays like `KnownBlock[]`.
- **Downstream impact** — types defined here are consumed by `@slack/web-api`, `@slack/webhook`, `@slack/socket-mode`, and other packages. Breaking changes require coordination.
- **Optional vs. required fields** — match the Slack API documentation. Fields that are always present in API responses should be required; fields that are conditionally present should be optional.
