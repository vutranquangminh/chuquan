/**
 * Custom theme overrides layered on top of @aic-kits/react's `getTheme()`.
 * opilot-pm keeps per-brand themes here (e.g. `bxv.theme.ts`).
 */
export const theme = {
  colors: {
    primary: 'hsl(222.2 47.4% 11.2%)',
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 84% 4.9%)',
  },
  radius: '0.5rem',
};

export type AppTheme = typeof theme;
