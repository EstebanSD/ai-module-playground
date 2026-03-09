import { apiFetch } from '@/lib/api-client';

export function generateAI(prompt: string) {
  return apiFetch('/api/ai', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  });
}
