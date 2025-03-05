import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { api } from "../services/api";
import { Todo } from "../types";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";


interface TodosContextType {
  todos: Todo[]
  retriveTodos: () => Promise<void>
  getTodo: (id: string) => Promise<Todo>
  createTodo: (todo: Todo) => Promise<void>
  updateTodo: (todo: Todo) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
  isLoading: boolean
}

const TodosContext = createContext<TodosContextType | null>(null)

const useTodos = () => {
  const context = useContext(TodosContext)
  if(!context){
    throw Error('Error in Todos Context')
  }
  return context
}

const initialTodos: {
  todos: Todo[]
} = {
  todos: []
}

const TodosReducer = (state: { todos: Todo[] }, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case 'SET_TODOS':
      return { 
        ...state, 
        todos: action.payload 
      }

    case 'ADD_TODO':
      return { 
        ...state, 
        todos: [...state.todos, action.payload]
       }

    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)
      }
      
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, is_completed: !todo.is_completed } : todo)
      }

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    default:
      return state
  }
}

const TodosProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [todosState, todosDispatch] = useReducer(TodosReducer, initialTodos)
  const [isLoading, setIsLoading] = useState(true)

  const retriveTodos = async () => {
    setIsLoading(true)
    try{
      const response = await api.get('/todos')
      if(response.status === 200 && response.data?.success){
        todosDispatch({ type: 'SET_TODOS', payload: response.data?.data })
        return
      }
      toast.error(response.data?.message || 'Error while retrieving tasks')
    } catch(err: any){
      console.error('Error while retrieving tasks', err)
      toast.error(err.response.data?.message || 'Error while retrieving tasks')
    } finally {
      setIsLoading(false)
    }
  }

  const getTodo = async (id: string) => {
    return initialTodos.todos.find(todo => todo.id === id) as Todo
  }

  const createTodo = async (todo: Todo) => {
    const response = await api.post('/todos', todo)
    todosDispatch({ type: 'ADD_TODO', payload: response.data })
  }

  const updateTodo = async (todo: Todo) => {
    const response = await api.put(`/todos/${todo.id}`, todo)
    todosDispatch({ type: 'UPDATE_TODO', payload: response.data })
  }

  const deleteTodo = async (id: string) => {
    try{
      const response = await api.delete(`/todos/${id}`)
      if(response.status === 200 && response.data?.success){
        todosDispatch({ type: 'DELETE_TODO', payload: id })
        toast.success(response.data?.message)
        return
      }
      toast.error(response.data?.message || 'Error while deleting task')
    } catch(err: any){
      console.error('Error while deleting task', err)
      toast.error(err.response.data?.message || 'Error while deleting task')
    }
  }

  return (
    <TodosContext.Provider value={{
      todos: todosState.todos,
      retriveTodos,
      getTodo,
      createTodo,
      updateTodo,
      deleteTodo,
      isLoading
    }}>
      {children}
    </TodosContext.Provider>
  )
}

export { TodosProvider, useTodos }
