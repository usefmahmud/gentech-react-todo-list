import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { RegisterFormFields } from '../types'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCookies } from 'react-cookie'
import { jwtDecode } from 'jwt-decode'

type LoginCredentials = {
  email: string
  password: string
}

type User = {
  id: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  token: string
  login: (credentials: LoginCredentials) => Promise<void>
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
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState('')

  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try{
      const response = await api.post('/auth/login', credentials)
      if(response?.data?.success){
        const { accessToken } = response?.data?.data?.tokens
      
        const decodedData: {
          user: User
        } = jwtDecode(accessToken)
        setCookie('token', accessToken)
        setUser(decodedData.user)

        toast.success(response?.data?.message)
      }
    } catch(err: any){
      toast.error(err.response?.data?.message || 'Error while login')
    }
  }

  const register = async (formData: RegisterFormFields): Promise<void> => {
    try {
      const response = await api.post('/auth/register', formData)
  
      if (response?.status === 201 || response?.data?.success) {
        toast.success(response?.data?.message)
  
        setTimeout(() => {
          navigate('/login')
        }, 1000)
        return
      }
      toast.error(response?.data?.message)

    } catch(err: any){
      toast.error(err.response?.data?.message || 'Error while registering')
    }
  }

  const logout = () => {
    setUser(null)
    setToken('')
    removeCookie('token')
    navigate('/')
  }

  useEffect(() => {
    const checkAuth = async () => {
      const token_ = cookies.token
    
      if(token_){
        setToken(token_)
        try {
          const decodedData: {
            user: User
          } = jwtDecode(token_)
          console.log(decodedData.user)
          setUser(decodedData.user)
        } catch (err) {
          console.error('failed with token decoding', err)
          removeCookie('token')
        }
      }
    }

    checkAuth()
  }, [])

  useLayoutEffect(() => {
    const tokenInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization = token ? `Bearer ${token}` : config.headers.Authorization
      return config
    })

    return api.interceptors.request.eject(tokenInterceptor)
  }, [token])

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