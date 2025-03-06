import { Controller, useForm } from 'react-hook-form'
import { useTodos } from '../../context/TodosContext'
import ComboBox from '../ui/Combobox'
import Input from '../ui/Input'
import { todoSchema } from '../../schemas/todo'
import { yupResolver } from '@hookform/resolvers/yup'

interface NewTodoFormProps {
  onClose: () => void
}

interface NewTodoFormInputs {
  title: string
  description: string
  category: string
}

const NewTodoForm: React.FC<NewTodoFormProps> = ({
  onClose
}) => {
  const { createTodo } = useTodos()
  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<NewTodoFormInputs>({
    resolver: yupResolver(todoSchema)
  })
  return (
    <div className='bg-secondary-bg p-5 rounded-md shadow-lg'>
      <div>
        <h2>New Todo</h2>
      </div>
      <div>
        <form>
          <Controller 
            name='title'
            control={control}
            render={({ field }) => (
              <Input
                type='text'
                placeholder='Title'
                error={!!errors.title}
                errorMessage={errors.title?.message}
                {...field}  
              />
            )}
          />
          <ComboBox />
        </form>
      </div>
    </div>
  )
}

export default NewTodoForm