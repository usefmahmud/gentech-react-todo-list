import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Todos from './pages/Home/Todos'
import Categories from './pages/Home/Categories'

import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'

import NotFound from './pages/NotFound'
import Landing from './pages/Landing'
import { useAuth } from './context/AuthContext'
import { useTheme } from './context/ThemeContext'
import { useEffect, useRef } from 'react'
import useLocale from './hooks/useLocale'
import i18next from 'i18next'


const App = () => {
  const { isAuthenticated } = useAuth()
  const { theme } = useTheme()
  const checkAudioRef = useRef<HTMLAudioElement | null>(null)

  const { locale } = useLocale()

  useEffect(() => {
    checkAudioRef.current = new Audio('/click-sound.wav')
    checkAudioRef.current.load()
  }, [])

  useEffect(() => {
    i18next.changeLanguage(locale)
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  }, [])

  return (
    <div className={`h-dvh bg-primary-bg dark:text-white font-readex ${theme === 'dark' ? 'dark' : ''}`}> 
      
      <Routes>
        <Route path='/' element={isAuthenticated ? <Home /> : <Landing />}>
          <Route index element={<Todos sound={checkAudioRef} />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/categories/:id' element={<Todos sound={checkAudioRef} />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
