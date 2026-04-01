/** Stub — ConnectorText types for streaming API (missing from leak) */
export type ConnectorTextBlock = {
  type: 'connector_text'
  text: string
}
export type ConnectorTextDelta = {
  type: 'connector_text_delta'
  text: string
}
export function isConnectorTextBlock(block: unknown): block is ConnectorTextBlock {
  return (
    typeof block === 'object' &&
    block !== null &&
    (block as Record<string, unknown>).type === 'connector_text'
  )
}
