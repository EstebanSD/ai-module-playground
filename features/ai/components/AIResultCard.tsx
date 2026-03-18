import type { AITextState } from '@/types/ai-request';
import { Card, CardContent, CardHeader, CardTitle, Separator } from '@/components/ui';

type Props = {
  state: AITextState;
};

export function AIResultCard({ state }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Result</CardTitle>
      </CardHeader>

      <CardContent>
        {state.status === 'loading' && (
          <pre className="text-sm whitespace-pre-wrap">Generating response...</pre>
        )}

        {state.status === 'success' && (
          <>
            <div className="mb-2">
              <h3>Response</h3>
              <Separator />
            </div>

            <pre className="text-sm whitespace-pre-wrap">{state.response}</pre>

            <div className="mt-4 mb-2">
              <h3>Metrics</h3>
              <Separator />
            </div>

            <div className="text-sm space-y-1">
              <Metric label="Provider" value={state.metrics.provider} />
              <Metric label="Model" value={state.metrics.model} />
              <Metric label="Input tokens" value={state.metrics.usage?.inputTokens} />
              <Metric label="Output tokens" value={state.metrics.usage?.outputTokens} />
              <Metric label="Total tokens" value={state.metrics.usage?.totalTokens} />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value?: number | string }) {
  return (
    <div>
      <span className="text-muted-foreground">{label}:</span>
      <span className="ms-2">{value ?? '-'}</span>
    </div>
  );
}
