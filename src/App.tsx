import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Todos from './pages/Home/Todos'
import Categories from './pages/Home/Categories'

import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'

import NotFound from './pages/NotFound'
import Landing from './pages/Landing'
import { useAuth } from './context/AuthContext'


const App = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className='h-dvh bg-primary-bg text-white font-deca'>
      
      <Routes>
        <Route path='/' element={isAuthenticated ? <Home /> : <Landing />}>
          <Route index element={<Todos />} />
          <Route path='/categories' element={<Categories />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
