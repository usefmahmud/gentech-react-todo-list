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


const App = () => {
  const { isAuthenticated } = useAuth()
  const { theme } = useTheme()
  const checkAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    checkAudioRef.current = new Audio('/click-sound.wav')
    checkAudioRef.current.load()
  }, [])

  return (
    <div className={`h-dvh bg-primary-bg dark:text-white font-deca ${theme === 'dark' ? 'dark' : ''}`}> 
      
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
