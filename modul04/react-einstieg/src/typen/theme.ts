export type Theme = 'hell' | 'dunkel';

// Was der ThemeContext bereitstellt
export interface ThemeContextWert {
  theme: Theme;
  toggleTheme: () => void;
}
