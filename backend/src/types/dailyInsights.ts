export interface DailyInsightsRequest {
  coins: string[]
}

export interface DailyInsightsResult {
  coins: string[]
  insight: string
  generatedAt: string
}

export interface OpenRouterChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface OpenRouterChatCompletionRequest {
  model: string
  messages: OpenRouterChatMessage[]
}

export interface OpenRouterChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string | null
    }
  }>
  error?: {
    message?: string
  }
}
