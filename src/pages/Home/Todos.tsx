import { useEffect, useState } from "react"
import TodosList from "../../components/Dashboard/TodosList"
import Modal from "../../components/ui/Modal"
import NewTodoForm from "../../components/Dashboard/NewTodoForm"
import { CiGrid41, CiGrid2H } from "react-icons/ci"
import { useTodosLayout } from "../../hooks/useTodosLayout"
import { useParams } from "react-router-dom"
import { useTodos } from "../../context/TodosContext"
import CircularProgressBar from "../../components/ui/CircularProgressBar"

const Todos: React.FC<{
  sound: React.RefObject<HTMLAudioElement | null>
}> = ({
  sound
}) => {
  const [todosLayout, setTodosLayout] = useTodosLayout()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [filterTodoTitle, setFilterTodoTitle] = useState('')

  const { id } = useParams()
  const { retriveTodos, retriveCategories, getCategory, todos } = useTodos()

  useEffect(() => { 
    retriveTodos()
    retriveCategories()
  }, [])

  return (
    <div className="px-15 py-10">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-15">
          <h2 className="text-4xl font-bold">
            {
              id ? `Category: ${getCategory(id)?.name}` : 'Todos'
            }
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
          <div className='py-2 flex justify-between items-center mb-3'>
            <div>
              <div>
                <input 
                  type="text" 
                  className="border-1 border-border/50 bg-secondary-bg/30 text-[16px] font-normal px-3 py-2 rounded-md shadow-md placeholder:text-secondary-text placeholder:opacity-50 focus:outline-none" 
                  placeholder="Search Todos"
                  value={filterTodoTitle}
                  onChange={(e) => setFilterTodoTitle(e.target.value)}
                />
              </div>
            </div>

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
            filterTodoTitle={filterTodoTitle}
            categoryId={id}
            sound={sound}
          />
        </div>

        {
          isModalOpen && <Modal 
          className="w-full flex justify-center"
          onClose={() => setIsModalOpen(false)}
          children={
            <NewTodoForm 
              onClose={() => setIsModalOpen(false)}
            />
          }
        />
        }
      </div>

      <div className="fixed bottom-5 right-5">  

        <CircularProgressBar 
          size={95}
          progress={
            todos
              .filter(todo => !id ? true : todo.category.id === id)
              .filter(todo => todo.title.toLocaleLowerCase().includes(filterTodoTitle.toLocaleLowerCase()))
              .filter(todo => todo.is_completed)
              .length
          } 
          total={
            todos
              .filter(todo => !id ? true : todo.category.id === id)
              .filter(todo => todo.title.toLocaleLowerCase().includes(filterTodoTitle.toLocaleLowerCase()))
              .length
          }
        />
      </div>
    </div>
  )
}

export default Todos