import { apiFetch } from '@/lib/api-client';

export function getAIMetrics() {
  return apiFetch('/api/ai/metrics');
}
