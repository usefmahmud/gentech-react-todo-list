import { useEffect, useState } from "react"
import Checkbox from "../ui/Checkbox"
import { Todo } from "../../types"
import { Link } from "react-router-dom"
import { useTodos } from "../../context/TodosContext"

const TodoCard: React.FC<{ 
  todo: Todo,
  deleteTodo: (id: string) => void
}> = ({
  todo,
  deleteTodo
}) => {
  const [isChecked, setIsChecked_] = useState(false)
  const { completeTodo } = useTodos()

  useEffect(() => {
    setIsChecked_(todo.is_completed)
  }, [todo.is_completed])

  const setIsChecked = (isChecked: boolean) => {
    setIsChecked_(isChecked)
    completeTodo(todo.id, isChecked)
  }

  return (
    <div
      className={`dark:text-white text-black bg-secondary-bg rounded-md shadow-md p-5 flex flex-col select-none h-full ${isChecked ? 'opacity-70 shadow-none dark:text-white/80 text-black/40' : ''}`}
    >
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="mr-3">
            <Checkbox 
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          </div>
          <div 
            className={`text-xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[200px] ${isChecked ? 'line-through' : ''}`}
          >
            {todo.title}
          </div>
        </div>

        <div className="flex items-center">
          <Link to={`/categories/${todo?.category?.id}`} className="bg-primary-fg text-[14px] rounded-full px-2.5 py-0.5">
            {todo?.category?.name}
          </Link>
        </div>
      </div>

      <div className="line-clamp-4 my-3 text-[14px]">
        {todo.description}
      </div>

      <div className="flex justify-between items-end mt-auto">
        <div className="text-[14px] dark:text-white/40 text-black/40 font-medium">
          {new Date(todo.date).toISOString().split("T")[0]}
        </div>
        <div className="flex gap-3">
          <button 
            className="bg-primary-fg text-[16px] cursor-pointer px-3 py-1 rounded-md hover:bg-primary-fg/80 duration-100"
          >
            Edit
          </button>
          <button 
            className="bg-danger text-[16px] cursor-pointer px-3 py-1 rounded-md hover:bg-danger/80 duration-100"
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoCard