import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../components/ui/Input'
import { loginFormSchema } from '../../schemas/auth'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { CgSpinnerTwo } from 'react-icons/cg'

type IFormInputs = {
  email: string,
  password: string
}

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<IFormInputs>({
    resolver: yupResolver(loginFormSchema)
  })

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true); // Track initialization state

  useEffect(() => {
    // Simulate checking authentication status
    setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust delay based on real authentication check time
  }, []);

  const onSubmit = async (data: IFormInputs) => {
    return await login(data)
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <CgSpinnerTwo className="animate-spin text-4xl" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="flex flex-col py-10 px-6 sm:px-10 rounded-lg shadow-md bg-secondary-bg w-full max-w-md">
        <div className="pb-5 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-5'>
            <label className='block mb-2 font-medium'>Email</label>
            <Controller 
              control={control}
              name='email'
              render={({field}) => (
                <Input 
                  {...field}
                  type='email'
                  placeholder='Enter your email'

                  error={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              )}
            />
          </div>

          <div className='mb-5'>
            <label className='block mb-2 font-medium'>Password</label>
            <Controller 
              control={control}
              name='password'
              render={({field}) => (
                <Input 
                  {...field}
                  type='password'
                  placeholder='Enter your password'

                  error={!!errors.password}
                  errorMessage={errors.password?.message}
                />
              )}
            />
          </div>

          <div className=''>
            <button 
              className='w-full bg-primary-fg flex justify-center items-center cursor-pointer py-2.5 text-lg font-medium shadow-lg rounded-lg active:scale-98 disabled:cursor-not-allowed disabled:active:scale-100 disabled:shadow-none disabled:bg-[]'
              disabled={!!isSubmitting}
            >
              Login
              { isSubmitting && <CgSpinnerTwo className='animate-spin ml-2 text-xl' /> }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login