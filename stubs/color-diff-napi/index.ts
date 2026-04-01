/**
 * color-diff-napi stub — re-exports the pure TypeScript port bundled in the
 * source tree at src/native-ts/color-diff/index.ts.
 * The native Rust/NAPI module is only distributed in Anthropic's internal
 * npm registry; this TS port provides identical API surface.
 */
export {
  ColorDiff,
  ColorFile,
  getSyntaxTheme,
  type SyntaxTheme,
  type Hunk,
  type NativeModule,
} from '../../src/native-ts/color-diff/index.ts'
