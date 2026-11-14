import { useTheme } from '../context/ThemeContext'

function ThemeToggle(): React.JSX.Element {
  const { theme, toggleTheme } = useTheme()

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme}>
      {theme === 'hell' ? '🌙 Dunkel' : '☀️ Hell'}
    </button>
  )
}

export default ThemeToggle
