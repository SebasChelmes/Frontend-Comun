/**
 * Global app state mirroring the design's component props + state:
 *   props:  accent (color), plan (FREE | PRO | PREMIUM+)
 *   derived: planLabel, showUpgrade (plan === FREE), showLocks (plan !== PREMIUM+)
 * The accent is published as the `--accent` CSS variable so the whole tree
 * re-themes from the tokens, exactly like `--accent: {{ accentColor }}` in the design.
 */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Plan = 'FREE' | 'PRO' | 'PREMIUM+';

/** Marca: índigo (primario) · teal (apoyo) · violeta (handoff/avatares) */
export const ACCENT_OPTIONS = ['#3A3678', '#1C7C7C', '#7C3AED'] as const;
export const PLAN_OPTIONS: Plan[] = ['FREE', 'PRO', 'PREMIUM+'];

interface AppState {
  accent: string;
  plan: Plan;
  planLabel: Plan;
  showUpgrade: boolean;
  showLocks: boolean;
  setAccent: (c: string) => void;
  setPlan: (p: Plan) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [accent, setAccent] = useState<string>(ACCENT_OPTIONS[0]); // índigo de marca
  const [plan, setPlan] = useState<Plan>('FREE');

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
  }, [accent]);

  const value = useMemo<AppState>(
    () => ({
      accent,
      plan,
      planLabel: plan,
      showUpgrade: plan === 'FREE',
      showLocks: plan !== 'PREMIUM+',
      setAccent,
      setPlan,
    }),
    [accent, plan],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within <AppProvider>');
  return ctx;
}
