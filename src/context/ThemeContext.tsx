import React, { createContext, useContext, useEffect, useState } from 'react'

interface ThemeContextType {
  theme: 'dark' | 'light'
  setTheme: (theme: THEME) => void
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
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark').matches ? 'dark' : 'light'
    
  return localStorage.getItem('theme') as THEME || systemPreference
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme_] = useState<THEME>(getTheme())

  const setTheme = (theme: THEME) => {
    setTheme_(theme)
  }

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      { children }
    </ThemeContext.Provider>
  )
}
