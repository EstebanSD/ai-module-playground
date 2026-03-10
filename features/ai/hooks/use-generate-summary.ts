'use client';

import { useState } from 'react';
import { generateSummaryAI } from '../api/ai.api';

export function useGenerateSummary() {
  const [loading, setLoading] = useState(false);

  async function generate(text: string) {
    setLoading(true);

    try {
      return await generateSummaryAI(text);
    } finally {
      setLoading(false);
    }
  }

  return { generate, loading };
}
