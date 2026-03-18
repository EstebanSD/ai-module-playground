'use client';

import * as z from 'zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_TEXT } from '@/constants/prompts';
import type { AIStreamState } from '@/types/ai-request';
import { FormTextArea } from '@/components/common';
import { Button, Card, CardContent, CardHeader, CardTitle, Separator } from '@/components/ui';
import { useStreamSummary } from '../../hooks/use-stream-summary';
import { AIErrorCard } from '../AIErrorCard';
import { PromptDescription } from '../PromptDescription';

const formSchema = z.object({
  text: z.string().min(1, 'This field is required.'),
});

type FormSchema = z.infer<typeof formSchema>;

export function SummaryPrompt() {
  const [state, setState] = useState<AIStreamState>({ status: 'idle' });
  const { stream, cancel } = useStreamSummary();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: DEFAULT_TEXT,
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
      values.text,

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
        desc="Generates a short summary of the provided text using streaming generation."
        inout="Input: plain text. Output: five concise bullet points summarizing the main ideas."
      />

      <Card>
        <CardContent className="space-y-4 pt-6">
          <FormProvider {...form}>
            <form onSubmit={onSubmit}>
              <FormTextArea name="text" label="Text" rows={4} maxLength={2000} />

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
