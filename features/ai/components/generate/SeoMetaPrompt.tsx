'use client';

import * as z from 'zod';
import { useState } from 'react';
import type { AITextState } from '@/types/ai-request';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_TEXT } from '@/constants/prompts';
import { Button, Card, CardContent } from '@/components/ui';
import { FormTextArea } from '@/components/common';
import { useGenerateSeoMeta } from '../../hooks/use-generate-seo-meta';
import { AIResultCard } from '../AIResultCard';
import { AIErrorCard } from '../AIErrorCard';
import { PromptDescription } from '../PromptDescription';

const formSchema = z.object({
  text: z.string().min(1, 'This field is required.'),
});

type FormSchema = z.infer<typeof formSchema>;

export function SeoMetaPrompt() {
  const [state, setState] = useState<AITextState>({ status: 'idle' });
  const { generate, loading } = useGenerateSeoMeta();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: DEFAULT_TEXT,
    },
  });

  async function onSubmit(values: FormSchema) {
    setState({ status: 'loading' });

    try {
      const res = await generate(values.text);

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
      <PromptDescription
        desc="Generates SEO metadata from the text: title, description, and keywords."
        inout="Output includes a title (≤60 chars), description (≤160 chars), and five SEO keywords."
      />

      <Card>
        <CardContent className="space-y-4 pt-6">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormTextArea name="text" label="Text" rows={4} maxLength={2000} />

              <div className="mt-2 flex justify-end">
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
