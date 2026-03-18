import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { GenerateContent } from '@/features/ai/components/generate/GenerateContent';
import { StreamContent } from '@/features/ai/components/stream/StreamContent';

const VALUES = {
  stream: 'stream',
  generate: 'generate',
};
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-300 font-sans">
      <main className="min-h-screen w-full max-w-3xl py-4 px-4 md:px-10 lg:px-16 bg-gray-50">
        <Tabs defaultValue={VALUES.stream}>
          <TabsList className="bg-gray-300">
            <TabsTrigger value={VALUES.stream}>Stream</TabsTrigger>
            <TabsTrigger value={VALUES.generate}>Generate</TabsTrigger>
          </TabsList>

          <TabsContent value={VALUES.stream}>
            <StreamContent />
          </TabsContent>
          <TabsContent value={VALUES.generate}>
            <GenerateContent />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
