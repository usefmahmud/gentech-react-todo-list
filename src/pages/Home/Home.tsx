import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Dashboard/Sidebar'

const Home = () => {
  return (
    <div className='h-dvh'>
      <div className='flex'>
        <div className='h-full fixed'>
          <Sidebar />
        </div>
        <div className='h-dvh flex-1 ltr:pl-[300px] rtl:pr-[300px]'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Home