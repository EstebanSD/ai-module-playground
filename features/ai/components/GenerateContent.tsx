'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

export function GenerateContent() {
  return (
    <div>
      <Tabs defaultValue="summary">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="classify">Classify</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="seo-meta">SEO Meta</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">Try Summary prompt here.</TabsContent>
        <TabsContent value="classify">Try Classify prompt here.</TabsContent>
        <TabsContent value="keywords">Try Keywords prompt here.</TabsContent>
        <TabsContent value="seo-meta">Try SEO Meta prompt here.</TabsContent>
      </Tabs>
    </div>
  );
}
