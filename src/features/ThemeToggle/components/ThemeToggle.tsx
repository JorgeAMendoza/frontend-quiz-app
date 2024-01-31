import { useState } from 'react'

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // have local storage take precedence
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme as 'light' | 'dark'
    }

    // if not there then check system preference
    const systemPreference = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
    if (systemPreference) return 'dark'

    return 'light'
  })
  return (
    <div data-cy="themeToggle">
      <label aria-label="click to toggle light theme" data-testid="lightLabel">
        <input
          data-testid="lightInput"
          type="radio"
          name="theme"
          value="light"
          checked={theme === 'light'}
          onChange={() => {
            setTheme('light')
          }}
        />
      </label>

      <label aria-label="click to toggle dark theme" data-testid="darkLabel">
        <input
          data-testid="darkInput"
          type="radio"
          name="theme"
          value="dark"
          checked={theme === 'dark'}
          onChange={() => {
            setTheme('dark')
          }}
        />
      </label>
    </div>
  )
}
