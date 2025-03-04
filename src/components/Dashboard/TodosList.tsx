import { useState } from "react"
import { CiGrid41, CiGrid2H } from "react-icons/ci"
import TodoCard from "./TodoCard"

const TodosList = () => {
  const [isGridView, setIsGridView] = useState(false)
  return (
    <div className='flex flex-col'>
      <div className='py-2 flex justify-end'>
        <div className="flex bg-secondary-bg rounded-full text-2xl shadow-md">
          <span 
            className={`p-2 pl-3.5 rounded-l-full cursor-pointer transition duration-100 hover:bg-primary-bg/50 ${isGridView ? 'shadow-inner bg-primary-bg/50' : ''}`}
            onClick={() => setIsGridView(true)}
          ><CiGrid41 /></span>
          <span 
            className={`p-2 pr-3.5 rounded-r-full cursor-pointer transition duration-100 hover:bg-primary-bg/50 ${!isGridView ? 'shadow-inner bg-primary-bg/50' : ''}`}
            onClick={() => setIsGridView(false)}
          ><CiGrid2H /></span>
        </div>
      </div>
      <div
        className={`gap-4
          ${isGridView ?
            'grid grid-cols-3' : 
            'flex flex-col'
          }
          `}
      >
        <div>
          <TodoCard />
        </div>
        <div>
          <TodoCard />
        </div>
        <div>
          <TodoCard />
        </div>
        <div>
          <TodoCard />
        </div>
      </div>
    </div>
  )
}

export default TodosList