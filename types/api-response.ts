export type AITextResponse = {
  text: string;
  provider: string;
  model: string;

  usage?: { inputTokens: number; outputTokens: number; totalTokens: number };
  finishReason?: string;
  metadata?: Record<string, unknown>;
};
