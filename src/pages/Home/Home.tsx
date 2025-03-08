import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Dashboard/Sidebar'

const Home = () => {
  return (
    <div className='h-dvh'>
      <div className='flex'>
        <div className='h-full fixed -right-[300px] md:right-0 z-[1000]'>
          <Sidebar />
        </div>
        <div className='h-dvh flex-1 md:ltr:pl-[300px] md:rtl:pr-[300px]'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Home