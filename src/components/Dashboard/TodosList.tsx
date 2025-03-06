import { useEffect } from "react"
import TodoCard from "./TodoCard"
import { useTodos } from "../../context/TodosContext"

interface TodoListProps {
  isGridView: boolean
}

const TodosList: React.FC<TodoListProps> = ({
  isGridView
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
        todos.map(todo => (
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