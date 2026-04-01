# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Context

This is the **leaked TypeScript source code** of Anthropic's Claude Code CLI (leaked 2026-03-31 via a `.map` file in the npm registry). The `src/` directory is present but the repository is **missing all build configuration**. There is no `package.json`, `tsconfig.json`, or build script.

## Build Requirements

To compile this project you would need to reconstruct:

- `package.json` — dependency manifest (runtime is **Bun**, not Node.js)
- `tsconfig.json` — TypeScript config (strict mode, JSX for React/Ink)
- A Bun build script — to inject `MACRO.VERSION` and run feature-flag DCE via `bun:bundle`

The `MACRO` global (e.g. `MACRO.VERSION`) is injected at build time by the bundler; it is not declared in source files (except for a `declare const MACRO` forward-declaration in `src/utils/permissions/filesystem.ts`).

Feature flags use Bun's dead-code elimination API:
```typescript
import { feature } from 'bun:bundle'
if (feature('VOICE_MODE')) { ... }  // stripped at build if false
```
Active flags: `PROACTIVE`, `KAIROS`, `BRIDGE_MODE`, `DAEMON`, `VOICE_MODE`, `AGENT_TRIGGERS`, `COORDINATOR_MODE`, `BG_SESSIONS`, `MONITOR_TOOL`, `ABLATION_BASELINE`, `DUMP_SYSTEM_PROMPT`.

## Entry Points

- `src/entrypoints/cli.tsx` — top-level CLI bootstrap (fast paths for `--version`, bridge mode, daemon, etc.)
- `src/main.tsx` — Commander.js CLI parser + React/Ink renderer init
- `src/entrypoints/init.ts` — config loading, telemetry setup

## Architecture

### Core Loop

`src/entrypoints/cli.tsx` → `src/main.tsx` → `QueryEngine.ts`

`QueryEngine.ts` (~46KB) drives the LLM streaming loop: sends messages to the Anthropic API, handles tool-call responses, retries, thinking mode, and token counting.

### Tool System (`src/tools/`)

Each tool is a self-contained module with an input schema (Zod), permission descriptor, and `call()` method. Tools are registered in `src/tools.ts`. The permission system in `src/hooks/toolPermission/` intercepts every invocation and either auto-approves or prompts the user based on the current permission mode (`default`, `plan`, `bypassPermissions`, `auto`).

### Command System (`src/commands/`)

Slash commands (`/commit`, `/review`, etc.) registered in `src/commands.ts`. Each command is a module in `src/commands/` that exports a `Command` object.

### Service Layer (`src/services/`)

- `api/` — Anthropic API client (wraps `@anthropic-ai/sdk`)
- `mcp/` — Model Context Protocol server management
- `oauth/` — OAuth 2.0 + JWT auth
- `lsp/` — Language Server Protocol integration
- `analytics/` — GrowthBook feature flags
- `compact/` — Conversation context compression
- `extractMemories/` — Automatic memory extraction

### Bridge System (`src/bridge/`)

Bidirectional IPC between Claude Code CLI and IDE extensions (VS Code, JetBrains). Entry: `src/bridge/bridgeMain.ts`.

### UI Layer

Terminal UI is built with **React + Ink** (React renderer for the terminal). Components live in `src/components/`. The custom Ink reconciler wrapper is in `src/ink/` — it has intentional `@ts-expect-error` suppressions for react-reconciler API gaps.

### Notable Patterns

- **Parallel prefetch at startup**: `startMdmRawRead()` and `startKeychainPrefetch()` fire before heavy module evaluation in `main.tsx`
- **Lazy loading**: OpenTelemetry (~400KB) and gRPC (~700KB) are dynamically imported only when needed
- **Multi-agent**: Sub-agents spawned via `AgentTool`; `src/coordinator/` handles orchestration; `TeamCreateTool` enables parallel team work

## Known Type Issues

~460 `@ts-expect-error` / `@ts-ignore` suppressions exist intentionally for:
- `react-reconciler` v0.33 API vs `@types` declaration mismatches
- Bun WebSocket extensions not in DOM types
- Bun API methods ahead of their type definitions

These are expected and should not be "fixed" by removing the suppressions.

## Internal Packages

`@ant/computer-use-mcp`, `@ant/claude-for-chrome-mcp`, `@ant/computer-use-swift`, `@ant/computer-use-input`, `@anthropic-ai/mcpb` are internal Anthropic packages not published to npm. Features depending on them (computer use, Chrome extension) cannot be built without stubs or mocks.
