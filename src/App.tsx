import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'

import NotFound from './pages/NotFound'
import Landing from './pages/Landing'
import { useAuth } from './context/AuthContext'

const App = () => {
  const { isAuthenticated, user } = useAuth()
  
  return (
    <div className='h-dvh bg-primary-bg text-white font-deca'>
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
