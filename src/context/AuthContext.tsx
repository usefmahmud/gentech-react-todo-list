import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { RegisterFormFields } from '../types'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { identifyUser, setUserProperties, trackEvent } from '../utils/analytics'

type LoginCredentials = {
  email: string
  password: string
}

type User = {
  id: string
  first_name: string
  last_name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  token: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  register: (formData: RegisterFormFields) => Promise<void>
  logout: () => Promise<void>
}
const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context){
    throw new Error('Error in Auth Context')
  }
  return context
}

type AuthConotextProps = {
  children: React.ReactNode
}
export const AuthProvider: React.FC<AuthConotextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const navigate = useNavigate()
  
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

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try{
      const response = await api.post('/auth/login', credentials)
      if(response?.data?.success){
        const { accessToken } = response?.data?.data?.tokens
        const userInfo = response?.data?.data.user

        setUser(userInfo)
        setToken(accessToken)

        identifyUser(userInfo.id)
        setUserProperties(userInfo)
        trackEvent('Login')  

        toast.success(response?.data?.message)
        navigate('/')
      }
    } catch(err: any){
      toast.error(err.response?.data?.message || 'Error while login')
    }
  }

  const logout = async () => {
    try{
      await api.post('/auth/logout')
      
      trackEvent('Logout')

      setUser(null);
      setToken(null);
      api.defaults.headers.common['Authorization'] = ''
      toast.success('Logged out successfully')
      navigate('/login')
  }catch (err) {
      console.error('Error during logout:', err)
      toast.error('Error during logout')

      setUser(null);
      setToken(null);
      api.defaults.headers.common['Authorization'] = ''
      navigate('/login')
  }
  }

  useEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if(token){
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    })

    return () => {
      api.interceptors.request.eject(authInterceptor)
    }
  }, [token])

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await api.get('/auth/me')
        const { first_name, last_name, email, _id } = response.data?.data
        setUser({
          first_name,
          last_name,
          email,
          id: _id
        })
      } catch (err: any) {
        console.error('Error fetching current user')
      }
    }
    
    getCurrentUser()
  }, [token])

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      response => response,
      async (err) => {
        const Request = err.config

        if(err.response?.status === 401){
          try {
            const response = await api.post('/auth/refresh-token')
            const { accessToken } = response.data?.data
            setToken(accessToken)

            if(Request){
              Request.headers.Authorization = `Bearer ${accessToken}`
              await api(Request)
            }
          } catch(err){
            toast.error('Session expired, please login again')
            setUser(null)
            setToken(null)
          }
        } 

        return Promise.reject(err)
      }
    )

    return () => {
      api.interceptors.response.eject(refreshInterceptor)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ 
      user,
      isAuthenticated: !!user && !!token,
      token,
      login, 
      register,
      logout,
    }}>
      { children }
    </AuthContext.Provider>
  )
}