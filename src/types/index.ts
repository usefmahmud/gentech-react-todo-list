export type RegisterFormFields = {
  first_name: string
  last_name: string
  password: string
  email: string
}

export interface category {
  id: string
  name: string
}

export interface Todo {
  id: string
  title: string
  description: string
  category: category
  date: string
  is_completed: boolean
}

export interface TodoFilters {
  filteredText: string
  filteredCompleted: 'all' | 'completed' | 'uncompleted'
  filteredTodayTodos: 'all' | 'today'
}

export type HomeOutletContextType = {
  isSidebarOpen: boolean
  setIsSidebarOpen: (value: boolean) => void
}