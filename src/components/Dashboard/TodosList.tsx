import TodoCard from "./TodoCard"
import { useTodos } from "../../context/TodosContext"
import { Todo } from "../../types"
import { useTranslation } from "react-i18next"

interface TodoListProps {
  todos: Todo[]
  isGridView: boolean
  sound: React.RefObject<HTMLAudioElement | null>
}

const TodosList: React.FC<TodoListProps> = ({
  todos,
  isGridView,
  sound
}) => {
  const { isTodosLoading, deleteTodo } = useTodos()
  const { t } = useTranslation('translation', { 
    keyPrefix: 'todos.page'
  })

  return (
    <div
      className={`
        overflow-y-auto gap-4 ${isGridView ? 'grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  ' : 'flex flex-col'}
        [&::-webkit-scrollbar]:w-2 
        [&::-webkit-scrollbar]:hidden
        hover:[&::-webkit-scrollbar]:block
        [&::-webkit-scrollbar-track]:m-2
        [&::-webkit-scrollbar-thumb]:w-2 
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-primary-fg/50 
        [&::-webkit-scrollbar-thumb]:hover:bg-primary-fg/10
        `}
    >
      {
        isTodosLoading ? t('loading') :
        todos
          .map(todo => (
            <TodoCard 
              key={todo?.id}
              todo={todo}
              deleteTodo={deleteTodo}
              sound={sound}
            />
          ))
      }
    </div>
  )
}

export default TodosList