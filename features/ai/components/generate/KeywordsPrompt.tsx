'use client';

import * as z from 'zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AITextState } from '@/types/ai-request';
import { DEFAULT_TEXT } from '@/constants/prompts';
import { Button, Card, CardContent } from '@/components/ui';
import { FormInput, FormTextArea } from '@/components/common';
import { useGenerateKeywords } from '../../hooks/use-generate-keywords';
import { AIResultCard } from '../AIResultCard';
import { AIErrorCard } from '../AIErrorCard';

const formSchema = z.object({
  text: z.string().min(1, 'This field is required.'),
  limit: z.coerce
    .number({ error: 'Must be a number.' })
    .int({ error: 'Must be an integer.' })
    .positive({ error: 'Must be a positive number.' })
    .max(20, { error: 'Must be 20 or less.' }),
});

type FormInput = z.input<typeof formSchema>;
type FormOutput = z.infer<typeof formSchema>;

export function KeywordsPrompt() {
  const [state, setState] = useState<AITextState>({ status: 'idle' });
  const { generate, loading } = useGenerateKeywords();

  const form = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: DEFAULT_TEXT,
      limit: 5,
    },
  });

  async function onSubmit(values: FormOutput) {
    setState({ status: 'loading' });

    try {
      const res = await generate(values.text, values.limit);

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
        Extracts the most relevant keywords from a piece of content. The prompt expects plain text
        and returns a comma-separated list of keywords optimized for SEO usage.
      </blockquote>
      <p className="text-xs text-muted-foreground">
        Input: text and keyword limit. Output: comma-separated keyword list.
      </p>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput name="limit" label="Limit" className="w-32" />
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
