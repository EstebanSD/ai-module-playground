type AIMetrics = {
  provider: string;
  model: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
};
export type AITextState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; response: string; metrics: AIMetrics }
  | { status: 'error'; message: string };

export type AIStreamChunk = {
  delta: string;
  done?: boolean;
};
export type AIStreamState =
  | { status: 'idle' }
  | { status: 'streaming'; response: string }
  | { status: 'stopped'; response: string }
  | { status: 'success'; response: string; metrics?: AIMetrics }
  | { status: 'error'; message: string };
