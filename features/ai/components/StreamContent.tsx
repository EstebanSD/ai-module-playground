'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

export function StreamContent() {
  return (
    <div>
      <Tabs className="w-100" defaultValue="summary" orientation="horizontal">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="classify">Classify</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="seo-meta">SEO Meta</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">Try Summary Stream prompt here.</TabsContent>
        <TabsContent value="classify">Try Classify Stream prompt here.</TabsContent>
        <TabsContent value="keywords">Try Keywords Stream prompt here.</TabsContent>
        <TabsContent value="seo-meta">Try SEO Meta Stream prompt here.</TabsContent>
      </Tabs>
    </div>
  );
}
