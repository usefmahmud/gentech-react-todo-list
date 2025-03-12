import { useEffect, useState } from "react"
import TodosList from "../../components/Dashboard/TodosList"
import Modal from "../../components/ui/Modal"
import NewTodoForm from "../../components/Dashboard/NewTodoForm"
import { CiGrid41, CiGrid2H } from "react-icons/ci"
import { useTodosLayout } from "../../hooks/useTodosLayout"
import { useOutletContext, useParams } from "react-router-dom"
import { useTodos } from "../../context/TodosContext"
import CircularProgressBar from "../../components/ui/CircularProgressBar"
import { useTranslation } from "react-i18next"
import { useQueryState } from 'nuqs'
import { HomeOutletContextType, Todo } from "../../types"
import TodosFilterBox from "../../components/Dashboard/TodosFilterBox"
import { IoMenuOutline } from "react-icons/io5"

const Todos: React.FC<{
  sound: React.RefObject<HTMLAudioElement | null>
}> = ({
  sound
}) => {
  const [todosLayout, setTodosLayout] = useTodosLayout()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [todosFilteredText, setTodosFilteredText] = useQueryState('q', { defaultValue: '' })
  const [todosFilteredCompleted, setTodosFilteredCompleted] = useQueryState('status', { defaultValue: 'all' })
  const [todosFilteredTodayTodos, setTodosFilteredTodayTodos] = useQueryState('due', { defaultValue: 'all' })

  const { t } = useTranslation('translation', {
    keyPrefix: 'todos.page'
  })

  const { id } = useParams()
  const { retriveTodos, retriveCategories, getCategory, todos } = useTodos()

  const [filteredTodos, setFilteredTodos] = useState(todos)

  const { setIsSidebarOpen } = useOutletContext<HomeOutletContextType>()

  useEffect(() => { 
    retriveTodos()
    retriveCategories()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if(target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'){
        return
      }

      // key code for 'n' key is 78
      if(e.keyCode === 78){
        setTimeout(() => {
          setIsModalOpen(true)
        }, 0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    setFilteredTodos(() => {
      return todos
              .filter(todo => id ? todo.category.id === id : true)
              .filter(todo => todosFilteredCompleted === 'all' ? true : todosFilteredCompleted === 'completed' ? todo.is_completed : !todo.is_completed)
              .filter(todo => todosFilteredTodayTodos === 'today' ? new Date().getDate() === new Date(todo.date).getDate() : true)
              .filter(todo => todosFilteredText === '' ? true : todo.title.toLocaleLowerCase().includes(todosFilteredText.toLocaleLowerCase()))
    })
  }, [todos, id, todosFilteredTodayTodos, todosFilteredCompleted, todosFilteredText])

  return (
    <div className="px-4 md:px-15 py-10 h-full overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4 md:mb-15">
          <div className="flex gap-3 items-center">
            <div className="block md:hidden">
              <span 
                className="text-4xl cursor-pointer"
                onClick={() => setIsSidebarOpen(true)}
              >
                <IoMenuOutline />
              </span>
            </div>
            <h2 className="text-4xl font-bold">
              {
                id ? t('category_filter', {
                  category: getCategory(id)?.name
                }) : t('title')
              }
            </h2>
          </div>
          <div>
            <button
              className="bg-secondary-bg text-[18px] font-semibold px-5 py-2 rounded-md cursor-pointer hover:bg-secondary-bg/80 transition duration-150 active:scale-98"
              onClick={() => setIsModalOpen(true)}
            >
              {t('add')}
            </button>
          </div>
        </div>

        <div className="flex flex-col h-full overflow-hidden">
          <div className='py-2 flex flex-col md:flex-row justify-between items-center mb-3'>
            <div className="flex flex-col md:flex-row items-center w-full gap-5">
              <div className="w-full md:w-auto">
                <input 
                  type="text" 
                  className="border-1 border-border/50 bg-secondary-bg/30 text-[16px] font-normal w-full px-3 py-2 rounded-md shadow-md placeholder:text-secondary-text placeholder:opacity-50 focus:outline-none" 
                  placeholder={t('search')}
                  value={todosFilteredText}
                  onChange={(e) => setTodosFilteredText(e.target.value)}
                />
              </div>

              <div >    
                <TodosFilterBox 
                  todosFilteredTodayTodos={todosFilteredTodayTodos as ('all' | 'today')}
                  setTodosFilteredTodayTodos={setTodosFilteredTodayTodos}
                  todosFilteredCompleted={todosFilteredCompleted as ('all' | 'completed' | 'uncompleted')}
                  setTodosFilteredCompleted={setTodosFilteredCompleted}
                />
              </div>
            </div>

            <div className="bg-secondary-bg rounded-full text-2xl shadow-md hidden md:flex">
              <span 
                className={`p-2 pl-3.5 rtl:pr-3.5 rtl:pl-2 rounded-l-full rtl:rounded-r-full rtl:rounded-l-none cursor-pointer transition duration-100 hover:bg-primary-bg/50 ${todosLayout === 'grid' ? 'shadow-inner bg-primary-bg/50' : ''}`}
                onClick={() => setTodosLayout('grid')}
              ><CiGrid41 /></span>
              <span 
                className={`p-2 pr-3.5 rtl:pl-3.5 rtl:pr-2 rounded-r-full rtl:rounded-l-full rtl:rounded-r-none cursor-pointer transition duration-100 hover:bg-primary-bg/50 ${todosLayout === 'list' ? 'shadow-inner bg-primary-bg/50' : ''}`}
                onClick={() => setTodosLayout('list')}
              ><CiGrid2H /></span>
            </div>
          </div>

          <TodosList 
            isGridView={todosLayout === 'grid'}
            todos={filteredTodos}
            sound={sound}
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

      <div className="fixed bottom-5 ltr:right-5 rtl:left-5">  

        <CircularProgressBar 
          size={95}
          progress={
            filteredTodos
              .filter(todo => todo.is_completed)
              .length
          } 
          total={filteredTodos.length}
        />
      </div>
    </div>
  )
}

export default Todos