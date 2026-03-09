'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { TabsContext, useTabs } from './context';

type ParentTabsProps = {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
};

function ParentTabs({ defaultValue, className = '', children }: ParentTabsProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn('flex gap-4', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

function ParentTabsList({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col w-fit px-0.5 bg-gray-50 rounded-md">{children}</div>;
}

type ParentTabsTriggerProps = {
  value: string;
  children: React.ReactNode;
};

function ParentTabsTrigger({ value, children }: ParentTabsTriggerProps) {
  const { value: active, setValue } = useTabs();

  const isActive = active === value;

  return (
    <button
      onClick={() => setValue(value)}
      className={`text-left px-3 py-2 rounded-md transition ${
        isActive ? 'bg-gray-200 text-foreground' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {children}
    </button>
  );
}

type ParentTabsContentProps = {
  value: string;
  children: React.ReactNode;
};
function ParentTabsContent({ value, children }: ParentTabsContentProps) {
  const { value: active } = useTabs();

  if (active !== value) return null;

  return <div className="flex-1">{children}</div>;
}

export { ParentTabs, ParentTabsList, ParentTabsTrigger, ParentTabsContent };
