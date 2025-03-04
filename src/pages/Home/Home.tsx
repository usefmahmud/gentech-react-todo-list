import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Dashboard/Sidebar'

const Home = () => {
  return (
    <div className='h-dvh'>
      <div className='h-full flex'>
        <div className='h-full'>
          <Sidebar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Home