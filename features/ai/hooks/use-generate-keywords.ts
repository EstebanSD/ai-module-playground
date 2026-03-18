'use client';

import { useState } from 'react';
import { generateKeywordsAI } from '../api/ai.api';

export function useGenerateKeywords() {
  const [loading, setLoading] = useState(false);

  async function generate(text: string, limit: number) {
    setLoading(true);

    try {
      return await generateKeywordsAI(text, limit);
    } finally {
      setLoading(false);
    }
  }

  return { generate, loading };
}
