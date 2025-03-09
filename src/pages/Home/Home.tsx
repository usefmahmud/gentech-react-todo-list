import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Dashboard/Sidebar'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { HomeOutletContextType } from '../../types'

const Home = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if(target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'){
        return
      }

      // key code for 't' key is 84, 'c' key is 67, and 'l' key is 83
      if(e.keyCode === 84){
        navigate('/')
      }else if(e.keyCode === 67){
        navigate('/categories')
      }else if(e.keyCode === 76){
        logout()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className='h-dvh'>
      <div className='flex'>
        <div 
          className={`h-full fixed shadow-md w-full md:max-w-[300px] rtl:md:right-0 ltr:md:left-0 z-[1000] transition-position duration-250 ${isSidebarOpen ? 'ltr:-left-[0px] rtl:-right-[0px]' : 'ltr:-left-full rtl:-right-full'}`}
        >
          <Sidebar 
            isSidebarOpen={isSidebarOpen} 
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
        <div className='h-dvh flex-1 md:ltr:pl-[300px] md:rtl:pr-[300px]'>
          <Outlet context={{isSidebarOpen, setIsSidebarOpen} satisfies HomeOutletContextType} />
        </div>
      </div>
    </div>
  )
}

export default Home