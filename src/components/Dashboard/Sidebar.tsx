import { data, NavLink } from "react-router-dom"
import { IoIosList, IoIosLogOut } from "react-icons/io"
import { IoClose } from "react-icons/io5";
import { FiLayers } from "react-icons/fi"
import { CiLight, CiDark } from "react-icons/ci"

import { useAuth } from "../../context/AuthContext"
import { useTheme } from "../../context/ThemeContext"
import { useTranslation } from "react-i18next"
import useLocale from "../../hooks/useLocale"

interface SidebarProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (value: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  const { logout, user } = useAuth()
  const { theme, setTheme } = useTheme()

  const { t } = useTranslation('translation', {
    keyPrefix: 'sidebar'
  })
  const { locale, setLocale } = useLocale()

  return (
    <div className="h-full w-full bg-secondary-bg shadow-md flex flex-col px-5 py-10 dark:text-white text-black">
      <div className="mb-6 flex justify-between items-center">
        <div className="font-extrabold text-2xl">{t('welcome', {
          name: user?.first_name
        })}</div>
        {
          isSidebarOpen && (
            <div 
              className="block md:hidden cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="text-4xl"><IoClose /></span>
            </div>
          )
        }
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <NavLink 
            to='/'
            onClick={() => setIsSidebarOpen(false)}
            className={({isActive}) => {
              return `${isActive ? 'ltr:pl-6 rtl:pr-6' : ''} flex items-center gap-2 text-[18px] bg-primary-bg px-3 py-2.5 rounded-md transition-scale duration-150 active:scale-98 hover:bg-primary-bg/80 hover:ltr:pl-6 hover:rtl:pr-6`
            }}
          >
            <IoIosList className="text-2xl"/> {t('todos')}
          </NavLink>
        </div>
        <div>
          <NavLink 
            to='/categories'
            onClick={() => setIsSidebarOpen(false)}
            className={({isActive}) => {
              return `${isActive ? 'ltr:pl-6 rtl:pr-6' : ''} flex items-center gap-2 text-[18px] bg-primary-bg px-3 py-2.5 rounded-md transition-scale duration-150 active:scale-98 hover:bg-primary-bg/80 hover:ltr:pl-6 hover:rtl:pr-6`
            }}
          >
            <FiLayers className="text-2xl"/> {t('categories')}
          </NavLink>
        </div>

        <div>
          <button
            onClick={() => {
              logout()
              setIsSidebarOpen(false)
            }}
            className='w-full flex items-center gap-2 text-[18px] bg-primary-bg px-3 py-2.5 rounded-md cursor-pointer transition-scale duration-150 active:scale-98 hover:bg-primary-bg/80'
          >
            <IoIosLogOut className="text-2xl"/> {t('logout')}
          </button>
        </div>
      </div>

      <div className="flex ltr:flex-row-reverse rtl:flex-row justify-center py-5 gap-5">
        <div className="flex ltr:flex-row-reverse rtl:flex-row bg-primary-bg rounded-md font-medium">
          <span 
            className={`flex items-center justify-center p-2 px-2.5 rounded-md cursor-pointer hover:bg-primary-bg/50 ${locale === 'en' ? 'border-border/60 border-1' : ''}`}
            onClick={() => setLocale('en')}
          >En</span>
          <span 
            className={`flex items-center justify-center p-2 px-2.5 rounded-md cursor-pointer hover:bg-primary-bg/50 ${locale === 'ar' ? 'border-1 border-border/60' : ''}`}
            onClick={() => setLocale('ar')}
          >Ar</span>
        </div>
            
        <div className="flex ltr:flex-row-reverse rtl:flex-row bg-primary-bg rounded-md text-2xl">
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