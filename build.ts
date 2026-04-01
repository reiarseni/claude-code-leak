#!/usr/bin/env bun
/**
 * Build script for claude-code (leaked source rebuild).
 *
 * Usage:
 *   bun run build.ts
 *
 * Output: dist/cli.js  (executable, shebang prepended)
 */

import { readFileSync, writeFileSync, chmodSync } from 'fs'
import { resolve } from 'path'

const root = import.meta.dir
const VERSION = process.env.CLAUDE_VERSION ?? '1.0.24'
const BUILD_TIME = new Date().toISOString()

console.log(`Building claude-code ${VERSION} ...`)

const result = await Bun.build({
  entrypoints: [resolve(root, 'src/entrypoints/cli.tsx')],
  outdir: resolve(root, 'dist'),
  naming: 'cli.js',
  target: 'bun',
  format: 'esm',
  minify: false,
  sourcemap: 'none',
  // Inject MACRO.* globals (inlined by the real Anthropic build system)
  define: {
    'MACRO.VERSION': JSON.stringify(VERSION),
    'MACRO.BUILD_TIME': JSON.stringify(BUILD_TIME),
    'MACRO.PACKAGE_URL': JSON.stringify('@anthropic-ai/claude-code'),
    'MACRO.NATIVE_PACKAGE_URL': JSON.stringify('@anthropic-ai/claude-code'),
    'MACRO.FEEDBACK_CHANNEL': JSON.stringify('https://github.com/anthropics/claude-code/issues'),
    'MACRO.ISSUES_EXPLAINER': JSON.stringify('Report issues at https://github.com/anthropics/claude-code/issues'),
    'MACRO.VERSION_CHANGELOG': JSON.stringify(''),
  },
  // Resolve bun:bundle shim so feature() calls return false → DCE
  alias: {
    'bun:bundle': resolve(root, 'stubs/bun-bundle.ts'),
    // Resolve src/ path alias
    'src': resolve(root, 'src'),
  },
  // Mark large optional/dynamic-only packages as external so they are
  // resolved at runtime (not bundled). These are lazy-loaded features.
  external: [
    // OpenTelemetry exporters — lazily imported only if telemetry is enabled
    '@opentelemetry/exporter-metrics-otlp-grpc',
    '@opentelemetry/exporter-metrics-otlp-http',
    '@opentelemetry/exporter-metrics-otlp-proto',
    '@opentelemetry/exporter-logs-otlp-grpc',
    '@opentelemetry/exporter-logs-otlp-http',
    '@opentelemetry/exporter-logs-otlp-proto',
    '@opentelemetry/exporter-trace-otlp-grpc',
    '@opentelemetry/exporter-trace-otlp-http',
    '@opentelemetry/exporter-trace-otlp-proto',
    '@opentelemetry/exporter-prometheus',
    // gRPC — heavy, optional
    '@grpc/grpc-js',
    '@grpc/proto-loader',
  ],
})

if (!result.success) {
  console.error('Build failed:')
  for (const log of result.logs) {
    console.error(log)
  }
  process.exit(1)
}

// Prepend shebang so the output is directly executable
const outPath = resolve(root, 'dist/cli.js')
const built = readFileSync(outPath, 'utf8')
writeFileSync(outPath, `#!/usr/bin/env bun\n${built}`)
chmodSync(outPath, 0o755)

console.log(`\nBuild succeeded → dist/cli.js`)
console.log(`Run with: bun dist/cli.js  or  ./dist/cli.js`)
