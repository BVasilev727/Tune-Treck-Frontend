import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <label className="relative inline-block w-12 h-6 cursor-pointer">
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        className="sr-only peer"
      />
      <div className="  block w-full h-full
          bg-border rounded-full
          peer-checked:bg-primary
          transition-colors" />
      <div className=" absolute top-0 left-0
          w-6 h-6
          bg-surface rounded-full shadow-md
          peer-checked:left-6
          transition-all" />
    </label>
  )
}