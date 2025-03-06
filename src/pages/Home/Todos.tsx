import { useState } from "react"
import TodosList from "../../components/Dashboard/TodosList"
import Modal from "../../components/ui/Modal"
import NewTodoForm from "../../components/Dashboard/NewTodoForm"
import { CiGrid41, CiGrid2H } from "react-icons/ci"
import { useTodosLayout } from "../../hooks/useTodosLayout"

const Todos = () => {
  const [todosLayout, setTodosLayout] = useTodosLayout()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="px-15 py-10">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-15">
          <h2 className="text-4xl font-bold">
            Todos
          </h2>
          <div>
            <button
              className="bg-secondary-bg text-[18px] font-semibold px-5 py-2 rounded-md cursor-pointer hover:bg-secondary-bg/80 transition duration-150 active:scale-98"
              onClick={() => setIsModalOpen(true)}
            >
              New Todo
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className='py-2 flex justify-end'>
            <div className="flex bg-secondary-bg rounded-full text-2xl shadow-md">
              <span 
                className={`p-2 pl-3.5 rounded-l-full cursor-pointer transition duration-100 hover:bg-primary-bg/50 ${todosLayout === 'grid' ? 'shadow-inner bg-primary-bg/50' : ''}`}
                onClick={() => setTodosLayout('grid')}
              ><CiGrid41 /></span>
              <span 
                className={`p-2 pr-3.5 rounded-r-full cursor-pointer transition duration-100 hover:bg-primary-bg/50 ${todosLayout === 'list' ? 'shadow-inner bg-primary-bg/50' : ''}`}
                onClick={() => setTodosLayout('list')}
              ><CiGrid2H /></span>
            </div>
          </div>

          <TodosList 
            isGridView={todosLayout === 'grid'}
          />
        </div>

        {
          isModalOpen && <Modal 
          onClose={() => setIsModalOpen(false)}
          children={
            <NewTodoForm 
              onClose={() => setIsModalOpen(false)}
            />
          }
        />
        }
      </div>
    </div>
  )
}

export default Todos