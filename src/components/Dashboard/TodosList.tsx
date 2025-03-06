import { useEffect } from "react"
import TodoCard from "./TodoCard"
import { useTodos } from "../../context/TodosContext"

interface TodoListProps {
  isGridView: boolean
  filterTodoTitle: string
}

const TodosList: React.FC<TodoListProps> = ({
  isGridView,
  filterTodoTitle
}) => {
  const { todos, isTodosLoading, retriveTodos, deleteTodo } = useTodos()

  useEffect(() => {
    retriveTodos()
  }, [])

  return (
    <div
      className={`gap-4 ${isGridView ? 'grid grid-cols-3' : 'flex flex-col'}`}
    >
      {
        isTodosLoading ? "Loading..." :
        todos
          .filter(todo => todo.title.toLowerCase().includes(filterTodoTitle.toLowerCase()) || todo.description.toLowerCase().includes(filterTodoTitle.toLowerCase()))
          .map(todo => (
            <TodoCard 
              key={todo?.id}
              todo={todo}
              deleteTodo={deleteTodo}
            />
          ))
      }
    </div>
  )
}

export default TodosList