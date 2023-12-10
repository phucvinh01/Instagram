import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { QueryProvider } from './context/QueryContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
    <QueryProvider>
    <AuthProvider>
  
        <App />
  
    </AuthProvider>
    </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
