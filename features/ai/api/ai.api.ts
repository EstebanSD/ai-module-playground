import { apiFetch } from '@/lib/api-client';
import type { AITextResponse } from '@/types/api-response';

export function generateSummaryAI(content: string): Promise<AITextResponse> {
  return apiFetch('/ai/summary', {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
}

export function generateClassifyAI(content: string, categories: string[]): Promise<AITextResponse> {
  return apiFetch('/ai/classify', {
    method: 'POST',
    body: JSON.stringify({ content, categories }),
  });
}

export function generateKeywordsAI(content: string, limit: number): Promise<AITextResponse> {
  return apiFetch('/ai/keywords', {
    method: 'POST',
    body: JSON.stringify({ content, limit }),
  });
}

export function generateSeoMetaAI(content: string): Promise<AITextResponse> {
  return apiFetch('/ai/seo-meta', {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
}
