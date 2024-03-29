import { Moon, Sun } from '@/components'
import { useState } from 'react'
import style from './theme-toggle.module.css'

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // have local storage take precedence
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      document.body.setAttribute('data-theme', savedTheme)
      return savedTheme as 'light' | 'dark'
    }

    // if not there then check system preference
    const systemPreference = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
    if (systemPreference) {
      document.body.setAttribute('data-theme', 'dark')
      return 'dark'
    }

    document.body.setAttribute('data-theme', 'light')
    return 'light'
  })
  return (
    <div data-cy="themeToggle" className={style.themeToggle}>
      <label
        aria-label="click to toggle light theme"
        data-testid="lightLabel"
        className={style.inputLabel}
      >
        <Sun />
        <input
          data-testid="lightInput"
          type="radio"
          name="theme"
          value="light"
          checked={theme === 'light'}
          onChange={() => {
            document.body.setAttribute('data-theme', 'light')
            localStorage.setItem('theme', 'light')
            setTheme('light')
          }}
        />
      </label>

      <div className={style.toggle} data-light={theme === 'light'}></div>

      <label
        aria-label="click to toggle dark theme"
        data-testid="darkLabel"
        className={style.inputLabel}
      >
        <Moon />
        <input
          data-testid="darkInput"
          type="radio"
          name="theme"
          value="dark"
          checked={theme === 'dark'}
          onChange={() => {
            document.body.setAttribute('data-theme', 'dark')
            localStorage.setItem('theme', 'dark')
            setTheme('dark')
          }}
        />
      </label>
    </div>
  )
}
