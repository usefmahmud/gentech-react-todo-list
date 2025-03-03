import React, { createContext, useContext, useState } from 'react'
import { RegisterFormFields } from '../types'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: {
    first_name: string,
    last_name: string,
    email: string
  } | null
  isAuthenticated: boolean
  token: string
  login: (credentials: { email: string, password: string }) => Promise<void>
  register: (formData: RegisterFormFields) => Promise<void>
  logout: () => void
}
const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context){
    throw new Error('Error in Theme Context')
  }
  return context
}

type AuthConotextProps = {
  children: React.ReactNode
}
export const AuthProvider: React.FC<AuthConotextProps> = ({ children }) => {
  const [user, setUser] = useState<{
    first_name: string,
    last_name: string,
    email: string
  } | null>(null)
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  const login = async (credentials: {
    email: string
    password: string
  }): Promise<void> => {

    
  }

  const register = async (formData: RegisterFormFields): Promise<void> => {
    await api.post(
      '/auth/register',
      formData
    )
    .then(() => {
      toast.success('Signed up successfully!', {
        duration: 3000
      })
      
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    })
  }

  const logout = () => {
    setUser(null)
    setToken('')
    return true
  }

  return (
    <AuthContext.Provider value={{ 
      user,
      isAuthenticated: !!user,
      token,
      login, 
      register,
      logout,
    }}>
      { children }
    </AuthContext.Provider>
  )
}