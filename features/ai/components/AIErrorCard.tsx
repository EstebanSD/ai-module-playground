import type { AITextState } from '@/types/ai-request';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

type Props = {
  state: AITextState;
};

export function AIErrorCard({ state }: Props) {
  if (state.status !== 'error') return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Error</CardTitle>
      </CardHeader>

      <CardContent>
        <p>{state.message}</p>
      </CardContent>
    </Card>
  );
}
