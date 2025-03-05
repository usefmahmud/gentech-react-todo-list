import { NavLink } from "react-router-dom"
import { IoIosList, IoIosLogOut } from "react-icons/io"
import { FiLayers } from "react-icons/fi"

import { useAuth } from "../../context/AuthContext"

const Sidebar = () => {
  const { logout, user } = useAuth()
  return (
    <div className="h-full w-[300px] bg-secondary-bg shadow-md flex flex-col px-5 py-10">
      <div className="mb-6">
        <div className="font-extrabold text-2xl">Hi, {user?.first_name}</div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="">
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
    </div>
  )
}

export default Sidebar