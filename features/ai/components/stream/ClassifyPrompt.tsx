'use client';

import * as z from 'zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_CLASSIFY_CATEGORIES, DEFAULT_TEXT } from '@/constants/prompts';
import { Button, Card, CardContent, CardHeader, CardTitle, Separator } from '@/components/ui';
import { FormInput, FormTextArea } from '@/components/common';
import type { AIStreamState } from '@/types/ai-request';
import { useStreamClassify } from '../../hooks/use-stream-classify';
import { AIErrorCard } from '../AIErrorCard';
import { PromptDescription } from '../PromptDescription';

const formSchema = z.object({
  content: z.string().min(1, 'This field is required.'),
  categories: z.string().min(1, 'This field is required.'),
});

type FormSchema = z.infer<typeof formSchema>;

export function ClassifyPrompt() {
  const [state, setState] = useState<AIStreamState>({ status: 'idle' });
  const { stream, cancel } = useStreamClassify();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: DEFAULT_TEXT,
      categories: DEFAULT_CLASSIFY_CATEGORIES,
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
        desc="Classifies the text into one of the provided categories using a streaming response."
        inout="Input: text and a list of categories. Output: the most relevant category."
      />

      <Card>
        <CardContent className="space-y-4 pt-6">
          <FormProvider {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormInput name="categories" label="Categories" />

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
