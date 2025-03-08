import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../components/ui/Input'
import { signupFormSchema } from '../../schemas/auth'
import { useAuth } from '../../context/AuthContext'
import { Link, Navigate } from 'react-router-dom'
import { CgSpinnerTwo } from 'react-icons/cg'
import { useTranslation } from 'react-i18next'

type IFormInputs = {
  first_name: string
  last_name: string
  email: string
  password: string
  c_password: string
}

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<IFormInputs>({
    resolver: yupResolver(signupFormSchema)
  })

  const { register, isAuthenticated } = useAuth()
  const { t } = useTranslation('translation', {
    keyPrefix: 'auth.signup'
  })

  const onSubmit = async (data: IFormInputs) => {
    const { c_password, ...registerFields } = data
    return register(registerFields)
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="flex flex-col py-10 px-6 sm:px-10 rounded-lg shadow-md bg-secondary-bg w-full max-w-md md:max-w-fit">
        <div className="pb-5 text-center">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className='mb-5 md:flex gap-5'>
            <div className='mb-5 md:mb-0'>
              <label className='block mb-2 font-medium'>{t('first_name')}</label>
              <Controller 
                control={control}
                name='first_name'
                render={({field}) => (
                  <Input 
                    {...field}
                    type='text'
                    placeholder={t('first_name')}

                    error={!!errors.first_name}
                    errorMessage={errors.first_name?.message}
                  />
                )}
              />
            </div>
            <div>
              <label className='block mb-2 font-medium'>{t('last_name')}</label>
              <Controller 
                control={control}
                name='last_name'
                render={({field}) => (
                  <Input 
                    {...field}
                    type='text'
                    placeholder={t('last_name')}

                    error={!!errors.last_name}
                    errorMessage={errors.last_name?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className='mb-5'>
            <label className='block mb-2 font-medium'>{t('email')}</label>
            <Controller 
              control={control}
              name='email'
              render={({field}) => (
                <Input 
                  {...field}
                  type='email'
                  placeholder={t('enter_your_email')} 

                  error={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              )}
            />
          </div>

          <div className='mb-5'>
            <label className='block mb-2 font-medium'>{t('password')}</label>
            <Controller 
              control={control}
              name='password'
              render={({field}) => (
                <Input 
                  {...field}
                  type='password'
                  placeholder={t('enter_your_password')}

                  error={!!errors.password}
                  errorMessage={errors.password?.message}
                />
              )}
            />
          </div>

          <div className='mb-5'>
            <Controller 
              control={control}
              name='c_password'
              render={({field}) => (
                <Input 
                  {...field}
                  type='password'
                  placeholder={t('enter_your_password_again')}

                  error={!!errors.c_password}
                  errorMessage={errors.c_password?.message}
                />
              )}
            />
          </div>

          <div className=''>
            <button 
              className='w-full bg-primary-fg flex justify-center items-center gap-2 cursor-pointer py-2.5 text-lg font-medium shadow-lg rounded-lg active:scale-98 disabled:cursor-not-allowed disabled:active:scale-100 disabled:shadow-none disabled:bg-[]'
              disabled={!!isSubmitting}
            >
              {t('submit')}
              { isSubmitting && <CgSpinnerTwo className='animate-spin text-xl' /> }
            </button>
          </div>
        </form>
        <div className='pt-3'>
          <p>{t('have_an_account')} <Link to='/login' className='font-bold text-primary-fg'>{t('login')}</Link> </p>
        </div>
      </div>
    </div>
  )
}

export default Signup