import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { TodosProvider } from './context/TodosContext.tsx'

import './utils/i18n.ts'

import mixpanel from 'mixpanel-browser'
import AnalyticsTracker from './components/AnalyticsTracker.tsx'

mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, {
  debug: true
}) 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <TodosProvider>
            <Toaster 
              position='bottom-left'
              containerStyle={{
                zIndex: 10001
              }}
            />
            <App />
            <AnalyticsTracker />
          </TodosProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
