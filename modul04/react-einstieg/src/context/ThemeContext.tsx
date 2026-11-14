import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'hell' | 'dunkel'

// Was der Context bereitstellt
interface ThemeContextWert {
  theme: Theme;
  toggleTheme: () => void;
}

const SPEICHER_SCHLUESSEL = 'theme'

const ThemeContext = createContext<ThemeContextWert | undefined>(undefined)

// Gespeichertes Theme aus localStorage laden (Standard: hell)
function ladeGespeichertesTheme(): Theme {
  try {
    const gespeichert = localStorage.getItem(SPEICHER_SCHLUESSEL)
    return gespeichert === 'dunkel' ? 'dunkel' : 'hell'
  } catch {
    // localStorage kann gesperrt sein (z. B. privater Modus)
    return 'hell'
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  // Funktion als Anfangswert: wird nur beim ersten Rendern ausgeführt
  const [theme, setTheme] = useState<Theme>(ladeGespeichertesTheme)

  const toggleTheme = (): void => {
    setTheme(prev => (prev === 'hell' ? 'dunkel' : 'hell'))
  }

  // Bei jeder Änderung: CSS-Klasse auf dem body setzen und Theme speichern
  useEffect(() => {
    document.body.classList.remove('hell', 'dunkel')
    document.body.classList.add(theme)

    try {
      localStorage.setItem(SPEICHER_SCHLUESSEL, theme)
    } catch {
      // Speichern nicht möglich — Theme gilt dann nur bis zum Neuladen
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Eigener Hook, damit Komponenten einfach useTheme() schreiben können
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextWert {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme muss innerhalb von ThemeProvider verwendet werden.')
  }
  return context
}
