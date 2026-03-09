import {
  ParentTabs,
  ParentTabsContent,
  ParentTabsList,
  ParentTabsTrigger,
} from '@/components/common';
import { GenerateContent } from '@/features/ai/components/GenerateContent';
import { StreamContent } from '@/features/ai/components/StreamContent';

const VALUES = {
  stream: 'stream',
  generate: 'generate',
};
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="min-h-screen w-full max-w-5xl px-16 bg-white">
        <ParentTabs className="w-100" defaultValue={VALUES.stream}>
          <ParentTabsList>
            <ParentTabsTrigger value={VALUES.stream}>
              <span>Stream</span>
            </ParentTabsTrigger>

            <ParentTabsTrigger value={VALUES.generate}>
              <span>Generate</span>
            </ParentTabsTrigger>
          </ParentTabsList>

          <ParentTabsContent value={VALUES.stream}>
            <StreamContent />
          </ParentTabsContent>

          <ParentTabsContent value={VALUES.generate}>
            <GenerateContent />
          </ParentTabsContent>
        </ParentTabs>
      </main>
    </div>
  );
}
