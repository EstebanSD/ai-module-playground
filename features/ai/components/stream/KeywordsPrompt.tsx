'use client';

import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import type { AIStreamState } from '@/types/ai-request';
import { FormInput, FormTextArea } from '@/components/common';
import { Button, Card, CardContent, CardHeader, CardTitle, Separator } from '@/components/ui';
import { DEFAULT_TEXT } from '@/constants/prompts';
import { useStreamKeywords } from '../../hooks/use-stream-keywords';
import { AIErrorCard } from '../AIErrorCard';
import { PromptDescription } from '../PromptDescription';

const formSchema = z.object({
  content: z.string().min(1, 'This field is required.'),
  limit: z.coerce
    .string()
    .regex(/^\d+$/, 'Must be a numeric value.')
    .refine((v) => Number(v) > 0, 'Must be a positive number.')
    .refine((v) => Number(v) <= 20, 'Must be 20 or less.'),
});

type FormInput = z.input<typeof formSchema>;
type FormOutput = z.infer<typeof formSchema>;

export function KeywordsPrompt() {
  const [state, setState] = useState<AIStreamState>({ status: 'idle' });
  const { stream, cancel } = useStreamKeywords();

  const form = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: DEFAULT_TEXT,
      limit: 5,
    },
  });

  function handleCancel() {
    cancel();
    setState((prev) =>
      prev.status === 'streaming' ? { status: 'stopped', response: prev.response } : prev,
    );
  }

  const onSubmit = form.handleSubmit((values) => {
    setState({ status: 'streaming', response: '' });

    stream(
      values,

      (delta) => {
        setState((prev) =>
          prev.status === 'streaming' ? { ...prev, response: prev.response + delta } : prev,
        );
      },

      () => {
        setState((prev) =>
          prev.status === 'streaming' ? { status: 'success', response: prev.response } : prev,
        );
      },

      (err) => {
        setState((prev) =>
          prev.status === 'streaming' ? { status: 'error', message: err.message } : prev,
        );
      },
    );
  });

  const hasResponse = state.status === 'success' || state.status === 'stopped';

  return (
    <div className="p-4 grid grid-cols-1 gap-4">
      <PromptDescription
        desc="Extracts the most relevant keywords from the text using streaming generation."
        inout="Input: text and keyword limit. Output: comma-separated keyword list."
      />

      <Card>
        <CardContent className="space-y-4 pt-6">
          <FormProvider {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormInput name="limit" label="Limit" className="w-32" />

              <FormTextArea name="content" label="Text" rows={4} maxLength={2000} />

              <div className="mt-2 flex justify-end gap-4">
                {state.status === 'streaming' && (
                  <Button type="button" variant={'destructive'} onClick={handleCancel}>
                    Stop
                  </Button>
                )}

                <Button type="submit" disabled={state.status === 'streaming'}>
                  Send
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent>
          {state.status === 'streaming' && (
            <pre className="text-sm whitespace-pre-wrap">
              {state.response}
              <span className="animate-pulse">▍</span>
            </pre>
          )}

          {hasResponse && (
            <>
              <div className="mb-2">
                <h3>Response</h3>
                <Separator />
              </div>
              <pre className="text-sm whitespace-pre-wrap">{state.response}</pre>
            </>
          )}
        </CardContent>
      </Card>

      <AIErrorCard state={state} />
    </div>
  );
}
