/**
 * SDK runtime types stub — the real file is generated.
 * Minimal versions to satisfy the compiler.
 */
import type { z } from 'zod/v4'
import type { SDKMessage, SDKResultMessage, SDKSessionInfo, SDKUserMessage } from './coreTypes.js'

export type AnyZodRawShape = z.ZodRawShape
export type InferShape<T extends AnyZodRawShape> = { [K in keyof T]: z.infer<T[K]> }

export type Options = {
  model?: string
  maxTurns?: number
  cwd?: string
  systemPrompt?: string
  appendSystemPrompt?: string
  allowedTools?: string[]
  disallowedTools?: string[]
  permissionMode?: 'default' | 'auto' | 'bypassPermissions' | 'plan'
  apiKey?: string
}
export type InternalOptions = Options & { _internal?: unknown }

export type Query = AsyncIterable<SDKMessage>
export type InternalQuery = AsyncIterable<SDKMessage>

export type SessionMessage = {
  role: 'user' | 'assistant'
  content: string | unknown[]
  uuid: string
  timestamp?: string
}

export type GetSessionMessagesOptions = {
  dir?: string
  limit?: number
  offset?: number
  includeSystemMessages?: boolean
}
export type ListSessionsOptions = { dir?: string; limit?: number; offset?: number }
export type GetSessionInfoOptions = { dir?: string }
export type SessionMutationOptions = { dir?: string }
export type ForkSessionOptions = { dir?: string; upToMessageId?: string; title?: string }
export type ForkSessionResult = { sessionId: string }

export type SDKSession = {
  id: string
  prompt(message: string | AsyncIterable<SDKUserMessage>): Query
  abort(): void
}
export type SDKSessionOptions = Options & { sessionId?: string }

export type McpSdkServerConfigWithInstance = {
  type: 'sdk'
  instance: unknown
}

export type SdkMcpToolDefinition<Schema extends AnyZodRawShape> = {
  name: string
  description: string
  inputSchema: Schema
  handler: (args: InferShape<Schema>, extra: unknown) => Promise<unknown>
}
