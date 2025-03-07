import { data, NavLink } from "react-router-dom"
import { IoIosList, IoIosLogOut } from "react-icons/io"
import { FiLayers } from "react-icons/fi"
import { CiLight, CiDark } from "react-icons/ci"

import { useAuth } from "../../context/AuthContext"
import { useTheme } from "../../context/ThemeContext"

const Sidebar = () => {
  const { logout, user } = useAuth()
  const { theme, setTheme } = useTheme()

  return (
    <div className="h-full w-[300px] bg-secondary-bg shadow-md flex flex-col px-5 py-10 dark:text-white text-black">
      <div className="mb-6">
        <div className="font-extrabold text-2xl">Hi, {user?.first_name}</div>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <NavLink 
            to='/'
            className={({isActive}) => {
              return `${isActive ? 'pl-6' : ''} flex items-center gap-2 text-[18px] bg-primary-bg px-3 py-2.5 rounded-md transition-scale duration-150 active:scale-98 hover:bg-primary-bg/80 hover:pl-6`
            }}
          >
            <IoIosList className="text-2xl"/> Todos
          </NavLink>
        </div>
        <div>
          <NavLink 
            to='/categories'
            className={({isActive}) => {
              return `${isActive ? 'pl-6' : ''} flex items-center gap-2 text-[18px] bg-primary-bg px-3 py-2.5 rounded-md transition-scale duration-150 active:scale-98 hover:bg-primary-bg/80 hover:pl-6`
            }}
          >
            <FiLayers className="text-2xl"/> Categories
          </NavLink>
        </div>

        <div>
          <button
            onClick={logout}
            className='w-full flex items-center gap-2 text-[18px] bg-primary-bg px-3 py-2.5 rounded-md cursor-pointer transition-scale duration-150 active:scale-98 hover:bg-primary-bg/80'
          >
            <IoIosLogOut className="text-2xl"/> Logout
          </button>
        </div>
      </div>

      <div className="flex justify-center py-5">
        <div className="flex bg-primary-bg rounded-md text-2xl">
          <span 
            className={`flex items-center justify-center p-2 pl-2.5 rounded-md cursor-pointer hover:bg-primary-bg/50 ${theme === 'dark' ? 'border-border/60 border-1' : ''}`}
            onClick={() => setTheme('dark')}
          ><CiDark /></span>
          <span 
            className={`flex items-center justify-center p-2 pr-2.5 rounded-md cursor-pointer hover:bg-primary-bg/50 ${theme === 'light' ? 'border-1 border-border/60' : ''}`}
            onClick={() => setTheme('light')}
          ><CiLight /></span>
        </div>
      </div>

      <div className="mt-auto flex justify-center">
        <div className="dark:text-white/50 text-black/50 text-[14px] mt-auto select-none">
          &copy; {new Date().getFullYear()} Todos App
        </div>
      </div>
    </div>
  )
}

export default Sidebar