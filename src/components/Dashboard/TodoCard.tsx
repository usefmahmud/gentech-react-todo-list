import { useEffect, useState } from "react"
import Checkbox from "../ui/Checkbox"
import { Todo } from "../../types"
import { Link } from "react-router-dom"



const TodoCard: React.FC<{ todo: Todo }> = ({
  todo
}) => {
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    setIsChecked(todo.is_completed)
  }, [todo.is_completed])

  return (
    <div className='bg-secondary-bg rounded-md shadow-md p-5 flex flex-col select-none cursor-pointer h-full'>
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="mr-3">
            <Checkbox 
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          </div>
          <div className="text-xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
            {todo.title}
          </div>
        </div>

        <div className="flex items-center">
          <Link to={`/categories/${todo.category.id}`} className="bg-primary-fg text-[14px] rounded-full px-2.5 py-0.5">
            {todo.category.name}
          </Link>
        </div>
      </div>

      <div className="line-clamp-4 my-3 text-[14px]">
        {todo.description}
      </div>

      <div className="flex justify-between items-end mt-auto">
        <div>
          {todo.date}
        </div>
        <div className="flex gap-3">
          <button className="bg-primary-fg text-[16px] cursor-pointer px-3 py-1 rounded-md hover:bg-primary-fg/80 duration-100">
            Edit
          </button>
          <button className="bg-danger text-[16px] cursor-pointer px-3 py-1 rounded-md hover:bg-danger/80 duration-100">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoCard