import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

import Login from './pages/Login'

import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div className='h-dvh bg-primary-bg text-white font-deca'>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path='/login' element={<Login />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
