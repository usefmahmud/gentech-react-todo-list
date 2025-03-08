import { Controller, useForm } from 'react-hook-form'
import { useTodos } from '../../context/TodosContext'
import ComboBox from '../ui/Combobox'
import Input from '../ui/Input'
import { todoSchema } from '../../schemas/todo'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

interface NewTodoFormProps {
  onClose: () => void
}

interface NewTodoFormInputs {
  title: string
  description?: string
  category: string
}

const NewTodoForm: React.FC<NewTodoFormProps> = ({
  onClose
}) => {
  const { createTodo } = useTodos()
  const {
    control,
    handleSubmit,
    setFocus,
    formState: {
      errors
    }
  } = useForm<NewTodoFormInputs>({
    resolver: yupResolver(todoSchema)
  })

  const { t } = useTranslation('translation', {
    keyPrefix: 'todos.form'
  })

  const onSubmit = async (data: NewTodoFormInputs) => {
    const responseStatus = await createTodo(data)
    if(responseStatus) {
      onClose()
    }
  }

  useEffect(() => {
    setFocus('title')
  }, [])

  return (
    <div className='bg-secondary-bg p-7 rounded-md shadow-lg w-full max-w-lg'>
      <div className='flex justify-center mb-4'>
        <h2 className='text-2xl font-bold'>New Todo</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-5'>
            <div>
              <Controller 
                name='title'
                control={control}
                render={({ field }) => (
                  <Input
                    type='text'
                    placeholder={t('title')}
                    error={!!errors.title}
                    errorMessage={errors.title?.message}
                    {...field}  
                  />
                )}
              />
            </div>

            <div>
              <Controller 
                name='description'
                control={control}
                render={({ field }) => (
                  <Input
                    type='textarea'
                    placeholder={t('description')}
                    error={!!errors.description}
                    errorMessage={errors.description?.message}
                    {...field} 
                  />
                )}
              />
            </div>

            <div>
              <Controller 
                name='category'
                control={control}
                render={({ field }) => <ComboBox {...field} />}
              />

              {
                errors.category && (
                  <span className="text-[14px] text-red-400 pl-3">{errors.category?.message}</span>
                )
              }
            </div>

            <div className='flex justify-center'>
              <button className='bg-primary-fg text-xl py-2 rounded-md w-[60%] cursor-pointer active:scale-98 duration-100'>
                {t('submit')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewTodoForm