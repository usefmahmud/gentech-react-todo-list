import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'

import NotFound from './pages/NotFound'
import Landing from './pages/Landing'

const App = () => {
  const isAuthenticated = false
  
  return (
    <div className='h-dvh bg-primary-bg text-white font-deca'>
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
