import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { QueryProvider } from './context/QueryContext.tsx'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
    <QueryProvider>
    <AuthProvider>
  <ConfigProvider theme={{    
    token: {
      colorIcon:'#fff',
      colorIconHover:'#fff'
    },      
          components: {
            Modal: {
              contentBg:'rgba(0, 0, 0, 0.88)',
              headerBg:'rgba(0, 0, 0, 0.88)',
              titleColor:'#fff'
            },
          },
        }}>
      <App />
  </ConfigProvider>
        
  
    </AuthProvider>
    </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
