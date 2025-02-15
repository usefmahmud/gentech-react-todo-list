import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div className='h-dvh w-dvw bg-gunmetal'>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
