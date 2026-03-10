'use client';

import * as z from 'zod';
import { useState } from 'react';
import type { AITextState } from '@/types/ai-request';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_CLASSIFY_CATEGORIES, DEFAULT_TEXT } from '@/constants/prompts';
import { Button, Card, CardContent } from '@/components/ui';
import { FormInput, FormTextArea } from '@/components/common';
import { useGenerateClassify } from '../../hooks/use-generate-classify';
import { AIErrorCard } from '../AIErrorCard';
import { AIResultCard } from '../AIResultCard';

const formSchema = z.object({
  text: z.string().min(1, 'This field is required.'),
  categories: z.string().min(1, 'This field is required.'),
});

type FormSchema = z.infer<typeof formSchema>;

function parseCommaList(value: string): string[] {
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

export function ClassifyPrompt() {
  const [state, setState] = useState<AITextState>({ status: 'idle' });
  const { generate, loading } = useGenerateClassify();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: DEFAULT_TEXT,
      categories: DEFAULT_CLASSIFY_CATEGORIES,
    },
  });

  async function onSubmit(values: FormSchema) {
    setState({ status: 'loading' });

    try {
      const categories = parseCommaList(values.categories);
      const res = await generate(values.text, categories);

      setState({
        status: 'success',
        response: res.text,
        metrics: {
          provider: res.provider,
          model: res.model,
          usage: res.usage,
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';

      setState({ status: 'error', message });
    }
  }

  return (
    <div className="p-4 grid grid-cols-1 gap-4">
      <blockquote className="border-l-4 pl-4 text-sm text-muted-foreground">
        Classifies the text into one of the provided categories.
      </blockquote>
      <p className="text-xs text-muted-foreground">
        Input: text and a list of categories. Output: the most relevant category.
      </p>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput name="categories" label="Categories" />

              <FormTextArea name="text" label="Text" rows={4} maxLength={2000} />

              <div className="flex justify-end">
                <Button type="submit" disabled={loading || !form.formState.isValid}>
                  {loading ? 'Generating...' : 'Generate'}
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>

      <AIResultCard state={state} />

      <AIErrorCard state={state} />
    </div>
  );
}
