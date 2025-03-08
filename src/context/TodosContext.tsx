import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { api } from "../services/api";
import { category, Todo } from "../types";
import toast from "react-hot-toast";
import { trackEvent } from "../utils/analytics";


interface TodosContextType {
  todos: Todo[]
  retriveTodos: () => Promise<void>
  getTodo: (id: string) => Promise<Todo>
  createTodo: (todo: {
    title: string
    description?: string
    category: string
  }) => Promise<boolean>
  updateTodo: (todo: Todo) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
  completeTodo: (id: string, is_completed: boolean) => Promise<boolean>
  isTodosLoading: boolean

  categories: category[]
  retriveCategories: () => Promise<void>
  getCategory: (id: string) => category
  createCategory: (category: {
    name: string
  }) => Promise<boolean>
  updateCategory: (category: category) => Promise<boolean>
  deleteCategory: (id: string) => Promise<void>
  isCategoriesLoading: boolean
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

const initialCategories: {
  categories: category[]
} = {
  categories: []
}

const CategoriesReducer = (state: { categories: category[] }, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { 
        ...state, 
        categories: action.payload 
      }

    case 'ADD_CATEGORY':
      return { 
        ...state, 
        categories: [...state.categories, action.payload]
       }

    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(category => category.id === action.payload.id ? action.payload : category)
      }
      
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload)
      }
    default:
      return state
  }
}

const TodosProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [todosState, todosDispatch] = useReducer(TodosReducer, initialTodos)
  const [categoriesState, categoriesDispatch] = useReducer(CategoriesReducer, initialCategories)

  const [isTodosLoading, setIsTodosLoading] = useState(true)
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true)

  const TodosManager = {
    retriveTodos: async () => {
      setIsTodosLoading(true)
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
        setIsTodosLoading(false)
      }
    },
    getTodo: async (id: string) => {
      return initialTodos.todos.find(todo => todo.id === id) as Todo
    },
    createTodo: async (todo: {
      title: string
      description?: string
      category: string
    }) => {
      try {
        const response = await api.post('/todos', todo)
        if(response.status === 201) {
          const todo = response.data?.data 
          todosDispatch({ 
            type: 'ADD_TODO', 
            payload: {
              id: todo._id,
              title: todo.title,
              description: todo.description,
              is_completed: todo.isCompleted,
              date: todo.createdAt,
              category: {
                id: todo.category._id,
                name: todo.category.name
              }
            }
          })
          toast.success(response.data?.message)

          trackEvent('Create Task', todo)

          return true
        }

        toast.error(response.data?.message || 'Error while creating task')
      } catch(err: any){
        console.error('Error while creating task', err)
        toast.error(err.response.data?.message || 'Error while creating task')
      }
      return false
    },
    updateTodo: async (todo: Todo) => {
      const response = await api.put(`/todos/${todo.id}`, todo)
      todosDispatch({ type: 'UPDATE_TODO', payload: response.data })
    },
    deleteTodo: async (id: string) => {
      try{
        const response = await api.delete(`/todos/${id}`)
        if(response.status === 200 && response.data?.success){
          todosDispatch({ type: 'DELETE_TODO', payload: id })
          toast.success(response.data?.message)

          trackEvent('Delete Task', {
            id
          })

          return
        }
        toast.error(response.data?.message || 'Error while deleting task')
      } catch(err: any){
        console.error('Error while deleting task', err)
        toast.error(err.response.data?.message || 'Error while deleting task')
      }
    },
    completeTodo: async (id: string, is_completed: boolean) => {   
      try {
        const todo = todosState.todos.find((todo: Todo) => todo.id === id) as Todo
        const response = await api.put(
          `/todos/${id}`, 
          { 
            is_completed: is_completed 
        })
        if(response.status === 200 && response.data?.success){
          todosDispatch({ type: 'UPDATE_TODO', payload: { ...todo, is_completed: is_completed } })
          toast.success(response.data?.message)

          trackEvent(is_completed ? 'Complete Task' : 'Uncompleted Task', {
            id
          })

          return true
        }
      } catch(err: any){
        console.error('Error while updating task', err)
        toast.error(err.response.data?.message || 'Error while updating task')
      }

      return false
    }
  }

  const CategoriesManager = {
    retriveCategories: async () => {
      setIsCategoriesLoading(true)
      try{
        const response = await api.get('/categories')
        if(response.status === 200 && response.data?.success){
          categoriesDispatch({ type: 'SET_CATEGORIES', payload: response.data?.data })
          return
        }
        toast.error(response.data?.message || 'Error while retrieving categories')
      } catch(err: any){
        console.error('Error while retrieving categories', err)
        toast.error(err.response.data?.message || 'Error while retrieving categories')
      } finally {
        setIsCategoriesLoading(false)
      }
    },
    getCategory: (id: string) => {
      return categoriesState.categories.find((category: category) => category.id === id) as category  
    },
    createCategory: async (category: {
      name: string
    }) => {
      try {
        const response = await api.post('/categories', category)
        if(response.status === 201) {
          categoriesDispatch({ 
            type: 'ADD_CATEGORY', 
            payload: {
              id: response.data?.data._id,
              name: response.data?.data.name
            }
          })
          toast.success(response.data?.message)

          trackEvent('Create Category', category)

          return true
        }
        toast.error(response.data?.message || 'Error while creating category')
      } catch(err: any){
        console.error('Error while creating category', err)
        toast.error(err.response.data?.message || 'Error while creating category')
      }
      return false
    },
    updateCategory: async (category: category) => {
      try {
        const response = await api.put(
          `/categories/${category.id}`, 
          { 
            name: category.name
        })
        if(response.status === 200 && response.data?.success){
          categoriesDispatch({ type: 'UPDATE_CATEGORY', payload: category })
          toast.success(response.data?.message)

          trackEvent('Update Category', category)

          return true
        }
      } catch(err: any){
        console.error('Error while updating category', err)
        toast.error(err.response.data?.message || 'Error while updating category')
      }

      return false
    },
    deleteCategory: async (id: string) => {
      try{
        const response = await api.delete(`/categories/${id}`)
        if(response.status === 200 && response.data?.success){
          categoriesDispatch({ type: 'DELETE_CATEGORY', payload: id })
          toast.success(response.data?.message)

          trackEvent('Delete Category', {
            id
          })

          return
        }
        toast.error(response.data?.message || 'Error while deleting category')
      } catch(err: any){
        console.error('Error while deleting category', err)
        toast.error(err.response.data?.message || 'Error while deleting category')
      }
    }
  }

  return (
    <TodosContext.Provider value={{
      todos: todosState.todos,
      retriveTodos: TodosManager.retriveTodos,
      getTodo: TodosManager.getTodo,
      createTodo: TodosManager.createTodo,
      updateTodo: TodosManager.updateTodo,
      deleteTodo: TodosManager.deleteTodo,
      completeTodo: TodosManager.completeTodo,
      isTodosLoading,

      categories: categoriesState.categories,
      retriveCategories: CategoriesManager.retriveCategories,
      getCategory: CategoriesManager.getCategory, 
      createCategory: CategoriesManager.createCategory,
      updateCategory: CategoriesManager.updateCategory,
      deleteCategory: CategoriesManager.deleteCategory,
      isCategoriesLoading
    }}>
      {children}
    </TodosContext.Provider>
  )
}

export { TodosProvider, useTodos }
