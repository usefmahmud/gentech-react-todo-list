import React, { createContext, useContext, useEffect, useState } from 'react'

interface ThemeContextType {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextType | null>(null)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if(!context){
    throw new Error('Error in Theme Context')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

type THEME = 'dark' | 'light'

const getTheme = (): THEME => {
  const systemPreference = window.matchMedia('(prefers-color-schema: dark').matches ? 'dark' : 'light'
    
  return localStorage.getItem('theme') as THEME || systemPreference
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<THEME>(getTheme())

  const toggleTheme = () => {
    setTheme(curr => curr === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      { children }
    </ThemeContext.Provider>
  )
}
