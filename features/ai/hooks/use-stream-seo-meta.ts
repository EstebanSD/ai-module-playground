'use client';

import { useRef } from 'react';
import type { AIStreamChunk } from '@/types/ai-request';
import { buildSSEUrl } from '@/lib/build-see-url';

export function useStreamSeoMeta() {
  const sourceRef = useRef<EventSource | null>(null);
  const completedRef = useRef(false);

  function stream(
    content: string,
    onChunk: (delta: string) => void,
    onDone: () => void,
    onError: (error: Error) => void,
  ) {
    completedRef.current = false;
    const url = buildSSEUrl('/ai/seo-meta/stream', {
      content,
    });

    const source = new EventSource(url);
    sourceRef.current = source;

    source.addEventListener('delta', (event: MessageEvent) => {
      const chunk: AIStreamChunk = JSON.parse(event.data);

      if (chunk.delta) {
        onChunk(chunk.delta);
      }
    });

    source.addEventListener('done', () => {
      completedRef.current = true;
      source.close();
      onDone();
    });

    source.onerror = () => {
      source.close();
      if (!completedRef.current) {
        onError(new Error('Stream connection error'));
      }
    };
  }

  function cancel() {
    completedRef.current = true;
    sourceRef.current?.close();
  }

  return { stream, cancel };
}
