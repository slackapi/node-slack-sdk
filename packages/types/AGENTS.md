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

### Adding a New Block Kit Type

Block Kit types live in `src/block-kit/` across four files:

| File | Contents |
|------|----------|
| `blocks.ts` | Layout blocks (`SectionBlock`, `ActionsBlock`, `HeaderBlock`, etc.) |
| `block-elements.ts` | Interactive elements (`Button`, `Datepicker`, `StaticSelect`, etc.) |
| `composition-objects.ts` | Reusable objects (`PlainTextElement`, `MrkdwnElement`, `Option`, `ConfirmationDialog`, etc.) |
| `extensions.ts` | Mixins for shared behaviors (`Actionable`, `Confirmable`, `Focusable`, `Placeholdable`, etc.) |

#### Steps

1. **Define the interface** in the appropriate file. Extend the correct base type and set a string literal `type`:

   ```typescript
   export interface MyCustomBlock extends Block {
     /** @description The type of block. For this block, `type` is always `my_custom`. */
     type: 'my_custom';
     /** @description A required text field. */
     text: TextObject;
     /** @description An optional field. Maximum length is 300 characters. */
     optional_field?: string;
   }
   ```

   Key conventions:
   - Extend `Block` for layout blocks. For elements, use mixins from `extensions.ts` (`Actionable`, `Confirmable`, `Focusable`, `Placeholdable`, etc.) instead of duplicating shared fields.
   - The `type` field must be a string literal matching the Slack API type value.
   - Use snake_case for field names to match the Slack JSON API.
   - Include `@description` JSDoc on every field and `@see` with an API reference link on the interface.
   - Mark fields as required or optional based on the Slack API documentation.

2. **Add to the discriminated union.** This is the most commonly missed step:
   - **Layout blocks** → add to the `KnownBlock` union in `blocks.ts`
   - **Elements** → add to the element-specific unions where the element is allowed (e.g., `ActionsBlockElement`, `InputBlockElement`, `SectionBlockElement`)
   - **Composition objects** → add to or create the relevant union type

   Forgetting this means the type won't be recognized in typed arrays like `KnownBlock[]`.

3. **Verify barrel export.** If the file is already re-exported from `src/index.ts` (all `block-kit/` files are), no extra step is needed. If you created a new file, add `export * from './<filename>'` to `src/index.ts`.

4. **Add type tests** in `test/blocks.test-d.ts` (or the appropriate test file). Cover:
   - Happy path: `expectAssignable<MyCustomBlock>({ type: 'my_custom', text: { type: 'mrkdwn', text: 'hi' } })`
   - Sad path: `expectError<MyCustomBlock>({})` (missing required fields)
   - Union assignability: `expectAssignable<KnownBlock>({ type: 'my_custom', text: { type: 'mrkdwn', text: 'hi' } })`

5. **Build and test:**

   ```bash
   npm run build --workspace=packages/types
   npm run test:types --workspace=packages/types
   ```

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
