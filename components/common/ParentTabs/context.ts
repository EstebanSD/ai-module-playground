import { createContext, useContext } from 'react';

type TabsContextType = {
  value: string;
  setValue: (v: string) => void;
};

export const TabsContext = createContext<TabsContextType | null>(null);

export function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('ParentTabs components must be used inside ParentTabs');
  return ctx;
}
