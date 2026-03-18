'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { ClassifyPrompt } from './ClassifyPrompt';
import { KeywordsPrompt } from './KeywordsPrompt';
import { SeoMetaPrompt } from './SeoMetaPrompt';
import { SummaryPrompt } from './SummaryPrompt';

export function GenerateContent() {
  return (
    <div>
      <Tabs defaultValue="summary">
        <TabsList className="bg-gray-300">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="classify">Classify</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="seo-meta">SEO Meta</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <SummaryPrompt />
        </TabsContent>
        <TabsContent value="classify">
          <ClassifyPrompt />
        </TabsContent>
        <TabsContent value="keywords">
          <KeywordsPrompt />
        </TabsContent>
        <TabsContent value="seo-meta">
          <SeoMetaPrompt />
        </TabsContent>
      </Tabs>
    </div>
  );
}
