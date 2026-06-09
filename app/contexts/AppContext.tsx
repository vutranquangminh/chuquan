import { createContext, type ReactNode, useContext, useMemo } from 'react';

type AppContextValue = {
  appName: string;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const value = useMemo<AppContextValue>(() => ({ appName: 'chuquan' }), []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return ctx;
}
