import { useEffect } from "react"
import TodoCard from "./TodoCard"
import { useTodos } from "../../context/TodosContext"

interface TodoListProps {
  isGridView: boolean
  filterTodoTitle: string
  categoryId: string | undefined
  sound: React.RefObject<HTMLAudioElement | null>
}

const TodosList: React.FC<TodoListProps> = ({
  isGridView,
  filterTodoTitle,
  categoryId,
  sound
}) => {
  const { todos, isTodosLoading, retriveTodos, deleteTodo } = useTodos()

  return (
    <div
      className={`
        overflow-y-auto gap-4 ${isGridView ? 'grid grid-cols-3' : 'flex flex-col'}
        [&::-webkit-scrollbar]:w-2 
        [&::-webkit-scrollbar-track]:m-2
        [&::-webkit-scrollbar-thumb]:w-2 
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-primary-fg/50 
        [&::-webkit-scrollbar-thumb]:hover:bg-primary-fg/10
        `}
    >
      {
        isTodosLoading ? "Loading..." :
        todos
          .filter(todo => categoryId ? todo.category.id === categoryId : true)
          .filter(todo => todo.title.toLowerCase().includes(filterTodoTitle.toLowerCase()) || todo.description?.toLowerCase().includes(filterTodoTitle.toLowerCase()))
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