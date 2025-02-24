import { Link } from 'react-router-dom'
import Logo from '../assets/imgs/logo_dark.svg'

const Navbar = () => {
  return (
    <div className="w-full bg-primary-bg py-3 md:py-7">
      <div className="flex px-5 md:px-15 lg:px-25 items-center justify-between">
        <Link to='/' className='flex items-center select-none'>
          <img src={Logo} className='h-7 w-7 md:h-10 md:w-10'/>
          <h1 className='font-extrabold text-2xl ml-3'>Do.it</h1>
        </Link>

        <div className='flex gap-5 items-center'>
          <Link to='/signup' className='font-bold'>
            Signup
          </Link>
          <Link to='/login' className='bg-primary-fg rounded-lg py-2 px-4 font-bold hover:bg-primary-fg/90 transition-background duration-200 shadow-md'>
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar