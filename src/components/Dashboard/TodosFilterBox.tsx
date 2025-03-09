import { useTodosFilter } from "../../hooks/useTodosFilter"
import DropDown from "../ui/DropDown"

interface TodosFilterBoxProps {
  todosFilteredTodayTodos: 'all' | 'today'
  setTodosFilteredTodayTodos: (selected: 'all' | 'today') => void
  setTodosFilteredCompleted: (selected: 'all' | 'completed' | 'uncompleted') => void
  todosFilteredCompleted: 'all' | 'completed' | 'uncompleted'
}

const TodosFilterBox: React.FC<TodosFilterBoxProps> = ({
  todosFilteredTodayTodos,
  setTodosFilteredTodayTodos,
  setTodosFilteredCompleted,
  todosFilteredCompleted
}) => {

  return (
    <div className="flex gap-3">
      <div>
        <DropDown 
          options={['all', 'today']}  
          selected={todosFilteredTodayTodos}
          setSelected={(selected: string) => setTodosFilteredTodayTodos(selected as 'all' | 'today')}
        />
      </div>

      <div>
        <DropDown 
          options={['all', 'completed', 'uncompleted']} 
          selected={todosFilteredCompleted}
          setSelected={(selected: string) => setTodosFilteredCompleted(selected as 'all' | 'completed' | 'uncompleted')}
        />
      </div>
    </div>
  )
}

export default TodosFilterBox