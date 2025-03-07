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


const App = () => {
  const { isAuthenticated } = useAuth()
  const { theme } = useTheme()

  return (
    <div className={`h-dvh bg-primary-bg text-white font-deca ${theme === 'dark' ? 'dark' : ''}`}> 
      
      <Routes>
        <Route path='/' element={isAuthenticated ? <Home /> : <Landing />}>
          <Route index element={<Todos />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/categories/:id' element={<Todos />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
