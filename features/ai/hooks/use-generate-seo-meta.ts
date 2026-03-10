'use client';

import { useState } from 'react';
import { generateSeoMetaAI } from '../api/ai.api';

export function useGenerateSeoMeta() {
  const [loading, setLoading] = useState(false);

  async function generate(text: string) {
    setLoading(true);

    try {
      return await generateSeoMetaAI(text);
    } finally {
      setLoading(false);
    }
  }

  return { generate, loading };
}
