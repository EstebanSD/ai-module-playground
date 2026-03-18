'use client';

import { useState } from 'react';
import { generateClassifyAI } from '../api/ai.api';

export function useGenerateClassify() {
  const [loading, setLoading] = useState(false);

  async function generate(text: string, categories: string[]) {
    setLoading(true);

    try {
      return await generateClassifyAI(text, categories);
    } finally {
      setLoading(false);
    }
  }

  return { generate, loading };
}
