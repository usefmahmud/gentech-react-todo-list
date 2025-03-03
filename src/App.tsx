import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'

import NotFound from './pages/NotFound'
import Landing from './pages/Landing'
import { useAuth } from './context/AuthContext'
import { useEffect } from 'react'

const App = () => {
  const { isAuthenticated, user } = useAuth()
  useEffect(() => {
    console.log(isAuthenticated)
  }, [])
  return (
    <div className='h-dvh bg-primary-bg text-white font-deca'>
      { user?.id }
      <br />
      {isAuthenticated ? 'y' : 'n'}
      <Routes>
        <Route path='/' element={isAuthenticated ? <Home /> : <Landing />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
