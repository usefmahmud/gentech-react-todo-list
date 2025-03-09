import { useEffect, useState } from "react"

type FilteredCompletedType = 'all' | 'completed' | 'uncompleted'
type FilteredTodayTodosType = 'all' | 'today'

export const useTodosFilter = () => {
  const [todosFilteredText, setTodosFilteredText] = useState('')
  const [todosFilteredCompleted, setTodosFilteredCompleted] = useState<FilteredCompletedType>(localStorage.getItem('todos_completed_filter') as FilteredCompletedType || 'all')
  const [todosFilteredTodayTodos, setTodosFilteredTodayTodos] = useState<FilteredTodayTodosType>(localStorage.getItem('todos_today_all_filter') as FilteredTodayTodosType || 'today') 

  useEffect(() => {
    localStorage.setItem('todos_completed_filter', todosFilteredCompleted) 
  }, [todosFilteredCompleted])

  useEffect(() => {
    localStorage.setItem('todos_today_all_filter', todosFilteredTodayTodos) 
  }, [todosFilteredTodayTodos])

  return {
    todosFilteredText,
    setTodosFilteredText,
    todosFilteredCompleted,
    setTodosFilteredCompleted,
    todosFilteredTodayTodos,
    setTodosFilteredTodayTodos
  }
}